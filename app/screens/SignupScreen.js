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
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { primary_color, black } from '../globalColors';
import Toast from '../native components/Toast';

const SigninScreen = () => {
  const { signup, clearError } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const inputs = [
    { label: 'name', ref: nameRef, value: name, onChangeText: setName },
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
    {
      label: 'confirm password',
      ref: confirmPasswordRef,
      value: confirmPassword,
      onChangeText: setConfirmPassword,
    },
  ];

  const onSignUp = () => {
    let allFieldTimer;
    if (inputs.find((field) => field.value === '')) {
      setFormErrors({ ...formErrors, allFields: 'please fill all fields' });
      if (allFieldTimer) clearTimeout(allFieldTimer);
      allFieldTimer = setTimeout(() => {
        setFormErrors({ ...formErrors, allFields: null });
      }, 5000);
    } else if (password !== confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirm_password: 'password does not match',
      });
    } else if (!Object.keys(formErrors).length) setLoading(true);
    signup({ name, email, password }, () => setLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFormErrors({});
        clearError('signup');
      };
    }, []),
  );

  useEffect(() => {
    return () => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFormErrors({});
    };
  }, []);

  return (
    <>
      {formErrors['allFields'] ? (
        <Toast title={formErrors['allFields']} error />
      ) : null}
      <AuthForm
        signin={false}
        onSubmit={onSignUp}
        loading={loading}
        loaderColor={black}
      >
        {inputs.map((props, index) => (
          <Input
            {...props}
            key={index}
            label={useInputLabel(props.label, 'signup', formErrors)}
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
