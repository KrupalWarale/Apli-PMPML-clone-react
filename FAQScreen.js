import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomFooter from './BottomFooter';

const FAQItem = ({ question }) => (
    <TouchableOpacity style={styles.faqItem}>
        <Text style={styles.faqQuestion}>• {question}</Text>
        <Ionicons name="add-circle" size={24} color="#555" />
    </TouchableOpacity>
);

const FAQGroup = ({ title, items }) => (
    <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{title}</Text>
        {items.map((item, index) => (
            <FAQItem key={index} question={item} />
        ))}
    </View>
);

const FAQScreen = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();

    const faqData = [
        {
            title: "General",
            items: ["I am unable to verify my phone number."]
        },
        {
            title: "Bus",
            items: [
                "How many buses are trackable?",
                "What is the frequency of location updates?",
                "Why is no bus showing on the app in my area?"
            ]
        },
        {
            title: "Pass",
            items: [
                "Can I book a pass in advance?",
                "My transaction is completed, but the pass is still showing as pending. What should I do?",
                "It has been 3 minutes, and the pass is still showing as pending. What now?",
                "A pass older than 1 day is still showing as pending.",
                "How can I confirm if I received a refund for my pending pass?"
            ]
        },
        {
            title: "Tickets",
            items: [
                "Can I book a ticket in advance?",
                "My transaction is completed, but the ticket is still showing as pending. What should I do?",
                "It has been 3 minutes, and the ticket is still showing as pending. What now?",
                "A ticket older than 1 day is still showing as pending.",
                "How can I confirm if I received a refund for my pending ticket?"
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <View style={[styles.statusBarBackground, { height: insets.top }]} />
            <StatusBar style="light" backgroundColor="#24b6ac" translucent={true} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>FAQs</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {faqData.map((group, index) => (
                    <FAQGroup key={index} title={group.title} items={group.items} />
                ))}
            </ScrollView>

            <View style={styles.stickyBottom}>
                <View style={styles.complaintSection}>
                    <Text style={styles.complaintText}>Can't find what you're looking for?</Text>
                    <TouchableOpacity style={styles.complaintButton} onPress={() => Linking.openURL('https://complaints.pmpml.org/home')}>
                        <Text style={styles.complaintButtonText}>Raise New Complaint</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 70 }}>
                    <BottomFooter currentScreen="FAQ" onNavigate={onNavigate} />
                </View>
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#8bc34a',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    groupContainer: {
        marginTop: 20,
    },
    groupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8bc34a',
        marginBottom: 10,
    },
    faqItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    faqQuestion: {
        flex: 1,
        fontSize: 15,
        color: '#555',
        marginRight: 10,
        lineHeight: 22,
    },
    complaintSection: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    stickyBottom: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    complaintText: {
        fontSize: 15,
        color: '#333',
        marginBottom: 10,
        fontWeight: '500',
    },
    complaintButton: {
        backgroundColor: '#1b9e59',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    complaintButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FAQScreen;
