import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { black } from '../globalColors';
import Text from '../native components/Text';

const LeftAction = () => {
  return (
    <View style={styles.leftAction}>
      <Text h6>add to cart</Text>
    </View>
  );
};

const GestureHandler = () => {
  return (
    <Swipeable renderLeftActions={LeftAction}>
      <View style={styles.textContainer}>
        <Text h5>lorem ipsum dolor set amet</Text>
      </View>
    </Swipeable>
  );
};

export default GestureHandler;

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: black,
  },
  leftAction: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
