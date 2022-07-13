import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import StoryImage from './StoryImage';

interface StoryProps {
  image: string;
  headline: string;
  authors: unknown[];
  onStoryClicked: (id: number) => boolean; //arg is object, return navigation
}

const Story: React.FC<StoryProps> = ({
  image,
  headline,
  authors,
  onStoryClicked,
}) => {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={`${headline} written by ${authors}`}
      accessibilityHint="Open detailed news"
      onPress={onStoryClicked}>
      <View style={styles.storyContainer}>
        <StoryImage style={styles.image} source={image} />
        <View style={styles.column}>
          <Text style={{paddingBottom: 20}}>{headline}</Text>
          <Text>{authors}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
  storyContainer: {
    flexDirection: 'row',
  },
  column: {
    paddingLeft: 15,
  },
});

export default Story;
