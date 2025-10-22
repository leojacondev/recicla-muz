import { StorableEntity } from '../GenericStorage';


export enum WasteType {
  PLASTIC = 'plastic',
  PAPER = 'paper',
  GLASS = 'glass',
  METAL = 'metal',
  ORGANIC = 'organic'
}


export enum CollectionPointStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance'
}


export interface OperatingHours {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  responsiblePerson?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Rating {
  userId: string;
  rating: number;
  comment?: string;
  date: string;
}


export interface CollectionPoint extends StorableEntity {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: Coordinates;
  wasteTypes: WasteType[];
  status: CollectionPointStatus;
  operatingHours: OperatingHours[];
  contactInfo?: ContactInfo;
  lastUpdated: string;  
  createdAt: string;  
  imageUrl?: string;
  ratings: Rating[];
  averageRating: number;  
}


export interface CreateCollectionPointData {
  name: string;
  description: string;
  address: string;
  coordinates: Coordinates;
  wasteTypes: WasteType[];
  operatingHours?: OperatingHours[];
  contactInfo?: ContactInfo;
  imageUrl?: string;
}

export interface UpdateCollectionPointData {
  name?: string;
  description?: string;
  address?: string;
  coordinates?: Coordinates;
  wasteTypes?: WasteType[];
  status?: CollectionPointStatus;
  operatingHours?: OperatingHours[];
  contactInfo?: ContactInfo;  
  imageUrl?: string;
}

export interface CollectionPointFilters {
  wasteTypes?: WasteType[];
  status?: CollectionPointStatus[];
  isVerified?: boolean;
  minRating?: number;
  maxDistance?: number;
  userLocation?: Coordinates;
}


export const WasteTypeUtils = {

  getEmoji(wasteType: WasteType): string {
    const emojiMap: Record<WasteType, string> = {
      [WasteType.PLASTIC]: '♻️',
      [WasteType.PAPER]: '📄',
      [WasteType.GLASS]: '🍶',
      [WasteType.METAL]: '🥫',
      [WasteType.ORGANIC]: '🍃',
    };
    return emojiMap[wasteType] || '♻️';
  },


  getDisplayName(wasteType: WasteType): string {
    const nameMap: Record<WasteType, string> = {
      [WasteType.PLASTIC]: 'Plástico',
      [WasteType.PAPER]: 'Papel',
      [WasteType.GLASS]: 'Vidro',
      [WasteType.METAL]: 'Metal',
      [WasteType.ORGANIC]: 'Orgânico',
    };
    return nameMap[wasteType] || wasteType;
  },


  getColor(wasteType: WasteType): string {
    const colorMap: Record<WasteType, string> = {
      [WasteType.PLASTIC]: '#FF6B35',
      [WasteType.PAPER]: '#4A90E2',
      [WasteType.GLASS]: '#50C878',
      [WasteType.METAL]: '#FFD700',
      [WasteType.ORGANIC]: '#8B4513',
    };
    return colorMap[wasteType] || '#4CAF50';
  }
};


export const CollectionPointStatusUtils = {

  getDisplayName(status: CollectionPointStatus): string {
    const nameMap: Record<CollectionPointStatus, string> = {
      [CollectionPointStatus.ACTIVE]: 'Ativo',
      [CollectionPointStatus.INACTIVE]: 'Inativo',
      [CollectionPointStatus.MAINTENANCE]: 'Manutenção',
    };
    return nameMap[status] || status;
  },


  getColor(status: CollectionPointStatus): string {
    const colorMap: Record<CollectionPointStatus, string> = {
      [CollectionPointStatus.ACTIVE]: '#4CAF50',
      [CollectionPointStatus.INACTIVE]: '#9E9E9E',
      [CollectionPointStatus.MAINTENANCE]: '#FF9800',
    };
    return colorMap[status] || '#4CAF50';
  }
};
