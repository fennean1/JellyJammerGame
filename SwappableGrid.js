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


// import Number from './Number';
import Draggable from './Draggable';
import Piece from './Pieces';
import Grid from './Grid';
// import Viewport from './app/Viewport';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Swappables extends Component<{}> {

  constructor(props){
      super(props);

      this.state = {
          grid: [[new Animated.ValueXY]]
      };

    }

  updateGrid(pan) {

    console.log('poop')

    //this.setState({grid[0][0]: pan})

  }

  componentWillMount(){


    let dummygrid =  [[11,12,13,14,15],[21,22,23,24,25],[31,32,33,34,35],[41,42,43,44,45],[51, 52, 53,54,55]]

    var points = dummygrid.map((row,i) => {

      let y = row.map((e,j) => {

        let newPoint = new Animated.ValueXY()

      return newPoint})

      return y})

      this.setState({grid: points})


    }

    setDropZoneValues(newValue){      //Step 1
        this.setState({
            grid : newValue
        });
    }


  render(){

    let dummygrid =  [[11,12,13,14,15],[21,22,23,24,25],[31,32,33,34,35],[41,42,43,44,45],[51, 52, 53,54,55]]


    var points = dummygrid.map((row,i) => {


      let y = row.map((e,j) => {

        let newPoint = new Animated.ValueXY()

      return newPoint})

      return y})



    var pan = new Animated.ValueXY()

    var s = styles.circle
    var sn = styles.nocircle


    let Grid =  [[11,12,13,14,15],[21,22,23,24,25],[31,32,33,34,35],[41,42,43,44,45],[51, 52, 53,54,55]]

    let a = <View style = {styles.circle}/>

    let gridPieceOne = [[1]]

    var x = Grid.map((row,i) => {

      let y = row.map((e,j) => {
      return <Draggable update = {this.updateGrid.bind(this)} spots = {this.state.grid[j][i]} key = {j}
      style = {styles.circle} grid = {gridPieceOne} subviews = {a}/>})

      return <View key = {i}>{y}</View>})

      return (

<View  style = {styles.mainContainer}>
<View flexDirection = 'row'>
{x}
</View>

</View>


      );
  }


}


let Window = Dimensions.get('window');
let CIRCLE_RADIUS = Window.width/15;

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
