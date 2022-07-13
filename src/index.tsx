import React from 'react';
import Stories from './containers/Stories';
import Headline from './containers/Headline';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {THEME as theme} from './styles/theme';

const Stack = createNativeStackNavigator();

//TODO
// Parse out the DraftJS to render the body text with HTML markup
// save to local storage, find id difference to get new data
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
