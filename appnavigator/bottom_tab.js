import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tournament_screen from '/Users/ifkar/badminton-tracker-app/screens/tournaments/tournaments_landing_page';
import Matches_screen from '/Users/ifkar/badminton-tracker-app/screens/matches/matches_landing_page';
import Training_screen from '/Users/ifkar/badminton-tracker-app/screens/training/training_landing_page';
import Changepassword from '/Users/ifkar/badminton-tracker-app/screens/auth/changepasswordscreen';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Bottom_tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Tournaments" component={Tournament_screen} options={{
                tabBarLabel: 'Tournaments',
                tabBarIcon: () => (
                  <Icon name="ios-trophy" color={'black'} size={25}></Icon>
                )
            }}></Tab.Screen>
            <Tab.Screen name="Matches" component={Matches_screen} options={{
                tabBarLabel: 'Matches',
                tabBarIcon: () => (
                  <Icon name="ios-stats" color={'black'} size={25}></Icon>
                )
            }}></Tab.Screen>
            <Tab.Screen name="Training" component={Training_screen} options={{
                tabBarLabel: 'Training',
                tabBarIcon: () => (
                  <Icon name="ios-body" color={'black'} size={25}></Icon>
                )
            }}></Tab.Screen>
            <Tab.Screen name="Settings" component={Changepassword} options={{
              tabBarLabel: 'Settings',
              tabBarIcon: () => (
                <Icon name="ios-settings" color={'black'} size={25}></Icon>
              )
            }}></Tab.Screen>
        </Tab.Navigator>
    )
};
