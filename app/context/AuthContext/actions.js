import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';

const setUser = (state, dispatch) => async (user) => {
  try {
    if (
      user.metadata.creationTime !== user.metadata.lastSignInTime &&
      !state.loggedIn
    ) {
      const document = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();

      if (document.exists)
        dispatch({ type: 'set_user', payload: document.data() });
    }
  } catch (error) {
    console.error(error.code);
  }
};

const signin = (state, dispatch) => async ({ email, password }, callback) => {
  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    const document = await firestore().collection('Users').doc(user.uid).get();

    if (document.exists)
      dispatch({ type: 'sign_in', payload: document.data() });
  } catch (error) {
    console.error(error);

    if (error.code === 'auth/invalid-email') {
      dispatch({
        type: 'set_error',
        payload: {
          key: 'signup',
          message: { field: 'email', message: 'email is invalid' },
        },
      });
    } else if (error.code === 'auth/user-not-found') {
      dispatch({
        type: 'set_error',
        payload: {
          key: 'signin',
          message: {
            field: 'email',
            message: 'no user exists with this email',
          },
        },
      });
    } else if (error.code === 'auth/wrong-password') {
      dispatch({
        type: 'set_error',
        payload: {
          key: 'signin',
          message: {
            field: 'password',
            message: 'wrong password buddy',
          },
        },
      });
    }
  } finally {
    callback();
  }
};

const googleSignIn = (state, dispatch) => async () => {
  try {
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const { user } = await auth().signInWithCredential(googleCredential);

    await firestore().collection('Users').doc(user.uid).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
    });

    dispatch({
      type: 'sign_in',
      payload: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const signup = (state, dispatch) => async (
  { name, email, password },
  callback,
) => {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    await firestore().collection('Users').doc(user.uid).set({
      uid: user.uid,
      name,
      email,
    });
    dispatch({ type: 'sign_up', payload: { uid: user.uid, name, email } });
  } catch (error) {
    console.error(error);

    if (error.code === 'auth/invalid-email') {
      dispatch({
        type: 'set_error',
        payload: {
          key: 'signup',
          message: { field: 'email', message: 'email is invalid' },
        },
      });
    } else if (error.code === 'auth/email-already-in-use') {
      dispatch({
        type: 'set_error',
        payload: {
          key: 'signup',
          message: { field: 'email', message: 'email is already taken' },
        },
      });
    }
  } finally {
    callback();
  }
};

const signout = (state, dispatch) => async () => {
  try {
    await auth().signOut();
    dispatch({ type: 'sign_out' });
  } catch (error) {
    console.error(error);
  }
};

const clearError = (state, dispatch) => (key) => {
  dispatch({ type: 'clear_error', payload: key });
};

export default {
  signin,
  signup,
  setUser,
  signout,
  googleSignIn,
  clearError,
};
