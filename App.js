/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  AppRegistry

} from 'react-native';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer';


const loggerMiddleware = createLogger({predicate: (getState,action) =>  __DEV__});


function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);
return createStore(reducer,initialState, enhancer);
}

const store = configureStore({});



// import Number from './Number';
import Draggable from './Draggable';
import Swappable from './SwappableGrid';
import Piece from './Pieces';
import Grid from './Grid';
// import Viewport from './app/Viewport';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import {
  StackNavigator,
} from 'react-navigation';




 export default class App extends Component {

  constructor(props){
      super(props);

    }

  render(){

return (
  <Provider store = {store} >
      <AppContainer/>
  </Provider>
);
}
}




let Window = Dimensions.get('window');
let CIRCLE_RADIUS = Window.width/12;

let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1,
        flexDirection: 'column',
        marginTop: 200,
        justifyContent: 'center'

    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    container: {
    flex    : 1,
    flexDirection: 'row',
    justifyContent: 'center'
},
    circle      : {
      width               : 2*CIRCLE_RADIUS,
      height              : 2*CIRCLE_RADIUS,
      borderRadius        : 10,
        backgroundColor:'#f21859'
    }
});


//AppRegistry.registerComponent('Tuffy', () => Balls);
