import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { primary_color } from '../globalColors';

const Link = (props) => {
  return (
    <TouchableOpacity {...props} style={[styles.link, props.linkStyle]}>
      <Text style={[styles.linkText, props.linkTextStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  linkText: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: primary_color,
    textAlign: 'right',
  },
});
