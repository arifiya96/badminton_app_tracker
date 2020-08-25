import React, {useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import * as firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';

export default function Loading(){
    const navigation = useNavigation();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            navigation.navigate(user ? "mainapp" : "startscreen");
        })
    })

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

