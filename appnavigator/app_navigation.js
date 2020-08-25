import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StartScreen from '/Users/ifkar/badminton-tracker-app/screens/auth/startscreen';
import Bottom_tabs from '/Users/ifkar/badminton-tracker-app/appnavigator/bottom_tab';
import Singupscreen from '/Users/ifkar/badminton-tracker-app/screens/auth/signupscreen';
import Forgotpasswordscreen from '/Users/ifkar/badminton-tracker-app/screens/auth/forgotpasswordscreen';
import Loading from '/Users/ifkar/badminton-tracker-app/screens/auth/loadingscreen';
import Event from '../screens/tournaments/matches';
import Icon from 'react-native-vector-icons/Ionicons';
import Match_entry from '../screens/tournaments/match_entry';
import Games_List from '../screens/matches/games';
import Game_entry from '../screens/matches/game_entry';
import Exercises from '../screens/training/exercises';
import Create_Exercise_Entry from '../screens/training/create_exercise_entry';
import Tournament_namechange from '../screens/tournaments/tournament_namechange';
import Tournament_datechange from '../screens/tournaments/tournament_datechange';
import Opponent_namechange from '../screens/matches/opponent_namechange';
import Match_datechange from '../screens/matches/match_datechange';
import Tournament_overview from '../screens/tournaments/tournament_overview';
import Tournament_single_overview from '../screens/tournaments/tournament_match_overview';

import * as firebase from 'firebase';

export default function AppNavigator () {
        const Stack = createStackNavigator();

        //logout button
        logout = () => {
            firebase.auth().signOut().then(function(){
                alert('Successfully logged out');
            }).catch(function(error){
                alert(error.message);
            })
        }

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="loading" component={Loading} options={{
                        header: () => null
                    }}></Stack.Screen>
                    <Stack.Screen name="startscreen" component={StartScreen} options={{
                        header: () => null,
                        gestureEnabled: false
                    }}></Stack.Screen>
                    <Stack.Screen name="signupscreen" component={Singupscreen} options={{
                        headerTitle: 'Sign up',
                        headerBackTitle: 'Login'
                    }}></Stack.Screen>
                    <Stack.Screen name="forgotpasswordscreen" component={Forgotpasswordscreen} options={{
                        headerTitle: 'Forgot password',
                        headerBackTitle: 'Login'
                    }}></Stack.Screen>
                    <Stack.Screen name="mainapp" component={Bottom_tabs} options={{
                        title: "My Home",
                        headerStyle: {
                            backgroundColor: '#080557',
                        },
                        headerTintColor: '#fff',
                        headerLeft: () => (
                            <Icon name='ios-log-out' color='#fff' size={25} style={{marginLeft: 5}} onPress={() => logout()}></Icon>
                        ),
                        gestureEnabled: false 
                    }}></Stack.Screen>
                    <Stack.Screen name="tournamentmatches" component={Event} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Matches and Events",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="match_entry" component={Match_entry} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Enter new match",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="games" component={Games_List} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Your Games",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="game_entry" component={Game_entry} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Enter a game",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="exercises" component={Exercises} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Your training session",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="Create_new_exercise" component={Create_Exercise_Entry} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Add new exercise",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="tournament_namechange" component={Tournament_namechange} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Change tournament name",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="tournament_datechange" component={Tournament_datechange} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Change tournament date",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="opponent_namechange" component={Opponent_namechange} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Change opponent name",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="match_datechange" component={Match_datechange} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Change match date",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="tournament_overview" component={Tournament_overview} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Tournament Progress",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                    <Stack.Screen name="tournament_single_overview" component={Tournament_single_overview} options={{
                        headerStyle: {
                            backgroundColor: '#080557'
                        },
                        headerBackTitle: "",
                        title: "Tournament Overview",
                        headerTintColor: '#fff'
                    }}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
    )
};
