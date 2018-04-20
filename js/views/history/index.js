import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { moderateScale } from '../../helpers/scale';
import { AppColorTheme } from '../../config/constants';

class Home extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'History',
    headerStyle:{
        backgroundColor: AppColorTheme.color_primay,
    },
    headerTintColor:'#000',
    headerTitleStyle:{color:AppColorTheme.light_text},
    tabBarLabel: 'History', 
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
        <Icon name={'clock-o'} size={moderateScale(19)} color="#000" style={{color:tintColor}}/>
    ),
    
  });
  render() {
    return (
      <View>
        <Text>History Page</Text>
      </View>
    );
  }
}
export default Home;

