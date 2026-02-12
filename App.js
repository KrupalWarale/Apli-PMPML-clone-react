import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PassScreen from './PassScreen';
import DailyPassScreen from './DailyPassScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import FAQScreen from './FAQScreen';
import BusesScreen from './BusesScreen';
import TicketsScreen from './TicketsScreen';
import AllPassesScreen from './AllPassesScreen';
import ViewTicketScreen from './ViewTicketScreen';
import BusTicketScreen from './BusTicketScreen';
import BottomFooter from './BottomFooter';


const { width } = Dimensions.get('window');

const AppContent = () => {
  const insets = useSafeAreaInsets();
  const [currentScreen, setCurrentScreen] = useState('HOME');

  useEffect(() => {
    const backAction = () => {
      if (currentScreen !== 'HOME') {
        setCurrentScreen('HOME');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'PASS':
        return <PassScreen onNavigate={setCurrentScreen} />;
      case 'DAILY_PASS':
        return <DailyPassScreen onNavigate={setCurrentScreen} />;
      case 'PROFILE':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      case 'NOTIFICATIONS':
        return <NotificationScreen onNavigate={setCurrentScreen} />;
      case 'FAQ':
        return <FAQScreen onNavigate={setCurrentScreen} />;
      case 'BUSES':
        return <BusesScreen onNavigate={setCurrentScreen} />;
      case 'TICKETS':
        return <TicketsScreen onNavigate={setCurrentScreen} />;
      case 'ALL_PASSES':
        return <AllPassesScreen onNavigate={setCurrentScreen} />;
      case 'VIEW_TICKET':
        return <ViewTicketScreen onNavigate={setCurrentScreen} />;
      case 'BUS_TICKET':
        return <BusTicketScreen onNavigate={setCurrentScreen} />;
      default:
        return null;
    }
  };

  if (currentScreen !== 'HOME') {
    return renderScreen();
  }

  return (
    <View style={styles.container}>
      {/* Sky Blue Status Bar wrapping the top area */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

      {/* Gap between status bar and header */}
      <View style={styles.topGap} />

      {/* Header (Navbar) - Precise Reduced Height */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setCurrentScreen('NOTIFICATIONS')}>
            <Ionicons name="notifications" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setCurrentScreen('PROFILE')}>
            <Ionicons name="person-circle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar Container */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="कुठे जायचे आहे?"
              placeholderTextColor="#2c2c2c"
            />
          </View>
        </View>

        <View style={styles.mainServices}>
          <TouchableOpacity style={styles.mainCard} onPress={() => setCurrentScreen('BUS_TICKET')}>
            <View style={styles.cardIconWrapper}>
              <Image source={require('./assets/busTicketLogo.png')} style={styles.ticketImage} resizeMode="contain" />
            </View>
            <Text style={styles.cardLabel}>Bus Ticket</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainCard} onPress={() => setCurrentScreen('DAILY_PASS')}>
            <View style={styles.cardIconWrapper}>
              <Image source={require('./assets/DailyPassLogo.png')} style={styles.passImage} resizeMode="contain" />
            </View>
            <Text style={styles.cardLabel}>Daily Pass</Text>
          </TouchableOpacity>
        </View>

        {/* Small Service Cards */}
        <View style={styles.smallServicesRow}>
          <TouchableOpacity style={styles.smallCard} onPress={() => setCurrentScreen('VIEW_TICKET')}>
            <View style={styles.smallCardIconBox}>
              <Image source={require('./assets/ticketLogo.png')} style={styles.smallCardIcon} resizeMode="contain" />
            </View>
            <Text style={styles.smallCardLabel}>View{'\n'}Ticket</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard} onPress={() => setCurrentScreen('PASS')}>
            <View style={styles.smallCardIconBox}>
              <Image source={require('./assets/ticketLogo.png')} style={styles.smallCardIcon} resizeMode="contain" />
            </View>
            <Text style={styles.smallCardLabel}>View{'\n'}Pass</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.smallCard}>
            <View style={styles.smallCardIconBox}>
              <Image source={require('./assets/routeTT.png')} style={styles.routeIconImage} resizeMode="contain" />
            </View>
            <Text style={styles.smallCardLabel}>Route Ti{'\n'}metable</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <View style={styles.smallCardIconBox}>
              <Image source={require('./assets/metroLogo.png')} style={[styles.smallCardIcon, { width: 40, height: 40 }]} resizeMode="contain" />
            </View>
            <Text style={styles.smallCardLabel}>Metro{'\n'}Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Near Me Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Near Me</Text>
          <TouchableOpacity>
            <Text style={styles.showAllText}>Show all</Text>
          </TouchableOpacity>
        </View>

        {/* REFINED BUS CARD LAYOUT - TIGHTER AND COMPACT */}
        <View style={styles.nearMeCard}>
          {/* Top Section - Subtle Gray */}
          <View style={styles.nearMeTopSection}>
            <View style={styles.busIconCircle}>
              <Ionicons name="bus" size={12} color="white" />
            </View>
            <View style={styles.nearMeInfo}>
              <Text style={styles.busStopName} numberOfLines={2}>
                Mahadev Nagar Manjari Bus Stop
              </Text>
            </View>
            <View style={styles.nearMeRightInfo}>
              <Text style={styles.distanceText}>106 m</Text>
              <TouchableOpacity style={styles.directionsIconBox}>
                <MaterialIcons name="directions" size={12} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Middle Section - White */}
          <View style={styles.nearMeMiddleSection}>
            <Text style={styles.noBusesText}>No upcoming buses at this stop.</Text>
          </View>

          {/* Bottom Section - Subtle Gray */}
          <View style={styles.nearMeBottomSection}>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See More Buses</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.nearbyHeader}>
          <Text style={styles.nearbyTitle}>Nearby</Text>
        </View>

        <View style={styles.mapFrame}>
          <Image
            source={require('./assets/map.jpeg')}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>

        {/* Bottom Image */}
        <View style={styles.pageEndContainer}>
          <Image
            source={require('./assets/pageEnd.jpeg')}
            style={styles.pageEndImage}
            resizeMode="contain"
          />
        </View>

      </ScrollView>

      {/* Bottom Navigation (Footer) */}
      <BottomFooter currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </View>
  );
};

const App = () => (
  <SafeAreaProvider>
    <AppContent />
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarBackground: {
    width: '100%',
    backgroundColor: '#24b6ac',
  },
  topGap: {
    height: 10,
    backgroundColor: '#fff',
  },
  header: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 3,
  },
  logo: {
    width: 38,
    height: 38,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 50,
    backgroundColor: '#efefef',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  mainServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 5,
  },
  mainCard: {
    width: (width - 45) / 2,
    alignItems: 'center',
  },
  cardIconWrapper: {
    width: '100%',
    height: 85,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketImage: {
    width: 36,
    height: 36,
  },
  passImage: {
    width: 36,
    height: 36,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  smallServicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  smallCard: {
    width: (width - 64) / 4,
    alignItems: 'center',
  },
  smallCardIconBox: {
    width: 68,
    height: 68,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  smallCardIcon: {
    width: 28,
    height: 28,
  },
  routeIconImage: {
    width: 28,
    height: 28,
  },
  smallCardLabel: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    lineHeight: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '810',
    color: '#000',
  },
  showAllText: {
    fontSize: 14,
    color: '#333',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  nearMeCard: {
    marginHorizontal: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  nearMeTopSection: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  busIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nearMeInfo: {
    flex: 1,
  },
  busStopName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c2c2c',
    lineHeight: 22,
  },
  nearMeRightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  distanceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2c2c2c',
    marginRight: 8,
  },
  directionsIconBox: {
    width: 12, // From user diff 
    height: 12,
    backgroundColor: '#ff5252',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  nearMeMiddleSection: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  noBusesText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444',
  },
  nearMeBottomSection: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  nearbyHeader: {
    paddingHorizontal: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  nearbyTitle: {
    fontSize: 19,
    fontWeight: '810',
    color: '#000',
  },
  mapFrame: {
    marginHorizontal: 16,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pageEndContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 0,
  },
  pageEndImage: {
    width: '100%',
    height: 350,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontWeight: 'bold',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: 4,
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default App;
