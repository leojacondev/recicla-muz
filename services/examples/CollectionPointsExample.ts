import { CollectionPointsStorage } from '../CollectionPointsStorage';
import { WasteType, CollectionPointStatus } from '../types/CollectionPoint';


export class CollectionPointsExample {
  private storage: CollectionPointsStorage;

  constructor() {
    this.storage = CollectionPointsStorage.getInstance();
  }


  async createSampleData() {
    console.log('🔄 Criando dados de exemplo...');


    const point1 = await this.storage.createCollectionPoint({
      name: 'Praça Central - Coleta Seletiva',
      description: 'Ponto de coleta seletiva localizado na praça central da cidade, próximo à prefeitura.',
      address: 'Praça Central, Centro, Muzambinho - MG',
      coordinates: {
        latitude: -21.3761,
        longitude: -46.5253
      },
      wasteTypes: [WasteType.PLASTIC, WasteType.PAPER, WasteType.GLASS, WasteType.METAL],
      operatingHours: [
        { dayOfWeek: 1, openTime: '08:00', closeTime: '17:00'    }, // Segunda
        { dayOfWeek: 2, openTime: '08:00', closeTime: '17:00' }, // Terça
        { dayOfWeek: 3, openTime: '08:00', closeTime: '17:00' }, // Quarta
        { dayOfWeek: 4, openTime: '08:00', closeTime: '17:00' }, // Quinta
        { dayOfWeek: 5, openTime: '08:00', closeTime: '17:00' }, // Sexta
        { dayOfWeek: 6, openTime: '08:00', closeTime: '12:00' }, // Sábado
        { dayOfWeek: 0, openTime: '00:00', closeTime: '00:00' } // Domingo
      ],
      contactInfo: {
        phone: '(35) 3571-1234',
        email: 'coleta@muzambinho.mg.gov.br',
        responsiblePerson: 'Secretaria de Meio Ambiente'
      },
    });

    const point2 = await this.storage.createCollectionPoint({
      name: 'Escola Municipal João Silva',
      description: 'Ponto de coleta educativo na escola municipal, usado para ensinar sustentabilidade.',
      address: 'Rua das Flores, 123, Bairro Educação, Muzambinho - MG',
      coordinates: {
        latitude: -21.3751,
        longitude: -46.5243
      },
    wasteTypes: [WasteType.PLASTIC, WasteType.PAPER],
      operatingHours: [
        { dayOfWeek: 1, openTime: '07:00', closeTime: '17:00' },
        { dayOfWeek: 2, openTime: '07:00', closeTime: '17:00' },
        { dayOfWeek: 3, openTime: '07:00', closeTime: '17:00' },
        { dayOfWeek: 4, openTime: '07:00', closeTime: '17:00' },
        { dayOfWeek: 5, openTime: '07:00', closeTime: '17:00' }
      ],
      contactInfo: {
        phone: '(35) 3571-5678',
        email: 'escola.joaosilva@educacao.mg.gov.br',
        responsiblePerson: 'Diretor João Santos'
      },
    });

    const point3 = await this.storage.createCollectionPoint({
      name: 'Supermercado Verde - Coleta de Óleo',
      description: 'Ponto especializado em coleta de óleo de cozinha usado.',
      address: 'Av. Principal, 456, Centro, Muzambinho - MG',
      coordinates: {
        latitude: -21.3771,
        longitude: -46.5263
      },
      wasteTypes: [WasteType.PLASTIC],
      operatingHours: [
        { dayOfWeek: 1, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 2, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 3, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 4, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 5, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 6, openTime: '08:00', closeTime: '18:00' },
        { dayOfWeek: 0, openTime: '09:00', closeTime: '17:00' }
      ],
      contactInfo: {
        phone: '(35) 3571-9999',
        email: 'contato@supermercadoverde.com.br',
        responsiblePerson: 'Gerente Maria Silva'
      },
    });

    const point4 = await this.storage.createCollectionPoint({
      name: 'Posto de Saúde - Descarte Seguro',
      description: 'Coleta de medicamentos vencidos e materiais hospitalares.',
      address: 'Rua da Saúde, 789, Bairro Saúde, Muzambinho - MG',
      coordinates: {
        latitude: -21.3741,
        longitude: -46.5233
      },
      wasteTypes: [WasteType.ORGANIC],
      operatingHours: [
        { dayOfWeek: 1, openTime: '07:00', closeTime: '16:00' },
        { dayOfWeek: 2, openTime: '07:00', closeTime: '16:00' },
        { dayOfWeek: 3, openTime: '07:00', closeTime: '16:00' },
        { dayOfWeek: 4, openTime: '07:00', closeTime: '16:00' },
        { dayOfWeek: 5, openTime: '07:00', closeTime: '16:00' }
      ],
      contactInfo: {
        phone: '(35) 3571-2222',
        email: 'saude@muzambinho.mg.gov.br',
        responsiblePerson: 'Enfermeira Ana Costa'
      },
    });

    console.log('✅ Dados de exemplo criados com sucesso!');
    return [point1, point2, point3, point4];
  }


  async addRatingExample() {
    console.log('\n⭐ Adicionando avaliação...');

    const points = await this.storage.getAll(); 
    if (points.length === 0) return;

    const firstPoint = points[0];

    await this.storage.addRating(firstPoint.id, {
      userId: 'user1',
      rating: 5,
      comment: 'Excelente ponto de coleta! Muito bem organizado.'
    });

    await this.storage.addRating(firstPoint.id, {
      userId: 'user2',
      rating: 4,
      comment: 'Bom local, mas poderia ter mais sinalização.'
    });

    await this.storage.addRating(firstPoint.id, {
      userId: 'user3',
      rating: 5,
      comment: 'Perfeito! Fácil acesso e sempre limpo.'
    });

    const updatedPoint = await this.storage.getById(firstPoint.id);
    console.log(`📈 Avaliação média do ponto "${firstPoint.name}": ${updatedPoint?.averageRating}/5`);
    console.log(`💬 Total de avaliações: ${updatedPoint?.ratings.length}`);
  }


  async updateStatusExample() {
    console.log('\n🔄 Atualizando status...');

    const points = await this.storage.getAll();
    if (points.length === 0) return;

    const firstPoint = points[0];

    await this.storage.updateStatus(firstPoint.id, CollectionPointStatus.MAINTENANCE);
    console.log(`🔧 Status atualizado para manutenção`);


    await this.storage.updateCollectionPoint(firstPoint.id, {
      contactInfo: {
        phone: '(35) 3571-1234',
        email: 'coleta@muzambinho.mg.gov.br',
        responsiblePerson: 'Secretaria de Meio Ambiente'
      }
    });
    console.log(`📝 Informações atualizadas`);
  }


  async getStatisticsExample() {
    console.log('\n📊 Demonstrando estatísticas...');

    const stats = await this.storage.getStatistics();
    console.log('Estatísticas dos pontos de coleta:');
    console.log(`- Total de pontos: ${stats.totalPoints}`);
    console.log(`- Pontos ativos: ${stats.activePoints}`);
    console.log(`- Avaliação média geral: ${stats.averageRating}/5`);
    
    console.log('\nTipos de resíduo mais comuns:');
    stats.wasteTypeStats
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .forEach(stat => {
        console.log(`- ${stat.type}: ${stat.count} pontos`);
      });
  }


  async runAllExamples() {
    console.log('🚀 Iniciando população do CollectionPointsStorage\n');

    try {

      await this.storage.clear();
      

      await this.createSampleData();
      
      await this.addRatingExample();
      await this.updateStatusExample();
      
      console.log('\n🎉 População concluída com sucesso!');
    } catch (error) {
      console.error('❌ Erro durante a população:', error);
    }
  }
}


export const runCollectionPointsExample = async () => {
  const example = new CollectionPointsExample();
  await example.runAllExamples();
};
