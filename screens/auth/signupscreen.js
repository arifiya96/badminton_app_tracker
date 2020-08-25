import React, { useState } from 'react';
import {Text, View, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

const {width: WIDTH} = Dimensions.get('window');

export default function Signupscreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const navigation = useNavigation();

    Signup = () => {
        if (password === confirmpassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('startscreen'))
            .catch(function(error){
                alert(error.message);
            })
        } else {
            alert('Passwords do not match!');
        }
    }

    return (
        <ImageBackground source={require('/Users/ifkar/badminton-tracker-app/assets/background.jpg')} style={styles.backgroundImage}>
            <View>
                <Icon name='ios-happy' size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon}></Icon>
                <TextInput placeholder={'Email Address'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid='transparent' style={styles.input} value={email} onChangeText={e => setEmail(e)}></TextInput>
            </View>

            <View>
                <Icon name='ios-lock' size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon}></Icon>
                <TextInput placeholder={'Password'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid='transparent' style={styles.input} value={password} onChangeText={p => setPassword(p)} secureTextEntry={true}></TextInput>
            </View>

            <View>
                <Icon name='ios-lock' size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon}></Icon>
                <TextInput placeholder={'Confirm Password'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid='transparent' style={styles.input} value={confirmpassword} onChangeText={c => setConfirmpassword(c)} secureTextEntry={true}></TextInput>
            </View>

            <TouchableOpacity style={styles.btnLogin} onPress={event => Signup()}>
                <Text style={styles.text}>Create account</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        width: '100%'
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
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
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
});
      