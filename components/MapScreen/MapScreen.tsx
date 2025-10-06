import { Text } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from './MapScreen.styles';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      />
      
      <View style={styles.infoOverlay}>
        <Text style={styles.cityName}>📍 {city.name}</Text>
        <Text style={styles.coordinates}>
          {city.latitude.toFixed(6)}, {city.longitude.toFixed(6)}
        </Text>
      </View>
    </View>
  );
}


