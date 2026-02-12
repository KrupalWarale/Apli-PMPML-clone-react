import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ViewTicketScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* Gap between status bar and header */}
            <View style={styles.topGap} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onNavigate('HOME')} style={styles.closeButton}>
                    <Ionicons name="close" size={28} color="#555" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://complaints.pmpml.org/home')}>
                        <Text style={styles.linkText}>Need Help?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNavigate('TICKETS')} style={styles.allTicketsButton}>
                        <Text style={styles.linkText}>All Tickets</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.messageCard}>
                    <Text style={styles.mainMessage}>No active ticket available.</Text>
                    <Text style={styles.subMessage}>
                        If you have paid and ticket is not visible then please check all tickets section from top right corner for status of ticket.
                    </Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9', // Light mint background
    },
    statusBarBackground: {
        width: '100%',
        backgroundColor: '#24b6ac',
    },
    topGap: {
        height: 10,
        backgroundColor: '#e8f5e9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    closeButton: {
        padding: 5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#555', // Dark gray
        textDecorationLine: 'underline', // Underlined
        fontWeight: '500',
    },
    allTicketsButton: {
        marginLeft: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',
        paddingHorizontal: 30, // More padding for centered text
    },
    messageCard: {
        // Optional: Could be a card or just text, user screenshot implies simple text or simple container.
        // Assuming simple text on background for now based on "No active ticket available" standard views.
        alignItems: 'center',
    },
    mainMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subMessage: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default ViewTicketScreen;
