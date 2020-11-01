import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import { black } from '../globalColors';

const Toast = (props) => {
  const renderIcon = () => {
    if (props.success)
      return (
        <MaterialIcon name="check-circle-outline" style={styles.toastIcon} />
      );
    if (props.error)
      return <MaterialIcon name="error-outline" style={styles.toastIcon} />;
    return null;
  };
  return (
    <View style={styles.toast}>
      {renderIcon()}
      <Text style={styles.toastText}>{props.title}</Text>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 10,
    width: '90%',
    height: 70,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: black,
    zIndex: 9000,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  toastIcon: {
    fontSize: 25,
    color: 'red',
    marginRight: 5,
  },
});
