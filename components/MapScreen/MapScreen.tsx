import { Text } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { styles } from './MapScreen.styles';
import { CollectionPointsStorage, CollectionPoint, WasteTypeUtils } from '@/services';
import { runCollectionPointsExample } from '@/services/examples/CollectionPointsExample';

interface City {
  name: string;
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapScreenProps {
  city?: City;
}

const MUZAMBINHO_CITY: City = {
  name: 'Muzambinho, Minas Gerais, Brasil',
  latitude: -21.3761,
  longitude: -46.5253,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function MapScreen({ city = MUZAMBINHO_CITY }: MapScreenProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadCollectionPoints = async () => {
      try {
        setLoading(true);
        const storage = CollectionPointsStorage.getInstance();
        const points = await storage.getAll();
        
        // Se não há pontos, criar alguns de exemplo
        if (points.length === 0) {
          await runCollectionPointsExample();
          const newPoints = await storage.getAll();
          setCollectionPoints(newPoints);
        } else {
          setCollectionPoints(points);
        }
      } catch (err) {
        console.error('Erro ao carregar pontos de coleta:', err);
        setError('Erro ao carregar pontos de coleta');
      } finally {
        setLoading(false);
      }
    };

    loadCollectionPoints();
  }, []);

  const handleViewPoint = (pointId: string) => {
    router.push(`/collection-point/${pointId}` as any);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>⚠️ Erro ao carregar mapa</Text>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.fallbackInfo}>
          <Text style={styles.fallbackTitle}>📍 {city.name}</Text>
          <Text style={styles.fallbackCoords}>
            {city.latitude.toFixed(6)}, {city.longitude.toFixed(6)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: city.latitude,
          longitude: city.longitude,
          latitudeDelta: city.latitudeDelta,
          longitudeDelta: city.longitudeDelta,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
      >
        {collectionPoints.map((point) => (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.coordinates.latitude,
                longitude: point.coordinates.longitude,
              }}
              pinColor="green"
              title={point.name}
              description={`🔍 Toque para ver mais detalhes`}
              onCalloutPress={() => handleViewPoint(point.id)}
            />
        ))}
      </MapView>
      
      <View style={styles.infoOverlay}>
        <Text style={styles.cityName}>📍 {city.name}</Text>
        <Text style={styles.coordinates}>
          {city.latitude.toFixed(6)}, {city.longitude.toFixed(6)}
        </Text>
        <Text style={styles.pointsCount}>
          {collectionPoints.length} pontos de coleta
        </Text>
      </View>
    </View>
  );
}


