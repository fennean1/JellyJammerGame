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
} from 'react-native';

// import { primaryColor } from “../styles/common.js”;

// import Viewport from './app/Viewport';

import Draggable from './Draggable';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Piece extends Component<{}> {


  constructor(props){
      super(props);

      this.state = {
          location    : new Animated.ValueXY(),
      };

    }


    handlePan = (a,b) => {

      this.state.location.setValue({x: a, y: b});

    }

  render(){


    let grid =  [[1, 0, 0],[1, 0, 0],[1, 1, 1]]

var s = styles.circle
var sn = styles.nocircle

let a = <View style = {styles.circle}/>

let [translateX, translateY] = [500, 500];


var x = grid.map(row => {

  let y = row.map(e => {
  return (e === 1) ?  <View><Draggable panHandler = {this.handlePan} subviews = {a} style = {styles.circle}/></View> : <View style={sn}/>})

  return <View>{y}</View>})

      return (

        <Animated.View style = {[{transform: [{translateX}, {translateY}]}]}  style = {styles.container}>
         {x}
        </Animated.View>


      );
  }


}


let Window = Dimensions.get('window');
let CIRCLE_RADIUS = Window.width/20



let styles = StyleSheet.create({
 tuffytile: {
     flexDirection: 'column',
     flex: 1,
     width: 35,
height: 35
 },
 container: {
 flexDirection: 'row',
 height: 100,
 width: 100,
},
  wrapper: {
      flex    : 1,
      flexDirection: 'column'
  },
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    column: {
        flex    : 1,
        flexDirection: 'column'
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
    circle      : {
      width               : CIRCLE_RADIUS*2,
      height              : CIRCLE_RADIUS*2,
      borderRadius        : 10,
      backgroundColor     : '#2c3e50',
      borderWidth         : 4,
      borderColor         : '#ffffff',
    },
    nocircle      : {
      width               : CIRCLE_RADIUS*2,
      height              : CIRCLE_RADIUS*2,
    }
});


module.exports = Piece
