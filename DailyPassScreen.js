import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DailyPassScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const [passType, setPassType] = useState('PMC'); // 'PMC' or 'ALL'
    const [idDigits, setIdDigits] = useState(['', '', '', '']);
    const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleDigitChange = (text, index) => {
        const newDigits = [...idDigits];
        newDigits[index] = text;
        setIdDigits(newDigits);

        // Auto focus next input
        if (text && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !idDigits[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const baseFare = passType === 'PMC' ? 70.0 : 150.0;
    const finalFare = (baseFare + 0.83).toFixed(2);

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = currentDate.toLocaleString('en-GB', { month: 'short' });
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = `${day} ${month}, ${year} | ${time}`;

    return (
        <View style={styles.container}>
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onNavigate('HOME')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Daily Pass</Text>
                <Text style={styles.currentTime}>{formatTime(secondsLeft)}</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    {/* Green Date Header */}
                    <View style={styles.dateHeader}>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>

                    <View style={styles.cardBody}>
                        <Text style={styles.sectionLabel}>Select pass type</Text>

                        <TouchableOpacity
                            style={[styles.passTypeOption, passType === 'PMC' && styles.selectedOption]}
                            onPress={() => setPassType('PMC')}
                        >
                            <Text style={styles.optionText}>PMC & PCMC - ₹70.0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.passTypeOption, passType === 'ALL' && styles.selectedOption]}
                            onPress={() => setPassType('ALL')}
                        >
                            <Text style={styles.optionText}>All Route - ₹150.0</Text>
                        </TouchableOpacity>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                {passType === 'PMC' ? 'Valid in all routes of PMC and PCMC' : 'Valid in all routes of PMPML'}
                            </Text>
                        </View>

                        {/* Dashed Line */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.leftNotch} />
                            <View style={styles.dashedLine} />
                            <View style={styles.rightNotch} />
                        </View>

                        <Text style={styles.sectionLabel}>Enter last 4 digits of your Aadhaar Card or Pan Card</Text>

                        <View style={styles.idInputContainer}>
                            {idDigits.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={inputRefs[index]}
                                    style={styles.digitInput}
                                    value={digit}
                                    onChangeText={(text) => handleDigitChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    textAlign="center"
                                />
                            ))}
                        </View>

                        <View style={styles.warningBox}>
                            <Text style={styles.warningText}>You should have a valid ID with above details.</Text>
                        </View>
                    </View>
                </View>

                {/* Final Fare Card */}
                <View style={styles.fareCard}>
                    <View style={styles.fareLeft}>
                        <Text style={styles.fareLabel}>Final Fare</Text>
                        <Ionicons name="information-circle" size={18} color="#888" style={styles.infoIcon} />
                    </View>
                    <Text style={styles.fareValue}>₹{finalFare}</Text>
                </View>
            </ScrollView>

            {/* Bottom Payment Footer */}
            <View style={[styles.paymentFooter, { paddingBottom: insets.bottom + 10 }]}>
                <View style={styles.paymentInfo}>
                    <Text style={styles.payUsingText}>PAY USING</Text>
                    <View style={styles.phonePeContainer}>
                        <Image source={require('./assets/phonepay.png')} style={styles.phonePeLogo} resizeMode="contain" />
                        <Text style={styles.phonePeText}>PhonePe</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>₹{finalFare}</Text>
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
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 15,
        color: '#333',
    },
    currentTime: {
        fontSize: 14,
        color: '#444',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 12,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 12,
    },
    dateHeader: {
        backgroundColor: '#2e7d32',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    dateText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    cardBody: {
        padding: 16,
    },
    sectionLabel: {
        fontSize: 15,
        color: '#444',
        marginBottom: 12,
        fontWeight: '500',
    },
    passTypeOption: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    selectedOption: {
        backgroundColor: '#e8f5e9',
        borderColor: '#a5d6a7',
    },
    optionText: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    infoBox: {
        backgroundColor: '#fff9c4', // Lighter yellow
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    infoText: {
        color: '#e65100',
        fontSize: 13,
        fontWeight: '500',
    },
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
    idInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    digitInput: {
        width: width * 0.18,
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 4,
        fontSize: 22,
        fontWeight: '500',
        color: '#333',
    },
    warningBox: {
        backgroundColor: '#fff9c4', // Lighter yellow
        padding: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    warningText: {
        color: '#ef6c00',
        fontSize: 13,
        fontWeight: '500',
    },
    fareCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 100,
    },
    fareLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fareLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    infoIcon: {
        marginLeft: 8,
    },
    fareValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    paymentFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    paymentInfo: {
        flex: 1,
    },
    payUsingText: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
    },
    phonePeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    phonePeLogo: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    phonePeText: {
        fontSize: 15,
        color: '#333',
        fontWeight: '600',
    },
    payButton: {
        backgroundColor: '#2e7d32',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 8,
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DailyPassScreen;
