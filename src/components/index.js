import React, { PropTypes } from 'react';
import { Dimensions, View } from 'react-native';
import { Stage } from 'react-game-kit/native';

import Player from './player'
import Ball from './ball';

export default class Game extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  loop = () => {

  };

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {
    const {height, width } = Dimensions.get('window');
    let sideOffset = width / 860 * 150;
    let upperOffset = height / 1280 * 230;
    let goalOffset = width / 860 * 120;

    let courtDimensions = { width: width - sideOffset, height: height - upperOffset};

    return (
      <Stage height={height} width={width}>
        <Player />
        <Ball />
        {/* <View style={{
          position: 'absolute',
          top: upperOffset,
          bottom: upperOffset,
          left: sideOffset,
          right: sideOffset,
          backgroundColor: 'red'
        }}></View>

        <View style={{
          position: 'absolute',
          top: courtDimensions.height,
          bottom: 0,
          left: sideOffset + goalOffset,
          right: sideOffset + goalOffset,
          backgroundColor: 'blue'
        }}></View>

        <View style={{
          position: 'absolute',
          top: 0,
          bottom: courtDimensions.height,
          left: sideOffset + goalOffset,
          right: sideOffset + goalOffset,
          backgroundColor: 'yellow'
        }}></View> */}
      </Stage>
    );
  }
}
