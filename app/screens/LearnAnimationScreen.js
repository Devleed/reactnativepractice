import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  StatusBar,
  Image,
} from 'react-native';
import Text from '../native components/Text';

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dimesions = useWindowDimensions();

  const images = [
    {
      title: 'This is a mountain',
      info: `lorem ipsum dolor set amit and consectur. lorem ipsum dolor set amit
          and consectur lorem ipsum dolor set amit and consectur`,
      imagePath: require('../assets/pic1.jpg'),
    },
    {
      title: 'This is a small mountain',
      info: `lorem ipsum dolor set amit and consectur.`,
      imagePath: require('../assets/pic4.jpg'),
    },
    {
      title: 'This is a large mountain',
      info: `lorem ipsum dolor set amit and consectur. lorem ipsum dolor set amit
          and consectur lorem ipsum`,
      imagePath: require('../assets/pic2.jpg'),
    },
  ];

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Animated.FlatList
        keyExtractor={(item, index) => index.toString()}
        data={images}
        style={styles.scrollContainer}
        renderItem={({ item, index }) => {
          const scale = scrollX.interpolate({
            inputRange: [
              (index - 1) * dimesions.width,
              index * dimesions.width,
              (index + 1) * dimesions.width,
            ],
            outputRange: [1.5, 1, 1.5],
          });
          return (
            <View style={{ overflow: 'hidden' }}>
              <Animated.Image
                source={item.imagePath}
                style={[
                  styles.image,
                  {
                    height: dimesions.height + StatusBar.currentHeight,
                    width: dimesions.width,
                    transform: [{ scale }],
                  },
                ]}
                resizeMode="cover"
              />
            </View>
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: true },
        )}
      />
      {images.map((image, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 0.5) * dimesions.width,
            index * dimesions.width,
            (index + 0.5) * dimesions.width,
          ],
          outputRange: [0, 1, 0],
        });

        const translateY = scrollX.interpolate({
          inputRange: [
            (index - 1) * dimesions.width,
            index * dimesions.width,
            (index + 1) * dimesions.width,
          ],
          outputRange: [100, 0, 100],
        });
        return (
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
            key={index}
          >
            <Text h2 color="white">
              {image.title}
            </Text>
            <Text size={12} color="white">
              {image.info}
            </Text>
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  textContainer: {
    padding: 40,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default App;
