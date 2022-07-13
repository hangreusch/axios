import React from 'react';
import { SafeAreaView, StyleSheet, Text   } from 'react-native';
import Stories from './containers/Stories';
import Headline from "./containers/Headline";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const App: React.FC = () => {
  return (
      // <Stories/>
      // <AppContainer />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Stories">
          <Stack.Screen
              name="Stories"
              component={Stories}
              options={{ title: 'Stories' }}
          />
          <Stack.Screen name="Headline" component={Headline} options={{ title: 'Headline' }} />
        </Stack.Navigator>
    {/*<SafeAreaView style={styles.safeArea}>*/}
    {/*  <Stories/>*/}
    {/*</SafeAreaView>*/}
      </NavigationContainer>
  );
};

// const AppNavigator = createDrawerNavigator({
//     Stories: {
//         screen: Stories
//     },
//     Headline: {
//         screen: Headline
//     }
// },{
//     initialRouteName: "Stories"
// });
//
// const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
