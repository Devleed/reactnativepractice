import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import Text from '../native components/Text';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const data = [
  {
    imageURI: require('../assets/joker-movie.jpg'),
    name: 'Joker',
    rating: 5,
    description:
      "world's best villian joker tells his story. Jaoqin pheonix takes on the role of joker in the new Joker (2019)",
  },
  {
    imageURI: require('../assets/no-time-to-talk.jpg'),
    name: 'no time to talk',
    rating: 5,
    description:
      'james bond takes on the action again in his new movie. 007 is back with more action, drama, romance and suspense',
  },
  {
    imageURI: require('../assets/artemis-fowl.jpg'),
    name: 'artemis fowl',
    rating: 5,
    description:
      'another disneps master class takin you through the magic world. Artemis takes you through the journey of magic stay with him',
  },
  {
    imageURI: require('../assets/bad-boys.jpg'),
    name: 'bad boys for life',
    rating: 5,
    description:
      'will smith takes on the action with his partner in crime martin lawrence the bad boys are back with more trouble',
  },
];

const CardCarousel2 = () => {
  let spacedData = [{ key: 'left-spacer' }, ...data, { key: 'right-spacer' }];

  const scrollX = useRef(new Animated.Value(0)).current;
  const imageScales = spacedData.map(
    (item) => useRef(new Animated.Value(1)).current,
  );

  const handlePressIn = (index) => {
    Animated.spring(imageScales[index], {
      toValue: 1.3,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = (index) => {
    Animated.spring(imageScales[index], {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        data={spacedData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        // snapToInterval={280}
        // decelerationRate={0}
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (item.key === 'left-spacer' || item.key === 'right-spacer') {
            return (
              <View
                style={{
                  width: 50,
                }}
              />
            );
          }
          const inputRange = [
            (index - 2) * width,
            (index - 1) * width,
            index * width,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, -50, 100],
            extrapolate: 'clamp',
          });
          return (
            <View style={styles.cardContainer}>
              <Animated.View
                style={[styles.card, { transform: [{ translateY }] }]}
              >
                <View style={styles.imageContainer}>
                  <TouchableWithoutFeedback
                    onPressIn={() => handlePressIn(index)}
                    onPressOut={() => handlePressOut(index)}
                  >
                    <Animated.Image
                      style={[
                        styles.image,
                        { transform: [{ scale: imageScales[index] }] },
                      ]}
                      source={item.imageURI}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.movieInfo}>
                  <Text h3 bold>
                    {item.name}
                  </Text>
                  <View style={styles.movieRatings}>
                    <MaterialIcon name="star" style={styles.icon} />
                    <MaterialIcon name="star" style={styles.icon} />
                    <MaterialIcon name="star" style={styles.icon} />
                    <MaterialIcon name="star" style={styles.icon} />
                    <MaterialIcon name="star" style={styles.icon} />
                  </View>
                  <Text size={12} color="gray">
                    {item.description}
                  </Text>
                </View>
              </Animated.View>
            </View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
      />
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  return (
    <View style={styles.backdropContainer}>
      {data.map(({ imageURI }, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-width, 0, width],
          extrapolate: 'clamp',
        });
        return (
          <Animated.Image
            key={index}
            source={imageURI}
            style={[styles.backdropImage, { transform: [{ translateX }] }]}
            blurRadius={1}
          />
        );
      })}
    </View>
  );
};

export default CardCarousel2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    width,
  },
  card: {
    width: width * 0.72,
    height: height * 0.6,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e4e4e4',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '70%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
    zIndex: 1000,
  },
  movieRatings: {
    flexDirection: 'row',
  },
  icon: {
    color: 'orange',
    height: 15,
    width: 15,
  },
  backdropContainer: {
    position: 'absolute',
    top: 0,
    width,
    height: height + StatusBar.currentHeight,
  },
  backdropImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
});
