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

export default class MovablePiece extends Component<{}> {

  constructor(props){
      super(props);

      this.state = {
          dropZoneValues: null,
          scale    : new Animated.Value(1),
          showDraggable: true,
          start : new Animated.ValueXY(),
          end: new Animated.ValueXY,
      };


      // Create Pan Responders
      this.panResponder = PanResponder.create({

          onStartShouldSetPanResponder : () => true,
          onPanResponderMove           : Animated.event([null, {
              dx : this.props.spots.x,
              dy : this.props.spots.y
          }]),

          onPanResponderGrant: (e, gestureState) => {

            let nE = e.nativeEvent

            console.log('this is the native event X and Y location on grant.',nE.locationX,nE.locationY)
            console.log('this is the x._value on Grant',this.props.spots.x._value)
            console.log('this is the y._value on Grant',this.props.spots.y._value)

            // Set the initial value to the current state
            this.props.spots.setOffset({x: this.props.spots.x._value, y: this.props.spots.y._value});
            this.props.spots.setValue({x: 0, y: 0});


            //Animated.spring(this.state.scale, {toValue: 1.2, friction: 1}).start();

          },


          onPanResponderRelease: (e, gesture) => {


            let nE = e.nativeEvent

            console.log('this is the native event X and Y location on release.',nE.locationX,nE.locationY)
            console.log('this is the x._value on Release',this.props.spots.x._value)

            // Thought: Could we update the state here because we're going to know what direction the pan went?

            // MOOOOOOOO!
            //this.props.update(this.state.gridXY[0],this.state.gridXY[1])

            //this.setState({gridXY: [this.props.gridiX,this.props.gridiY] })


            // Flatten the offset to avoid erratic behavior
            this.props.spots.flattenOffset();

        //  Animated.spring(this.state.scale, {toValue: 1, friction: 5}).start();

          }

          });


        //this.props.spots.addListener(({value}) => this.props.update(value))


}

componentDidMount() {

  console.log('this is the window in componentDidMount', Dimensions.get('window'))

  //this.setState({gridXY: [this.props.gridiX,this.props.gridiY]})

}



  render(){


    let {scale} = this.state;

    let rotate = '0deg';


var s = styles.circle
var sn = styles.circle

let a = <View style = {styles.circle}/>

let [translateX, translateY] = [this.props.spots.x, this.props.spots.y];

var x = this.props.grid.map((row,i) => {

  let y = row.map((e,j) => {

  return (e === 1) ?  <Animated.View key = {j} style = {[{transform: [{translateX}, {translateY},{scale}]}]} {...this.panResponder.panHandlers}>
            {this.props.subviews}
          </Animated.View> : <View key = {j} style={s}/>})

  return
  {y}
  })

      return (
        <Animated.View style = {[{transform: [{translateX}, {translateY},{scale}]}]} {...this.panResponder.panHandlers}>
                  {this.props.subviews}
          </Animated.View>

      );
  }
}




let Window = Dimensions.get('window');
let CIRCLE_RADIUS = 25;
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
    }
});


module.exports = Draggable
