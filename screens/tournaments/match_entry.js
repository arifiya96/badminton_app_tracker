import React, {useState} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';

export default function Match_entry({route, navigation}) {
  const {itemID} = route.params;

  const [event, SetEvent] = useState('');

  //First set scores
  const [game1, SetGame1] = useState('');
  const [game1_opp, SetGame1_opp] = useState('');

  //Second set scores
  const [game2, SetGame2] = useState('');
  const [game2_opp, SetGame2_opp] = useState('');

  //Third set scores
  const [game3, SetGame3] = useState('');
  const [game3_opp, SetGame3_opp] = useState('');

  const categories = ['MS - Mens Singles','WS - Womens Singles','MD - Mens Doubles','WD - Womens Doubles','XD - Mixed Doubles'];

  //Submitting the scores 
  submit_scores = () => {
    const add_scores = firebase.firestore().collection('tournaments').doc(itemID).collection('tournament_matches').doc();
    if (game1 > 30 || game1_opp > 30 || game2 > 30 || game2_opp > 30 || game3 > 30 || game3_opp > 30) {
        alert('Please enter a valid score! Badminton scores only reach 30 max!');
    } else if (game1 === '' || game1_opp === '' || game2 === '' || game2_opp === ''){
        alert('Please enter a score for the first 2 sets!');
    } else if (event === ''){
        alert('Please select a category')
    } else if (event === '0'){
        add_scores.set({
            event: 'Mens Singles',
            game1_score: game1, game1_score_opp: game1_opp,
            game2_score: game2, game2_score_opp: game2_opp,
            game3_score: game3, game3_score_opp: game3_opp
        }).then(() => {
            alert('Score submitted');
            const reset_state = '';
            SetEvent(reset_state);
            SetGame1(reset_state);
            SetGame1_opp(reset_state);
            SetGame2(reset_state);
            SetGame2_opp(reset_state);
            SetGame3(reset_state);
            SetGame3_opp(reset_state);
            SetEvent(reset_state);
            navigation.navigate('tournamentmatches');
        })
    } else if (event === '1'){
        add_scores.set({
            event: 'Womens Singles',
            game1_score: game1, game1_score_opp: game1_opp,
            game2_score: game2, game2_score_opp: game2_opp,
            game3_score: game3, game3_score_opp: game3_opp
        }).then(() => {
            alert('Score submitted');
            const reset_state = '';
            SetEvent(reset_state);
            SetGame1(reset_state);
            SetGame1_opp(reset_state);
            SetGame2(reset_state);
            SetGame2_opp(reset_state);
            SetGame3(reset_state);
            SetGame3_opp(reset_state);
            SetEvent(reset_state);
            navigation.navigate('tournamentmatches');
        })
    } else if (event === '2'){
        add_scores.set({
            event: 'Mens Doubles',
            game1_score: game1, game1_score_opp: game1_opp,
            game2_score: game2, game2_score_opp: game2_opp,
            game3_score: game3, game3_score_opp: game3_opp
        }).then(() => {
            alert('Score submitted');
            const reset_state = '';
            SetEvent(reset_state);
            SetGame1(reset_state);
            SetGame1_opp(reset_state);
            SetGame2(reset_state);
            SetGame2_opp(reset_state);
            SetGame3(reset_state);
            SetGame3_opp(reset_state);
            SetEvent(reset_state);
            navigation.navigate('tournamentmatches');
        })
    } else if (event === '3'){
        add_scores.set({
            event: 'Womens Doubles',
            game1_score: game1, game1_score_opp: game1_opp,
            game2_score: game2, game2_score_opp: game2_opp,
            game3_score: game3, game3_score_opp: game3_opp
        }).then(() => {
            alert('Score submitted');
            const reset_state = '';
            SetEvent(reset_state);
            SetGame1(reset_state);
            SetGame1_opp(reset_state);
            SetGame2(reset_state);
            SetGame2_opp(reset_state);
            SetGame3(reset_state);
            SetGame3_opp(reset_state);
            SetEvent(reset_state);
            navigation.navigate('tournamentmatches');
        })
    } else {
        add_scores.set({
            event: 'Mixed Doubles',
            game1_score: game1, game1_score_opp: game1_opp,
            game2_score: game2, game2_score_opp: game2_opp,
            game3_score: game3, game3_score_opp: game3_opp
        })
        .then(() => {
            alert('Score submitted');
            const reset_state = '';
            SetEvent(reset_state);
            SetGame1(reset_state);
            SetGame1_opp(reset_state);
            SetGame2(reset_state);
            SetGame2_opp(reset_state);
            SetGame3(reset_state);
            SetGame3_opp(reset_state);
            SetEvent(reset_state);
            navigation.navigate('tournamentmatches');
        })
      }
  }

  return (
    <View style={{flex: 1}}>
        <Text style={styles.margin}>The max score is set at 30. There will be no conditioning rules set. Please make sure you put the scores in correctly. Especially in the UK, a lot of tournaments may have used weird scoring formats so this app tries to take that into account.</Text>

        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={{flexDirection: 'row', marginLeft: 5}}>
                <Icon name='ios-arrow-dropright-circle' color={'#080557'} size={15} style={{top: 4}}></Icon>
                <ModalDropdown options={categories} style={styles.margin} defaultValue={'Click here to select event...'} showsVerticalScrollIndicator={true} onSelect={e => SetEvent(e)} accessibilityValue={event}></ModalDropdown>
            </View>

            <View style={styles.set_border}>
                <View style={styles.set_header}>
                    <Text style={{marginLeft: 5, color: 'white'}}>Set 1</Text>
                </View>
                <View>
                    <TextInput placeholder="Your score" style={styles.scoreinput} keyboardType={'number-pad'} onChangeText={(e) => SetGame1(e)} value={String(game1)}></TextInput>
                    <TextInput placeholder="Opponents score" style={styles.scoreinput} keyboardType={'number-pad'} onChangeText={(e) => SetGame1_opp(e)} value={String(game1_opp)}></TextInput>
                </View>
            </View>

            <View style={styles.set_border}>
                <View style={styles.set_header}>
                    <Text style={{marginLeft: 5, color: 'white'}}>Set 2</Text>
                </View>
                <View>
                    <TextInput placeholder="Your score" style={styles.scoreinput} keyboardType={'number-pad'} onChangeText={(e) => SetGame2(e)} value={String(game2)}></TextInput>
                    <TextInput placeholder="Opponents score" style={styles.scoreinput} keyboardType={'number-pad'} onChangeText={(e) => SetGame2_opp(e)} value={String(game2_opp)}></TextInput>
                </View>
            </View>

            <View style={styles.set_border}>
                <View style={styles.set_header}>
                    <Text style={{marginLeft: 5, color: 'white'}}>Set 3</Text>
                </View>
                <View>
                    <TextInput placeholder="Your score" style={styles.scoreinput} keyboardType={'number-pad'} onChangeText={(e) => SetGame3(e)} value={String(game3)}></TextInput>
                    <TextInput placeholder="Opponents score" style={styles.scoreinput} keyboardType={'number-pad'} onChangeText={(e) => SetGame3_opp(e)} value={String(game3_opp)}></TextInput>
                </View>
            </View>
        
            <View style={{alignItems: 'center'}}>
                <Icon name='ios-add-circle' size={50} color='#080557' style={styles.margin} onPress={() => submit_scores()}></Icon>
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      fontWeight: '800',
      marginTop: 10
    },
    margin: {
      margin: 5
    },
    scoreinput: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 2,
      borderColor: 'lightgrey'
    },
    set_header: {
        backgroundColor: '#080557'
    },
    set_border: {
        borderWidth: 2,
        borderColor: '#080557',
        margin: 5
    }
});

