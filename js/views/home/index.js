import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class Home extends Component {
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

