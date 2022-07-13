import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  GestureResponderEvent,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import StoryImage from './StoryImage';
import {THEME as theme} from '../styles/theme';

interface StoryProps {
  image: string | undefined | null;
  headline: string;
  authors: string;
  onStoryClicked: (event: GestureResponderEvent) => void;
}

const Story: React.FC<StoryProps> = ({
  image,
  headline,
  authors,
  onStoryClicked,
}) => (
  <TouchableOpacity
    accessible={true}
    accessibilityLabel={`${headline} written by ${authors}`}
    accessibilityHint="Open detailed news"
    onPress={onStoryClicked}>
    <View style={styles.storyContainer}>
      <StoryImage style={styles.image} source={image} />
      <View style={styles.column}>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.author}>{authors}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

interface Styles {
  storyContainer: ViewStyle;
  image: ImageStyle;
  headline: TextStyle;
  author: TextStyle;
  column: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  image: {
    height: 100,
    width: 200,
  },
  storyContainer: {
    flexDirection: 'row',
  },
  headline: {
    paddingBottom: 10,
    fontWeight: theme.boldFont,
    fontSize: theme.smallFontSize,
    color: theme.textGrayColor,
  },
  author: {
    fontSize: theme.smallFontSize,
    color: theme.textGrayColor,
    fontStyle: 'italic',
  },
  column: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Story;
