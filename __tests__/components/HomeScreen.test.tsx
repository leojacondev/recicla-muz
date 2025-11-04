import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '@/components/HomeScreen/HomeScreen';

describe('HomeScreen', () => {
  it('should render without crashing', () => {
    render(<HomeScreen />);
  });

  it('should display app title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('ReciclaMuz')).toBeTruthy();
  });

  it('should display subtitle', () => {
    render(<HomeScreen />);
    expect(
      screen.getByText('Pontos de coleta de lixo em Muzambinho')
    ).toBeTruthy();
  });

  it('should display project objective section', () => {
    render(<HomeScreen />);
    expect(screen.getByText('🎯 Objetivo do Projeto')).toBeTruthy();
  });

  it('should display target audience section', () => {
    render(<HomeScreen />);
    expect(screen.getByText('👥 Público-Alvo')).toBeTruthy();
  });

  it('should display main features section', () => {
    render(<HomeScreen />);
    expect(screen.getByText('⚡ Principais Funcionalidades')).toBeTruthy();
  });

  it('should display development team section', () => {
    render(<HomeScreen />);
    expect(screen.getByText('👨‍💻 Equipe de Desenvolvimento')).toBeTruthy();
  });

  it('should display team members', () => {
    render(<HomeScreen />);
    expect(screen.getByText(/Anderson Henrique da Silva/)).toBeTruthy();
    expect(screen.getByText(/Leonardo Jacon dos Reis/)).toBeTruthy();
    expect(screen.getByText(/Lurian Letícia dos Reis/)).toBeTruthy();
  });

  it('should display footer message', () => {
    render(<HomeScreen />);
    expect(
      screen.getByText(/Desenvolvido para uma Muzambinho mais sustentável/)
    ).toBeTruthy();
  });

  it('should display all feature items', () => {
    render(<HomeScreen />);

    // Check for feature texts
    expect(screen.getByText(/Sistema de Login/)).toBeTruthy();
    expect(screen.getByText(/Mapa Interativo/)).toBeTruthy();
    expect(screen.getByText(/Categorização de Resíduos/)).toBeTruthy();
    expect(screen.getByText(/Interface Intuitiva/)).toBeTruthy();
    expect(screen.getByText(/Sistema de Avaliações/)).toBeTruthy();
    expect(screen.getByText(/Painel Administrativo/)).toBeTruthy();
  });

  it('should display target audience items', () => {
    render(<HomeScreen />);

    expect(screen.getByText(/Moradores da cidade de Muzambinho/)).toBeTruthy();
    expect(screen.getByText(/Visitantes e turistas/)).toBeTruthy();
    expect(screen.getByText(/Empresas e estabelecimentos comerciais/)).toBeTruthy();
  });
});
