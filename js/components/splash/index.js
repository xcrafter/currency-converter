import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './style';

const AppLoading = ({ appText }) =>
  (
    <View style={styles.AppLoadingContainer}>
      <Text style={styles.AppLoadingLoaderText}>{appText}</Text>
      <ActivityIndicator size="large" animating color="#ccc" style={styles.AppLoadingLoader} />
    </View>
  );

AppLoading.propTypes = {
  appText: PropTypes.string.isRequired,
};

export default AppLoading;

