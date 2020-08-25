import {Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const {width: WIDTH} = Dimensions.get('window');

export default function Create_Exercise_Entry({route, navigation}){
    const {itemID} = route.params;

    const [description, set_description] = useState('');
    const [number_of_sets, set_number_of_sets] = useState('');
    const [repetition_sets, set_repetition_sets] = useState('');

    submit_exercise = () => {
        const add_exercise = firebase.firestore().collection('training').doc(itemID).collection('exercises').doc();
        if (description === ''){
            alert('Please enter a description for the exercise');
        } else if (number_of_sets === ''){
            alert('Please enter the number of sets you did');
        } else if (repetition_sets === ''){
            alert('Please enter the number of reps you did per set')
        } else {
            add_exercise.set({
                description: description,
                number_of_sets: parseInt(number_of_sets),
                repetition_sets: parseInt(repetition_sets)
            }).then(() => {
                alert('Exercise submitted');
                const reset_state = '';
                set_description(reset_state);
                set_number_of_sets(reset_state);
                set_repetition_sets(reset_state);
                navigation.navigate('exercises');
            })
        }
    }

    return (
        <View>
            <View style={{width: WIDTH, height: 50}}>
                <TextInput style={{top: 15, marginLeft: 10}} placeholder='Description' value={description} onChangeText={(e) => {set_description(e)}}></TextInput>
            </View>
            
            <View style={{width: WIDTH, height: 50, backgroundColor:'#d9d9d9'}}></View>

            <View style={{width: WIDTH, height: 50, borderBottomWidth: 1, borderBottomColor: '#d9d9d9'}}> 
                <TextInput placeholder='# of Sets' style={{top: 15, marginLeft: 10, color: 'black'}} placeholderTextColor={'black'} keyboardType={'number-pad'} onChangeText={(e) => {set_number_of_sets(e)}} value={String(number_of_sets)}></TextInput>
            </View>

            <View style={{width: WIDTH, height: 50, borderBottomWidth: 1, borderBottomColor: '#d9d9d9'}}>
                <TextInput placeholder='Repetitions/Set' style={{top: 15, marginLeft: 10}} placeholderTextColor={'black'} keyboardType={'number-pad'} onChangeText={(e) => {set_repetition_sets(e)}} value={String(repetition_sets)}></TextInput>
            </View>

            <View style={{marginTop: 10}}>
                <TouchableOpacity style={{margin: 10, width: 100, backgroundColor: '#080557'}} onPress={() => submit_exercise()}>
                    <Text style={{borderWidth: 2, textAlign: 'center', color: 'white', borderColor: '#080557'}}>Add exercise</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
  