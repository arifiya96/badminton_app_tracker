import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '/Users/ifkar/badminton-tracker-app/assets/shuttle_icon.png';
import * as firebase from 'firebase';

import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

export default function StartScreen() {
    const navigation = useNavigation(); 
    
    //login authentication state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    //handling the login
    HandleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate("mainapp"))
        .catch(function(error){
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode === 'auth/wrong-password') {
            alert('Wrong password');
          } else {
            alert(errorMessage);
          }
        })
    }

    return (
    <ImageBackground source={require('/Users/ifkar/badminton-tracker-app/assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo}></Image>

        <View>
          <Icon name='ios-happy' size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon}></Icon>
          <TextInput placeholder={'Email Address'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid='transparent' style={styles.input} value={email} onChangeText={e => setEmail(e)}></TextInput>
        </View>

        <View>
          <Icon name='ios-lock' size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon}></Icon>
          <TextInput placeholder={'Password'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid='transparent' style={styles.input} secureTextEntry={true} autoCapitalize="none" value={password} onChangeText={p => setPassword(p)}></TextInput>
        </View>

        <TouchableOpacity>
          <Text style={styles.text} onPress={event => navigation.navigate('signupscreen')}>New user? Sign up here</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin} onPress={event => HandleLogin()}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.text} onPress={event => navigation.navigate('forgotpasswordscreen')}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
    marginTop: 20
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#94AED7'
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
  }
});
