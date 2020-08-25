import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

export default function Changepassword() {
    return(
        <View style={styles.container}>
            <View marginTop={10}>
                <Icon name='ios-lock' size={28} style={styles.inputIcon}></Icon>
                <TextInput style={styles.input} placeholder={'Password'} placeholderTextColor={'white'}></TextInput>
            </View>

            <View>
                <Icon name='ios-lock' size={28} style={styles.inputIcon}></Icon>
                <TextInput style={styles.input} placeholder={'Confirm Password'} placeholderTextColor={'white'}></TextInput>
            </View>
            
            <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.text}>Change password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center'
      },
      inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
      },
      input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#080557',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
        marginBottom: 10
      },
      text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
      },
      btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#94AED7'
      }
})