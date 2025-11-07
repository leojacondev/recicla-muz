/**
 * Lista de Avaliações
 * Exibe todas as avaliações de um ponto de coleta
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-07
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StarRating } from '../StarRating';
import { useRating } from '../../contexts/RatingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import type { Rating } from '../../types/rating';

interface RatingListProps {
  collectionPointId: string;
  onEditRating?: (rating: Rating) => void;
}

export function RatingList({ collectionPointId, onEditRating }: RatingListProps) {
  const { getRatingsByCollectionPoint, deleteRating } = useRating();
  const { user } = useAuth();
  const { colorScheme } = useTheme();

  const ratings = getRatingsByCollectionPoint(collectionPointId);
  const isDark = colorScheme === 'dark';

  /**
   * Formata a data de criação/atualização
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Hoje';
    } else if (diffInDays === 1) {
      return 'Ontem';
    } else if (diffInDays < 7) {
      return `${diffInDays} dias atrás`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  /**
   * Confirma e deleta uma avaliação
   */
  const handleDelete = (rating: Rating) => {
    Alert.alert(
      'Excluir Avaliação',
      'Tem certeza que deseja excluir sua avaliação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRating(rating.id);
              Alert.alert('Sucesso', 'Avaliação excluída com sucesso');
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
              Alert.alert('Erro', errorMessage);
            }
          },
        },
      ]
    );
  };

  /**
   * Renderiza um item da lista
   */
  const renderRatingItem = ({ item }: { item: Rating }) => {
    const isOwnRating = user?.id === item.userId;
    const displayDate = item.updatedAt ? formatDate(item.updatedAt) : formatDate(item.createdAt);
    const isEdited = !!item.updatedAt;

    return (
      <View style={[styles.ratingCard, isDark && styles.ratingCardDark]}>
        {/* Header com Avatar e Info do Usuário */}
        <View style={styles.ratingHeader}>
          <View style={styles.userInfo}>
            {item.userAvatar ? (
              <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, isDark && styles.avatarPlaceholderDark]}>
                <Ionicons name="person" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
              </View>
            )}

            <View style={styles.userDetails}>
              <Text style={[styles.userName, isDark && styles.userNameDark]}>
                {item.userName}
                {isOwnRating && (
                  <Text style={styles.youBadge}> (Você)</Text>
                )}
              </Text>
              <Text style={[styles.ratingDate, isDark && styles.ratingDateDark]}>
                {displayDate}
                {isEdited && ' • Editado'}
              </Text>
            </View>
          </View>

          {/* Botões de Ação (apenas para avaliações próprias) */}
          {isOwnRating && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => onEditRating?.(item)}
                style={styles.actionButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="pencil" size={18} color="#3B82F6" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item)}
                style={styles.actionButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Estrelas */}
        <View style={styles.starsContainer}>
          <StarRating rating={item.stars} size={18} readonly />
        </View>

        {/* Comentário */}
        <Text style={[styles.comment, isDark && styles.commentDark]}>
          {item.comment}
        </Text>
      </View>
    );
  };

  /**
   * Renderiza estado vazio
   */
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons
        name="star-outline"
        size={64}
        color={isDark ? '#4B5563' : '#D1D5DB'}
      />
      <Text style={[styles.emptyTitle, isDark && styles.emptyTitleDark]}>
        Nenhuma avaliação ainda
      </Text>
      <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
        Seja o primeiro a avaliar este ponto de coleta!
      </Text>
    </View>
  );

  if (ratings.length === 0) {
    return renderEmptyState();
  }

  return (
    <FlatList
      data={ratings}
      renderItem={renderRatingItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  ratingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingCardDark: {
    backgroundColor: '#1F2937',
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarPlaceholderDark: {
    backgroundColor: '#374151',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  userNameDark: {
    color: '#F9FAFB',
  },
  youBadge: {
    color: '#10B981',
    fontWeight: '600',
  },
  ratingDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  ratingDateDark: {
    color: '#9CA3AF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  starsContainer: {
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  commentDark: {
    color: '#D1D5DB',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyTitleDark: {
    color: '#F9FAFB',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  emptyTextDark: {
    color: '#9CA3AF',
  },
});
