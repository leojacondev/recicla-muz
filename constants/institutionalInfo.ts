import { InstitutionalInfo } from '@/types/institutional';

/**
 * Informações institucionais do projeto ReciclaMuz
 *
 * INSTRUÇÕES PARA ADICIONAR IMAGENS:
 * 1. Coloque a logo do IFSULDEMINAS em: /assets/images/ifsuldeminas-logo.png
 * 2. Coloque as fotos da equipe em: /assets/images/team/
 *    - anderson.jpg
 *    - leonardo.jpg
 *    - lurian.jpg
 * 3. Descomente as linhas de imagens abaixo
 */

export const INSTITUTIONAL_INFO: InstitutionalInfo = {
  projectName: 'ReciclaMuz',
  projectType: 'academic',

  institution: {
    name: 'IFSULDEMINAS',
    fullName: 'Instituto Federal de Educação, Ciência e Tecnologia do Sul de Minas Gerais',
    logo: require('@/assets/images/ifsuldeminas-logo.png'),
    website: 'https://portal.ifsuldeminas.edu.br',
  },

  course: {
    name: 'Técnico em Informática para Internet',
    department: 'Departamento de Tecnologia da Informação',
  },

  supervisor: {
    name: 'Hudson de Jesus Ferreira Junior',
    title: 'Prof.',
    department: 'Ciência da Computação',
  },

  team: [
    {
      id: '1',
      name: 'Lurian Letícia dos Reis',
      role: 'leader',
      // photo: require('@/assets/images/team/lurian.jpg'), // Descomente após adicionar a foto
    },
    {
      id: '2',
      name: 'Anderson Henrique da Silva',
      role: 'developer',
      photo: require('@/assets/images/team/anderson.jpeg'),
    },
    {
      id: '3',
      name: 'Leonardo Jacon dos Reis',
      role: 'developer',
      // photo: require('@/assets/images/team/leonardo.jpg'), // Descomente após adicionar a foto
    },
  ],

  academicYear: '2025',
  version: '1.0.0',
};
