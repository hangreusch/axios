import React from 'react';
import Stories from './containers/Stories';
import Headline from './containers/Headline';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//TODO
// open axios.com
// unit test using jest
// assessibility
// Parse out the DraftJS to render the body text with HTML markup
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Stories">
        <Stack.Screen
          name="Stories"
          component={Stories}
          options={{title: 'Stories'}}
        />
        <Stack.Screen
          name="Headline"
          component={Headline}
          options={{title: 'Headline'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
