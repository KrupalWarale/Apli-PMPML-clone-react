import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BusTicketScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();

    // State for counters
    const [fullCount, setFullCount] = useState(1);
    const [halfCount, setHalfCount] = useState(0);
    const [activeTab, setActiveTab] = useState('fare'); // 'fare' or 'stops'

    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    // Countdown Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format seconds into MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    // Calculate time for initial display
    // Calculate time for initial display
    const now = new Date();
    // Use simple string formatting to avoid Hermes Intl errors with non-standard options
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const headerTimeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

    // For the other time string (HH:MM)
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateString = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <View style={styles.container}>
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onNavigate('HOME')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ticket Details</Text>

                {/* Reverse Counter Display */}
                <Text style={styles.headerTime}>{formatTime(timeLeft)}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.ticketCard}>
                    {/* Green Header */}
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>{dateString} | {headerTimeString}</Text>
                    </View>

                    <View style={styles.cardBody}>
                        {/* Route Input */}
                        <View style={styles.routeInputContainer}>
                            <View style={styles.busIconCircle}>
                                <Ionicons name="bus" size={20} color="white" />
                            </View>
                            <TextInput
                                style={styles.routeInput}
                                placeholder="Select or enter route"
                                placeholderTextColor="#888"
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Stops Section */}
                        <View style={styles.stopsContainer}>
                            <View style={styles.timeline}>
                                <View style={styles.timelineDot} />
                                <View style={styles.timelineLine} />
                                <View style={styles.timelineDot} />
                            </View>
                            <View style={styles.stopInputs}>
                                <Text style={styles.stopTextPlaceholder}>Starting stop</Text>
                                <View style={{ height: 20 }} />
                                <Text style={styles.stopTextPlaceholder}>Ending stop</Text>
                            </View>
                        </View>

                        {/* Dashed Line */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.leftNotch} />
                            <View style={styles.dashedLine} />
                            <View style={styles.rightNotch} />
                        </View>

                        {/* Toggle Buttons */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[styles.toggleButton, activeTab === 'fare' ? styles.activeToggle : styles.inactiveToggle]}
                                onPress={() => setActiveTab('fare')}
                            >
                                <Text style={[styles.toggleText, activeTab === 'fare' ? styles.activeToggleText : styles.inactiveToggleText]}>By Fare</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleButton, activeTab === 'stops' ? styles.activeToggle : styles.inactiveToggle]}
                                onPress={() => setActiveTab('stops')}
                            >
                                <Text style={[styles.toggleText, activeTab === 'stops' ? styles.activeToggleText : styles.inactiveToggleText]}>By Ending stop</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.sectionLabel}>Ticket Price</Text>

                        <Text style={styles.sectionLabel}>Select Tickets</Text>

                        {/* Ticket Counters */}
                        <View style={styles.counterRow}>
                            <Text style={styles.counterLabel}>Full</Text>
                            <View style={styles.counterControls}>
                                <TouchableOpacity style={styles.counterBtn} onPress={() => setFullCount(Math.max(0, fullCount - 1))}>
                                    <Text style={styles.counterBtnText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{fullCount}</Text>
                                <TouchableOpacity style={styles.counterBtn} onPress={() => setFullCount(fullCount + 1)}>
                                    <Text style={styles.counterBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.counterRow}>
                            <Text style={styles.counterLabel}>Half</Text>
                            <View style={styles.counterControls}>
                                <TouchableOpacity style={styles.counterBtn} onPress={() => setHalfCount(Math.max(0, halfCount - 1))}>
                                    <Text style={styles.counterBtnText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{halfCount}</Text>
                                <TouchableOpacity style={styles.counterBtn} onPress={() => setHalfCount(halfCount + 1)}>
                                    <Text style={styles.counterBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
                <View style={styles.paymentMethod}>
                    <Text style={styles.payUsingLabel}>PAY USING ▲</Text>
                    <View style={styles.phonePeRow}>
                        <Image source={require('./assets/phonepay.png')} style={styles.phonePeLogo} resizeMode="contain" />
                        <Text style={styles.phonePeText}>PhonePe</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginLeft: 15,
    },
    headerTime: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    scrollContent: {
        padding: 16,
    },
    ticketCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 12,
    },
    cardHeader: {
        backgroundColor: '#2e8b57', // SeaGreen
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    cardHeaderText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    cardBody: {
        padding: 16,
    },
    routeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 5,
    },
    busIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2e8b57',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    routeInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 15,
    },
    stopsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    timeline: {
        alignItems: 'center',
        width: 30,
        marginRight: 10,
        paddingVertical: 5,
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#888',
        backgroundColor: 'white',
    },
    timelineLine: {
        width: 2,
        height: 30, // Connect dots
        backgroundColor: '#bbb',
        borderStyle: 'dashed',
        borderLeftWidth: 2,
        borderLeftColor: '#bbb',
        borderStyle: 'dotted',
    },
    stopInputs: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 0,
    },
    stopTextPlaceholder: {
        fontSize: 16,
        color: '#888',
        paddingVertical: 2,
    },

    // Cutout Section
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative',
        height: 20,
        justifyContent: 'center',
    },
    leftNotch: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f8f8f8',
        position: 'absolute',
        left: -28,
        borderWidth: 1,
        borderColor: '#eee',
        zIndex: 2,
    },
    rightNotch: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f8f8f8',
        position: 'absolute',
        right: -28,
        borderWidth: 1,
        borderColor: '#eee',
        zIndex: 2,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },

    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        marginHorizontal: 5,
    },
    activeToggle: {
        backgroundColor: '#2e8b57',
        borderColor: '#2e8b57',
    },
    inactiveToggle: {
        backgroundColor: 'white',
        borderColor: '#ddd',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '500',
    },
    activeToggleText: {
        color: 'white',
    },
    inactiveToggleText: {
        color: '#333',
    },
    sectionLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
        marginTop: 5,
    },
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        backgroundColor: '#fafafa',
    },
    counterLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    counterBtnText: {
        fontSize: 20,
        color: '#555',
        fontWeight: 'bold',
    },
    counterValue: {
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 15,
        minWidth: 20,
        textAlign: 'center',
    },

    footer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 25, // More bottom padding
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'space-between',
    },
    paymentMethod: {
        flex: 1,
        justifyContent: 'center',
    },
    payUsingLabel: {
        fontSize: 10,
        color: '#888',
        marginBottom: 4,
    },
    phonePeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phonePeLogo: {
        width: 28, // Slightly bigger logo
        height: 28,
        marginRight: 8,
    },
    phonePeText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    payButton: {
        backgroundColor: '#2e8b57',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        elevation: 2,
        width: '45%', // Fixed percentage width
        alignItems: 'center',
        height: 50, // Fixed height for consistency
        justifyContent: 'center',
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default BusTicketScreen;
