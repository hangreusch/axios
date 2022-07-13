import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import {getArticleList, getContent} from '../services/AxiosServices';
import Story from '../components/Story';
import {useNavigation} from '@react-navigation/native';
import {getHeadLine, getImage, renderAuthors} from '../utils/storyUtils';
import {THEME as theme} from '../styles/theme';
import {IStory} from '../models';

const Stories: React.FC = () => {
  const navigation = useNavigation();
  const [storiesList, setStoriesList] = useState<IStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onStoryClicked = (story: IStory) => {
    navigation.navigate('Headline', {story: story}); //TODO fix this type complaint
  };

  useEffect(() => {
    const getStoriesList = async () => {
      try {
        setIsLoading(true);
        const response = await getArticleList();
        if (response.status === 200) {
          const idList = response.data.results;
          const getStoryByIds = [];
          for (let i = 0; i < idList.length; i++) {
            getStoryByIds.push(getContent(idList[i]));
          }
          const list: IStory[] = await Promise.all(getStoryByIds);
          setStoriesList(list);
          setIsLoading(false);
        } else {
          // placeholder: assume the app has production board, log this to production board
          // log('Failed to fetch stories list');
          throw new Error('Failed to fetch stories list');
        }
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    };
    getStoriesList();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator
            size={55}
            accessible={true}
            accessibilityLabel="Loading news"
            accessibilityHint="Please wait"
          />
        </View>
      )}
      {!isLoading && hasError && (
        <Text
          accessible={true}
          accessibilityLabel="Error"
          accessibilityHint="Can't load news">
          An error has occurred
        </Text>
      )}
      {!isLoading && !hasError && (
        <FlatList
          accessible={true}
          accessibilityLabel="News list"
          accessibilityHint="List of popular news"
          data={storiesList}
          keyExtractor={(item: IStory) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => (
            <Story
              image={getImage(item)}
              headline={getHeadLine(item)}
              authors={renderAuthors(item)}
              onStoryClicked={() => onStoryClicked(item)}
            />
          )}
        />
      )}
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  separator: ViewStyle;
  center: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    padding: 15,
  },
  separator: {
    height: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Stories;
