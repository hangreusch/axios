import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { unavailableImage } from '../../assets/images';
import { pickingLoggingService } from '../../services/PickingLoggingService';

const SLOW_RENDER_THRESHOLD_MS = 1000;

const styles = StyleSheet.create({
  productImage: {
    width: 50,
    height: 50
  },
  itemDetailsImageUnavailable: {
    width: 84,
    height: 84,
    marginTop: 40,
    marginRight: 40
  }
});

const ProductImage = ({ source, style, isItemDetailImage }) => {
  const [imageLoadFailure, setImageLoadFailure] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const onError = rawError => {
    const error = _.get(rawError, 'nativeEvent.error', '');
    setImageLoadFailure(true);
    let reason = 'general_network';
    if (error.includes('code=404')) {
      reason = 'image_404';
    }
    const loadTime = startTime
      ? moment().valueOf() - startTime
      : 'startTime unavailable';
    pickingLoggingService.error(
      'ProductImage Load Error',
      {
        url: source,
        loadTime,
        reason
      },
      error
    );
  };

  const onLoadStart = () => {
    setStartTime(moment().valueOf());
  };

  const onLoad = () => {
    const loadTime = moment().valueOf() - startTime;
    if (loadTime > SLOW_RENDER_THRESHOLD_MS) {
      pickingLoggingService.log('ProductImage Render Threshold Exceeded', {
        url: source,
        loadTime,
        SLOW_RENDER_THRESHOLD_MS
      });
    }
  };

  const getImage = () => {
    if (_.isEmpty(source) || imageLoadFailure) {
      return unavailableImage;
    } else {
      return { uri: source };
    }
  };

  const getStyle = () => {
    if (_.isEmpty(source) || imageLoadFailure) {
      if (isItemDetailImage) return styles.itemDetailsImageUnavailable;
      else return styles.productImage;
    } else {
      return style;
    }
  };

  return (
    <Image
      style={getStyle()}
      source={getImage()}
      onError={onError}
      onLoadStart={onLoadStart}
      onLoad={onLoad}
      accessibilityLabel="productImage"
    />
  );
};

ProductImage.propTypes = {
  source: PropTypes.string,
  style: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  isItemDetailImage: PropTypes.bool
};

ProductImage.defaultProps = {
  source: undefined,
  isItemDetailImage: false
};

export default React.memo(ProductImage);
