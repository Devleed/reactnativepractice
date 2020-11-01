import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './app/context/AuthContext';
import { WEB_CLIENT_ID } from './app/utils/keys';

import AuthScreen from './app/screens/AuthScreen';
import SigninScreen from './app/screens/SigninScreen';
import SignupScreen from './app/screens/SignupScreen';
import HomeScreen from './app/screens/HomeScreen';
import LearnAnimationScreen from './app/screens/LearnAnimationScreen';
import CardCarousel1 from './app/screens/CardCarousel-1';
import CardCarousel2 from './app/screens/CardCarousel-2';
import PanResponder from './app/screens/PanResponder';
import GestureHandler from './app/screens/GestureHandler';

LogBox.ignoreLogs(['Setting a timer']);

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Navigation = () => {
  const [initializing, setInitializing] = useState(true);
  const { state, setUser } = useContext(AuthContext);

  const onAuthStateChanged = (user) => {
    console.log('auth state changed => user => ', user);
    if (user && !state.user) setUser(user);
    if (initializing) setInitializing(false);
  };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

  //   GoogleSignin.configure({
  //     webClientId: WEB_CLIENT_ID,
  //   });

  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  return (
    <NavigationContainer>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="animation" component={CardCarousel1} />
      </HomeStack.Navigator>
      {/* {!state.loggedIn ? (
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Auth" component={AuthScreen} />
          <AuthStack.Screen name="Signin" component={SigninScreen} />
          <AuthStack.Screen name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
      ) : (
        <HomeStack.Navigator>
          <HomeStack.Screen name="home" component={HomeScreen} />
        </HomeStack.Navigator>
      )} */}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};
export default App;
