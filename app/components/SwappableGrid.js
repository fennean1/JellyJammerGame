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
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

// import Number from './Number';
import Draggable from './Draggable';
import PlayArea from './PlayArea';
import Tile from './Tile';
// import Viewport from './app/Viewport';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


let pjb = require('../assets/PinkJellyBean.png')
let prjb = require('../assets/PurpleJellyBean.png')
let bjb = require('../assets/BlueJellyBean.png')
let ojb = require('../assets/OrangeJellyBean.png')
let gjb = require('../assets/GreenJellyBean.png')
let yjb = require('../assets/YellowJellyBean.png')
let rjb = require('../assets/RedJellyBean.png')
let BlueJam = require('../assets/BlueJam.png')
let RedJam = require('../assets/RedJam.png')
let GreenJam = require('../assets/GreenJam.png')
let floatingClouds = require('../assets/FloatingClouds.png')

var imageType = {
  PINKJELLYBEAN: pjb,
  PURPLEJELLYBEAN: prjb,
  BLUEJELLYBEAN: bjb,
  REDJELLYBEAN: rjb,
  YELLOWJELLYBEAN: yjb,
  ORANGEJELLYBEAN: ojb,
  GREENJELLYBEAN: gjb,
  REDJAM: RedJam,
  BLUEJAME: BlueJam,
};



class TileData {

  constructor(img,index, key) {

    this.index = index;
    this.key = key;
    this.location = new Animated.ValueXY;
    this.imageType = img;
    this.scale = new Animated.Value(1);
    this.view = <Image source={img} style = {styles.tile}/>

  }


    setView(imageType) {

          this.imageType = imageType
          this.view = <Image source={imageType} style = {styles.tile}/>

    }


}

export default class Swappables extends Component<{}> {

  constructor(props){
      super(props);

      this.state = {
          origin: [0,0],
          width: 0,
          height: 0,
          tileComponents: [[]],
          tileDataSource: [[new TileData]]
      };

    }


    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
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


    let initialGestureX = gestureState.x0
    let initialGestureY = gestureState.y0

    // Need to get convert location of swipe to an index.


    let i = Math.round((initialGestureX-this.state.origin[0]-0.5*TILE_WIDTH)/TILE_WIDTH)
    let j = Math.round((initialGestureY-this.state.origin[1]-0.5*TILE_WIDTH)/TILE_WIDTH)


    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:

        console.log('An upward swipe has been registered')

        if (j>0) {
          this.updateGrid(i,j,0,-1)
        }

        break;
      case SWIPE_DOWN:

      console.log('A downward swipe has been registered')

      if (j<4) {

      this.updateGrid(i,j,0,1)

    }

        break;
      case SWIPE_LEFT:

      console.log('A left swipe has been registered')

      if (i > 0) {
      this.updateGrid(i,j,-1,0)
    }

        break;
      case SWIPE_RIGHT:

      console.log('A right swipe has been registered')

      if (i<4) {
      this.updateGrid(i,j,1,0)
    }
        break;
    }
  }


  // Determines if the tile at location i,j has a neighbor of the same color.
  hasNeighbor(i,j) {

      var {tileDataSource} = this.state

      let hasANeighbor = false
      var neighbors = Array()

      let l = 1
      let r = 1
      let u = 1
      let d = 1

      if (i <= 0) {
        l = 0
      }

      if (i >= 4) {
        r = 0
      }

      if (j <= 0)
      {
        u = 0
      }

      if (j>=4) {
        d = 0
      }

      let spots = [l,r,u,d]
      let spotsLength = spots.length


      // Checking for edge cases.
      for (let m = 0; m < spotsLength; m++) {
        if (spots[m] != 0 ) {
          // left
          if (m == 0) {
            neighbors.push(tileDataSource[i-1][j])
          }
          // right
          if (m == 1) {
            neighbors.push(tileDataSource[i+1][j])
          }
          // up
          if (m == 2) {
            neighbors.push(tileDataSource[i][j-1])
          }
          // down
          if (m == 3) {
            neighbors.push(tileDataSource[i][j+1])
          }
        }

      }
      var neighborsLength = neighbors.length

      for (var n  = 0; n < neighborsLength; n++) {

      if (neighbors[n].imageType == tileDataSource[i][j].imageType) {

          hasANeighbor = true

      }

    }

    return hasANeighbor

}

pushTileDataToComponent() {


  var a = []
  // This creates the array of Tile components that is stored as a state variable
  var arr = this.state.tileDataSource.map((row,i) => {

    let rows = row.map((e,j) => {

    a.push( <Tile update = {this.updateGrid.bind(this)}
    location = {e.location} scale = {e.scale} key = {e.key} subview = {e.view} />)
    })
    // This is where the error occurs where an element no longer receives touches.
    // Don't wrap this in a view.
    return
    rows})

    this.setState({tileComponents: a})


}

  animateMatch(indexesToAnimate) {


                  let len = indexesToAnimate.length


                  for (var n = 0; n<len; n++) {

                    let e = indexesToAnimate[n]

                    let i = e[0]
                    let j = e[1]

                    Animated.sequence([
                    Animated.delay(500),
                    Animated.spring(this.state.tileDataSource[i][j].scale, {toValue: 0.8, friction: 10}),
                    Animated.spring(this.state.tileDataSource[i][j].scale, {toValue: 1, friction: 5})]
                  ).start(() => {  this.pushTileDataToComponent()});

                }


  }


  updateGrid(i,j,dx,dy) {

          let doesTheStartColorAllHaveNeighbors = false
          let doesTheEndColorAllHaveNeighbors = false
          let indexesWithStarterColor = [[]]
          let indexesWithEnderColor = [[]]


            const newData = this.state.tileDataSource
            const newComponents = this.state.tileComponents

            const swapStarterComponent = this.state.tileComponents[i][j]
            const swapEnderComponent = this.state.tileComponents[i+dx][i+dy]

            const swapStarter = this.state.tileDataSource[i][j]
            const swapEnder = this.state.tileDataSource[i+dx][j+dy]

            newData[i][j] = swapEnder
            newData[i+dx][j+dy] = swapStarter

            //newComponents[i][j] = swapEnderComponent
            //newComponents[i+dx][j+dy] = swapStarterComponent


            this.setState({tileDataSource: newData})

            indexesWithStarterColor = this.getIndexesWithColor(this.state.tileDataSource[i][j].imageType)
            indexesWithEnderColor = this.getIndexesWithColor(this.state.tileDataSource[i+dx][j+dy].imageType)

            doesTheStartColorAllHaveNeighbors = this.allHaveNeighbors(indexesWithStarterColor)
            console.log('Do all start colors have neighbors?',doesTheStartColorAllHaveNeighbors)
            doesTheEndColorAllHaveNeighbors = this.allHaveNeighbors(indexesWithEnderColor)
            console.log('Do all the end colors have neighbors?',doesTheEndColorAllHaveNeighbors)

            // Kinda clunky but it works.
            if (doesTheEndColorAllHaveNeighbors) {

                this.processNewMatch(indexesWithEnderColor)
                this.animateMatch(indexesWithEnderColor)

              }

              if (doesTheStartColorAllHaveNeighbors)
              {
                this.processNewMatch(indexesWithStarterColor)
                this.animateMatch(indexesWithStarterColor)
              }


}

allHaveNeighbors(indexes) {


  let len = indexes.length

  let theyAreAllNeighbors = true

  for (var n = 0; n < len; n++) {

    let i = indexes[n][0]
    let j = indexes[n][1]

      if (this.hasNeighbor(i,j) == false)
      {
        theyAreAllNeighbors = false
      }

  }

  return theyAreAllNeighbors

}

componentDidUpdate() {

      this.animateValuesToLocations()

}


  componentWillMount(){


    // Really dumb grid - does not need to have any values. Just so we can run map.
    let keys =  [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24]]

        var tileData = keys.map((row,i) => {

          let dataRows = row.map((key,j) => {

            let beans = [imageType.BLUEJELLYBEAN,imageType.PINKJELLYBEAN,imageType.PURPLEJELLYBEAN,imageType.YELLOWJELLYBEAN,imageType.ORANGEJELLYBEAN,imageType.GREENJELLYBEAN,imageType.REDJELLYBEAN]

            let randIndex = this.getRandomInt(7)

            console.log('this is the key that i am giving to the tile with index',[i,j],key)

            let data = new TileData(beans[randIndex],[i,j],key)

          return data})

          return dataRows})

      this.setState({tileDataSource: tileData})

    }

    onLayout(event) {

      this.setState({origin: [event.nativeEvent.layout.x,event.nativeEvent.layout.y]})

    }


    componentDidMount()
    {


      var a = []
      // This creates the array of Tile components that is stored as a state variable
      var arr = this.state.tileDataSource.map((row,i) => {

        let rows = row.map((e,j) => {

        a.push( <Tile update = {this.updateGrid.bind(this)}
        location = {e.location} scale = {e.scale} key = {e.key} subview = {e.view} />)
        })
        // This is where the error occurs where an element no longer receives touches.
        // Don't wrap this in a view.
        return
        rows})

        this.setState({tileComponents: a})

    }

    // Gets all indexes with a specific color.
    getIndexesWithColor(color) {

      let colorIndexes = new Array()

      let x = this.state.tileDataSource.map((row,i) => {

              let colorRow = row.map((e,j) => {

                if (e.imageType == color) {
                  colorIndexes.push([i,j])
                }

              })

        })

        return colorIndexes

      }




    // Animates the values in the tile data source based on their index in the array.
    animateValuesToLocations()
    {
            this.state.tileDataSource.map((row,i)=> {

              row.map((elem,j) => {

                Animated.spring(            //Step 1
                    elem.location,         //Step 2
                    {toValue: {x: TILE_WIDTH*i,y: TILE_WIDTH*j} }     //Step 3
                ).start()
            })
    })

  }


    processNewMatch(neighbors) {

      console.log('I am processing a new match and looking at the neighbors!',neighbors)

      this.setState((previousState) => {

        var x = previousState.tileDataSource.map((row,i) => {

          let y = row.map((e,j) => {


            let beans = [imageType.BLUEJELLYBEAN,imageType.PINKJELLYBEAN,imageType.PURPLEJELLYBEAN,imageType.YELLOWJELLYBEAN,imageType.ORANGEJELLYBEAN,imageType.GREENJELLYBEAN,imageType.REDJELLYBEAN]

            let randIndex = this.getRandomInt(7)

            let element = [i,j]

            let x = neighbors.filter(e => {return (i==e[0] && j==e[1])})

            if (x.length != 0)
            {
              e.setView(beans[randIndex])
              console.log('I am updating the process the match occuring at index:',element)

              return e

            }
            else {
              return e
            }
          })

          return y})

        return {tileDataSource: x}})

}


  render(){


      console.log('Render is being called and i have just created the grid again')

      return (
      <View style = {styles.mainView} >
        // onLayout grabs the dimensions of the gridView and stores as a state variable.
        <View style = {styles.gridSuperView} onLayout = {this.onLayout.bind(this)} >
          <View style = {styles.container} >
            // We need dimensionless view so that each
              <View>
                <GestureRecognizer style = {styles.gestureContainer}
                  onSwipe = {(direction, state) => this.onSwipe(direction, state)}>
                  {this.state.tileComponents}
                </GestureRecognizer>
              </View>
          </View>
        </View>
      </View>



      );
  }


}


let Window = Dimensions.get('window');
let windowSpan = Math.min(Window.width,Window.height)
let TILE_WIDTH = windowSpan/6;

let styles = StyleSheet.create({
    backGroundImage: {
      flex: 1,
      width: 300,
      height: 300,
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dropZone    : {
            flex: 1,
    },
    mainView: {
      flex: 1,
      alignItems: 'center'
    },
    jamjars: {
      width: 210,
      height: 70,
      flexDirection: 'row'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    gestureContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#2c3e50'

    },
    gridSuperView: {
      alignItems: 'center',
      marginTop: (Window.height-TILE_WIDTH*5)/2,
    },
    container: {

      width: TILE_WIDTH*5,
      height: TILE_WIDTH*5,
      //backgroundColor: '#89c2ff30',
      //borderRadius: 15,
},
    jar      : {
      width               : 70,
      height              : 70,
    },
    tile      : {
      width               : TILE_WIDTH,
      height              : TILE_WIDTH,
    }
});
