import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import {unavailableImage} from '../assets';

const SLOW_RENDER_THRESHOLD_MS = 1000;

const styles = StyleSheet.create({
  productImage: {
    width: 50,
    height: 50,
  },
  itemDetailsImageUnavailable: {
    width: 84,
    height: 84,
    marginTop: 40,
    marginRight: 40,
  },
});

const StoryImage = ({source, style}) => {
  const [imageLoadFailure, setImageLoadFailure] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const onError = (rawError) => {
    const error = _.get(rawError, 'nativeEvent.error', '');
    setImageLoadFailure(true);
    let reason = 'general_network';
    if (error.includes('code=404')) {
      reason = 'image_404';
    }
    const loadTime = startTime
      ? moment().valueOf() - startTime
      : 'startTime unavailable';
    // pickingLoggingService.error(
    //   'ProductImage Load Error',
    //   {
    //     url: source,
    //     loadTime,
    //     reason
    //   },
    //   error
    // );
  };

  const onLoadStart = () => {
    setStartTime(moment().valueOf());
  };

  const onLoad = () => {
    const loadTime = moment().valueOf() - startTime;
    if (loadTime > SLOW_RENDER_THRESHOLD_MS) {
      // pickingLoggingService.log('ProductImage Render Threshold Exceeded', {
      //   url: source,
      //   loadTime,
      //   SLOW_RENDER_THRESHOLD_MS
      // });
    }
  };

  const getImage = () => {
    if (_.isEmpty(source) || imageLoadFailure) {
      return unavailableImage;
    } else {
      return {uri: source};
    }
  };

  return (
    <Image
      style={style}
      source={getImage()}
      onError={onError}
      onLoadStart={onLoadStart}
      onLoad={onLoad}
      accessibilityLabel="productImage"
    />
  );
};

StoryImage.propTypes = {
  source: PropTypes.string,
  style: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

StoryImage.defaultProps = {
  source: undefined,
};

export default React.memo(StoryImage);
