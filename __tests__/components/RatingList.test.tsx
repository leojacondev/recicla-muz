/**
 * Testes para o componente RatingList
 * Testa a exibição e gerenciamento de lista de avaliações
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-10
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { RatingList } from '../../components/RatingList/RatingList';
import { RatingProvider } from '../../contexts/RatingContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { AuthProvider } from '../../contexts/AuthContext';
import type { Rating } from '../../types/rating';

// Mock do Alert
jest.spyOn(Alert, 'alert');

// Mock ratings de teste
const mockRatings: Rating[] = [
  {
    id: 'rating-1',
    collectionPointId: 'point-123',
    userId: 'user-123',
    userName: 'João Silva',
    userAvatar: 'https://example.com/avatar1.jpg',
    stars: 5,
    comment: 'Excelente ponto de coleta! Muito limpo e organizado.',
    createdAt: '2025-11-08T10:00:00Z',
  },
  {
    id: 'rating-2',
    collectionPointId: 'point-123',
    userId: 'user-456',
    userName: 'Maria Santos',
    stars: 4,
    comment: 'Bom ponto, mas poderia ter mais lixeiras.',
    createdAt: '2025-11-07T15:30:00Z',
    updatedAt: '2025-11-08T09:00:00Z',
  },
  {
    id: 'rating-3',
    collectionPointId: 'point-123',
    userId: 'user-789',
    userName: 'Pedro Oliveira',
    stars: 3,
    comment: 'Localização ok, precisa de manutenção.',
    createdAt: '2025-11-05T14:20:00Z',
  },
];

// Mock do useRating
const mockGetRatingsByCollectionPoint = jest.fn();
const mockDeleteRating = jest.fn();

jest.mock('../../contexts/RatingContext', () => ({
  ...jest.requireActual('../../contexts/RatingContext'),
  useRating: () => ({
    getRatingsByCollectionPoint: mockGetRatingsByCollectionPoint,
    deleteRating: mockDeleteRating,
    ratings: mockRatings,
    createRating: jest.fn(),
    updateRating: jest.fn(),
    getUserRatingForPoint: jest.fn(),
    getStatsForCollectionPoint: jest.fn(),
  }),
}));

// Mock do useAuth
const mockUser = {
  id: 'user-123',
  name: 'João Silva',
  email: 'joao@example.com',
  provider: 'google' as const,
};

jest.mock('../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../contexts/AuthContext'),
  useAuth: () => ({
    user: mockUser,
    isAuthenticated: true,
    isLoading: false,
    signInWithGoogle: jest.fn(),
    signInWithGitHub: jest.fn(),
    signOut: jest.fn(),
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

describe('RatingList Component', () => {
  const mockCollectionPointId = 'point-123';
  const mockOnEditRating = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRatingsByCollectionPoint.mockReturnValue(mockRatings);
  });

  describe('Renderização - Lista com Avaliações', () => {
    it('deve renderizar todas as avaliações', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica se todos os nomes de usuário estão presentes
      expect(getByText('João Silva')).toBeTruthy();
      expect(getByText('Maria Santos')).toBeTruthy();
      expect(getByText('Pedro Oliveira')).toBeTruthy();

      // Verifica se todos os comentários estão presentes
      expect(getByText('Excelente ponto de coleta! Muito limpo e organizado.')).toBeTruthy();
      expect(getByText('Bom ponto, mas poderia ter mais lixeiras.')).toBeTruthy();
      expect(getByText('Localização ok, precisa de manutenção.')).toBeTruthy();
    });

    it('deve renderizar o badge (Você) para avaliações próprias', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('(Você)')).toBeTruthy();
    });

    it('deve renderizar avatar quando disponível', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const images = UNSAFE_root.findAllByType('Image' as any);
      expect(images.length).toBeGreaterThan(0);
    });

    it('deve renderizar placeholder quando avatar não está disponível', () => {
      const ratingsWithoutAvatar = mockRatings.map(r => ({ ...r, userAvatar: undefined }));
      mockGetRatingsByCollectionPoint.mockReturnValue(ratingsWithoutAvatar);

      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica se há ícones de pessoa (placeholder)
      const personIcons = UNSAFE_root.findAllByType('Ionicons' as any).filter(
        icon => icon.props.name === 'person'
      );
      expect(personIcons.length).toBeGreaterThan(0);
    });

    it('deve renderizar estrelas para cada avaliação', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Verifica se há componentes StarRating
      const starIcons = UNSAFE_root.findAllByType('Ionicons' as any).filter(
        icon => icon.props.name === 'star' || icon.props.name === 'star-outline'
      );
      expect(starIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Renderização - Estado Vazio', () => {
    it('deve renderizar mensagem quando não há avaliações', () => {
      mockGetRatingsByCollectionPoint.mockReturnValue([]);

      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Nenhuma avaliação ainda')).toBeTruthy();
      expect(getByText('Seja o primeiro a avaliar este ponto de coleta!')).toBeTruthy();
    });

    it('deve renderizar ícone de estrela no estado vazio', () => {
      mockGetRatingsByCollectionPoint.mockReturnValue([]);

      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const starOutlineIcons = UNSAFE_root.findAllByType('Ionicons' as any).filter(
        icon => icon.props.name === 'star-outline'
      );
      expect(starOutlineIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Formatação de Data', () => {
    it('deve mostrar "Hoje" para avaliações de hoje', () => {
      const todayRating: Rating = {
        ...mockRatings[0],
        createdAt: new Date().toISOString(),
      };
      mockGetRatingsByCollectionPoint.mockReturnValue([todayRating]);

      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Hoje')).toBeTruthy();
    });

    it('deve mostrar "Ontem" para avaliações de ontem', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayRating: Rating = {
        ...mockRatings[0],
        createdAt: yesterday.toISOString(),
      };
      mockGetRatingsByCollectionPoint.mockReturnValue([yesterdayRating]);

      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Ontem')).toBeTruthy();
    });

    it('deve mostrar "X dias atrás" para avaliações recentes', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const recentRating: Rating = {
        ...mockRatings[0],
        createdAt: threeDaysAgo.toISOString(),
      };
      mockGetRatingsByCollectionPoint.mockReturnValue([recentRating]);

      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('3 dias atrás')).toBeTruthy();
    });

    it('deve mostrar "X semanas atrás" para avaliações antigas', () => {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      const oldRating: Rating = {
        ...mockRatings[0],
        createdAt: twoWeeksAgo.toISOString(),
      };
      mockGetRatingsByCollectionPoint.mockReturnValue([oldRating]);

      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('2 semanas atrás')).toBeTruthy();
    });

    it('deve mostrar "• Editado" quando avaliação foi editada', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Maria Santos tem updatedAt, então deve mostrar "Editado"
      const editedText = getByText(/• Editado/);
      expect(editedText).toBeTruthy();
    });
  });

  describe('Botões de Ação - Avaliações Próprias', () => {
    it('deve renderizar botões de editar e excluir para avaliações próprias', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList
            collectionPointId={mockCollectionPointId}
            onEditRating={mockOnEditRating}
          />
        </TestWrapper>
      );

      // Busca por ícones de lápis (editar) e lixeira (excluir)
      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const pencilIcons = icons.filter(icon => icon.props.name === 'pencil');
      const trashIcons = icons.filter(icon => icon.props.name === 'trash-outline');

      // Deve ter pelo menos 1 de cada (para a avaliação própria)
      expect(pencilIcons.length).toBeGreaterThan(0);
      expect(trashIcons.length).toBeGreaterThan(0);
    });

    it('não deve renderizar botões de ação para avaliações de outros usuários', () => {
      mockGetRatingsByCollectionPoint.mockReturnValue([mockRatings[1], mockRatings[2]]);

      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList
            collectionPointId={mockCollectionPointId}
            onEditRating={mockOnEditRating}
          />
        </TestWrapper>
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const pencilIcons = icons.filter(icon => icon.props.name === 'pencil');
      const trashIcons = icons.filter(icon => icon.props.name === 'trash-outline');

      // Não deve ter botões de ação para avaliações de outros
      expect(pencilIcons.length).toBe(0);
      expect(trashIcons.length).toBe(0);
    });

    it('deve chamar onEditRating quando botão de editar é pressionado', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList
            collectionPointId={mockCollectionPointId}
            onEditRating={mockOnEditRating}
          />
        </TestWrapper>
      );

      // Encontra todos os TouchableOpacity
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      // Filtra por aqueles que contêm ícone de lápis
      const editButton = touchables.find(t => {
        const icons = t.findAllByType('Ionicons' as any, { deep: false });
        return icons.some(icon => icon.props.name === 'pencil');
      });

      expect(editButton).toBeTruthy();
      fireEvent.press(editButton!);

      expect(mockOnEditRating).toHaveBeenCalledWith(mockRatings[0]);
    });

    it('deve mostrar confirmação ao tentar excluir avaliação', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Encontra o botão de excluir
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const deleteButton = touchables.find(t => {
        const icons = t.findAllByType('Ionicons' as any, { deep: false });
        return icons.some(icon => icon.props.name === 'trash-outline');
      });

      expect(deleteButton).toBeTruthy();
      fireEvent.press(deleteButton!);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Excluir Avaliação',
        'Tem certeza que deseja excluir sua avaliação?',
        expect.any(Array)
      );
    });

    it('deve excluir avaliação quando confirmado', async () => {
      mockDeleteRating.mockResolvedValueOnce(undefined);

      // Mock do Alert.alert para simular confirmação
      (Alert.alert as jest.Mock).mockImplementation((title, message, buttons) => {
        // Simula pressionar o botão "Excluir"
        const deleteButton = buttons?.find((b: any) => b.text === 'Excluir');
        if (deleteButton && deleteButton.onPress) {
          deleteButton.onPress();
        }
      });

      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Encontra e pressiona o botão de excluir
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const deleteButton = touchables.find(t => {
        const icons = t.findAllByType('Ionicons' as any, { deep: false });
        return icons.some(icon => icon.props.name === 'trash-outline');
      });

      fireEvent.press(deleteButton!);

      await waitFor(() => {
        expect(mockDeleteRating).toHaveBeenCalledWith(mockRatings[0].id);
        expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Avaliação excluída com sucesso');
      });
    });

    it('deve mostrar erro quando exclusão falha', async () => {
      const errorMessage = 'Erro ao excluir avaliação';
      mockDeleteRating.mockRejectedValueOnce(new Error(errorMessage));

      // Mock do Alert.alert para simular confirmação
      (Alert.alert as jest.Mock).mockImplementation((title, message, buttons) => {
        if (buttons) {
          const deleteButton = buttons.find((b: any) => b.text === 'Excluir');
          if (deleteButton && deleteButton.onPress) {
            deleteButton.onPress();
          }
        }
      });

      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Encontra e pressiona o botão de excluir
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const deleteButton = touchables.find(t => {
        const icons = t.findAllByType('Ionicons' as any, { deep: false });
        return icons.some(icon => icon.props.name === 'trash-outline');
      });

      fireEvent.press(deleteButton!);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Erro', errorMessage);
      });
    });

    it('não deve excluir quando cancelado', () => {
      // Mock do Alert.alert para simular cancelamento
      (Alert.alert as jest.Mock).mockImplementation((title, message, buttons) => {
        // Não faz nada (simula cancelar)
      });

      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const deleteButton = touchables.find(t => {
        const icons = t.findAllByType('Ionicons' as any, { deep: false });
        return icons.some(icon => icon.props.name === 'trash-outline');
      });

      fireEvent.press(deleteButton!);

      expect(mockDeleteRating).not.toHaveBeenCalled();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter hitSlop apropriado nos botões de ação', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList
            collectionPointId={mockCollectionPointId}
            onEditRating={mockOnEditRating}
          />
        </TestWrapper>
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      // Filtra botões de ação (editar e excluir)
      const actionButtons = touchables.filter(t => {
        const icons = t.findAllByType('Ionicons' as any, { deep: false });
        return icons.some(
          icon => icon.props.name === 'pencil' || icon.props.name === 'trash-outline'
        );
      });

      actionButtons.forEach(button => {
        expect(button.props.hitSlop).toEqual({
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        });
      });
    });
  });

  describe('FlatList', () => {
    it('deve usar FlatList para renderizar a lista', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const flatLists = UNSAFE_root.findAllByType('FlatList' as any);
      expect(flatLists.length).toBe(1);
    });

    it('deve ter showsVerticalScrollIndicator desabilitado', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const flatList = UNSAFE_root.findByType('FlatList' as any);
      expect(flatList.props.showsVerticalScrollIndicator).toBe(false);
    });

    it('deve usar id como keyExtractor', () => {
      const { UNSAFE_root } = render(
        <TestWrapper>
          <RatingList collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const flatList = UNSAFE_root.findByType('FlatList' as any);
      const keyExtractor = flatList.props.keyExtractor;

      expect(keyExtractor(mockRatings[0])).toBe(mockRatings[0].id);
    });
  });
});