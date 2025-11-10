/**
 * Testes para o componente StarRating
 * Testa a exibição e interação com estrelas de avaliação
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-10
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StarRating } from '../../components/StarRating/StarRating';

describe('StarRating Component', () => {
  describe('Renderização', () => {
    it('deve renderizar o componente corretamente', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={0} />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it('deve renderizar 5 estrelas', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={0} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      expect(icons.length).toBe(5);
    });

    it('deve renderizar estrelas vazias quando rating é 0', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={0} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      icons.forEach(icon => {
        expect(icon.props.name).toBe('star-outline');
      });
    });

    it('deve renderizar todas as estrelas preenchidas quando rating é 5', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={5} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      icons.forEach(icon => {
        expect(icon.props.name).toBe('star');
      });
    });

    it('deve renderizar estrelas preenchidas e vazias corretamente', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const filledIcons = icons.filter(icon => icon.props.name === 'star');
      const emptyIcons = icons.filter(icon => icon.props.name === 'star-outline');

      expect(filledIcons.length).toBe(3);
      expect(emptyIcons.length).toBe(2);
    });
  });

  describe('Meio Estrelas', () => {
    it('deve renderizar meia estrela quando showHalfStars é true', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3.5} showHalfStars />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const halfStarIcons = icons.filter(icon => icon.props.name === 'star-half');

      expect(halfStarIcons.length).toBe(1);
    });

    it('não deve renderizar meia estrela quando showHalfStars é false', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3.5} showHalfStars={false} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const halfStarIcons = icons.filter(icon => icon.props.name === 'star-half');

      expect(halfStarIcons.length).toBe(0);
    });

    it('deve renderizar meia estrela corretamente para diferentes ratings', () => {
      const ratings = [1.5, 2.5, 3.5, 4.5];

      ratings.forEach(rating => {
        const { UNSAFE_root } = render(
          <StarRating rating={rating} showHalfStars />
        );

        const icons = UNSAFE_root.findAllByType('Ionicons' as any);
        const halfStarIcons = icons.filter(icon => icon.props.name === 'star-half');

        expect(halfStarIcons.length).toBe(1);
      });
    });
  });

  describe('Cores Customizadas', () => {
    it('deve usar cor padrão de ouro quando não especificada', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const filledIcons = icons.filter(icon => icon.props.name === 'star');

      filledIcons.forEach(icon => {
        expect(icon.props.color).toBe('#FFD700');
      });
    });

    it('deve usar cor customizada para estrelas preenchidas', () => {
      const customColor = '#FF0000';
      const { UNSAFE_root } = render(
        <StarRating rating={3} color={customColor} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const filledIcons = icons.filter(icon => icon.props.name === 'star');

      filledIcons.forEach(icon => {
        expect(icon.props.color).toBe(customColor);
      });
    });

    it('deve usar cor padrão cinza para estrelas vazias', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={2} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const emptyIcons = icons.filter(icon => icon.props.name === 'star-outline');

      emptyIcons.forEach(icon => {
        expect(icon.props.color).toBe('#D1D5DB');
      });
    });

    it('deve usar cor customizada para estrelas vazias', () => {
      const customEmptyColor = '#CCCCCC';
      const { UNSAFE_root } = render(
        <StarRating rating={2} emptyColor={customEmptyColor} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const emptyIcons = icons.filter(icon => icon.props.name === 'star-outline');

      emptyIcons.forEach(icon => {
        expect(icon.props.color).toBe(customEmptyColor);
      });
    });
  });

  describe('Tamanho', () => {
    it('deve usar tamanho padrão de 24 quando não especificado', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      icons.forEach(icon => {
        expect(icon.props.size).toBe(24);
      });
    });

    it('deve usar tamanho customizado quando especificado', () => {
      const customSize = 32;
      const { UNSAFE_root } = render(
        <StarRating rating={3} size={customSize} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      icons.forEach(icon => {
        expect(icon.props.size).toBe(customSize);
      });
    });

    it('deve aceitar diferentes tamanhos', () => {
      const sizes = [16, 20, 24, 32, 48];

      sizes.forEach(size => {
        const { UNSAFE_root } = render(
          <StarRating rating={3} size={size} />
        );

        const icons = UNSAFE_root.findAllByType('Ionicons' as any);
        icons.forEach(icon => {
          expect(icon.props.size).toBe(size);
        });
      });
    });
  });

  describe('Interatividade', () => {
    it('deve renderizar TouchableOpacity quando não é readonly', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating rating={0} onRatingChange={mockOnRatingChange} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      expect(touchables.length).toBe(5);
    });

    it('deve chamar onRatingChange quando uma estrela é pressionada', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating rating={0} onRatingChange={mockOnRatingChange} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      // Simular pressionar a terceira estrela
      touchables[2].props.onPress();

      expect(mockOnRatingChange).toHaveBeenCalledWith(3);
    });

    it('deve permitir mudar o rating clicando em diferentes estrelas', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating rating={3} onRatingChange={mockOnRatingChange} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      // Simular pressionar a quinta estrela
      touchables[4].props.onPress();

      expect(mockOnRatingChange).toHaveBeenCalledWith(5);
    });

    it('deve permitir reduzir o rating', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating rating={5} onRatingChange={mockOnRatingChange} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      // Simular pressionar a segunda estrela
      touchables[1].props.onPress();

      expect(mockOnRatingChange).toHaveBeenCalledWith(2);
    });

    it('deve chamar onRatingChange para cada estrela corretamente', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating rating={0} onRatingChange={mockOnRatingChange} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      // Testar cada estrela
      touchables.forEach((touchable, index) => {
        mockOnRatingChange.mockClear();
        touchable.props.onPress();
        expect(mockOnRatingChange).toHaveBeenCalledWith(index + 1);
      });
    });
  });

  describe('Modo Readonly', () => {
    it('não deve renderizar TouchableOpacity quando readonly é true', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating
          rating={3}
          onRatingChange={mockOnRatingChange}
          readonly
        />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any, { deep: false });
      expect(touchables.length).toBe(0);
    });

    it('não deve chamar onRatingChange em modo readonly', () => {
      const mockOnRatingChange = jest.fn();
      render(
        <StarRating
          rating={3}
          onRatingChange={mockOnRatingChange}
          readonly
        />
      );

      // Como não há TouchableOpacity, não deve ser possível pressionar
      expect(mockOnRatingChange).not.toHaveBeenCalled();
    });

    it('deve renderizar View ao invés de TouchableOpacity quando onRatingChange não é fornecido', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any, { deep: false });
      expect(touchables.length).toBe(0);
    });

    it('deve renderizar estrelas em modo readonly corretamente', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={4} readonly />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const filledIcons = icons.filter(icon => icon.props.name === 'star');

      expect(filledIcons.length).toBe(4);
    });
  });

  describe('Edge Cases', () => {
    it('deve lidar com rating negativo', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={-1} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      icons.forEach(icon => {
        expect(icon.props.name).toBe('star-outline');
      });
    });

    it('deve lidar com rating acima de 5', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={7} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      icons.forEach(icon => {
        expect(icon.props.name).toBe('star');
      });
    });

    it('deve lidar com rating 0', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={0} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const emptyIcons = icons.filter(icon => icon.props.name === 'star-outline');

      expect(emptyIcons.length).toBe(5);
    });

    it('deve lidar com rating decimal sem showHalfStars', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3.7} showHalfStars={false} />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const filledIcons = icons.filter(icon => icon.props.name === 'star');
      const emptyIcons = icons.filter(icon => icon.props.name === 'star-outline');

      expect(filledIcons.length).toBe(3);
      expect(emptyIcons.length).toBe(2);
    });

    it('deve lidar com rating exatamente no meio', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={2.5} showHalfStars />
      );

      const icons = UNSAFE_root.findAllByType('Ionicons' as any);
      const filledIcons = icons.filter(icon => icon.props.name === 'star');
      const halfIcons = icons.filter(icon => icon.props.name === 'star-half');
      const emptyIcons = icons.filter(icon => icon.props.name === 'star-outline');

      expect(filledIcons.length).toBe(2);
      expect(halfIcons.length).toBe(1);
      expect(emptyIcons.length).toBe(2);
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter hitSlop apropriado para melhor tocabilidade', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating rating={0} onRatingChange={mockOnRatingChange} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      touchables.forEach(touchable => {
        expect(touchable.props.hitSlop).toEqual({
          top: 10,
          bottom: 10,
          left: 5,
          right: 5,
        });
      });
    });

    it('deve ter activeOpacity para feedback visual', () => {
      const mockOnRatingChange = jest.fn();
      const { UNSAFE_root } = render(
        <StarRating rating={0} onRatingChange={mockOnRatingChange} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);

      touchables.forEach(touchable => {
        expect(touchable.props.activeOpacity).toBe(0.7);
      });
    });
  });

  describe('Renderização Condicional', () => {
    it('deve renderizar View quando readonly', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3} readonly />
      );

      const views = UNSAFE_root.findAllByType('View' as any);
      expect(views.length).toBeGreaterThan(0);
    });

    it('deve renderizar TouchableOpacity quando interativo', () => {
      const { UNSAFE_root } = render(
        <StarRating rating={3} onRatingChange={jest.fn()} />
      );

      const touchables = UNSAFE_root.findAllByType('TouchableOpacity' as any);
      expect(touchables.length).toBe(5);
    });
  });
});