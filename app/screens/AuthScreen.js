import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import Button from '../native components/Button';
import { primary_color } from '../globalColors';
import ImageOverlay from '../native components/ImageOverlay';

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageOverlay
        source={require('../assets/bg-cover-1.jpg')}
        overlayColor="#ff6476ec"
      >
        <View style={styles.logo}>
          <Icon name="heart-pulse" style={styles.logoIcon} />
        </View>
        <View style={styles.btnStack}>
          <Button
            title="Login"
            hollow
            onPress={() => navigation.navigate('Signin')}
            rounded
          />
          <Button
            title="SignUp"
            textColor={primary_color}
            btnStyle={{
              borderWidth: 3,
              borderColor: 'white',
            }}
            onPress={() => navigation.navigate('Signup')}
            rounded
          />
        </View>
      </ImageOverlay>
      <StatusBar backgroundColor="#ff4d62cc" />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    top: '30%',
  },
  logoIcon: {
    color: 'white',
    fontSize: 100,
  },
  btnStack: {
    marginTop: 'auto',
    marginBottom: 80,
    height: '20%',
    justifyContent: 'space-around',
    width: '70%',
  },
});
