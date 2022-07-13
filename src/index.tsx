import React from 'react';
import Stories from './containers/Stories';
import Headline from './containers/Headline';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {THEME as theme} from './styles/theme';
const Stack = createNativeStackNavigator();

//TODO list
// 1/ Parse out the DraftJS to render the body text with HTML markup.
// 2/ Write more unit test.
// 3/ I'd like to use local storage to save UUIDs list and story content of those UUIDs.
// I already created LocalStorageServices.ts but I haven't use it yet.
// The idea is: first time launch app, get data from stream api (return UUID list) and content api (return story details).
// save this UUID list and story details to local storage using AsyncStorage.
// later app relaunch, get data from stream api (return UUID list), then find what ids difference between api response and local storage
// then only call content api for different UUID to get new data
// and save this new UUID list and save new story content of to local storage, remove story old content based on story.id not exist from stream api response
// by this way, we do not call api to get content when not needed, and less loading wait time for user
// Further more, I think if we know popular story list will change up to a certain period of time (for example, 15 days)
// we can save timestamp of app launch to local storage
// when app relaunch, we compare difference = currentTimeStamp - timeStampInLocalStorage
// if difference > 15 days, no need to check localStorage after call stream api
// it means app will call stream api, and content api for all UUID, save to local storage for fresh data.

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Stories">
        <Stack.Screen
          name="Stories"
          component={Stories}
          options={{title: 'Stories', headerTintColor: theme.textGrayColor}}
        />
        <Stack.Screen
          name="Headline"
          component={Headline}
          options={{title: 'Headline', headerTintColor: theme.textGrayColor}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
