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



let pjb = require('../assets/PinkJellyBean.png')
let pujb = require('../assets/PurpleJellyBean.png')
let bjb = require('../assets/BlueJellyBean.png')
let ojb = require('../assets/OrangeJellyBean.png')
let gjb = require('../assets/GreenJellyBean.png')
let yjb = require('../assets/YellowJellyBean.png')
let rjb = require('../assets/RedJellyBean.png')


export default class Draggable extends Component<{}> {

  constructor(props){
      super(props);

      this.state = {
          dropZoneValues: null,
          scale    : new Animated.Value(1),
          showDraggable: true,
          start : new Animated.ValueXY(),
          end: new Animated.ValueXY,
          view: this.props.subviews
      };
    }

    forceUpdateHandler(){
  this.forceUpdate();
};


  render(){


    let beans = [pjb,pujb,bjb,ojb,gjb,yjb,rjb]


    let scale = this.props.scale;


      let [translateX, translateY] = [this.props.location.x, this.props.location.y];

      let theview = this.props.subview

      console.log('HELLO! The render function of Tile has been called!')

      return (
        // The coordinates of the view will transform to the 'prop' location and locationc


        <Animated.View style = {[{transform: [{translateX}, {translateY},{scale}]}]} >
                  {theview}
          </Animated.View>

      );
  }
}




let Window = Dimensions.get('window');
let CIRCLE_RADIUS = 25;
let windowSpan = Math.min(Window.width,Window.height)
let TILE_WIDTH = Window.height/7;

let styles = StyleSheet.create({
 child: {
     flexDirection: 'row',
     flex: 1
 },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    circle      : {
        width               : 1/2*CIRCLE_RADIUS,
        height              : 1/2*CIRCLE_RADIUS,
        borderRadius        : 10,
    },
    tile      : {
      width               : TILE_WIDTH,
      height              : TILE_WIDTH,
    }
});


module.exports = Draggable
