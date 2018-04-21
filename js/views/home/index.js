import React, { Component } from 'react';
import { View, Text, Dimensions,Alert,Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { moderateScale } from '../../helpers/scale';
import { AppColorTheme } from '../../config/constants';
import { material } from 'react-native-typography'
import Jumbatron from './../../components/jumbatron'
import ItemPicker from './../../components/ItemPicker'
import { human, iOSColors } from 'react-native-typography';
import { Item, Input} from 'native-base';
import Entries, { Histories } from './../entries'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Button} from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet';
import { initialiseCurrencies,setData, convert, setParameter, clearAllData } from '../../actions/app';
const {width,height} = Dimensions.get('window')


export const CustomButton = ({buttonProps,text}) =>
  <View style={{marginLeft:moderateScale(8),marginRight:moderateScale(8),marginTop:moderateScale(12)}}>
  <Button block success iconLeft {...buttonProps}>
  <Icon name={'exchange'} size={moderateScale(16)} color="#000" style={{color:'#fff',marginRight: moderateScale(5)}}/>
  <Text style={[{color:EStyleSheet.value('$lightText'),fontSize:moderateScale(16),fontWeight:'bold'}]}>{text}</Text>
  </Button> 
  </View>

export const SmallButton = ({buttonProps ={},text}) =>

<Button {...buttonProps} success iconRight style={{padding:moderateScale(4)}}>
<Icon name={'exchange'} size={moderateScale(16)} color="#000" style={{color:'#fff',
marginLeft: moderateScale(5),
marginRight: moderateScale(5)}}/>
<Text style={{textAlign:'left',marginLeft:moderateScale(6), color:'#fff',paddingRight:4}}>{text}</Text>
</Button>

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      isModalVisible:false,
      historyVisible:false,
    }
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Converter',
    headerStyle:{
        backgroundColor:AppColorTheme.color_primay,
    },
    headerTintColor:'#000',
    headerTitleStyle:{color:AppColorTheme.light_text, fontSize: moderateScale(17) },
    tabBarLabel: 'Convert', 
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
        <Icon name={'exchange'} size={moderateScale(19)} color="#000" style={{color:tintColor}}/>
    ),
    
  });
  componentWillMount() {
    this.props.initialise()
  }
  render() {
    const {props} = this
    return (
      <View style={{height,backgroundColor:'#fff'}}>

          
        {this.state.isModalVisible && <Entries modalVisible ={this.state.isModalVisible} 
          data={props.recentEntries}
        onItemClick = {(key)=>props.setParams(key)}
        modelCloseAction= {()=>this.setState({isModalVisible:false})}/>}

        {this.state.historyVisible && <Histories modalVisible ={this.state.historyVisible} 
     
        data={props.history[`${props.convertFrom}:${props.convertTo}`] || []}
        onItemClick = {(key)=>null}
        modelCloseAction= {()=>this.setState({historyVisible:false})}/>}

        <Jumbatron result={props.result == 0 ? '0.00': props.result} from={props.convertFrom} to={props.convertTo} 
          containerStyle={{margin:moderateScale(20)}}/> 

        <View style={{flexDirection:'row',margin:moderateScale(10)}}>
          <View style={{flex:1,}}>
      
          </View>
          <View style={{flex:1,alignItems:'flex-end',flexDirection:'row', justifyContent: 'flex-end',marginRight:moderateScale(6)}}>
          <SmallButton text={'Recent Entries'} buttonProps={{onPress:()=>{
            this.setState({isModalVisible:true})
          }}}/>
          </View>
        </View>

        <View style={{margin:moderateScale(10),marginTop:0}}>
        <View style={{flexDirection:'row'}}>
        <View style={{flex:1}}>

        <ItemPicker title={'Convert From'} data={props.currencies} 
          currentCurrecy={props.convertFrom || '---'}
        onSelect={(value)=>props.setConvertFrom(value)}/>
        </View>
        <View style={{flex:1}}>
        <ItemPicker title={'Convert To'} data={props.currencies} 
          currentCurrecy={props.convertTo || '---'}
          onSelect={(value)=>props.setConvertTo(value)}/>
        </View>
        </View>


        <View style={{alignItems:'flex-end',flexDirection:'row',padding:moderateScale(6)}}>
        <Icon active name={'clock-o'} size={moderateScale(14)} color="#000" 
         style={{color:'#ccc',marginRight: moderateScale(9)}}/>
            <Text style={{textAlign:'right', fontSize: moderateScale(10)}} 
            onPress={
              ()=>
                {
                  this.setState({historyVisible:true})
                }
           }>Conversion History</Text>
          </View>

         <View style={{margin:moderateScale(10)}}>
         <Item>
         <Icon active name={'money'} size={moderateScale(18)} color="#000" 
         style={{color:'#ccc',marginRight: moderateScale(9),marginTop: moderateScale(5)}}/>
            <Input placeholder='Enter Amount' keyboardType={'numeric'}
            value={Number(props.amount) == 0 ? '': props.amount} onChangeText={(value)=> props.setAmount(value)}/>
          </Item>
          </View>
        
        {/* <CustomButton text={'Convert Now'} buttonProps={{onPress:()=>props.convert()}}/> */}

        <View style={{alignItems:'flex-end',flexDirection:'row',padding:moderateScale(6),marginTop: moderateScale(14)}}>
        <Icon active name={'arrow-right'} size={moderateScale(14)} color="#000" 
         style={{color:'#ccc',marginRight: moderateScale(9)}}/>
            <Text style={{textAlign:'right', fontSize: moderateScale(10)}} 
            onPress={
              ()=>
                {
                  Alert.alert(
                    'Warning',
                    'Do you want to clear local cache?',
                    [
                      {text: 'Yes, Please', onPress: () =>   props.clearAll() },
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
                }
           }>Clear All Data</Text>
          </View>


        
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  currencies: state.app.currencies,
  convertFrom : state.app.convertFrom,
  convertTo : state.app.convertTo ,
  amount: state.app.amount,
  result: state.app.result,
  statusMesage: state.app.statusMessage,
  recentEntries: state.app.recentEntries,
  history: state.app.history

});
const mapDispatchToProps = dispatch => ({
  initialise: () => dispatch(initialiseCurrencies()),
  setConvertFrom  : (value) => dispatch(setData('convertFrom',value)),
  setConvertTo  : (value) => dispatch(setData('convertTo',value)),
  setAmount  : (value) => {dispatch(setData('amount',value))},
  convert : (value) => dispatch(convert()),
  setParams : (value) => dispatch(setParameter(value)),
  clearAll : ()=> dispatch(clearAllData())
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);

