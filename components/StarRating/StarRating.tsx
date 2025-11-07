/**
 * Componente de Avaliação com Estrelas
 * Exibe e permite selecionar classificação de 1-5 estrelas
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-07
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
  showHalfStars?: boolean;
  color?: string;
  emptyColor?: string;
}

export function StarRating({
  rating,
  onRatingChange,
  size = 24,
  readonly = false,
  showHalfStars = false,
  color = '#FFD700',
  emptyColor = '#D1D5DB',
}: StarRatingProps) {
  /**
   * Renderiza uma estrela individual
   */
  const renderStar = (position: number) => {
    const filled = rating >= position;
    const halfFilled = showHalfStars && rating >= position - 0.5 && rating < position;

    let iconName: 'star' | 'star-half' | 'star-outline' = 'star-outline';

    if (filled) {
      iconName = 'star';
    } else if (halfFilled) {
      iconName = 'star-half';
    }

    const star = (
      <Ionicons
        name={iconName}
        size={size}
        color={filled || halfFilled ? color : emptyColor}
        style={styles.star}
      />
    );

    if (readonly || !onRatingChange) {
      return <View key={position}>{star}</View>;
    }

    return (
      <TouchableOpacity
        key={position}
        onPress={() => onRatingChange(position)}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      >
        {star}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map(position => renderStar(position))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
});
