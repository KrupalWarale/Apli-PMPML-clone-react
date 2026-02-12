import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import BottomFooter from './BottomFooter';

const { width, height } = Dimensions.get('window');

const BusesScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();

    // Leaflet Map HTML centered on Hadapsar Gadital (Approx 18.5089, 73.9266)
    // Using CartoDB Positron for muted grey look
    const mapHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
            <style>
                body { margin: 0; padding: 0; }
                #map { width: 100%; height: 100vh; }
                /* Custom CSS to further desaturate if needed, but Positron is already grey */
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                // Initialize map centered on Hadapsar Gadital
                var map = L.map('map', {
                    zoomControl: false, // Hide zoom controls for cleaner mobile look
                    attributionControl: false 
                }).setView([18.5089, 73.9266], 15);

                // CartoDB Positron (Muted Grey/Blue) - Removes all yellow/warm tones
                L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                    maxZoom: 20,
                    attribution: '' // Clean look
                }).addTo(map);

                // Add a marker for Hadapsar Gadital
                var marker = L.marker([18.5089, 73.9266]).addTo(map);
                marker.bindPopup("<b>Hadapsar Gadital</b><br>Bus Station").openPopup();
            </script>
        </body>
        </html>
    `;

    return (
        <View style={styles.container}>
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* WebView Map Replacement */}
            <View style={styles.mapContainer}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: mapHtml }}
                    style={styles.webview}
                    scrollEnabled={true}
                    bounces={false}
                />
            </View>

            {/* Top Navigation Overlay */}
            <View style={[styles.topOverlay, { top: insets.top + 10 }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => onNavigate('HOME')}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={22} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Route"
                        placeholderTextColor="#888"
                    />
                </View>
            </View>

            {/* Location FAB */}
            <TouchableOpacity style={[styles.fab, { bottom: 110 }]}>
                <MaterialIcons name="my-location" size={28} color="black" />
            </TouchableOpacity>

            <BottomFooter currentScreen="BUSES" onNavigate={onNavigate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    statusBarBackground: {
        width: '100%',
        backgroundColor: '#24b6ac',
        position: 'absolute',
        top: 0,
        zIndex: 10,
    },
    mapContainer: {
        flex: 1, // Take full space
        width: width,
        height: height,
    },
    webview: {
        flex: 1,
    },
    topOverlay: {
        position: 'absolute',
        left: 15,
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 20,
    },
    backButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginRight: 10,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: 15,
        height: 50,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 110,
        backgroundColor: 'white',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});

export default BusesScreen;
