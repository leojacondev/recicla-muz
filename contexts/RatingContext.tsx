/**
 * Context de Gerenciamento de Avaliações
 * Gerencia avaliações dos pontos de coleta usando AsyncStorage
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-07
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import type { Rating, RatingStats, CreateRatingInput, UpdateRatingInput, RatingFilters } from '../types/rating';

/**
 * Chaves de armazenamento
 */
const STORAGE_KEYS = {
  RATINGS: '@reciclamuz:ratings',
} as const;

/**
 * Interface do contexto
 */
interface RatingContextType {
  ratings: Rating[];
  isLoading: boolean;
  error: string | null;

  // CRUD operations
  createRating: (input: CreateRatingInput) => Promise<Rating>;
  updateRating: (ratingId: string, input: UpdateRatingInput) => Promise<Rating>;
  deleteRating: (ratingId: string) => Promise<void>;

  // Query operations
  getRatingsByCollectionPoint: (collectionPointId: string) => Rating[];
  getRatingsByUser: (userId: string) => Rating[];
  getUserRatingForPoint: (collectionPointId: string) => Rating | null;

  // Statistics
  getStatsForCollectionPoint: (collectionPointId: string) => RatingStats;

  // Utility
  refreshRatings: () => Promise<void>;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

/**
 * Provider do contexto de avaliações
 */
export function RatingProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  /**
   * Carrega avaliações do AsyncStorage na inicialização
   */
  useEffect(() => {
    loadRatings();
  }, []);

  /**
   * Carrega todas as avaliações do storage
   */
  const loadRatings = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const storedRatings = await AsyncStorage.getItem(STORAGE_KEYS.RATINGS);

      if (storedRatings) {
        const parsed = JSON.parse(storedRatings) as Rating[];
        setRatings(parsed);
      }
    } catch (err) {
      console.error('Erro ao carregar avaliações:', err);
      setError('Falha ao carregar avaliações');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Salva avaliações no AsyncStorage
   */
  const saveRatings = async (newRatings: Rating[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(newRatings));
      setRatings(newRatings);
    } catch (err) {
      console.error('Erro ao salvar avaliações:', err);
      throw new Error('Falha ao salvar avaliação');
    }
  };

  /**
   * Cria uma nova avaliação
   */
  const createRating = async (input: CreateRatingInput): Promise<Rating> => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    // Validação
    if (input.stars < 1 || input.stars > 5) {
      throw new Error('Avaliação deve estar entre 1 e 5 estrelas');
    }

    if (!input.comment.trim()) {
      throw new Error('Comentário é obrigatório');
    }

    // Verifica se usuário já avaliou este ponto
    const existingRating = ratings.find(
      r => r.collectionPointId === input.collectionPointId && r.userId === user.id
    );

    if (existingRating) {
      throw new Error('Você já avaliou este ponto. Use a opção de editar.');
    }

    const newRating: Rating = {
      id: `rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      collectionPointId: input.collectionPointId,
      userId: user.id,
      userName: user.name || 'Usuário Anônimo',
      userAvatar: user.picture,
      stars: input.stars,
      comment: input.comment.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedRatings = [...ratings, newRating];
    await saveRatings(updatedRatings);

    return newRating;
  };

  /**
   * Atualiza uma avaliação existente
   */
  const updateRating = async (ratingId: string, input: UpdateRatingInput): Promise<Rating> => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const ratingIndex = ratings.findIndex(r => r.id === ratingId);

    if (ratingIndex === -1) {
      throw new Error('Avaliação não encontrada');
    }

    const rating = ratings[ratingIndex];

    // Verifica se o usuário é o dono da avaliação
    if (rating.userId !== user.id) {
      throw new Error('Você não pode editar avaliações de outros usuários');
    }

    // Validação de stars se fornecido
    if (input.stars !== undefined && (input.stars < 1 || input.stars > 5)) {
      throw new Error('Avaliação deve estar entre 1 e 5 estrelas');
    }

    const updatedRating: Rating = {
      ...rating,
      stars: input.stars ?? rating.stars,
      comment: input.comment?.trim() ?? rating.comment,
      updatedAt: new Date().toISOString(),
    };

    const updatedRatings = [...ratings];
    updatedRatings[ratingIndex] = updatedRating;

    await saveRatings(updatedRatings);

    return updatedRating;
  };

  /**
   * Deleta uma avaliação
   */
  const deleteRating = async (ratingId: string): Promise<void> => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const rating = ratings.find(r => r.id === ratingId);

    if (!rating) {
      throw new Error('Avaliação não encontrada');
    }

    // Verifica se o usuário é o dono da avaliação
    if (rating.userId !== user.id) {
      throw new Error('Você não pode deletar avaliações de outros usuários');
    }

    const updatedRatings = ratings.filter(r => r.id !== ratingId);
    await saveRatings(updatedRatings);
  };

  /**
   * Retorna todas as avaliações de um ponto de coleta
   */
  const getRatingsByCollectionPoint = (collectionPointId: string): Rating[] => {
    return ratings
      .filter(r => r.collectionPointId === collectionPointId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  /**
   * Retorna todas as avaliações de um usuário
   */
  const getRatingsByUser = (userId: string): Rating[] => {
    return ratings
      .filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  /**
   * Retorna a avaliação do usuário atual para um ponto específico
   */
  const getUserRatingForPoint = (collectionPointId: string): Rating | null => {
    if (!user) return null;

    return ratings.find(
      r => r.collectionPointId === collectionPointId && r.userId === user.id
    ) || null;
  };

  /**
   * Calcula estatísticas de avaliações para um ponto
   */
  const getStatsForCollectionPoint = (collectionPointId: string): RatingStats => {
    const pointRatings = getRatingsByCollectionPoint(collectionPointId);

    const distribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    let totalStars = 0;

    pointRatings.forEach(rating => {
      distribution[rating.stars as keyof typeof distribution]++;
      totalStars += rating.stars;
    });

    return {
      collectionPointId,
      averageRating: pointRatings.length > 0 ? totalStars / pointRatings.length : 0,
      totalRatings: pointRatings.length,
      ratingDistribution: distribution,
    };
  };

  /**
   * Recarrega avaliações do storage
   */
  const refreshRatings = async (): Promise<void> => {
    await loadRatings();
  };

  const value: RatingContextType = {
    ratings,
    isLoading,
    error,
    createRating,
    updateRating,
    deleteRating,
    getRatingsByCollectionPoint,
    getRatingsByUser,
    getUserRatingForPoint,
    getStatsForCollectionPoint,
    refreshRatings,
  };

  return <RatingContext.Provider value={value}>{children}</RatingContext.Provider>;
}

/**
 * Hook para usar o contexto de avaliações
 */
export function useRating(): RatingContextType {
  const context = useContext(RatingContext);

  if (context === undefined) {
    throw new Error('useRating deve ser usado dentro de um RatingProvider');
  }

  return context;
}
