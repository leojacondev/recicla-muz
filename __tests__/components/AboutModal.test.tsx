import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AboutModal } from '@/components/AboutModal';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { InstitutionalInfo } from '@/types/institutional';

const mockInstitutionalInfo: InstitutionalInfo = {
  projectName: 'ReciclaMuz Test',
  projectType: 'academic',
  institution: {
    name: 'IFSULDEMINAS',
    fullName: 'Instituto Federal do Sul de Minas Gerais',
    website: 'https://ifsuldeminas.edu.br',
  },
  course: {
    name: 'Técnico em Informática',
    department: 'TI',
  },
  supervisor: {
    name: 'Prof. João Silva',
    title: 'Prof. Dr.',
    department: 'Departamento de TI',
  },
  team: [
    {
      id: '1',
      name: 'Desenvolvedor 1',
      role: 'leader',
    },
    {
      id: '2',
      name: 'Desenvolvedor 2',
      role: 'developer',
    },
  ],
  academicYear: '2025',
  version: '1.0.0',
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('AboutModal Component', () => {
  it('deve renderizar quando visible é true', () => {
    const { getByText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    expect(getByText('Sobre o Projeto')).toBeTruthy();
  });

  it('deve exibir informações do projeto', () => {
    const { getByText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    expect(getByText('ReciclaMuz Test')).toBeTruthy();
    expect(getByText('Projeto Acadêmico')).toBeTruthy();
    expect(getByText('Ano Letivo: 2025')).toBeTruthy();
  });

  it('deve exibir informações da instituição', () => {
    const { getByText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    expect(getByText('Instituto Federal do Sul de Minas Gerais')).toBeTruthy();
  });

  it('deve exibir informações do curso', () => {
    const { getByText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    expect(getByText('Técnico em Informática')).toBeTruthy();
    expect(getByText('TI')).toBeTruthy();
  });

  it('deve exibir informações do orientador', () => {
    const { getByText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    expect(getByText('Prof. Dr. Prof. João Silva')).toBeTruthy();
  });

  it('deve exibir membros da equipe com funções corretas', () => {
    const { getByText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    expect(getByText('Desenvolvedor 1')).toBeTruthy();
    expect(getByText('Líder do Projeto')).toBeTruthy();
    expect(getByText('Desenvolvedor 2')).toBeTruthy();
    expect(getByText('Desenvolvedor')).toBeTruthy();
  });

  it('deve exibir versão do aplicativo', () => {
    const { getByText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    expect(getByText('Versão 1.0.0')).toBeTruthy();
  });

  it('deve chamar onClose quando botão fechar é clicado', () => {
    const mockOnClose = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={mockOnClose}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    const closeButton = getByLabelText('Fechar');
    fireEvent.press(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve ter acessibilidade configurada no botão fechar', () => {
    const { getByLabelText } = renderWithTheme(
      <AboutModal
        visible={true}
        onClose={() => {}}
        institutionalInfo={mockInstitutionalInfo}
      />
    );

    const closeButton = getByLabelText('Fechar');
    expect(closeButton).toBeTruthy();
  });
});
