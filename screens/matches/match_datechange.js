import React, { useState} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';

export default function Match_datechange({route, navigation}){
    const {itemID} = route.params;
    const {itemName} = route.params;

    const [new_match_date, set_new_match_date] = useState('');

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
      set_new_match_date(getDate);
      hideDatePicker();
    }

    change_match_date = () => {
        if (new_match_date !== ''){
            firebase.firestore().collection('matches').doc(itemID).set({
                name: itemName,
                date: new_match_date
            }).then(()=>{
                alert('Match date changed');
                const reset_state = '';
                set_new_match_date(reset_state);
                navigation.navigate('Matches');
            })
        } else {
            alert('Please enter a valid date');
        }
    }

    return (
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
            <TouchableOpacity onPress={showDatePicker} style={{flexDirection:'row'}}>
                <Icon name='ios-calendar' size={20} color='#080557' style={{margin: 10}}></Icon>
                <DateTimePickerModal isVisible={isDatePickerVisible} mode='date' onConfirm={handleConfirm} onCancel={hideDatePicker}></DateTimePickerModal>
                <Text style={{top: 13}}>Date: {new_match_date[2]}-{new_match_date[1]}-{new_match_date[0]}</Text>
            </TouchableOpacity>

            <View style={{marginLeft: 10, height: 30}}>
                <TouchableOpacity style={{borderWidth: 1, height: 30, borderRadius: 5, width: 100, backgroundColor:'#080557'}} onPress={() => change_match_date()}>
                    <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}