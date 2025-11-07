/**
 * Sistema de Avaliações para Pontos de Coleta
 * Tipos e interfaces para o sistema de rating
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-07
 */

/**
 * Interface para uma avaliação individual
 */
export interface Rating {
  id: string;
  collectionPointId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  stars: number; // 1-5
  comment: string;
  createdAt: string; // ISO 8601 date string
  updatedAt?: string; // ISO 8601 date string
}

/**
 * Interface para estatísticas de avaliações de um ponto
 */
export interface RatingStats {
  collectionPointId: string;
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/**
 * Interface para criação de nova avaliação
 */
export interface CreateRatingInput {
  collectionPointId: string;
  stars: number;
  comment: string;
}

/**
 * Interface para atualização de avaliação existente
 */
export interface UpdateRatingInput {
  stars?: number;
  comment?: string;
}

/**
 * Interface para filtros de busca de avaliações
 */
export interface RatingFilters {
  collectionPointId?: string;
  userId?: string;
  minStars?: number;
  maxStars?: number;
  sortBy?: 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
}