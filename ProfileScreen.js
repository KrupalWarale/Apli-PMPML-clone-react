import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Linking,
    Image
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MenuItem = ({ icon, label, iconType = 'Ionicons', onPress }) => {
    const renderIcon = () => {
        if (iconType === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons name={icon} size={24} color="#333" />;
        } else if (iconType === 'FontAwesome5') {
            return <FontAwesome5 name={icon} size={20} color="#333" />;
        }
        return <Ionicons name={icon} size={24} color="#333" />;
    };

    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuIconContainer}>
                {renderIcon()}
            </View>
            <Text style={styles.menuLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const ProfileScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onNavigate('HOME')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Profile Header */}
                <TouchableOpacity style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={32} color="#555" />
                    </View>
                    <Text style={styles.profileText}>Click here to update your profile</Text>
                </TouchableOpacity>

                {/* Menu Items */}
                <View style={styles.menuList}>
                    <MenuItem
                        icon="ticket-outline"
                        label="My Tickets"
                        iconType="MaterialCommunityIcons"
                        onPress={() => onNavigate('TICKETS')}
                    />
                    <MenuItem
                        icon="card-account-details-outline"
                        label="My Passes"
                        iconType="MaterialCommunityIcons"
                        onPress={() => onNavigate('ALL_PASSES')}
                    />
                    <MenuItem
                        icon="message-alert-outline"
                        label="Complaints"
                        iconType="MaterialCommunityIcons"
                        onPress={() => Linking.openURL('https://complaints.pmpml.org/home')}
                    />
                    <MenuItem
                        icon="share-social-outline"
                        label="Share app"
                        onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=in.chartr.pmpml')}
                    />
                    <MenuItem
                        icon="star-outline"
                        label="Rate Us"
                        onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=in.chartr.pmpml')}
                    />
                    <MenuItem icon="qr-code-outline" label="Validate Pass / Ticket" />
                </View>
            </ScrollView>

            {/* Sticky Footer pinned to bottom */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 15 }]}>
                <View style={styles.followRow}>
                    <Text style={styles.followText}>Follow us on :</Text>
                    <View style={styles.socialIcons}>
                        <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://www.youtube.com/channel/UCW5Mn_rV5XjVbIye_gTRLvw')}>
                            <Ionicons name="logo-youtube" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://www.instagram.com/pmpml_pune?igsh=MTJobnBlODFnZ21xNg==')}>
                            <Ionicons name="logo-instagram" size={32} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://x.com/pmpmlpune')}>
                            <Image
                                source={require('./assets/x.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.versionText}>App version : 1.0.13.1 (25)</Text>
            </View>
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
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 15,
        color: '#333',
    },
    moreButton: {
        padding: 5,
    },
    content: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fdfdfd',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#e8f5e9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profileText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    menuList: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuIconContainer: {
        width: 30,
        marginRight: 20,
        alignItems: 'center',
    },
    menuLabel: {
        fontSize: 16,
        color: '#333',
    },
    footer: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    followRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    followText: {
        fontSize: 16,
        color: '#555',
        marginRight: 15,
        fontWeight: '500',
    },
    socialIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    socialButton: {
        marginRight: 15,
    },
    versionText: {
        fontSize: 15,
        color: '#888',
        marginTop: 5,
    },
});

export default ProfileScreen;
