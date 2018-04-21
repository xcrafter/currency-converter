import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { moderateScale } from '../helpers/scale';
import { human, iOSColors } from 'react-native-typography';
import PropTypes from 'prop-types';

const styles = EStyleSheet.create({
  container: {
    padding: moderateScale(10),
    borderRadius: 10,
    backgroundColor: 'rgba(129,199,132 ,0.2)',
  },
  resultStyle: {
    textAlign: 'center',
    margin: moderateScale(20),
    marginBottom: moderateScale(4),
    color: '$darkText',
  },
  currencyStyle: {
    textAlign: 'center',
    color: '$activeColor',
    fontSize: moderateScale(10),
    marginBottom: moderateScale(13),
  },

});

const fontSizeReducer = (value, fontSize) => {
  const reminder = value / 100;
  if (reminder < 10) return moderateScale(fontSize);
  else if (reminder < 100) return moderateScale(Math.round((fontSize * 3) / 4));
  return moderateScale(fontSize / 1.5);
};

const Jumbatron = ({
  result, from, to, containerStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={[human.title1, { fontSize: fontSizeReducer(result, 33) }, styles.resultStyle]}>{result}</Text>
    {from && to && <Text style={styles.currencyStyle}>{`${from} -> ${to}`}</Text>}
  </View>
);

Jumbatron.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  containerStyle: PropTypes.object,
};

Jumbatron.defaultProps = {
  result: 0.00,
  from: '',
  to: '',
  containerStyle: {},
};


export default Jumbatron;

