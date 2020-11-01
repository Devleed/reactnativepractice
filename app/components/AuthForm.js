import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SocialIcon from 'react-native-vector-icons/dist/Zocial';

import Button from '../native components/Button';
import Link from '../native components/Link';
import Spacer from '../native components/Spacer';
import Divider from '../native components/Divider';
import ImageOverlay from '../native components/ImageOverlay';
import { primary_color } from '../globalColors';

const AuthForm = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <ImageOverlay
        source={require('../assets/bg-cover-1.jpg')}
        overlayColor="#fffffff5"
        loading={props.loading}
        loaderColor={props.loaderColor}
      >
        <View style={styles.logo}>
          <MaterialIcon name="heart-pulse" style={styles.logoIcon} />
        </View>
        <View style={styles.form}>
          {props.children}
          <Button
            title={props.signin ? 'signin' : 'signup'}
            textColor={primary_color}
            onPress={props.onSubmit}
          />
        </View>
        {props.showSocialButtons ? (
          <>
            <Divider
              title={`or ${props.signin ? 'sign in' : 'sign up'} with`}
            />
            <View style={styles.btnStack}>
              <Button
                title="facebook"
                icon={
                  <SocialIcon name="facebook" style={styles.socialBtnIcon} />
                }
                mainColor="#4e68ff"
                textColor="white"
                btnStyle={{
                  flex: 1,
                  marginRight: 10,
                }}
              />
              <Button
                title="google"
                icon={<SocialIcon name="google" style={styles.socialBtnIcon} />}
                mainColor={primary_color}
                textColor="white"
                btnStyle={{
                  flex: 1,
                }}
                onPress={props.onGoogleSubmit}
              />
            </View>
          </>
        ) : null}
        <Spacer top={60} bottom={60}>
          <Link
            title={`${props.signin ? 'signup' : 'signin'} instead`}
            onPress={() =>
              navigation.navigate(props.signin ? 'Signup' : 'Signin')
            }
          />
        </Spacer>
      </ImageOverlay>
      <StatusBar backgroundColor="white" />
    </>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  logo: {
    marginBottom: 50,
  },
  logoIcon: {
    color: primary_color,
    fontSize: 100,
  },
  form: {
    width: '85%',
  },
  inputLabel: {
    color: primary_color,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  input: {
    marginTop: -5,
    paddingBottom: -5,
    color: '#383838',
  },
  btnStack: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  socialBtnIcon: {
    fontSize: 15,
    color: 'white',
    marginRight: 10,
  },
});
