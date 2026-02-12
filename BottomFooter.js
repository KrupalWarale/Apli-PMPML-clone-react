import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomFooter = ({ currentScreen, onNavigate }) => {
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => onNavigate('HOME')}
            >
                <Ionicons
                    name={currentScreen === 'HOME' ? "home" : "home-outline"}
                    size={24}
                    color={currentScreen === 'HOME' ? "black" : "#888"}
                />
                <Text style={currentScreen === 'HOME' ? styles.navLabelActive : styles.navLabel}>Home</Text>
                {currentScreen === 'HOME' && <View style={styles.activeLine} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => onNavigate('BUSES')}
            >
                <Ionicons
                    name={currentScreen === 'BUSES' ? "location" : "location-outline"}
                    size={24}
                    color={currentScreen === 'BUSES' ? "black" : "#888"}
                />
                <Text style={currentScreen === 'BUSES' ? styles.navLabelActive : styles.navLabel}>Buses</Text>
                {currentScreen === 'BUSES' && <View style={styles.activeLine} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => onNavigate('FAQ')}
            >
                <Ionicons
                    name={currentScreen === 'FAQ' ? "help-circle" : "help-circle-outline"}
                    size={24}
                    color={currentScreen === 'FAQ' ? "black" : "#888"}
                />
                <Text style={currentScreen === 'FAQ' ? styles.navLabelActive : styles.navLabel}>Help</Text>
                {currentScreen === 'FAQ' && <View style={styles.activeLine} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingBottom: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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

export default BottomFooter;
