import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorableEntity {
  id: string;
}

export class GenericStorage<T extends StorableEntity> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  async getAll(): Promise<T[]> {
    try {
      const data = await AsyncStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Erro ao buscar dados de ${this.storageKey}:`, error);
      return [];
    }
  }

  async save(item: T): Promise<boolean> {
    try {
      const items = await this.getAll();
      const existingIndex = items.findIndex(existing => existing.id === item.id);

      if (existingIndex >= 0) {
        items[existingIndex] = item;
      } else {
        items.push(item);
      }

      await AsyncStorage.setItem(this.storageKey, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error(`Erro ao salvar item em ${this.storageKey}:`, error);
      return false;
    }
  }

  async saveAll(items: T[]): Promise<boolean> {
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error(`Erro ao salvar itens em ${this.storageKey}:`, error);
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const items = await this.getAll();
      const filteredItems = items.filter(item => item.id !== id);
      
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
      return true;
    } catch (error) {
      console.error(`Erro ao remover item ${id} de ${this.storageKey}:`, error);
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error(`Erro ao limpar ${this.storageKey}:`, error);
      return false;
    }
  }

  async findWhere(predicate: (item: T) => boolean): Promise<T[]> {
    try {
      const items = await this.getAll();
      return items.filter(predicate);
    } catch (error) {
      console.error(`Erro ao buscar itens com condição em ${this.storageKey}:`, error);
      return [];
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const items = await this.getAll();
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error(`Erro ao buscar item ${id} de ${this.storageKey}:`, error);
      return null;
    }
  }

}
