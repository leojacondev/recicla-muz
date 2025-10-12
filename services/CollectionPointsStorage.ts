import { GenericStorage } from './GenericStorage';
import {
  CollectionPoint,
  CreateCollectionPointData,
  UpdateCollectionPointData,
  WasteType,
  CollectionPointStatus,
  Rating
} from './types/CollectionPoint';


export class CollectionPointsStorage extends GenericStorage<CollectionPoint> {
  private static instance: CollectionPointsStorage;
  private static readonly STORAGE_KEY = '@reciclamuz:collection_points';

  constructor() {
    super(CollectionPointsStorage.STORAGE_KEY);
  }

  static getInstance(): CollectionPointsStorage {
    if (!CollectionPointsStorage.instance) {
      CollectionPointsStorage.instance = new CollectionPointsStorage();
    }
    return CollectionPointsStorage.instance;
  }


  async createCollectionPoint(data: CreateCollectionPointData): Promise<CollectionPoint | null> {
    try {
      const now = new Date().toISOString();
      const id = this.generateId();

      const collectionPoint: CollectionPoint = {
        id,
        name: data.name,
        description: data.description,
        address: data.address,
        coordinates: data.coordinates,
        wasteTypes: data.wasteTypes,
        status: CollectionPointStatus.ACTIVE,
        operatingHours: data.operatingHours || [],
        contactInfo: data.contactInfo,
        lastUpdated: now,
        createdAt: now,
        imageUrl: data.imageUrl,
        ratings: [],
        averageRating: 0,
      };

      const success = await this.save(collectionPoint);
      return success ? collectionPoint : null;
    } catch (error) {
      console.error('Erro ao criar ponto de coleta:', error);
      return null;
    }
  }


  async updateCollectionPoint(id: string, data: UpdateCollectionPointData): Promise<CollectionPoint | null> {
    try {
      const existingPoints = await this.findWhere(point => point.id === id);
      if (existingPoints.length === 0) {
        return null;
      }
      
      const existingPoint = existingPoints[0];
      const updatedPoint: CollectionPoint = {
        ...existingPoint,
        ...data,
        lastUpdated: new Date().toISOString(),
      };

      if (updatedPoint.ratings.length > 0) {
        updatedPoint.averageRating = this.calculateAverageRating(updatedPoint.ratings);
      }

      const success = await this.save(updatedPoint);
      return success ? updatedPoint : null;
    } catch (error) {
      console.error('Erro ao atualizar ponto de coleta:', error);
      return null;
    }
  }


  async findByWasteType(wasteType: WasteType): Promise<CollectionPoint[]> {
    return this.findWhere(point => point.wasteTypes.includes(wasteType));
  }


  async findActive(): Promise<CollectionPoint[]> {
    return this.findWhere(point => point.status === CollectionPointStatus.ACTIVE);
  }


  async addRating(pointId: string, rating: Omit<Rating, 'date'>): Promise<boolean> {
    try {
      const point = await this.getById(pointId);
      if (!point) {
        return false;
      }

      const newRating: Rating = {
        ...rating,
        date: new Date().toISOString()
      };

      point.ratings = point.ratings.filter((r: Rating) => r.userId !== rating.userId);
      point.ratings.push(newRating);

      point.averageRating = this.calculateAverageRating(point.ratings);
      point.lastUpdated = new Date().toISOString();

      return await this.save(point);
    } catch (error) {
      console.error('Erro ao adicionar avaliação:', error);
      return false;
    }
  }


  async updateStatus(pointId: string, status: CollectionPointStatus): Promise<boolean> {
    try {
      const point = await this.getById(pointId);
      if (!point) {
        return false;
      }

      point.status = status;
      point.lastUpdated = new Date().toISOString();

      return await this.save(point);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return false;
    }
  }



  async getStatistics() {
    try {
      const points = await this.getAll();
      const totalPoints = points.length;
      const activePoints = points.filter(p => p.status === CollectionPointStatus.ACTIVE).length;
      
      const wasteTypeStats = Object.values(WasteType).map(wasteType => ({
        type: wasteType,
        count: points.filter(p => p.wasteTypes.includes(wasteType)).length
      }));

      const averageRating = points.length > 0
        ? points.reduce((sum, p) => sum + p.averageRating, 0) / points.length
        : 0;

      return {
        totalPoints,
        activePoints,
        wasteTypeStats,
        averageRating: Math.round(averageRating * 100) / 100
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      return {
        totalPoints: 0,
        activePoints: 0,
        verifiedPoints: 0,
        wasteTypeStats: [],
        averageRating: 0
      };
    }
  }


  private generateId(): string {
    return `cp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }


  private calculateAverageRating(ratings: Rating[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return Math.round((sum / ratings.length) * 100) / 100;
  }

}
