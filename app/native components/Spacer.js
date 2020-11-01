import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Spacer = (props) => {
  return (
    <View
      style={{
        marginTop: props.top,
        marginLeft: props.left,
        marginBottom: props.bottom,
        marginRight: props.right,
      }}
    >
      {props.children}
    </View>
  );
};

Spacer.defaultProps = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export default Spacer;

const styles = StyleSheet.create({});
