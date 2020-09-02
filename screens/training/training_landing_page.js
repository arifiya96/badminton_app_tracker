import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import { ScrollView } from 'react-native-gesture-handler';

//On this page, you can enter a new training session and the list of training sessions you have created will be shown.
//When you click a training session, it will list all the exercises for that training session.
//The page for that is called exercises.js.
export default function Training_screen({navigation}) {
  const [training_session, set_training_session] = useState('');
  const [date, setDate] = useState([]);
  const [training_sessions, set_training_sessions] = useState([]);
  const [loading, setLoading] = useState(true);

  let user = firebase.auth().currentUser.uid;

  //Date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const handleConfirm = (d) => {
    const getDate = [];
    getDate.push(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate()
      )
    setDate(getDate);
    hideDatePicker();
  }

  EnterNewTrainingSession = () => {
    if (date) {
      firebase.firestore().collection('training').add({name: 'Training Session', date: date, user_id: user})
      .then(() => {
        alert('Training session added!')
        const resetState = '';
        set_training_session(resetState);
        setDate(resetState);
      })
    } else {
      alert('Please fill in a date!');
    }
  }

  useEffect(() => {
    const training_list = firebase.firestore().collection('training').onSnapshot(querySnapshot => {
      const trainings = [];
      querySnapshot.forEach(documentSnapshot => {
        if (user === documentSnapshot.data().user_id){
          trainings.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          });
        }
      });
      set_training_sessions(trainings);
      setLoading(false);
    });
    return () => training_list();
  }, []);

  if(loading){
    return <ActivityIndicator></ActivityIndicator>
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false}>
      <View style={{alignItems: 'center'}}>
        <Text>Add a new training session here</Text>

        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Icon name='ios-calendar' size={20} color='#080557' style={styles.inputIcon_2}></Icon>
          <DateTimePickerModal isVisible={isDatePickerVisible} mode='date' onConfirm={handleConfirm} onCancel={hideDatePicker}></DateTimePickerModal>
          <Text style={styles.date_text}>Date: {date[2]}-{date[1]}-{date[0]}</Text>
        </TouchableOpacity>

        <Icon name='ios-add-circle' size={30} color='#080557' style={{marginLeft: 10}} onPress={event => EnterNewTrainingSession()}></Icon>
      </View>
  
      <View style={{height: 20}}></View>

        <View style={{borderWidth: 2, borderColor:'#080557', height: 30, backgroundColor: '#080557'}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20, textAlign:'center'}}>My Training Sessions</Text>
        </View>

        <ScrollView style={{borderWidth: 1, borderColor: '#080557'}}>
          {training_sessions.map((t,i) => {
            return (
              <View key={i}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={event => navigation.navigate('exercises', {itemID: t.key, itemDate: t.date, itemName: t.name})}>
                  <Icon name={'ios-body'} size={20} color={'#080557'} style={{margin: 5, top: 5}}></Icon>
                  <View style={{margin: 5}}>
                    <Text style={{fontWeight:'600'}}>{t.name}</Text>
                    <Text style={{color:'grey'}}>{t.date[2]}/{t.date[1]}/{t.date[0]}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    fontWeight: '800',
    marginTop: 10
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 25,
    margin: 10,
    height: 30,
    width: 250,
    textAlign: 'center'
  },
  tournament_list: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  tournament_list_text: {
    color: '#080557',
    textDecorationLine: 'underline'
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    left: 25
  },
  date_text: {
    textAlign: 'center',
    top: 5
  },
  inputIcon_2: {
    position: 'absolute',
    top: 4,
    left: 16,
  }
});