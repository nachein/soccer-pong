import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Loop } from 'react-game-kit/native';

import Game from './src/components';

export default class App extends React.Component {

  render() {

    return (
      <View style={styles.container}>
        <Loop>
          <Game />
        </Loop>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center'
  }
});
