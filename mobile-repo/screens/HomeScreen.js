// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [currentIp, setCurrentIp] = useState('');
    const [geolocation, setGeolocation] = useState(null);
    const [ipInput, setIpInput] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        // Fetch logged user's IP and geolocation on mount
        fetchUserGeolocation();
    }, []);

    const fetchUserGeolocation = async () => {
        try {
            const ipResponse = await axios.get('https://api.ipify.org?format=json');
            const userIp = ipResponse.data.ip;
            setCurrentIp(userIp);
            const geoResponse = await axios.get(`https://ipinfo.io/${userIp}/geo`);
            setGeolocation(geoResponse.data);
        } catch (error) {
            console.error('Failed to fetch user geolocation:', error);
        }
    };

    const handleSearch = async () => {
        if (!validateIp(ipInput)) {
            Alert.alert('Invalid IP', 'Please enter a valid IP address.');
            return;
        }
        try {
            const response = await axios.get(`https://ipinfo.io/${ipInput}/geo`);
            const newGeo = response.data;
            setGeolocation(newGeo);
            setSearchHistory(prevHistory => [...prevHistory, { ip: ipInput, geo: newGeo }]);
        } catch (error) {
            console.error('Failed to fetch geolocation for IP:', error);
            Alert.alert('Error', 'Failed to fetch geolocation for the entered IP address.');
        }
    };

    const validateIp = (ip) => {
        // Basic IP address validation
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    };

    const clearSearch = () => {
        setIpInput('');
        fetchUserGeolocation();
    };

    const handleLogout = () => {
        // Clear the token or user data
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Geolocation Information</Text>
            {geolocation ? (
                <View style={styles.infoContainer}>
                    <Text>IP: {currentIp}</Text>
                    <Text>Location: {geolocation.city}, {geolocation.region}, {geolocation.country}</Text>
                    <Text>Coordinates: {geolocation.loc}</Text>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Enter new IP address"
                value={ipInput}
                onChangeText={setIpInput}
                keyboardType="numeric"
                autoCapitalize="none"
            />
            <Button title="Search" onPress={handleSearch} />
            <Button title="Clear" onPress={clearSearch} />
            <Button title="Logout" onPress={handleLogout} />
            <FlatList
                data={searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <Text>IP: {item.ip}</Text>
                        <Text>Location: {item.geo.city}, {item.geo.region}, {item.geo.country}</Text>
                        <Text>Coordinates: {item.geo.loc}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default HomeScreen;
