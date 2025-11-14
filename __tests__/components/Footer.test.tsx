import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Wrapper com ThemeProvider para testes
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Footer Component', () => {
  it('deve renderizar corretamente', () => {
    const { getByText } = renderWithTheme(<Footer />);

    expect(getByText('ReciclaMuz')).toBeTruthy();
    expect(getByText('Projeto Acadêmico - IFSULDEMINAS')).toBeTruthy();
    expect(getByText('Sobre')).toBeTruthy();
  });

  it('deve exibir copyright com ano atual', () => {
    const { getByText } = renderWithTheme(<Footer />);
    const currentYear = new Date().getFullYear();

    expect(
      getByText(`© ${currentYear} ReciclaMuz. Desenvolvido para fins acadêmicos.`)
    ).toBeTruthy();
  });

  it('deve chamar onAboutPress quando botão Sobre é clicado', () => {
    const mockOnAboutPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Footer onAboutPress={mockOnAboutPress} />
    );

    const aboutButton = getByText('Sobre');
    fireEvent.press(aboutButton);

    expect(mockOnAboutPress).toHaveBeenCalledTimes(1);
  });

  it('deve ter acessibilidade configurada no botão Sobre', () => {
    const { getByLabelText } = renderWithTheme(<Footer />);

    const aboutButton = getByLabelText('Mais informações sobre o projeto');
    expect(aboutButton).toBeTruthy();
  });

  it('deve renderizar logo da instituição', () => {
    const { getByRole } = renderWithTheme(<Footer />);

    // Verifica se a imagem está presente
    const logo = getByRole('image');
    expect(logo).toBeTruthy();
  });
});
