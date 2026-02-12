import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    Linking,
    Modal,
    Animated,
    Easing
} from 'react-native';



import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: W, height: H } = Dimensions.get('window');

const PassScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const [timeLeft, setTimeLeft] = useState('');
    const [showQR, setShowQR] = useState(false);
    const pulseAnim = useRef(new Animated.Value(0)).current;



    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const diff = endOfDay - now;
            if (diff <= 0) {
                setTimeLeft('00:00:00');
                return;
            }

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            const format = (num) => String(num).padStart(2, '0');
            setTimeLeft(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })

            ])
        ).start();
    }, [pulseAnim]);

    const scale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.6, 1.4]
    });




    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = currentDate.toLocaleString('en-GB', { month: 'short' });
    const year = String(currentDate.getFullYear()).slice(-2);
    const formattedDate = `${day} ${month}, ${year}`;

    return (
        <View style={styles.container}>
            {/* Sky Blue Status Bar wrapping the top area */}
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* Gap between status bar and header */}
            <View style={styles.topGap} />

            {/* Top Header */}
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={() => onNavigate('HOME')} style={styles.closeButton}>
                    <Ionicons name="close" size={28} color="#555" />
                </TouchableOpacity>
                <View style={styles.topLinks}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://complaints.pmpml.org/home')}>
                        <Text style={styles.linkText}>Need Help?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNavigate('ALL_PASSES')} style={styles.allPassesButton}>
                        <Text style={styles.linkText}>All passes</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.mainContent}>
                {/* Main Pass Card */}
                <View style={styles.ticketCard}>
                    {/* Red Header Bar */}
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>पुणे महानगर परिवहन महामंडळ लि.</Text>
                    </View>

                    {/* Pass Details Section */}
                    <View style={styles.passDetailsInfo}>
                        <View style={styles.passTypeCol}>
                            <Text style={styles.infoLabel}>Pass Type</Text>
                            <Text style={styles.infoValue}>PMC & PCMC</Text>
                        </View>
                        <View style={styles.idCol}>
                            <Text style={styles.infoLabel}>ID</Text>
                            <Text style={styles.infoValue}>****</Text>
                        </View>
                        <View style={styles.fareCol}>
                            <Text style={styles.infoLabel}>Fare</Text>
                            <Text style={styles.infoValue}>₹70.8{'\n'}3</Text>
                        </View>
                    </View>

                    {/* Dashed line with larger semicircular notches */}
                    <View style={styles.dottedLineContainer}>
                        <View style={styles.leftCutout} />
                        <View style={styles.dottedLine}>
                            {[...Array(35)].map((_, i) => (
                                <View key={i} style={styles.dash} />
                            ))}
                        </View>
                        <View style={styles.rightCutout} />
                    </View>

                    {/* Booking & Validity Section */}
                    <View style={styles.timeSection}>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeLabel}>Booking Time</Text>
                            <Text style={styles.timeValueBold}>{formattedDate} | 06:03 AM</Text>
                        </View>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeLabel}>Validity Time</Text>
                            <Text style={styles.timeValueBold}>{formattedDate} | 11:59 PM</Text>
                        </View>
                    </View>

                    {/* Transaction ID Line */}
                    <View style={styles.refContainer}>
                        <Text style={styles.refText}>**************</Text>
                    </View>

                    {/* One Day Pass Red Strip */}
                    <View style={styles.oneDayPassBar}>
                        <Text style={styles.oneDayPassText}>One Day Pass</Text>
                    </View>

                    {/* Logo Circle Section */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoCircle}>
                            <Animated.Image
                                source={require('./assets/icon.png')}
                                style={[
                                    styles.pmpmlLogo,
                                    {
                                        transform: [{ scale }]
                                    }
                                ]}
                                resizeMode="contain"
                            />

                        </View>
                    </View>


                    {/* Expiry Timer */}
                    <View style={styles.countdownContainer}>
                        <Text style={styles.expiresText}>Expires in {timeLeft}</Text>
                    </View>
                </View>
            </View>

            {/* Show QR Code Button */}
            <View style={[styles.footer, { marginBottom: insets.bottom + 10 }]}>
                <TouchableOpacity style={styles.qrButton} onPress={() => setShowQR(true)}>
                    <Image
                        source={require('./assets/qr.png')}
                        style={styles.qrAssetIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.qrButtonText}>Show QR code</Text>
                </TouchableOpacity>
            </View>

            {/* QR Code Popup Modal */}
            <Modal
                visible={showQR}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowQR(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowQR(false)}
                >
                    <View style={styles.popupContainer}>
                        <TouchableOpacity
                            style={styles.popupCloseButton}
                            onPress={() => setShowQR(false)}
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <Image
                            source={require('./assets/QrDummy.png')}
                            style={styles.qrDummyImage}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </Modal>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9', // Correct mint green background
    },
    statusBarBackground: {
        width: '100%',
        backgroundColor: '#24b6ac',
    },
    topGap: {
        height: 10,
        backgroundColor: '#e8f5e9',
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    closeButton: {
        padding: 5,
    },
    topLinks: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#555',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    allPassesButton: {
        marginLeft: 20,
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginTop: -20,
    },
    ticketCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        // Removed overflow: 'hidden' to prevent clipping cutouts
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        paddingBottom: 25,
    },
    cardHeader: {
        backgroundColor: '#d32f2f', // Darker Red
        height: 48, // Reduced height
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    cardHeaderText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '500',
    },
    passDetailsInfo: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 25,
        alignItems: 'flex-start',
    },
    passTypeCol: {
        flex: 2,
    },
    idCol: {
        flex: 1,
    },
    fareCol: {
        flex: 1,
        alignItems: 'flex-start',
    },
    infoLabel: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
        fontWeight: '400',
    },
    infoValue: {
        fontFamily: 'Roboto',
        fontSize: 17, // Slightly larger
        fontWeight: '900', // Much bolder
        color: '#000',
    },
    dottedLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10, // Adjusted margin
        position: 'relative',
    },
    leftCutout: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e8f5e9',
        position: 'absolute',
        left: -22, // Forcefully overlap the edge
        zIndex: 100,
    },
    rightCutout: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e8f5e9',
        position: 'absolute',
        right: -22, // Forcefully overlap the edge
        zIndex: 100,
    },
    dottedLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        height: 1,
    },
    dash: {
        width: 4,
        height: 1.2,
        backgroundColor: '#bbb', // More visible gray
    },

    timeSection: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 5,
    },
    timeBox: {
        flex: 1,
    },
    timeLabel: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
        fontWeight: '400',
    },
    timeValueBold: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '700', // Bolder than before
        color: '#333',
    },
    refContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    refText: {
        fontFamily: 'Roboto',
        fontSize: 13,
        color: '#888',
    },
    oneDayPassBar: {
        backgroundColor: '#d32f2f', // Darker Red
        height: 32, // Reduced height
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    oneDayPassText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Roboto',
    },
    logoSection: {
        alignItems: 'center',
        marginTop: 35, // Shifted down for exact centering
        marginBottom: 15,
    },

    logoCircle: {
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pmpmlLogo: {
        width: '90%',
        height: '90%',
    },
    countdownContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    expiresText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#888',
        fontWeight: '400',
    },
    footer: {
        paddingHorizontal: 16,
        width: '100%',
    },
    qrButton: {
        backgroundColor: '#d9f0d9',
        borderWidth: 1.5,
        borderColor: '#3c7a59', // Matched to qr.png
        height: 48, // Perfectly matches icon size
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    qrAssetIcon: {
        width: 48,
        height: 48,
        marginRight: 6,
    },


    qrButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16.5,
        color: '#3c7a59', // Matched to qr.png
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        width: W * 0.65,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 4, // Tighter corners like image
        alignItems: 'center',
        position: 'relative',
    },

    popupCloseButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10,
        padding: 5,
    },
    qrDummyImage: {
        width: W * 0.55,
        height: W * 0.55,
    },

});


export default PassScreen;
