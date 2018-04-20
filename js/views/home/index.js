import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { moderateScale } from '../../helpers/scale';
import { AppColorTheme } from '../../config/constants';

class Home extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Home',
    headerStyle:{
        backgroundColor:AppColorTheme.color_primay,
    },
    headerTintColor:'#000',
    headerTitleStyle:{color:AppColorTheme.light_text},
    tabBarLabel: 'Convert', 
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
        <Icon name={'exchange'} size={moderateScale(19)} color="#000" style={{color:tintColor}}/>
    ),
    
  });
  render() {
    return (
      <View>
        <Text onPress={() => {
            this.props.changeTest();
        }}
        >{this.props.testState}
        </Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  testState: state.app.test,
});
const mapDispatchToProps = dispatch => ({
  changeTest: () => dispatch({ type: 'TEST_STATE' }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);

