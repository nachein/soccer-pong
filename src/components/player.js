import React, { PropTypes } from 'react';
import { Dimensions, View } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import { Accelerometer } from 'expo';

export default class Player extends React.Component {

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);

    this.accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
      // this.setState({
      //   velocity: {
      //     x: accelerometerData.x,
      //     y: -accelerometerData.y
      //   }
      // })
    })
  }

  componentWillUnmount() {
    this.accelerometerSubscription && this.accelerometerSubscription.remove();
    this.accelerometerSubscription = null;
  }

  render() {
    return (
      <View></View>
    );
  }
}
