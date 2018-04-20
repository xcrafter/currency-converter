import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { moderateScale } from '../../helpers/scale';


const { height } = Dimensions.get('window');

export default EStyleSheet.create({
  AppLoadingContainer: {
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AppLoadingLoaderText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    paddingVertical: moderateScale(10),
    textAlign: 'center',
    color: '$activeColor',
    height: moderateScale(50),
  },
  AppLoadingLoader: {
    marginTop: moderateScale(25),
    marginLeft: moderateScale(-10),
    marginBottom: 0,
    opacity: 0.5,
  },
});

