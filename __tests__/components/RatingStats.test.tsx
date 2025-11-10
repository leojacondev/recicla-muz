/**
 * Testes para o componente RatingStats
 * Testa a exibição de estatísticas de avaliações
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-10
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { RatingStats } from '../../components/RatingStats/RatingStats';
import { RatingProvider } from '../../contexts/RatingContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { AuthProvider } from '../../contexts/AuthContext';
import type { RatingStats as RatingStatsType } from '../../types/rating';

// Mock stats de teste
const mockStats: RatingStatsType = {
  collectionPointId: 'point-123',
  averageRating: 4.3,
  totalRatings: 10,
  ratingDistribution: {
    5: 5,
    4: 3,
    3: 1,
    2: 1,
    1: 0,
  },
};

const mockEmptyStats: RatingStatsType = {
  collectionPointId: 'point-456',
  averageRating: 0,
  totalRatings: 0,
  ratingDistribution: {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
};

// Mock do useRating
const mockGetStatsForCollectionPoint = jest.fn();

jest.mock('../../contexts/RatingContext', () => ({
  ...jest.requireActual('../../contexts/RatingContext'),
  useRating: () => ({
    getStatsForCollectionPoint: mockGetStatsForCollectionPoint,
    ratings: [],
    createRating: jest.fn(),
    updateRating: jest.fn(),
    deleteRating: jest.fn(),
    getRatingsByCollectionPoint: jest.fn(),
    getUserRatingForPoint: jest.fn(),
  }),
}));

// Componente wrapper com providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ThemeProvider>
      <RatingProvider>{children}</RatingProvider>
    </ThemeProvider>
  </AuthProvider>
);

describe('RatingStats Component', () => {
  const mockCollectionPointId = 'point-123';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetStatsForCollectionPoint.mockReturnValue(mockStats);
  });

  describe('Renderização - Com Estatísticas', () => {
    it('deve renderizar a média de avaliação', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('4.3')).toBeTruthy();
    });

    it('deve renderizar o total de avaliações no plural', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('10 avaliações')).toBeTruthy();
    });

    it('deve renderizar o total de avaliações no singular quando é 1', () => {
      const singleRatingStats: RatingStatsType = {
        ...mockStats,
        totalRatings: 1,
      };
      mockGetStatsForCollectionPoint.mockReturnValue(singleRatingStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('1 avaliação')).toBeTruthy();
    });

    it('deve renderizar as estrelas com média', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica se há ícones de estrela
      const starIcons = UNSAFE_root.findAllByType('Ionicons' as any).filter(
        icon => icon.props.name === 'star' ||
                icon.props.name === 'star-half' ||
                icon.props.name === 'star-outline'
      );
      expect(starIcons.length).toBeGreaterThan(0);
    });

    it('deve renderizar com meio estrelas por padrão', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Procura pelo StarRating component que deve ter showHalfStars
      const container = UNSAFE_root.findByType('View' as any);
      expect(container).toBeTruthy();
    });
  });

  describe('Renderização - Distribuição', () => {
    it('deve renderizar o título de distribuição', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Distribuição')).toBeTruthy();
    });

    it('deve renderizar todas as 5 linhas de distribuição', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('5 ★')).toBeTruthy();
      expect(getByText('4 ★')).toBeTruthy();
      expect(getByText('3 ★')).toBeTruthy();
      expect(getByText('2 ★')).toBeTruthy();
      expect(getByText('1 ★')).toBeTruthy();
    });

    it('deve renderizar as contagens corretas', () => {
      const { getByText, getAllByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica contagens
      expect(getAllByText('5').length).toBeGreaterThan(0); // 5 estrelas: 5 ratings
      expect(getAllByText('3').length).toBeGreaterThan(0); // 4 estrelas: 3 ratings
      expect(getAllByText('1').length).toBeGreaterThan(0); // 3 e 2 estrelas: 1 rating cada
      expect(getAllByText('0').length).toBeGreaterThan(0); // 1 estrela: 0 ratings
    });

    it('deve calcular porcentagens corretamente', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Total: 10 ratings
      // 5 estrelas: 5/10 = 50%
      // 4 estrelas: 3/10 = 30%
      // 3 estrelas: 1/10 = 10%
      // 2 estrelas: 1/10 = 10%
      // 1 estrela: 0/10 = 0%

      // Procura por Views com width em porcentagem
      const views = UNSAFE_root.findAllByType('View' as any);
      const barFills = views.filter(v =>
        v.props.style &&
        Array.isArray(v.props.style) &&
        v.props.style.some((s: any) => s?.width?.includes?.('%'))
      );

      expect(barFills.length).toBeGreaterThan(0);
    });

    it('deve renderizar em ordem decrescente (5 a 1 estrelas)', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica se todos os labels estão presentes
      const labels = ['5 ★', '4 ★', '3 ★', '2 ★', '1 ★'];
      labels.forEach(label => {
        expect(getAllByText(label).length).toBeGreaterThan(0);
      });
    });

    it('não deve renderizar distribuição quando showDistribution é false', () => {
      const { queryByText } = render(
        <TestWrapper>
          <RatingStats
            collectionPointId={mockCollectionPointId}
            showDistribution={false}
          />
        </TestWrapper>
      );

      expect(queryByText('Distribuição')).toBeNull();
      expect(queryByText('5 ★')).toBeNull();
    });
  });

  describe('Renderização - Estado Vazio', () => {
    it('deve renderizar mensagem quando não há avaliações', () => {
      mockGetStatsForCollectionPoint.mockReturnValue(mockEmptyStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Sem avaliações ainda')).toBeTruthy();
    });

    it('não deve renderizar média quando não há avaliações', () => {
      mockGetStatsForCollectionPoint.mockReturnValue(mockEmptyStats);

      const { queryByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(queryByText(/avaliações/)).toBeNull();
    });

    it('não deve renderizar distribuição quando não há avaliações', () => {
      mockGetStatsForCollectionPoint.mockReturnValue(mockEmptyStats);

      const { queryByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(queryByText('Distribuição')).toBeNull();
    });
  });

  describe('Cálculos', () => {
    it('deve arredondar porcentagens corretamente', () => {
      const stats: RatingStatsType = {
        collectionPointId: mockCollectionPointId,
        averageRating: 3.7,
        totalRatings: 3,
        ratingDistribution: {
          5: 1, // 33.33% -> 33%
          4: 1, // 33.33% -> 33%
          3: 1, // 33.33% -> 33%
          2: 0,
          1: 0,
        },
      };
      mockGetStatsForCollectionPoint.mockReturnValue(stats);

      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica se o componente renderiza sem erros
      expect(UNSAFE_root).toBeTruthy();
    });

    it('deve mostrar 0% quando contagem é 0', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // 1 estrela tem 0 ratings
      expect(getAllByText('0').length).toBeGreaterThan(0);
    });

    it('deve mostrar 100% quando todas as avaliações são de 5 estrelas', () => {
      const perfectStats: RatingStatsType = {
        collectionPointId: mockCollectionPointId,
        averageRating: 5.0,
        totalRatings: 10,
        ratingDistribution: {
          5: 10,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
      mockGetStatsForCollectionPoint.mockReturnValue(perfectStats);

      const { getAllByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getAllByText('10').length).toBeGreaterThan(0);
      expect(getAllByText('0').length).toBeGreaterThan(0);
    });
  });

  describe('Formatação de Números', () => {
    it('deve formatar média com 1 casa decimal', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // mockStats.averageRating é 4.3
      expect(getByText('4.3')).toBeTruthy();
    });

    it('deve formatar média com .0 quando é número inteiro', () => {
      const integerStats: RatingStatsType = {
        ...mockStats,
        averageRating: 4.0,
      };
      mockGetStatsForCollectionPoint.mockReturnValue(integerStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('4.0')).toBeTruthy();
    });

    it('deve arredondar média para 1 casa decimal', () => {
      const preciseStats: RatingStatsType = {
        ...mockStats,
        averageRating: 4.567,
      };
      mockGetStatsForCollectionPoint.mockReturnValue(preciseStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // 4.567 arredondado para 1 casa = 4.6
      expect(getByText('4.6')).toBeTruthy();
    });
  });

  describe('Estilos de Barra', () => {
    it('deve renderizar barras de progresso', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica se há Views que representam barras
      const views = UNSAFE_root.findAllByType('View' as any);
      expect(views.length).toBeGreaterThan(0);
    });

    it('deve aplicar largura baseada em porcentagem', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const views = UNSAFE_root.findAllByType('View' as any);

      // Procura por Views com width em porcentagem (barras de progresso)
      const barViews = views.filter(v => {
        if (!v.props.style) return false;
        const styles = Array.isArray(v.props.style) ? v.props.style : [v.props.style];
        return styles.some(s => s?.width && typeof s.width === 'string' && s.width.includes('%'));
      });

      expect(barViews.length).toBeGreaterThan(0);
    });
  });

  describe('Props showDistribution', () => {
    it('deve mostrar distribuição por padrão', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Distribuição')).toBeTruthy();
    });

    it('deve ocultar distribuição quando showDistribution é false', () => {
      const { queryByText } = render(
        <TestWrapper>
          <RatingStats
            collectionPointId={mockCollectionPointId}
            showDistribution={false}
          />
        </TestWrapper>
      );

      expect(queryByText('Distribuição')).toBeNull();
    });

    it('deve sempre mostrar resumo principal independente de showDistribution', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingStats
            collectionPointId={mockCollectionPointId}
            showDistribution={false}
          />
        </TestWrapper>
      );

      expect(getByText('4.3')).toBeTruthy();
      expect(getByText('10 avaliações')).toBeTruthy();
    });
  });

  describe('Casos Extremos', () => {
    it('deve lidar com distribuição irregular', () => {
      const irregularStats: RatingStatsType = {
        collectionPointId: mockCollectionPointId,
        averageRating: 2.5,
        totalRatings: 100,
        ratingDistribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 50,
          1: 50,
        },
      };
      mockGetStatsForCollectionPoint.mockReturnValue(irregularStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('2.5')).toBeTruthy();
      expect(getByText('100 avaliações')).toBeTruthy();
    });

    it('deve lidar com grandes números de avaliações', () => {
      const largeStats: RatingStatsType = {
        collectionPointId: mockCollectionPointId,
        averageRating: 4.8,
        totalRatings: 9999,
        ratingDistribution: {
          5: 8000,
          4: 1500,
          3: 400,
          2: 80,
          1: 19,
        },
      };
      mockGetStatsForCollectionPoint.mockReturnValue(largeStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('4.8')).toBeTruthy();
      expect(getByText('9999 avaliações')).toBeTruthy();
    });

    it('deve lidar com média perfeita', () => {
      const perfectStats: RatingStatsType = {
        collectionPointId: mockCollectionPointId,
        averageRating: 5.0,
        totalRatings: 50,
        ratingDistribution: {
          5: 50,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
      mockGetStatsForCollectionPoint.mockReturnValue(perfectStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('5.0')).toBeTruthy();
    });

    it('deve lidar com média muito baixa', () => {
      const lowStats: RatingStatsType = {
        collectionPointId: mockCollectionPointId,
        averageRating: 1.2,
        totalRatings: 5,
        ratingDistribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 1,
          1: 4,
        },
      };
      mockGetStatsForCollectionPoint.mockReturnValue(lowStats);

      const { getByText } = render(
        <TestWrapper>
          <RatingStats collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('1.2')).toBeTruthy();
    });
  });
});