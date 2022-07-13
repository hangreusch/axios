import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import moment from 'moment';
import StoryImage from '../components/StoryImage';
import {getHeadLine, getImage, renderAuthors} from '../utils/storyUtils';
import {doorIcon} from '../assets';
import {THEME as theme} from '../styles/theme';
import {Story} from '../models';

interface HeadlineProps {
  route: {
    params: {
      story: Story;
    };
  };
}

const Headline: React.FC<HeadlineProps> = ({route}) => {
  const story = route.params.story;
  const getBody = () => {
    let string = '';
    for (let i = 0; i < story.blocks.blocks.length; i++) {
      string = string + story.blocks.blocks[i].text + '\n\n';
    }
    return string;
  };

  const renderTopics = () => {
    let displayedTopics = '';
    for (let i = 0; i < story.topics.length; i++) {
      if (i !== story.topics.length - 1) {
        displayedTopics = displayedTopics + story.topics[i].name + ' & ';
      } else {
        displayedTopics = displayedTopics + story.topics[i].name;
      }
    }
    return displayedTopics;
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {getImage(story) && (
          <StoryImage style={styles.image} source={getImage(story)} />
        )}
        <Text
          style={styles.headline}
          accessible={true}
          accessibilityLabel={getHeadLine(story)}
          accessibilityHint="Detailed news">
          {getHeadLine(story)}
        </Text>
        <Text
          style={styles.subLine}
          accessible={true}
          accessibilityLabel={`${moment(story.published_date).format(
            'MM/DD/YYYY',
          )} - ${renderTopics()}`}
          accessibilityHint="Publish date and topics">
          {moment(story.published_date).format('MM/DD/YYYY')} - {renderTopics()}
        </Text>
        <Text
          style={styles.subLine}
          accessible={true}
          accessibilityLabel={renderAuthors(story)}
          accessibilityHint="Author of this news">
          {renderAuthors(story)}
        </Text>
        <Text
          style={styles.body}
          accessible={true}
          accessibilityLabel={getBody()}
          accessibilityHint="News in details">
          {getBody()}
        </Text>

        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Go to axios.com"
          accessibilityHint="Open axios news website"
          onPress={() => Linking.openURL('https://www.axios.com/')}>
          <View style={styles.row}>
            <Image style={styles.icon} source={doorIcon} />
            <Text style={styles.link}>Visit Axios.com</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    padding: 15,
  },
  image: {
    height: 200,
    width: '100%',
  },
  icon: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: 'row',
  },
  headline: {
    fontSize: theme.bigFontSize,
    fontWeight: theme.boldFont,
    paddingVertical: 10,
    color: theme.textGrayColor,
  },
  subLine: {
    fontStyle: 'italic',
    fontSize: theme.smallFontSize,
    color: theme.textGrayColor,
  },
  body: {
    paddingTop: 10,
    fontSize: theme.mediumFontSize,
    color: theme.textGrayColor,
  },
  link: {
    fontWeight: theme.boldFont,
    paddingLeft: 10,
    color: theme.textGrayColor,
    fontSize: theme.mediumFontSize,
  },
});

export default Headline;
