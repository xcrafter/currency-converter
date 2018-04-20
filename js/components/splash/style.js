import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';


const { height } = Dimensions.get('window');

export default EStyleSheet.create({
  AppLoadingContainer: {
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AppLoadingLoaderText: {
    fontSize: 16,
    paddingVertical: 10,
    opacity: 0.45,
  },
  AppLoadingLoader: {
    marginTop: 15,
    marginLeft: -10,
    marginBottom: 0,
    opacity: 0.5,
  },
});

