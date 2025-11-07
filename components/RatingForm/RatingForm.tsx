/**
 * Formulário de Avaliação
 * Permite usuários criarem e editarem avaliações de pontos de coleta
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-07
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StarRating } from '../StarRating';
import { useRating } from '../../contexts/RatingContext';
import { useTheme } from '../../contexts/ThemeContext';
import type { Rating } from '../../types/rating';

interface RatingFormProps {
  collectionPointId: string;
  existingRating?: Rating | null;
  onSuccess?: (rating: Rating) => void;
  onCancel?: () => void;
}

export function RatingForm({
  collectionPointId,
  existingRating,
  onSuccess,
  onCancel,
}: RatingFormProps) {
  const [stars, setStars] = useState(existingRating?.stars || 0);
  const [comment, setComment] = useState(existingRating?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createRating, updateRating } = useRating();
  const { colorScheme } = useTheme();

  const isEditing = !!existingRating;
  const isDark = colorScheme === 'dark';

  /**
   * Atualiza o formulário quando a avaliação existente muda
   */
  useEffect(() => {
    if (existingRating) {
      setStars(existingRating.stars);
      setComment(existingRating.comment);
    }
  }, [existingRating]);

  /**
   * Valida o formulário
   */
  const validateForm = (): string | null => {
    if (stars === 0) {
      return 'Por favor, selecione uma classificação';
    }

    if (!comment.trim()) {
      return 'Por favor, escreva um comentário';
    }

    if (comment.trim().length < 10) {
      return 'O comentário deve ter pelo menos 10 caracteres';
    }

    if (comment.trim().length > 500) {
      return 'O comentário deve ter no máximo 500 caracteres';
    }

    return null;
  };

  /**
   * Envia o formulário
   */
  const handleSubmit = async () => {
    const error = validateForm();

    if (error) {
      Alert.alert('Erro de Validação', error);
      return;
    }

    try {
      setIsSubmitting(true);

      let rating: Rating;

      if (isEditing && existingRating) {
        // Atualizar avaliação existente
        rating = await updateRating(existingRating.id, {
          stars,
          comment,
        });

        Alert.alert('Sucesso', 'Sua avaliação foi atualizada!');
      } else {
        // Criar nova avaliação
        rating = await createRating({
          collectionPointId,
          stars,
          comment,
        });

        Alert.alert('Sucesso', 'Sua avaliação foi enviada!');
      }

      // Reset form
      setStars(0);
      setComment('');

      onSuccess?.(rating);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Cancela a edição
   */
  const handleCancel = () => {
    setStars(existingRating?.stars || 0);
    setComment(existingRating?.comment || '');
    onCancel?.();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={[styles.formContainer, isDark && styles.formContainerDark]}>
        {/* Título */}
        <Text style={[styles.title, isDark && styles.titleDark]}>
          {isEditing ? 'Editar Avaliação' : 'Avaliar Ponto de Coleta'}
        </Text>

        {/* Seleção de Estrelas */}
        <View style={styles.starsSection}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Classificação *
          </Text>
          <View style={styles.starsContainer}>
            <StarRating
              rating={stars}
              onRatingChange={setStars}
              size={32}
              readonly={isSubmitting}
            />
            <Text style={[styles.starsText, isDark && styles.starsTextDark]}>
              {stars > 0 ? `${stars} ${stars === 1 ? 'estrela' : 'estrelas'}` : 'Selecione'}
            </Text>
          </View>
        </View>

        {/* Comentário */}
        <View style={styles.commentSection}>
          <Text style={[styles.label, isDark && styles.labelDark]}>
            Comentário * ({comment.length}/500)
          </Text>
          <TextInput
            style={[
              styles.textInput,
              isDark && styles.textInputDark,
              isSubmitting && styles.textInputDisabled,
            ]}
            value={comment}
            onChangeText={setComment}
            placeholder="Compartilhe sua experiência com este ponto de coleta..."
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            multiline
            numberOfLines={4}
            maxLength={500}
            editable={!isSubmitting}
            textAlignVertical="top"
          />
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          {onCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isEditing ? 'Atualizar' : 'Enviar Avaliação'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formContainerDark: {
    backgroundColor: '#1F2937',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  titleDark: {
    color: '#F9FAFB',
  },
  starsSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  labelDark: {
    color: '#D1D5DB',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  starsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  starsTextDark: {
    color: '#9CA3AF',
  },
  commentSection: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    minHeight: 100,
  },
  textInputDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
    color: '#F9FAFB',
  },
  textInputDisabled: {
    opacity: 0.6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  submitButton: {
    backgroundColor: '#10B981',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
