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


import Draggable from './Draggable';



// import { primaryColor } from “../styles/common.js”;

export default class Piece extends Component<{}> {


  constructor(props){
      super(props);

      this.state = {
          location    : new Animated.ValueXY(),
      };

    }


  render(){

    let gridPieceOne = [[1]]



    let grid =  [[11,12,13,14,15],[21,22,23,24,25],[31,32,33,34,35],[41,42,43,44,45],[51, 52, 53,54,55]]

var s = styles.circle
var sn = styles.nocircle


let [translateX, translateY] = [500, 500];


var x = grid.map((row,i) => {

  let y = row.map((e,j) => {
  return <View key = {j} style={s}/>})

  return <View key = {i}>{y}</View>})

      return (

        <View flexDirection = 'row'>
         {x}
        </View>


      );
  }




}


let Window = Dimensions.get('window');
let CIRCLE_RADIUS = Window.width/12
let dx = Window.width/14



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
      width               : dx,
      height              : dx,
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
