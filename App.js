import React from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { Loop } from 'react-game-kit/native';

import Game from './src/components';

export default class App extends React.Component {

  render() {

    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={require('./assets/soccerPong/sprites/court_01.png')} />
        <Loop>
          <Game />
        </Loop>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  background: {
    height,
    width,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
});
