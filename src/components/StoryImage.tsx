import React, {useState} from 'react';
import {Image, ViewPropTypes} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import {unavailableImage} from '../assets';

const SLOW_RENDER_THRESHOLD_MS = 1000;

interface StoryImageProps {
  source?: string;
  style: ViewPropTypes.style;
}

const StoryImage: React.FC<StoryImageProps> = ({source, style}) => {
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
    console.warn('StoryImage load error', {
      url: source,
      loadTime,
      reason,
      error,
    });
  };

  const onLoadStart = () => {
    setStartTime(moment().valueOf());
  };

  const onLoad = () => {
    const loadTime = moment().valueOf() - startTime;
    if (loadTime > SLOW_RENDER_THRESHOLD_MS) {
      console.warn('StoryImage render threshold exceeded', {
        url: source,
        loadTime,
        SLOW_RENDER_THRESHOLD_MS,
      });
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
    />
  );
};

export default React.memo(StoryImage);
