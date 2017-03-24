import React, { PropTypes } from 'react';
import { Dimensions } from 'react-native';
import { Stage } from 'react-game-kit/native';

import Ball from './ball';

export default class Game extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  loop = () => {
    // do something per frame
  };

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {
    const {height, width } = Dimensions.get('window');
    return (
      <Stage height={height} width={width}>
        <Ball />
      </Stage>
    );
  }
}
