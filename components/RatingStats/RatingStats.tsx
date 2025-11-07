/**
 * Componente de Estatísticas de Avaliações
 * Exibe média, distribuição e total de avaliações
 *
 * @author Anderson Henrique da Silva
 * @date 2025-11-07
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StarRating } from '../StarRating';
import { useRating } from '../../contexts/RatingContext';
import { useTheme } from '../../contexts/ThemeContext';

interface RatingStatsProps {
  collectionPointId: string;
  showDistribution?: boolean;
}

export function RatingStats({ collectionPointId, showDistribution = true }: RatingStatsProps) {
  const { getStatsForCollectionPoint } = useRating();
  const { colorScheme } = useTheme();

  const stats = getStatsForCollectionPoint(collectionPointId);
  const isDark = colorScheme === 'dark';

  /**
   * Calcula a porcentagem de uma classificação específica
   */
  const getPercentage = (count: number): number => {
    if (stats.totalRatings === 0) return 0;
    return Math.round((count / stats.totalRatings) * 100);
  };

  /**
   * Renderiza uma barra de distribuição
   */
  const renderDistributionBar = (stars: number) => {
    const count = stats.ratingDistribution[stars as keyof typeof stats.ratingDistribution];
    const percentage = getPercentage(count);

    return (
      <View key={stars} style={styles.distributionRow}>
        <Text style={[styles.starsLabel, isDark && styles.starsLabelDark]}>
          {stars} ★
        </Text>

        <View style={styles.barContainer}>
          <View
            style={[
              styles.barFill,
              { width: `${percentage}%` },
              isDark && styles.barFillDark,
            ]}
          />
        </View>

        <Text style={[styles.countLabel, isDark && styles.countLabelDark]}>
          {count}
        </Text>
      </View>
    );
  };

  if (stats.totalRatings === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer, isDark && styles.containerDark]}>
        <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
          Sem avaliações ainda
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Resumo Principal */}
      <View style={styles.summary}>
        <View style={styles.averageContainer}>
          <Text style={[styles.averageNumber, isDark && styles.averageNumberDark]}>
            {stats.averageRating.toFixed(1)}
          </Text>
          <StarRating
            rating={stats.averageRating}
            size={20}
            readonly
            showHalfStars
          />
          <Text style={[styles.totalText, isDark && styles.totalTextDark]}>
            {stats.totalRatings} {stats.totalRatings === 1 ? 'avaliação' : 'avaliações'}
          </Text>
        </View>
      </View>

      {/* Distribuição de Estrelas */}
      {showDistribution && (
        <View style={styles.distribution}>
          <Text style={[styles.distributionTitle, isDark && styles.distributionTitleDark]}>
            Distribuição
          </Text>
          {[5, 4, 3, 2, 1].map(stars => renderDistributionBar(stars))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerDark: {
    backgroundColor: '#1F2937',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyTextDark: {
    color: '#9CA3AF',
  },
  summary: {
    marginBottom: 16,
  },
  averageContainer: {
    alignItems: 'center',
  },
  averageNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  averageNumberDark: {
    color: '#F9FAFB',
  },
  totalText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  totalTextDark: {
    color: '#9CA3AF',
  },
  distribution: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  distributionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  distributionTitleDark: {
    color: '#F9FAFB',
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    width: 32,
  },
  starsLabelDark: {
    color: '#9CA3AF',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  barFillDark: {
    backgroundColor: '#FFA500',
  },
  countLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    width: 24,
    textAlign: 'right',
  },
  countLabelDark: {
    color: '#9CA3AF',
  },
});
