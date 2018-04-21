import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, Separator } from 'native-base';
import { moderateScale } from '../../helpers/scale';


// class Home extends Component {
//   render() {
//     return (
//       <View>
//         <Text onPress={() => {
//             this.props.changeTest();
//         }}
//         >{this.props.testState}
//         </Text>
//       </View>
//     );
//   }
// }
// const mapStateToProps = state => ({
//   testState: state.app.test,
// });
// const mapDispatchToProps = dispatch => ({
//   changeTest: () => dispatch({ type: 'TEST_STATE' }),
// });


// export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Entries = ({
  modalVisible, modelCloseAction, data, onItemClick, ...props
}) => (
  <Modal isVisible={modalVisible} onBackdropPress={() => modelCloseAction()} style={{ justifyContent: 'flex-end', margin: 0 }}>
    <View style={{
 height: 500,
 opacity: 0.9,
backgroundColor: '#fff',
    margin: 0,
}}
    >

      <List
        dataArray={data}
        renderRow={(item) => {
              const seperatedData = item.split(':');
              return (<ListItem onPress={() => {
                onItemClick(item);
                modelCloseAction();
              }}
              >
                <Text

                  style={{ fontSize: moderateScale(18), fontWeight: '700' }}
                >{`${seperatedData[0]} -> ${seperatedData[1]}`}
                </Text>
              </ListItem>);
            }
          }
      />
    </View>
  </Modal>
);

export const Histories = ({
  modalVisible, modelCloseAction, data, onItemClick, ...props
}) => (
  <Modal isVisible={modalVisible} onBackdropPress={() => modelCloseAction()} style={{ justifyContent: 'flex-end', margin: 0 }}>
    <View style={{
 height: 500,
 opacity: 0.9,
backgroundColor: '#fff',
    margin: 0,
}}
    >

      <List
        dataArray={data}
        renderRow={item => (<ListItem onPress={() => {
                modelCloseAction();
              }}
        >
          <Text

            style={{ fontSize: moderateScale(18), fontWeight: '700' }}
          >{item}
          </Text>
                            </ListItem>)
          }
      />
    </View>
  </Modal>
);

export default Entries;

