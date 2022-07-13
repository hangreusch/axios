import React, {useState} from 'react';
import {
  Image,
  View,
  ImageStyle,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import {unavailableImage} from '../assets';

const SLOW_RENDER_THRESHOLD_MS = 1000;

interface StoryImageProps {
  source: string | undefined | null;
  style: ImageStyle;
}

const StoryImage: React.FC<StoryImageProps> = ({source, style}) => {
  const [imageLoadFailure, setImageLoadFailure] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const onError = (rawError: NativeSyntheticEvent<ImageErrorEventData>) => {
    const error = _.get(rawError, 'nativeEvent.error', '');
    setImageLoadFailure(true);
    let reason = 'general_network'; //use to log
    if (error.includes('code=404')) {
      reason = 'image_404';
    }
    const loadTime = startTime
      ? moment().valueOf() - startTime
      : 'startTime unavailable'; //use to log
    // placeholder: assume the app has production board, log this to production board
    // log('StoryImage load error', {
    //   url: source,
    //   loadTime,
    //   reason,
    //   error,
    // });
  };

  const onLoadStart = () => {
    setStartTime(moment().valueOf());
  };

  const onLoad = () => {
    const loadTime = moment().valueOf() - startTime;
    if (loadTime > SLOW_RENDER_THRESHOLD_MS) {
      // placeholder: assume the app has production board, log this to production board
      // log('StoryImage render threshold exceeded', {
      //   url: source,
      //   loadTime,
      //   SLOW_RENDER_THRESHOLD_MS,
      // });
    }
  };

  return (
    <View>
      {_.isEmpty(source) || imageLoadFailure ? (
        <View
          style={{
            width: 200,
            height: 100,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 50, height: 50}}
            source={unavailableImage}
            onError={onError}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
          />
        </View>
      ) : (
        <Image
          style={style}
          source={{uri: source}}
          onError={onError}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
        />
      )}
    </View>
  );
};

export default React.memo(StoryImage);
