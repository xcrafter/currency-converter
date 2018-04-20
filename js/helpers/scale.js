import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Sizes based on Google Nexus 5 on genymotion
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 592;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => {
  let sizeFactor = factor;
  if (Platform.OS === 'ios') {
    sizeFactor = PixelRatio.get();
  }

  return size + ((scale(size) - size) * sizeFactor);
};

export { scale, verticalScale, moderateScale };

