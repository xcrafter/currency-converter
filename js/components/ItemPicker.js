import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { moderateScale } from '../helpers/scale';
import EStyleSheet from 'react-native-extended-stylesheet';
import { iOSColors } from 'react-native-typography';

const ItemPicker = ({
  title, data, onSelect, currentCurrecy,
}) => (
  <View style={{ margin: moderateScale(6) }}>
    <Text style={styles.titleStyle}>{title}</Text>
    <RNPickerSelect
      items={data}
      onValueChange={item => onSelect(item)}
    >
      <Text style={styles.textStyle}>{currentCurrecy || 'Select a currency'}</Text>
    </RNPickerSelect>
  </View>);

ItemPicker.defaultProps = {
  currentCurrecy: 'Select a currency',
};

const styles = EStyleSheet.create({
  textStyle: {
    borderWidth: 1,
    borderColor: iOSColors.midGray,
    borderRadius: 10,
    padding: moderateScale(7),
    paddingLeft: moderateScale(9),
    fontSize: moderateScale(16),
    color: '$darkText',
    marginTop: moderateScale(6),
  },
  titleStyle: {
    padding: moderateScale(3),
    fontSize: moderateScale(0),
    color: iOSColors.gray,
    paddingLeft: moderateScale(6),

  },
});

export default ItemPicker;

