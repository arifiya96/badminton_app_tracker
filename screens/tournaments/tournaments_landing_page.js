import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import { ScrollView } from 'react-native-gesture-handler';

//On this page, you can enter a new tournament and the list of tournaments you have created will be shown.
//When you click a tournament, it will list all the matches for that tournament.
//The page for that is called matches.js.
export default function Tournament_screen({navigation}) {
  const [tournament, setTournament] = useState('');
  const [date, setDate] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  EnterNewTournament = () => {
    if (tournament && date) {
      firebase.firestore().collection('tournaments').add({name: tournament, date: date})
      .then(() => {
        alert('Tournament added!')
        const resetState = '';
        setTournament(resetState);
        setDate(resetState);
      })
    } else {
      alert('Please fill in a tournament and date!');
    }
  }

  useEffect(() => {
    const tournament_list = firebase.firestore().collection('tournaments').onSnapshot(querySnapshot => {
      const tourneys = [];
      querySnapshot.forEach(documentSnapshot => {
        tourneys.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        });
      });
      setTournaments(tourneys);
      setLoading(false);
    });
    return () => tournament_list();
  }, []);

  if(loading){
    return <ActivityIndicator></ActivityIndicator>
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false}>
        <View style={{alignItems: 'center'}}>
          <Text>Add new tournament here</Text>

          <View>
            <Icon name='ios-trophy' size={20} color='#080557' style={styles.inputIcon}></Icon>
            <TextInput placeholder='Name of tournament' style={styles.input} value={tournament} onChangeText={(e) => {setTournament(e)}} maxLength={25}></TextInput>
          </View>

          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Icon name='ios-calendar' size={20} color='#080557' style={styles.inputIcon_2}></Icon>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode='date' onConfirm={handleConfirm} onCancel={hideDatePicker}></DateTimePickerModal>
            <Text style={styles.date_text}>Date: {date[2]}-{date[1]}-{date[0]}</Text>
          </TouchableOpacity>

          <Icon name='ios-add-circle' size={30} color='#080557' style={{marginLeft: 10}} onPress={event => EnterNewTournament()}></Icon>

          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <Icon name='ios-podium' size={30} color='#080557'></Icon>
            <TouchableOpacity onPress={event => navigation.navigate('tournament_overview')}>
              <Text style={{marginLeft: 10, color: '#080557', top: 8, textDecorationLine: 'underline'}}>Performance Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 20}}></View>

        <View style={{borderWidth: 2, borderColor:'#080557', height: 30, backgroundColor: '#080557'}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20, textAlign:'center'}}>My Tournaments</Text>
        </View>

        <ScrollView style={{borderWidth: 1, borderColor: '#080557'}}>
          {tournaments.map((t,i) => {
            return (
              <View key={i}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={event => navigation.navigate('tournamentmatches', {itemID: t.key, itemDate: t.date, itemName: t.name})}>
                  <Icon name={'ios-trophy'} size={20} color={'#080557'} style={{margin: 5, top: 5}}></Icon>
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