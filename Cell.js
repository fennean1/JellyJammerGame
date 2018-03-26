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


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Draggable extends Component<{}> {

  constructor(props){
      super(props);

      this.state = {
          dropZoneValues: null,
          pan     : new Animated.ValueXY(),
          scale    : new Animated.Value(1),
          showDraggable: true
      };

      // Create Pan Responders
      this.panResponder = PanResponder.create({

          onStartShouldSetPanResponder : () => true,
          onPanResponderMove           : Animated.event([null, { //Step 3
              dx : this.state.pan.x,
              dy : this.state.pan.y
          }]),

          onPanResponderGrant: (e, gestureState) => {
            // Set the initial value to the current state
            this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
            this.state.pan.setValue({x: 0, y: 0});


            Animated.spring(this.state.scale, {toValue: 1, friction: 1}).start();

          },

          onPanResponderRelease: (e, gesture) => {

            // Flatten the offset to avoid erratic behavior
          this.state.pan.flattenOffset();

          Animated.spring(this.state.scale, {toValue: 1, friction: 5}).start();

          }

          });

}


  break;

setDropZoneValues(event){      //Step 1
    this.setState({
        dropZoneValues : event.nativeEvent.layout
    });
}



  render(){


    let {pan} = this.state;
    let {scale} = this.state;

    let rotate = '0deg';


var s = styles.circle
var sn = styles.circle

let a = <View style = {styles.circle}/>

let [translateX, translateY] = [pan.x, pan.y];


var x = this.props.grid.map((row,i) => {

  let y = row.map((e,j) => {

  return (e === 1) ?  <Animated.View key = {j} style = {[{transform: [{translateX}, {translateY}]}]} {...this.panResponder.panHandlers}>
            {this.props.subviews}
          </Animated.View> : <View key = {j} style={s}/>})

  return <View key = {i}  >{y}</View>})

      return (
        <View style = {styles.container}>
        {x}
        </View>
      );
  }
}




let Window = Dimensions.get('window');
let CIRCLE_RADIUS = Window.width/12;
let styles = StyleSheet.create({
 child: {
     flexDirection: 'row',
     flex: 1
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
    }
});


module.exports = Draggable
