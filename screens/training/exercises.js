import React, { useEffect, useState} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width: WIDTH} = Dimensions.get('window');

export default function Exercises({route, navigation}){
    //Call all the variables needed from the previous page (landing page)
    const {itemID} = route.params;

    const [exercises, set_exercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const [exercise_id, set_exercise_id] = useState('');

    //Loading the exercises from a specific training session
    useEffect(() => {
        //get the list of exercises
        const exercise_list = firebase.firestore().collection('training').doc(itemID).collection('exercises').onSnapshot(querySnapshot => {
            const exercise_list_1 = [];
            querySnapshot.forEach(documentSnapshot => {
                exercise_list_1.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                });
            });
            set_exercises(exercise_list_1);
            setLoading(false);
        })
        return () => exercise_list();
    }, []);

    if(loading){
        return <ActivityIndicator></ActivityIndicator>
    }
    
    const delete_training_session = () => {
        Alert.alert(
            'WARNING!',
            'Are you sure you want to delete this training session? This cannot be undone',
            [{
                text:'Cancel',
                style:'cancel'
            },
            {text:'Confirm', onPress: () => {
                firebase.firestore().collection('training').doc(itemID).delete()
                .then(() => {
                    alert('Training session deleted!');
                    navigation.navigate('Training');
                })
            }}]
        )
    }

    const delete_exercise = (e) => {
        Alert.alert(
            'Delete exercise?',
            'This cannot be undone',
            [{
                text:'Cancel',
                style:'cancel'
            },
        {text:'Confirm', onPress: () => {
            firebase.firestore().collection('training').doc(itemID).collection('exercises').doc(e).delete();
        }}]
        )
    }

    return (
        <View>
            <ScrollView>
                {exercises.map((e,i) => {
                    return (
                        <View key={i} style={{margin: 10, flexDirection: 'row'}}>
                            <View style={{width: WIDTH - 30}}>
                                <Text>{e.description}</Text>
                                <Text style={{color: 'grey'}}>{e.number_of_sets} sets, {e.repetition_sets} reps</Text>
                            </View>
                            <View>
                                <Icon name='ios-close' size={30} color={'#080557'} onPress={event => delete_exercise(e.key)}></Icon>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>

            <TouchableOpacity style={{margin: 10}} onPress={event => navigation.navigate('Create_new_exercise',{itemID: itemID})}>
                <Text style={{color: 'blue', textDecorationLine: 'underline', fontWeight: '600'}}>Add new training exercise</Text>
            </TouchableOpacity>

            <View style={{margin: 10, alignItems:'center'}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={event => delete_training_session()}>
                    <Icon name='ios-trash' size={30} color={'red'}></Icon>
                    <Text style={{color: 'red', marginLeft: 10, top: 5}}>Delete training session</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>{exercise_id}</Text>
            </View>
        </View>
    )
}
  