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
// import Viewport from './app/Viewport';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



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
          startIndex: [0,0],
          endIndex: [0,0],
          grid: [[new Animated.ValueXY]],
          origin: [0,0],
          width: 0,
          height: 0
      };

    }




      onSwipeUp() {
        console.log('swiped up')
      }

      onSwipeDown(gestureState) {
        console.log('swiped down')
      }

      onSwipeLeft(gestureState) {
        console.log('swiped left')
      }

      onSwipeRight(gestureState) {
        console.log('swiped right')
      }

      onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
          case SWIPE_UP:
            this.setState({backgroundColor: 'red'});
            break;
          case SWIPE_DOWN:
            this.setState({backgroundColor: 'green'});
            break;
          case SWIPE_LEFT:
            this.setState({backgroundColor: 'blue'});
            break;
          case SWIPE_RIGHT:
            this.setState({backgroundColor: 'yellow'});
            break;
        }
      }



  updateGrid(i,j) {




  }

  componentWillMount(){

    }

    onLayout = event => {

      console.log('onLayout was called')

      console.log('this is the x value of the native event:')
      console.log(event.nativeEvent.layout.x)
      console.log('this is the y value of the native event:')
      console.log(event.nativeEvent.layout.y)

      let [a,b] = [event.nativeEvent.layout.x,event.nativeEvent.layout.y]
      let dW = event.nativeEvent.layout.width
      let dH = event.nativeEvent.layout.height

      console.log('this is the width',dW)
      console.log('this is the height',dH)

      this.setState({origin: [a,b]});

      this.setState({width: dW});
      this.setState({height: dH});

    }



    componentDidMount()
    {
      console.log('My Swappable Grid Mounted')
      console.log(this.state.origin)

    }



  render(){

      return (
        <GestureRecognizer onSwipeUp = {this.onSwipeUp} >
        <View style = {styles.container}>
            {this.props.tiles}
        </View>
        </GestureRecognizer>
      );
  }


}


let Window = Dimensions.get('window');
let CIRCLE_RADIUS = Window.width/19;

let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1,
        flexDirection: 'column',
        marginTop: 200,
        height: CIRCLE_RADIUS*10,
        justifyContent: 'center',
        backgroundColor: '#2c3e50'
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dropZone    : {
        width        : 350,
        height: 350,
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
      width               : 70,
      height              : 70,
      borderRadius        : 15,
      backgroundColor:'#f21859',
      borderWidth: 5,
      borderColor: '#ffffff'
    }
});
