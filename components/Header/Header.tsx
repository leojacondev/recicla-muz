import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user, isAuthenticated, signOut } = useAuth();

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

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
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

          {isAuthenticated && user?.avatar && (
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Image
                source={{ uri: user.avatar }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: isDark ? '#fff' : '#2e7d32',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
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

              {isAuthenticated ? (
                <>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress('/profile')}
                  >
                    <Ionicons name="person-outline" size={24} color={isDark ? '#fff' : '#2e7d32'} />
                    <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Perfil</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={async () => {
                      setMenuVisible(false);
                      await signOut();
                      router.replace('/login');
                    }}
                  >
                    <Ionicons name="log-out-outline" size={24} color={isDark ? '#fff' : '#e74c3c'} />
                    <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark, { color: '#e74c3c' }]}>
                      Sair
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress('/login')}
                >
                  <Ionicons name="log-in-outline" size={24} color={isDark ? '#fff' : '#2e7d32'} />
                  <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Entrar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
