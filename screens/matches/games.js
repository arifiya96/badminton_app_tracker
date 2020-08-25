import React, { useEffect, useState} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

//This page will load all the games from the match.
//You can add a game and it will automatically load after it has been added.
//The add game page is called game_entry.js.

export default function Game_List({route, navigation}){
    //Call all the variables needed from the previous page (landing page)
    const {itemID} = route.params;
    const {itemDate} = route.params;
    const {itemName} = route.params;
    
    //Games for a specific match
    const [games, SetGames] = useState([]);

    //Sort matches out according to event
    const [ms, setMS] = useState([]);
    const [ws, setWS] = useState([]);
    const [md, setMD] = useState([]);
    const [wd, setWD] = useState([]);
    const [xd, setXD] = useState([]);

    const [loading, setLoading] = useState(true);

    const delete_score = (e) => {
        Alert.alert(
            'Delete score?',
            'This cannot be undone. Try not to delete if you are trying to get a good data report...',
            [{
                text:'Cancel',
                style:'cancel'
            },
        {text:'Confirm', onPress: () => {
            firebase.firestore().collection('matches').doc(itemID).collection('games').doc(e).delete();
        }}]
        )
    }

    //Individual components to be rendered if there are scores
    //I used the map function instead of the flatlist so that the scrollview can be used (cannot use flatlist
    //within a scrollview). It should be okay since there won't be a list of more than 10...
    const mens_singles = 
    <View style={styles.margin}>
        <Text style={styles.event_title}>Event: Mens Singles</Text>
        {ms.map((m, i) => (
            <View style={styles.event_style} key={i}>
                <View style={styles.match_header}>
                    <Text style={{color: 'white'}}>MS Match</Text>
                    <Icon name='ios-trash' color={'white'} size={18} style={{marginLeft: 280}} onPress={event => delete_score(m.key)}></Icon>
                </View>
                {parseInt(m.game1_score + m.game2_score + m.game3_score) > parseInt(m.game1_score_opp + m.game2_score + m.game3_score_opp) ? 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Your Score</Text>
                        <View style={{width: 225}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Opponent Score</Text>
                        <View style={{width: 194}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>: 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Your Score</Text>
                        <View style={{width: 230}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Opponent Score</Text>
                        <View style={{width: 189}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>}
            </View>
        ))}
    </View>
    const womens_singles = 
    <View style={styles.margin}>
        <Text style={styles.event_title}>Event: Womens Singles</Text>
        {ws.map((m, i) => (
            <View style={styles.event_style} key={i}>
                <View style={styles.match_header}>
                    <Text style={{color: 'white'}}>WS Match</Text>
                    <Icon name='ios-trash' color={'white'} size={18} style={{marginLeft: 280}} onPress={event => delete_score(m.key)}></Icon>
                </View>
                {parseInt(m.game1_score + m.game2_score + m.game3_score) > parseInt(m.game1_score_opp + m.game2_score + m.game3_score_opp) ? 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Your Score</Text>
                        <View style={{width: 225}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Opponent Score</Text>
                        <View style={{width: 194}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>: 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Your Score</Text>
                        <View style={{width: 230}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Opponent Score</Text>
                        <View style={{width: 189}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>}
            </View>
        ))}
    </View>
    const mens_doubles = 
    <View style={styles.margin}>
        <Text style={styles.event_title}>Event: Mens Doubles</Text>
        {md.map((m, i) => (
            <View style={styles.event_style} key={i}>
                <View style={styles.match_header}>
                    <Text style={{color: 'white'}}>MD Match</Text>
                    <Icon name='ios-trash' color={'white'} size={18} style={{marginLeft: 280}} onPress={event => delete_score(m.key)}></Icon>
                </View>
                {parseInt(m.game1_score + m.game2_score + m.game3_score) > parseInt(m.game1_score_opp + m.game2_score + m.game3_score_opp) ? 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Your Score</Text>
                        <View style={{width: 225}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Opponent Score</Text>
                        <View style={{width: 194}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>: 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Your Score</Text>
                        <View style={{width: 230}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Opponent Score</Text>
                        <View style={{width: 189}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>}
            </View>
        ))}
    </View>
    const womens_doubles =
    <View style={styles.margin}>
        <Text style={styles.event_title}>Event: Womens Doubles</Text>
        {wd.map((m, i) => (
            <View style={styles.event_style} key={i}>
                <View style={styles.match_header}>
                    <Text style={{color: 'white'}}>WD Match</Text>
                    <Icon name='ios-trash' color={'white'} size={18} style={{marginLeft: 280}} onPress={event => delete_score(m.key)}></Icon>
                </View>
                {parseInt(m.game1_score + m.game2_score + m.game3_score) > parseInt(m.game1_score_opp + m.game2_score + m.game3_score_opp) ? 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Your Score</Text>
                        <View style={{width: 225}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Opponent Score</Text>
                        <View style={{width: 194}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>: 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Your Score</Text>
                        <View style={{width: 230}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Opponent Score</Text>
                        <View style={{width: 189}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>}
            </View>
        ))}
    </View>
    const mixed_doubles = 
    <View style={styles.margin}>
        <Text style={styles.event_title}>Event: Mixed Doubles</Text>
        {xd.map((m, i) => (
            <View style={styles.event_style} key={i}>
                <View style={styles.match_header}>
                    <Text style={{color: 'white'}}>XD Match</Text>
                    <Icon name='ios-trash' color={'white'} size={18} style={{marginLeft: 280}} onPress={event => delete_score(m.key)}></Icon>
                </View>
                {parseInt(m.game1_score + m.game2_score + m.game3_score) > parseInt(m.game1_score_opp + m.game2_score + m.game3_score_opp) ? 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Your Score</Text>
                        <View style={{width: 225}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Opponent Score</Text>
                        <View style={{width: 194}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>: 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Your Score</Text>
                        <View style={{width: 230}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'#b30000'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Opponent Score</Text>
                        <View style={{width: 189}}>
                            <Icon name='ios-radio-button-on' size={10} style={{top: 4, marginLeft: 5}} color={'green'}></Icon>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game1_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game2_score_opp}</Text>
                        </View>
                        <View style={{margin: 1}}>
                            <Text style={{width: 18, textAlign:'center'}}>{m.game3_score_opp}</Text>
                        </View>
                    </View>
                </View>}
            </View>
        ))}
    </View>

    //Loading games from matches
    useEffect(() => {
        //get the list of games
        const games_list = firebase.firestore().collection('matches').doc(itemID).collection('games').onSnapshot(querySnapshot => {
            const game = [];
            querySnapshot.forEach(documentSnapshot => {
                game.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                });
            });
            SetGames(game);

            const ms_1 = [];
            const ws_1 = [];
            const md_1 = [];
            const wd_1 = [];
            const xd_1 = [];
            
            //Map through all the matches in tourney and organise them into their respective events
            game.map(m => {
                if (m.event === 'Mens Singles'){
                    ms_1.push(m);
                } else if (m.event === 'Womens Singles'){
                    ws_1.push(m);
                } else if (m.event === 'Mens Doubles'){
                    md_1.push(m);
                } else if (m.event === 'Womens Doubles'){
                    wd_1.push(m);
                } else {
                    xd_1.push(m);
                }
            })
            setMS(ms_1);
            setWS(ws_1);
            setMD(md_1);
            setWD(wd_1);
            setXD(xd_1);
            setLoading(false);
        })
        return () => games_list();
    }, []);

    const delete_match = () => {
        Alert.alert(
            'WARNING!',
            'Are you sure you want to delete this match? This cannot be undone',
            [{
                text:'Cancel',
                style:'cancel'
            },
            {text:'Confirm', onPress: () => {
                firebase.firestore().collection('matches').doc(itemID).delete()
                .then(() => {
                    alert('Match deleted!');
                    navigation.navigate('Matches');
                })
            }}]
        )
    }

    /*
    As above, the app will make a call to my firestore data as the page loads. In order to optimise the app in the
    future, I might need to pass the data through screens instead of making a call everytime the page loads. I already
    have access to the data from the first page. Explore this alternative? I may need to use redux potentially.
    */

    if(loading){
        return <ActivityIndicator></ActivityIndicator>
    }

    return (
        <View style={{flex: 1}}>
            <View>
                <Button title='Click here to add a match' onPress={event => navigation.navigate('game_entry',{itemID: itemID, itemDate: itemDate})}></Button>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.tournament_title}>{itemName}</Text>
              <Icon name='ios-brush' color={'#080557'} size={20} style={{top: 9, marginLeft: 10}} onPress={event => navigation.navigate('opponent_namechange',{itemID: itemID, itemDate: itemDate, itemName: itemName})}></Icon>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.tournament_date}>{itemDate[2]}/{itemDate[1]}/{itemDate[0]}</Text>
              <Icon name='ios-brush' color={'grey'} size={15} style={{marginLeft: 10, top: 1}} onPress={event => navigation.navigate('match_datechange',{itemID: itemID, itemDate: itemDate, itemName: itemName})}></Icon>
            </View>

            <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                <Icon name='ios-podium' color='#080557' size={20}></Icon>
                <TouchableOpacity>
                    <Text style={{marginLeft: 2, top: 2, color: '#080557', textDecorationLine: 'underline'}}>Games overview</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView>
                <View style={{marginTop: 10}}>
                    {ms ? mens_singles: null}
                    {wd ? womens_singles: null}
                    {md ? mens_doubles: null}
                    {wd ? womens_doubles: null}
                    {xd ? mixed_doubles: null}
                </View>
            </ScrollView>

            <View style={{margin: 10, alignItems:'center'}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={event => delete_match()}>
                    <Icon name='ios-trash' size={30} color={'red'}></Icon>
                    <Text style={{color: 'red', marginLeft: 10, top: 5}}>Delete match</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    margin: {
        margin: 5
    },
    scoreinput: {
        margin: 5,
        borderWidth: 2,
        borderColor: 'lightgrey'
    },
    tournament_title: {
        marginLeft: 5,
        fontSize: 30,
        fontWeight: '600',
        color: '#080557'
    },
    tournament_date: {
        marginLeft: 5,
        fontSize: 15,
        color: '#707585'
    },
    event_title: {
        margin: 5,
        fontWeight: '600',
        fontSize: 20,
        color: '#080557'
    },
    event_style: {
        borderWidth: 2,
        borderColor: '#080557',
        marginBottom: 10
    },
    match_header: {
        backgroundColor: '#080557',
        flexDirection:'row'
    }
})