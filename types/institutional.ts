/**
 * Tipos para informações institucionais exibidas no rodapé
 */

export interface TeamMember {
  id: string;
  name: string;
  role: 'leader' | 'developer';
  photo?: string; // Caminho para foto do membro (ex: require('@/assets/images/team/anderson.jpg'))
}

export interface InstitutionalInfo {
  projectName: string;
  projectType: 'academic' | 'commercial' | 'research';
  institution: {
    name: string;
    fullName: string;
    logo?: string; // Caminho para logo (ex: require('@/assets/images/ifsuldeminas-logo.png'))
    website?: string;
  };
  course?: {
    name: string;
    department?: string;
  };
  supervisor?: {
    name: string;
    title?: string; // Ex: "Prof. Dr.", "Mestre"
    department?: string;
  };
  team: TeamMember[];
  academicYear?: string;
  version?: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href?: string;
  onPress?: () => void;
}
