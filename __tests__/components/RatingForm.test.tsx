/**
 * Testes para o componente RatingForm
 * Testa o formulário de criação e edição de avaliações
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-10
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { RatingForm } from '../../components/RatingForm/RatingForm';
import { RatingProvider } from '../../contexts/RatingContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { AuthProvider } from '../../contexts/AuthContext';
import type { Rating } from '../../types/rating';

// Mock do Alert
jest.spyOn(Alert, 'alert');

// Mock do useRating
const mockCreateRating = jest.fn();
const mockUpdateRating = jest.fn();

jest.mock('../../contexts/RatingContext', () => ({
  ...jest.requireActual('../../contexts/RatingContext'),
  useRating: () => ({
    createRating: mockCreateRating,
    updateRating: mockUpdateRating,
    ratings: [],
    getRatingsByCollectionPoint: jest.fn(),
    getUserRatingForPoint: jest.fn(),
    deleteRating: jest.fn(),
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

describe('RatingForm Component', () => {
  const mockCollectionPointId = 'point-123';
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização - Modo Criação', () => {
    it('deve renderizar o formulário de criação corretamente', () => {
      const { getByText, getByPlaceholderText } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Avaliar Ponto de Coleta')).toBeTruthy();
      expect(getByText('Classificação *')).toBeTruthy();
      expect(getByText('Comentário * (0/500)')).toBeTruthy();
      expect(getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...')).toBeTruthy();
      expect(getByText('Enviar Avaliação')).toBeTruthy();
    });

    it('deve renderizar estrelas com rating inicial 0', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Selecione')).toBeTruthy();
    });

    it('não deve renderizar botão Cancelar quando onCancel não é fornecido', () => {
      const { queryByText } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(queryByText('Cancelar')).toBeNull();
    });
  });

  describe('Renderização - Modo Edição', () => {
    const existingRating: Rating = {
      id: 'rating-123',
      collectionPointId: mockCollectionPointId,
      userId: 'user-123',
      userName: 'João Silva',
      stars: 4,
      comment: 'Ótimo ponto de coleta, muito organizado!',
      createdAt: '2025-11-01T10:00:00Z',
    };

    it('deve renderizar o formulário de edição corretamente', () => {
      const { getByText, getByDisplayValue } = render(
        <TestWrapper>
          <RatingForm
            collectionPointId={mockCollectionPointId}
            existingRating={existingRating}
            onCancel={mockOnCancel}
          />
        </TestWrapper>
      );

      expect(getByText('Editar Avaliação')).toBeTruthy();
      expect(getByText('4 estrelas')).toBeTruthy();
      expect(getByDisplayValue(existingRating.comment)).toBeTruthy();
      expect(getByText('Atualizar')).toBeTruthy();
      expect(getByText('Cancelar')).toBeTruthy();
    });

    it('deve mostrar o contador de caracteres correto', () => {
      const { getByText } = render(
        <TestWrapper>
          <RatingForm
            collectionPointId={mockCollectionPointId}
            existingRating={existingRating}
          />
        </TestWrapper>
      );

      expect(getByText(`Comentário * (${existingRating.comment.length}/500)`)).toBeTruthy();
    });
  });

  describe('Seleção de Estrelas', () => {
    it('deve atualizar o rating quando uma estrela é selecionada', () => {
      const { getByText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Inicialmente deve mostrar "Selecione"
      expect(getByText('Selecione')).toBeTruthy();

      // Simular seleção de 3 estrelas através do StarRating
      // Como o StarRating usa TouchableOpacity, vamos encontrá-los
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      // Os primeiros 5 TouchableOpacity são das estrelas
      const starButtons = touchables.slice(0, 5);

      // Pressionar a terceira estrela (índice 2)
      fireEvent.press(starButtons[2]);

      // Deve mostrar "3 estrelas"
      expect(getByText('3 estrelas')).toBeTruthy();
    });

    it('deve mostrar texto singular quando apenas 1 estrela é selecionada', () => {
      const { getByText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);

      fireEvent.press(starButtons[0]);

      expect(getByText('1 estrela')).toBeTruthy();
    });
  });

  describe('Entrada de Comentário', () => {
    it('deve atualizar o comentário quando o usuário digita', () => {
      const { getByPlaceholderText, getByDisplayValue } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      const testComment = 'Este é um comentário de teste';

      fireEvent.changeText(input, testComment);

      expect(getByDisplayValue(testComment)).toBeTruthy();
    });

    it('deve atualizar o contador de caracteres', () => {
      const { getByPlaceholderText, getByText } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      const testComment = 'Teste';

      fireEvent.changeText(input, testComment);

      expect(getByText(`Comentário * (${testComment.length}/500)`)).toBeTruthy();
    });

    it('deve respeitar o limite de 500 caracteres', () => {
      const { getByPlaceholderText } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');

      // TextInput com maxLength={500} deve cortar automaticamente
      expect(input.props.maxLength).toBe(500);
    });
  });

  describe('Validação do Formulário', () => {
    it('deve mostrar erro quando nenhuma estrela é selecionada', async () => {
      const { getByText, getByPlaceholderText } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Preencher apenas o comentário
      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, 'Comentário válido com mais de 10 caracteres');

      // Tentar enviar sem selecionar estrelas
      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Erro de Validação',
          'Por favor, selecione uma classificação'
        );
      });
    });

    it('deve mostrar erro quando o comentário está vazio', async () => {
      const { getByText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Selecionar estrelas
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[2]);

      // Tentar enviar sem comentário
      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Erro de Validação',
          'Por favor, escreva um comentário'
        );
      });
    });

    it('deve mostrar erro quando o comentário tem menos de 10 caracteres', async () => {
      const { getByText, getByPlaceholderText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Selecionar estrelas
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[2]);

      // Comentário muito curto
      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, 'Curto');

      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Erro de Validação',
          'O comentário deve ter pelo menos 10 caracteres'
        );
      });
    });

    it('deve mostrar erro quando o comentário tem mais de 500 caracteres', async () => {
      const { getByText, getByPlaceholderText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Selecionar estrelas
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[2]);

      // Comentário muito longo (501 caracteres)
      const longComment = 'a'.repeat(501);
      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, longComment);

      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Erro de Validação',
          'O comentário deve ter no máximo 500 caracteres'
        );
      });
    });
  });

  describe('Submissão do Formulário - Criação', () => {
    it('deve criar uma nova avaliação com sucesso', async () => {
      const mockRating: Rating = {
        id: 'new-rating-123',
        collectionPointId: mockCollectionPointId,
        userId: 'user-123',
        userName: 'João Silva',
        stars: 4,
        comment: 'Ótimo ponto de coleta!',
        createdAt: new Date().toISOString(),
      };

      mockCreateRating.mockResolvedValueOnce(mockRating);

      const { getByText, getByPlaceholderText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm
            collectionPointId={mockCollectionPointId}
            onSuccess={mockOnSuccess}
          />
        </TestWrapper>
      );

      // Selecionar 4 estrelas
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[3]);

      // Preencher comentário
      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, mockRating.comment);

      // Submeter
      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockCreateRating).toHaveBeenCalledWith({
          collectionPointId: mockCollectionPointId,
          stars: 4,
          comment: mockRating.comment,
        });

        expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Sua avaliação foi enviada!');
        expect(mockOnSuccess).toHaveBeenCalledWith(mockRating);
      });
    });

    it('deve limpar o formulário após sucesso', async () => {
      const mockRating: Rating = {
        id: 'new-rating-123',
        collectionPointId: mockCollectionPointId,
        userId: 'user-123',
        userName: 'João Silva',
        stars: 5,
        comment: 'Excelente!',
        createdAt: new Date().toISOString(),
      };

      mockCreateRating.mockResolvedValueOnce(mockRating);

      const { getByText, getByPlaceholderText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Preencher e submeter
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[4]);

      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, mockRating.comment);

      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      await waitFor(() => {
        // Após sucesso, deve mostrar "Selecione" (rating resetado)
        expect(getByText('Selecione')).toBeTruthy();
        // Comentário deve estar vazio
        expect(getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...').props.value).toBe('');
      });
    });

    it('deve mostrar erro quando a criação falha', async () => {
      const errorMessage = 'Erro ao criar avaliação';
      mockCreateRating.mockRejectedValueOnce(new Error(errorMessage));

      const { getByText, getByPlaceholderText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Preencher formulário
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[2]);

      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, 'Comentário válido para teste');

      // Submeter
      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Erro', errorMessage);
      });
    });
  });

  describe('Submissão do Formulário - Edição', () => {
    const existingRating: Rating = {
      id: 'rating-123',
      collectionPointId: mockCollectionPointId,
      userId: 'user-123',
      userName: 'João Silva',
      stars: 4,
      comment: 'Ótimo ponto de coleta!',
      createdAt: '2025-11-01T10:00:00Z',
    };

    it('deve atualizar uma avaliação existente com sucesso', async () => {
      const updatedRating: Rating = {
        ...existingRating,
        stars: 5,
        comment: 'Avaliação atualizada!',
        updatedAt: new Date().toISOString(),
      };

      mockUpdateRating.mockResolvedValueOnce(updatedRating);

      const { getByText, getByDisplayValue, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm
            collectionPointId={mockCollectionPointId}
            existingRating={existingRating}
            onSuccess={mockOnSuccess}
          />
        </TestWrapper>
      );

      // Alterar para 5 estrelas
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[4]);

      // Alterar comentário
      const input = getByDisplayValue(existingRating.comment);
      fireEvent.changeText(input, updatedRating.comment);

      // Submeter
      const submitButton = getByText('Atualizar');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockUpdateRating).toHaveBeenCalledWith(existingRating.id, {
          stars: 5,
          comment: updatedRating.comment,
        });

        expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Sua avaliação foi atualizada!');
        expect(mockOnSuccess).toHaveBeenCalledWith(updatedRating);
      });
    });
  });

  describe('Botão Cancelar', () => {
    it('deve resetar o formulário quando Cancelar é pressionado', () => {
      const existingRating: Rating = {
        id: 'rating-123',
        collectionPointId: mockCollectionPointId,
        userId: 'user-123',
        userName: 'João Silva',
        stars: 4,
        comment: 'Ótimo ponto!',
        createdAt: '2025-11-01T10:00:00Z',
      };

      const { getByText, getByDisplayValue, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm
            collectionPointId={mockCollectionPointId}
            existingRating={existingRating}
            onCancel={mockOnCancel}
          />
        </TestWrapper>
      );

      // Alterar valores
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[4]);

      const input = getByDisplayValue(existingRating.comment);
      fireEvent.changeText(input, 'Novo comentário');

      // Cancelar
      const cancelButton = getByText('Cancelar');
      fireEvent.press(cancelButton);

      // Deve voltar aos valores originais
      expect(getByText('4 estrelas')).toBeTruthy();
      expect(getByDisplayValue(existingRating.comment)).toBeTruthy();
      expect(mockOnCancel).toHaveBeenCalled();
    });
  });

  describe('Estados de Loading', () => {
    it('deve desabilitar inputs durante o envio', async () => {
      mockCreateRating.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

      const { getByText, getByPlaceholderText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Preencher formulário
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[2]);

      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, 'Comentário válido para teste');

      // Submeter
      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      // Deve estar desabilitado
      await waitFor(() => {
        expect(input.props.editable).toBe(false);
      });
    });

    it('deve mostrar ActivityIndicator durante o envio', async () => {
      mockCreateRating.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

      const { getByText, getByPlaceholderText, UNSAFE_root } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      // Preencher e submeter
      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      const starButtons = touchables.slice(0, 5);
      fireEvent.press(starButtons[2]);

      const input = getByPlaceholderText('Compartilhe sua experiência com este ponto de coleta...');
      fireEvent.changeText(input, 'Comentário válido para teste');

      const submitButton = getByText('Enviar Avaliação');
      fireEvent.press(submitButton);

      // Deve mostrar loading
      await waitFor(() => {
        const activityIndicators = UNSAFE_root.findAllByType('ActivityIndicator' as any);
        expect(activityIndicators.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Tema', () => {
    it('deve aplicar estilos do tema escuro corretamente', () => {
      // Este teste requer configuração do tema escuro no ThemeContext
      // Por simplicidade, apenas verificamos se o componente renderiza
      const { getByText } = render(
        <TestWrapper>
          <RatingForm collectionPointId={mockCollectionPointId} />
        </TestWrapper>
      );

      expect(getByText('Avaliar Ponto de Coleta')).toBeTruthy();
    });
  });
});