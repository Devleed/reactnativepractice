import React from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import Text from '../native components/Text';
import SlideUpPanel from '../native components/SlideUpPanel';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const income = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 3 },
  { x: 6, y: 3 },
  { x: 7, y: 3 },
  { x: 8, y: 4 },
  { x: 9, y: 4 },
  { x: 10, y: 10 },
];
const expenses = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2.5 },
  { x: 6, y: 2.5 },
  { x: 7, y: 3 },
  { x: 8, y: 3.5 },
  { x: 9, y: 3.5 },
  { x: 10, y: 9 },
];

const Responder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backdrop}>
        <Text h3 bold color="white">
          This is the backdrop
        </Text>
      </View>
      <SlideUpPanel panelStartPosition={500}>
        {/* <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5fcff',
          }}
        >
          <View
            style={{
              backgroundColor: '#f1e9e0',
              width: width * 0.8,
              borderRadius: 20,
              height: 300,
              overflow: 'hidden',
            }}
          >
            <View style={{ position: 'absolute', top: 20, left: 20 }}>
              <Text h6 bold transform="uppercase">
                24.6k income
              </Text>
              <Text h6 bold transform="uppercase">
                22.9k expenses
              </Text>
            </View>
            <VictoryChart width={width * 0.8}>
              <VictoryAxis tickFormat={() => ''} tickCount={() => ''} />
              <VictoryLine
                interpolation="basis"
                style={{
                  data: { stroke: 'tomato' },
                }}
                data={income}
              />
              <VictoryLine
                interpolation="basis"
                style={{
                  data: { stroke: '#55bbff' },
                }}
                data={expenses}
              />
            </VictoryChart>
          </View>
        </View> */}
      </SlideUpPanel>
    </View>
  );
};

export default Responder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.4,
  },
});
