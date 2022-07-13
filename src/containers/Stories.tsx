import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import {getArticleList, getContent} from '../services/AxiosServices';
import Story from '../components/Story';
import {useNavigation} from '@react-navigation/native';
import {getHeadLine, getImage, renderAuthors} from '../utils/storyUtils';

const Stories: React.FC = () => {
  const navigation = useNavigation();
  const [storiesList, setStoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onStoryClicked = (story) => {
    navigation.navigate('Headline', {story: story});
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
          const list = await Promise.all(getStoryByIds); //TODO save to local storage, find id difference to get new data
          setStoriesList(list);
          setIsLoading(false);
        } else {
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
          keyExtractor={(item) => item.id}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
