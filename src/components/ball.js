import React, { PropTypes } from 'react';
import { Sprite } from 'react-game-kit/native';

export default class Ball extends React.Component {
  static contextTypes = {
    scale: PropTypes.number
  };

  render() {

    return (
      <Sprite
        repeat={true}
        src={require('../../assets/soccerPong/sprites/ball_frames.png')}
        tileWidth={48}
        tileHeight={48}
        ticksPerFrame={1}
        scale={2}
        state={0}
        steps={[5]}
      />
    );
  }
}
