import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import Text from '../native components/Text';
import data from '../data';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CardCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          let inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const imageScale = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          const headingTransform = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.1, 0, -width * 0.1],
          });
          const descriptionTransform = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.7, 0, -width * 0.7],
          });
          return (
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Animated.Image
                  style={[styles.image, { transform: [{ scale: imageScale }] }]}
                  source={item.imageUri}
                />
              </View>
              <View style={styles.imageInfo}>
                <Animated.Text
                  style={{ transform: [{ translateX: headingTransform }] }}
                >
                  <Text h4 bold transform="uppercase">
                    {item.heading}
                  </Text>
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.description,
                    { transform: [{ translateX: descriptionTransform }] },
                  ]}
                >
                  <Text size={12}>{item.description}</Text>
                </Animated.Text>
              </View>
            </View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
      />
      <Circle scrollX={scrollX} />
      <Ticker scrollX={scrollX} />
    </View>
  );
};

const Ticker = ({ scrollX }) => {
  let inputRange = [0, width];
  const headingTransform = scrollX.interpolate({
    inputRange,
    outputRange: [0, -32],
  });
  return (
    <View style={styles.imageTypeContainer}>
      <Animated.View style={{ transform: [{ translateY: headingTransform }] }}>
        {data.map(({ type, key }, index) => {
          return (
            <Text key={key} h4 bold transform="uppercase">
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Circle = ({ scrollX }) => {
  return (
    <View style={styles.circleContainer}>
      {data.map(({ color, key }, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.5, 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={key}
            style={[
              styles.circle,
              { backgroundColor: color, transform: [{ scale }], opacity },
            ]}
          />
        );
      })}
    </View>
  );
};

export default CardCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  imageContainer: {
    width,
    height: '60%',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  imageInfo: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    flex: 1,
  },
  description: {
    width: width * 0.75,
  },
  itemContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  imageTypeContainer: {
    position: 'absolute',
    top: 20 + StatusBar.currentHeight,
    left: 20,
    height: 32,
    overflow: 'hidden',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
    height: width * 0.7,
    width: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    opacity: 0.5,
    top: '12%',
  },
});
