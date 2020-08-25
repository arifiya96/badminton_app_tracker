import React, { useState} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { View, Text, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const {width: WIDTH} = Dimensions.get('window');

export default function Tournament_namechange({route, navigation}){
    const {itemID} = route.params;
    const {itemName} = route.params;
    const {itemDate} = route.params;

    const [new_tourney_name, set_new_tourney_name] = useState('');

    change_tourney_name = () => {
        if (new_tourney_name !== ''){
            firebase.firestore().collection('tournaments').doc(itemID).set({
                name: new_tourney_name,
                date: itemDate
            }).then(()=>{
                alert('Tournament name changed');
                const reset_state = '';
                set_new_tourney_name(reset_state);
                navigation.navigate('Tournaments');
            })
        } else {
            alert('Please enter a new tournament name');
        }
    }

    return (
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
            <View style={{width: WIDTH - 20, height: 30, borderWidth: 1, margin: 10, borderRadius: 5, flexDirection:'row'}}>
                <Icon name='ios-trophy' size={20} color='#080557' style={{top: -2, margin: 5}}></Icon>
                <TextInput placeholder={itemName} style={{fontSize: 20, marginLeft: 10}} onChangeText={(e) => set_new_tourney_name(e)} value={new_tourney_name}></TextInput>
            </View>

            <View style={{marginLeft: 10, height: 30}}>
                <TouchableOpacity style={{borderWidth: 1, height: 30, borderRadius: 5, width: 100, backgroundColor:'#080557'}} onPress={() => change_tourney_name()}>
                    <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}