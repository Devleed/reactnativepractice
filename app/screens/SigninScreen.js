import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import useInputLabel from '../hooks/useInputLabel';
import Link from '../native components/Link';
import Spacer from '../native components/Spacer';
import Toast from '../native components/Toast';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';
import { primary_color, black } from '../globalColors';

const SigninScreen = () => {
  const { signin, googleSignIn, clearError } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const inputs = [
    {
      label: 'email',
      ref: emailRef,
      value: email,
      onChangeText: setEmail,
    },
    {
      label: 'password',
      ref: passwordRef,
      value: password,
      onChangeText: setPassword,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFormErrors({});
        clearError('signin');
      };
    }, []),
  );

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
    };
  }, []);

  const onSignIn = () => {
    let allFieldTimer;
    if (inputs.find((field) => field.value === '')) {
      setFormErrors({ ...formErrors, allFields: 'please fill all fields' });
      if (allFieldTimer) clearTimeout(allFieldTimer);
      allFieldTimer = setTimeout(() => {
        setFormErrors({ ...formErrors, allFields: null });
      }, 5000);
    } else if (!Object.keys(formErrors).length) {
      setLoading(true);
      signin({ email, password }, () => setLoading(false));
    }
  };

  return (
    <>
      {formErrors['allFields'] ? (
        <Toast title={formErrors['allFields']} error />
      ) : null}
      <AuthForm
        signin
        onSubmit={onSignIn}
        onGoogleSubmit={googleSignIn}
        showSocialButtons
        loading={loading}
        loaderColor={black}
      >
        {inputs.map((props, index) => (
          <Input
            {...props}
            label={useInputLabel(props.label, 'signin', formErrors)}
            key={index}
            inputStyle={styles.input}
            labelStyle={styles.inputLabel}
            autoCorrect={false}
            autoCompleteType="off"
            autoCapitalize="none"
            selectionColor="#383838"
            caretHidden={true}
            returnKeyType={index === inputs.length - 1 ? 'default' : 'next'}
            onSubmitEditing={() => inputs[index + 1]?.ref.current.focus()}
            blurOnSubmit={index === inputs.length - 1 ? true : false}
          />
        ))}
        <Spacer bottom={20}>
          <Link title="forgot password" />
        </Spacer>
      </AuthForm>
    </>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
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
});
