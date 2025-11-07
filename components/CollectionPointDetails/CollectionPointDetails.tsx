import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Alert, Linking, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CollectionPointsStorage, CollectionPoint, WasteTypeUtils, CollectionPointStatusUtils } from '@/services';
import { StyleSheet } from 'react-native';
import { RatingStats } from '../RatingStats';
import { RatingForm } from '../RatingForm';
import { RatingList } from '../RatingList';
import { useRating } from '../../contexts/RatingContext';
import { useAuth } from '../../contexts/AuthContext';
import type { Rating } from '../../types/rating';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  address: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  directionsText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  wasteTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: 'transparent',
  },
  wasteTypeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  wasteTypeEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  wasteTypeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  operatingHours: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontFamily: 'monospace',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  contactLink: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  averageRating: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 16,
    color: '#666',
  },
  ratingItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  ratingComment: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  coordinates: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default function CollectionPointDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [point, setPoint] = useState<CollectionPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [editingRating, setEditingRating] = useState<Rating | null>(null);

  const { getUserRatingForPoint } = useRating();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const loadPoint = async () => {
      if (!id) return;
      
      try {
        const storage = CollectionPointsStorage.getInstance();
        const collectionPoint = await storage.getById(id);
        setPoint(collectionPoint);
      } catch (error) {
        console.error('Erro ao carregar ponto de coleta:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do ponto de coleta');
      } finally {
        setLoading(false);
      }
    };

    loadPoint();
  }, [id]);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (website: string) => {
    Linking.openURL(website);
  };

  const handleDirections = () => {
    if (!point) return;
    
    const { latitude, longitude } = point.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const formatOperatingHours = () => {
    if (!point?.operatingHours || point.operatingHours.length === 0) {
      return 'Horário não informado';
    }

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return point.operatingHours.map(hours => {
      const dayName = daysOfWeek[hours.dayOfWeek];
      return `${dayName}: ${hours.openTime} - ${hours.closeTime}`;
    }).join('\n');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!point) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ponto de coleta não encontrado</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.title}>{point.name}</Text>
      </View>

      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: CollectionPointStatusUtils.getColor(point.status) }]}>
        <Text style={styles.statusText}>{CollectionPointStatusUtils.getDisplayName(point.status)}</Text>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Descrição</Text>
        <Text style={styles.description}>{point.description}</Text>
      </View>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Endereço</Text>
        <Text style={styles.address}>{point.address}</Text>
        <TouchableOpacity style={styles.directionsButton} onPress={handleDirections}>
          <Ionicons name="navigate" size={20} color="#4CAF50" />
          <Text style={styles.directionsText}>Como chegar</Text>
        </TouchableOpacity>
      </View>

      {/* Waste Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>♻️ Tipos de Resíduo Aceitos</Text>
        <View style={styles.wasteTypesContainer}>
          {point.wasteTypes.map((wasteType, index) => (
            <View key={index} style={[styles.wasteTypeChip, { backgroundColor: WasteTypeUtils.getColor(wasteType) }]}>
              <Text style={styles.wasteTypeEmoji}>{WasteTypeUtils.getEmoji(wasteType)}</Text>
              <Text style={styles.wasteTypeText}>{WasteTypeUtils.getDisplayName(wasteType)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Operating Hours */}
      {point.operatingHours && point.operatingHours.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕒 Horário de Funcionamento</Text>
          <Text style={styles.operatingHours}>{formatOperatingHours()}</Text>
        </View>
      )}

      {/* Contact Info */}
      {point.contactInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Contato</Text>
          
          {point.contactInfo.responsiblePerson && (
            <View style={styles.contactItem}>
              <Ionicons name="person" size={20} color="#4CAF50" />
              <Text style={styles.contactText}>{point.contactInfo.responsiblePerson}</Text>
            </View>
          )}
          
          {point.contactInfo.phone && (
            <TouchableOpacity 
              style={styles.contactItem} 
              onPress={() => handleCall(point.contactInfo!.phone!)}
            >
              <Ionicons name="call" size={20} color="#4CAF50" />
              <Text style={[styles.contactText, styles.contactLink]}>{point.contactInfo.phone}</Text>
            </TouchableOpacity>
          )}
          
          {point.contactInfo.email && (
            <TouchableOpacity 
              style={styles.contactItem} 
              onPress={() => handleEmail(point.contactInfo!.email!)}
            >
              <Ionicons name="mail" size={20} color="#4CAF50" />
              <Text style={[styles.contactText, styles.contactLink]}>{point.contactInfo.email}</Text>
            </TouchableOpacity>
          )}
          
          {point.contactInfo.website && (
            <TouchableOpacity 
              style={styles.contactItem} 
              onPress={() => handleWebsite(point.contactInfo!.website!)}
            >
              <Ionicons name="globe" size={20} color="#4CAF50" />
              <Text style={[styles.contactText, styles.contactLink]}>{point.contactInfo.website}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Ratings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⭐ Avaliações</Text>

        {/* Estatísticas */}
        <RatingStats collectionPointId={id as string} showDistribution={true} />

        {/* Botão de Avaliar/Editar */}
        {isAuthenticated && (
          <View style={{ marginTop: 16 }}>
            {getUserRatingForPoint(id as string) ? (
              <TouchableOpacity
                style={{
                  backgroundColor: '#3B82F6',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
                onPress={() => {
                  setEditingRating(getUserRatingForPoint(id as string));
                  setShowRatingForm(true);
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
                  Editar Minha Avaliação
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: '#10B981',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
                onPress={() => {
                  setEditingRating(null);
                  setShowRatingForm(true);
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
                  Avaliar Este Ponto
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {!isAuthenticated && (
          <View style={{ marginTop: 16, padding: 12, backgroundColor: '#FEF3C7', borderRadius: 8 }}>
            <Text style={{ color: '#92400E', fontSize: 14, textAlign: 'center' }}>
              Faça login para avaliar este ponto de coleta
            </Text>
          </View>
        )}

        {/* Formulário de Avaliação */}
        {showRatingForm && (
          <View style={{ marginTop: 16 }}>
            <RatingForm
              collectionPointId={id as string}
              existingRating={editingRating}
              onSuccess={() => {
                setShowRatingForm(false);
                setEditingRating(null);
              }}
              onCancel={() => {
                setShowRatingForm(false);
                setEditingRating(null);
              }}
            />
          </View>
        )}

        {/* Lista de Avaliações */}
        <View style={{ marginTop: 16 }}>
          <RatingList
            collectionPointId={id as string}
            onEditRating={(rating) => {
              setEditingRating(rating);
              setShowRatingForm(true);
            }}
          />
        </View>
      </View>

      {/* Coordinates (for debugging) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗺️ Coordenadas</Text>
        <Text style={styles.coordinates}>
          {point.coordinates.latitude.toFixed(6)}, {point.coordinates.longitude.toFixed(6)}
        </Text>
      </View>

      {/* Last Updated */}
      <View style={styles.section}>
        <Text style={styles.lastUpdated}>
          Última atualização: {new Date(point.lastUpdated).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </ScrollView>
  );
}
