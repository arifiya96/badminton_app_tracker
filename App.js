import React from 'react';
import {decode, encode} from 'base-64';

if (!global.btoa) {global.btoa = encode};
if (!global.atob) {global.atob = decode}; 

import App_navigator from './appnavigator/app_navigation';

import * as firebase from 'firebase';
import firebaseConfig from './api/ApiKeys';

import Test from './screens/test';

//Initialise firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
    return (
        <App_navigator />
    )
}


