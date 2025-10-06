import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './Header.styles';

interface HeaderProps {
  onToggleTheme?: () => void;
}

export default function Header({ onToggleTheme }: HeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const handleMenuItemPress = (route: string) => {
    setMenuVisible(false);
    
    if (pathname === route) {
      return;
    }
    
    router.push(route as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={isDark ? '#fff' : '#2e7d32'} />
        </TouchableOpacity>

        <Text style={[styles.title, isDark && styles.titleDark]}>ReciclaMuz</Text>

        <TouchableOpacity
          onPress={onToggleTheme}
          style={styles.themeButton}
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={24}
            color={isDark ? '#fff' : '#2e7d32'}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={[styles.menuContainer, isDark && styles.menuContainerDark, { paddingTop: insets.top + 20 }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Ionicons name="close" size={28} color={isDark ? '#fff' : '#2e7d32'} />
            </TouchableOpacity>

            <View style={styles.menuItems}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => handleMenuItemPress('/')}
              >
                <Ionicons name="home-outline" size={24} color={isDark ? '#fff' : '#2e7d32'} />
                <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Início</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => handleMenuItemPress('/map')}
              >
                <Ionicons name="map-outline" size={24} color={isDark ? '#fff' : '#2e7d32'} />
                <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Mapa</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="location-outline" size={24} color={isDark ? '#fff' : '#2e7d32'} />
                <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Pontos de Coleta</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="person-outline" size={24} color={isDark ? '#fff' : '#2e7d32'} />
                <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
