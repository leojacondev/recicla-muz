/**
 * Testes Unitários do RatingContext
 * Testa funcionalidades de gerenciamento de avaliações
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-07
 */

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RatingProvider, useRating } from '../../contexts/RatingContext';
import { AuthProvider } from '../../contexts/AuthContext';
import type { CreateRatingInput } from '../../types/rating';

// Mock do AuthContext
jest.mock('../../contexts/AuthContext', () => {
  const actual = jest.requireActual('../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        picture: 'https://example.com/avatar.jpg',
      },
      isAuthenticated: true,
    }),
  };
});

// Wrapper para prover os contextos necessários
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <RatingProvider>{children}</RatingProvider>
  </AuthProvider>
);

describe('RatingContext', () => {
  beforeEach(() => {
    // Limpa o AsyncStorage antes de cada teste
    AsyncStorage.clear();
    jest.clearAllMocks();
  });

  describe('Criação de Avaliações', () => {
    it('deve criar uma nova avaliação com sucesso', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      const newRating: CreateRatingInput = {
        collectionPointId: 'point1',
        stars: 5,
        comment: 'Excelente ponto de coleta!',
      };

      let createdRating;
      await act(async () => {
        createdRating = await result.current.createRating(newRating);
      });

      expect(createdRating).toBeDefined();
      expect(createdRating).toMatchObject({
        collectionPointId: 'point1',
        stars: 5,
        comment: 'Excelente ponto de coleta!',
        userId: 'user123',
        userName: 'Test User',
      });
    });

    it('deve rejeitar avaliação com menos de 1 estrela', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      const invalidRating: CreateRatingInput = {
        collectionPointId: 'point1',
        stars: 0,
        comment: 'Comentário válido',
      };

      await expect(
        act(async () => {
          await result.current.createRating(invalidRating);
        })
      ).rejects.toThrow('Avaliação deve estar entre 1 e 5 estrelas');
    });

    it('deve rejeitar avaliação com mais de 5 estrelas', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      const invalidRating: CreateRatingInput = {
        collectionPointId: 'point1',
        stars: 6,
        comment: 'Comentário válido',
      };

      await expect(
        act(async () => {
          await result.current.createRating(invalidRating);
        })
      ).rejects.toThrow('Avaliação deve estar entre 1 e 5 estrelas');
    });

    it('deve rejeitar avaliação com comentário vazio', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      const invalidRating: CreateRatingInput = {
        collectionPointId: 'point1',
        stars: 5,
        comment: '   ',
      };

      await expect(
        act(async () => {
          await result.current.createRating(invalidRating);
        })
      ).rejects.toThrow('Comentário é obrigatório');
    });

    it('deve prevenir avaliações duplicadas do mesmo usuário', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      const rating: CreateRatingInput = {
        collectionPointId: 'point1',
        stars: 5,
        comment: 'Primeira avaliação',
      };

      // Cria primeira avaliação
      await act(async () => {
        await result.current.createRating(rating);
      });

      // Tenta criar segunda avaliação do mesmo usuário
      await expect(
        act(async () => {
          await result.current.createRating({
            ...rating,
            comment: 'Segunda avaliação',
          });
        })
      ).rejects.toThrow('Você já avaliou este ponto');
    });
  });

  describe('Atualização de Avaliações', () => {
    it('deve atualizar uma avaliação existente', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      // Cria avaliação
      let ratingId: string;
      await act(async () => {
        const created = await result.current.createRating({
          collectionPointId: 'point1',
          stars: 3,
          comment: 'Comentário original',
        });
        ratingId = created.id;
      });

      // Atualiza avaliação
      await act(async () => {
        await result.current.updateRating(ratingId, {
          stars: 5,
          comment: 'Comentário atualizado',
        });
      });

      const userRating = result.current.getUserRatingForPoint('point1');
      expect(userRating).toMatchObject({
        stars: 5,
        comment: 'Comentário atualizado',
      });
      expect(userRating?.updatedAt).toBeDefined();
    });

    it('deve atualizar apenas as estrelas', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      let ratingId: string;
      await act(async () => {
        const created = await result.current.createRating({
          collectionPointId: 'point1',
          stars: 3,
          comment: 'Comentário original',
        });
        ratingId = created.id;
      });

      await act(async () => {
        await result.current.updateRating(ratingId, {
          stars: 5,
        });
      });

      const userRating = result.current.getUserRatingForPoint('point1');
      expect(userRating?.stars).toBe(5);
      expect(userRating?.comment).toBe('Comentário original');
    });

    it('deve rejeitar atualização de avaliação inexistente', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      await expect(
        act(async () => {
          await result.current.updateRating('nonexistent', {
            stars: 5,
          });
        })
      ).rejects.toThrow('Avaliação não encontrada');
    });
  });

  describe('Exclusão de Avaliações', () => {
    it('deve excluir uma avaliação existente', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      // Cria avaliação
      let ratingId: string;
      await act(async () => {
        const created = await result.current.createRating({
          collectionPointId: 'point1',
          stars: 5,
          comment: 'Comentário',
        });
        ratingId = created.id;
      });

      expect(result.current.getUserRatingForPoint('point1')).toBeDefined();

      // Exclui avaliação
      await act(async () => {
        await result.current.deleteRating(ratingId);
      });

      expect(result.current.getUserRatingForPoint('point1')).toBeNull();
    });

    it('deve rejeitar exclusão de avaliação inexistente', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      await expect(
        act(async () => {
          await result.current.deleteRating('nonexistent');
        })
      ).rejects.toThrow('Avaliação não encontrada');
    });
  });

  describe('Consultas de Avaliações', () => {
    it('deve retornar avaliações por ponto de coleta', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      await act(async () => {
        await result.current.createRating({
          collectionPointId: 'point1',
          stars: 5,
          comment: 'Avaliação ponto 1',
        });
      });

      const ratings = result.current.getRatingsByCollectionPoint('point1');
      expect(ratings).toHaveLength(1);
      expect(ratings[0].collectionPointId).toBe('point1');
    });

    it('deve retornar array vazio para ponto sem avaliações', () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      const ratings = result.current.getRatingsByCollectionPoint('nonexistent');
      expect(ratings).toHaveLength(0);
    });

    it('deve retornar avaliação do usuário para ponto específico', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      await act(async () => {
        await result.current.createRating({
          collectionPointId: 'point1',
          stars: 5,
          comment: 'Minha avaliação',
        });
      });

      const userRating = result.current.getUserRatingForPoint('point1');
      expect(userRating).toBeDefined();
      expect(userRating?.userId).toBe('user123');
      expect(userRating?.collectionPointId).toBe('point1');
    });
  });

  describe('Estatísticas de Avaliações', () => {
    it('deve calcular média corretamente', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      // Cria múltiplas avaliações (como diferentes usuários seria necessário)
      await act(async () => {
        await result.current.createRating({
          collectionPointId: 'point1',
          stars: 5,
          comment: 'Excelente',
        });
      });

      const stats = result.current.getStatsForCollectionPoint('point1');
      expect(stats.averageRating).toBe(5);
      expect(stats.totalRatings).toBe(1);
    });

    it('deve retornar distribuição de estrelas', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      await act(async () => {
        await result.current.createRating({
          collectionPointId: 'point1',
          stars: 5,
          comment: 'Avaliação',
        });
      });

      const stats = result.current.getStatsForCollectionPoint('point1');
      expect(stats.ratingDistribution[5]).toBe(1);
      expect(stats.ratingDistribution[4]).toBe(0);
      expect(stats.ratingDistribution[3]).toBe(0);
      expect(stats.ratingDistribution[2]).toBe(0);
      expect(stats.ratingDistribution[1]).toBe(0);
    });

    it('deve retornar estatísticas zeradas para ponto sem avaliações', () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      const stats = result.current.getStatsForCollectionPoint('nonexistent');
      expect(stats.averageRating).toBe(0);
      expect(stats.totalRatings).toBe(0);
    });
  });

  describe('Persistência', () => {
    it('deve persistir avaliações no AsyncStorage', async () => {
      const { result } = renderHook(() => useRating(), { wrapper });

      await act(async () => {
        await result.current.createRating({
          collectionPointId: 'point1',
          stars: 5,
          comment: 'Teste de persistência',
        });
      });

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });
  });
});
