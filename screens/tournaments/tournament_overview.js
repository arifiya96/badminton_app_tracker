import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import { ScrollView } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';

//Each view acts as a row

export default function Tournament_overview({route}){
    const categories = ['Total','MS - Mens Singles','WS - Womens Singles','MD - Mens Doubles','WD - Womens Doubles','XD - Mixed Doubles'];
    const [event, set_event] = useState('');

    const [games, set_games] = useState([]);

    const [wins, set_wins] = useState(0);
    const [losses, set_losses] = useState(0);

    return (
        <View>
            <ScrollView>
                <View>
                    <View style={{margin: 10, backgroundColor:'#080557'}}>
                        <Text style={{fontSize: 20, margin: 5, color:'white'}}>Summary</Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold', marginLeft: 5}}>Win-Loss</Text>
                    </View>
                    <View style={{marginLeft: 10, flexDirection:'row'}}>
                        <Icon name='ios-arrow-dropright-circle' color={'#080557'} size={15} style={{margin: 5}}></Icon>
                        <ModalDropdown options={categories} style={{margin: 5}} defaultValue={'Select Category...'} showsVerticalScrollIndicator={true} onSelect={e => set_event(e)} accessibilityValue={event}></ModalDropdown>
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10, flexDirection:'row', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
                        <Text style={{color:'grey', margin: 5}}>Career</Text>
                        <Text style={{margin: 5}}></Text>
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10, flexDirection:'row'}}>
                        <Text style={{color:'grey', margin: 5}}>Win/Loss ratio</Text>
                        <Text style={{margin: 5}}>0.9</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}