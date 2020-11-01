import React, { useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import Button from '../native components/Button';
import { primary_color } from '../globalColors';

const HomeScreen = () => {
  const { state, signout } = useContext(AuthContext);

  if (!state.user) return null;

  return (
    <View>
      <Text>Welcom to the home screen {state.user.email}</Text>
      <ActivityIndicator size="large" />
      <Button
        title="signout"
        mainColor={primary_color}
        textColor="white"
        onPress={signout}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
