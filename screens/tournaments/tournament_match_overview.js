import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { StackedBarChart } from 'react-native-svg-charts';

//Each view acts as a row

export default function Tournament_single_overview({route}){
    const {itemID} = route.params;
    const [loading, setLoading] = useState(true);
    const [games_played, set_games_played] = useState([]);
    const [wins, set_wins] = useState([]);
    const [losses, set_losses] = useState([]);
    const [sets_won, set_sets_won] = useState([]);
    const [sets_lost, set_sets_lost] = useState([]);
    const [points_won, set_points_won] = useState([]);
    const [points_lost, set_points_lost] = useState([]);

    //Info needed for the charts
    const [rubbers, set_rubbers] = useState([{}]);
    const [games, set_games] = useState([{}]);
    const [points, set_points] = useState([{points_won: 0, points_lost: 0}]);
    const colours = ['green','#b30000'];
    const keys_rubbers = ['Rubbers won','Rubbers lost'];

    useEffect(() => {
        const match_list = firebase.firestore().collection('tournaments').doc(itemID).collection('tournament_matches').onSnapshot(querySnapshot => {
            const match = [];
            querySnapshot.forEach(documentSnapshot => {
                match.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                });
            });
            setLoading(false);

            const games_played_1 = [];
            const wins_1 = [];
            const losses_1 = [];
            const sets_won_1 = [];
            const sets_lost_1 = [];
            const points_won_1 = [];
            const points_lost_1 = [];

            match.map(m => {
                games_played_1.push(m.event);
                parseInt(m.game1_score + m.game2_score + m.game3_score) > parseInt(m.game1_score_opp + m.game2_score_opp + m.game3_score_opp) ? wins_1.push('W') : losses_1.push('L');
                parseInt(m.game1_score) > parseInt(m.game1_score_opp) ? sets_won_1.push('W') : sets_lost_1.push('L');
                parseInt(m.game2_score) > parseInt(m.game2_score_opp) ? sets_won_1.push('W') : sets_lost_1.push('L');
                if (m.game3_score && m.game3_score_opp){
                    parseInt(m.game3_score) > parseInt(m.game3_score_opp) ? sets_won_1.push('W') : sets_lost_1.push('L');
                }
                points_won_1.push(parseInt(m.game1_score));
                points_won_1.push(parseInt(m.game2_score));
                points_lost_1.push(parseInt(m.game1_score_opp));
                points_lost_1.push(parseInt(m.game2_score_opp));
                if (m.game3_score && m.game3_score_opp){
                    points_won_1.push(parseInt(m.game3_score));
                    points_lost_1.push(parseInt(m.game3_score_opp));
                }
            })

            set_games_played(games_played_1);
            set_wins(wins_1);
            set_losses(losses_1);
            set_sets_won(sets_won_1);
            set_sets_lost(sets_lost_1);
            set_points_won(points_won_1);
            set_points_lost(points_lost_1);
            set_rubbers({rubbers_won: wins_1.length, rubbers_lost: losses_1.length});
            set_games({games_won: sets_won_1.length, games_lost: sets_lost_1.length});

        })
        return () => match_list();
    },[])

    if(loading){
        return <ActivityIndicator></ActivityIndicator>
    }

    return (
        <View>
            <ScrollView>
                <View>
                    <View style={{margin: 10, backgroundColor:'#080557'}}>
                        <Text style={{fontSize: 20, margin: 5, color:'white'}}>Summary</Text>
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10, flexDirection:'row'}}>
                        <Text style={{color:'grey', margin: 5}}>Games played</Text>
                        <Text style={{margin: 5}}>{games_played.length}</Text>
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10, flexDirection:'row'}}>
                        <Text style={{color:'grey', margin: 5}}>Rubbers</Text>
                        <Text style={{margin: 5}}>{wins.length} - {losses.length}</Text>
                        <Text>{JSON.stringify(rubbers)}</Text>
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10, flexDirection:'row'}}>
                        <Text style={{color:'grey', margin: 5}}>Games</Text>
                        <Text style={{margin: 5}}>{sets_won.length} - {sets_lost.length}</Text>
                        <Text>{JSON.stringify(games)}</Text>
                    </View>
                    <View style={{marginLeft: 10, marginRight: 10, flexDirection:'row'}}>
                        <Text style={{color:'grey', margin: 5}}>Points</Text>
                        <Text style={{margin: 5}}>{points_won.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue;
                        }, 0)} - {points_lost.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue;
                        }, 0)}</Text>
                        <Text>{JSON.stringify(points)}</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}