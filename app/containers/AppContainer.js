import React, {Component} from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import SwappableGrid from '../components/SwappableGrid';
//import {App} from './App';
import Dimensions from 'Dimensions';

const {
View,
Text,
TouchableHighlight,
Button,
StyleSheet,
ImageBackground
} = ReactNative

let floatingClouds = require('../assets/FloatingClouds.png')
let justClouds = require('../assets/CloudsBackground.png')


class AppContainer extends Component  {
  constructor(props) {
    super(props);

    this.state = {textShit: 'Test'}

  }

  componentDidMount()
  {


    // let Size = Dimensions.get('SwappableGrid').width;
  }

  addRecipe()
  {
    this.props.addRecipe();
  }


  layoutGrid() {

  this.setState({textShit: 'Dummy'})

  }


  render() {

    return   <ImageBackground source={justClouds} style ={styles.backGroundImage}>
  <SwappableGrid/>
    </ImageBackground>
  }

}


let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1,
        flexDirection: 'row',
        marginTop: 200,
        justifyContent: 'center',
        backgroundColor: '#2c3e50'

    },
    backGroundImage: {
      width: '100%',
      height: '100%',
      //alignSelf: 'stretch'
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dropZone    : {
      flex: 1,
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

    container: {

    height: 350,
    width:  350,
    backgroundColor: '#f21859',
},
    circle      : {
      width               : 70,
      height              : 70,
      borderRadius        : 15,
      backgroundColor: '#f21859',
      borderWidth: 5,
      borderColor: '#ffffff'
    }
});


function mapDispatchToProps(dispatch) {
return bindActionCreators(ActionCreators,dispatch);
}


export default connect((state) => {return { recipeCount: state.recipeCount} },mapDispatchToProps)(AppContainer);
