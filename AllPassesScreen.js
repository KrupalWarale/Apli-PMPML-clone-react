import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const AllPassesScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();

    // Get today's date for dynamic display
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

    return (
        <View style={styles.container}>
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onNavigate('PASS')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Passes</Text>
            </View>

            {/* Content area */}
            <View style={styles.content}>

                {/* Single Success Pass Card */}
                <TouchableOpacity
                    style={styles.passCard}
                    onPress={() => onNavigate('PASS')}
                    activeOpacity={0.9}
                >
                    {/* Green Top Strip */}
                    <View style={[styles.cardHeader, { backgroundColor: '#2e7d32' }]} />

                    <View style={styles.cardBody}>
                        <View style={styles.leftSection}>
                            <Text style={styles.passTitle}>PMC & PCMC</Text>
                            <Text style={styles.passTime}>{formattedDate} 06:03 AM</Text>
                        </View>

                        <View style={styles.rightSection}>
                            <View style={[styles.statusBadge, { backgroundColor: '#2e7d32' }]}>
                                <Text style={styles.statusText}>Success</Text>
                            </View>
                            <Text style={styles.fareText}>₹70.83</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    statusBarBackground: {
        width: '100%',
        backgroundColor: '#24b6ac',
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 2,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 20,
        color: 'black',
        fontFamily: 'Roboto',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    passCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardHeader: {
        height: 8,
        backgroundColor: '#d32f2f', // Red top strip
        width: '100%',
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center', // Vertically center content
    },
    leftSection: {
        flex: 1,
    },
    passTitle: {
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
        fontFamily: 'Roboto',
    },
    passTime: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'Roboto',
    },
    rightSection: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 50, // Ensure spacing between badge and price
    },
    statusBadge: {
        backgroundColor: '#2e7d32', // Green success color
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 15,
        marginBottom: 5,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    fareText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        fontFamily: 'Roboto',
    },
});

export default AllPassesScreen;
