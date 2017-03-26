import React, { PropTypes } from 'react';
import { Dimensions, View, Image, Animated } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import { Accelerometer } from 'expo';

export default class Player extends React.Component {
  static contextTypes = {
    scale: PropTypes.number,
    loop: PropTypes.object
  };

  constructor(props) {
    super(props)

    this.dimensions = Dimensions.get('window');
    this.upperOffset = this.dimensions.height / 1280 * 300;
    this.sideOffset = this.dimensions.width / 860 * 150;

    this.speed = 20;
    // 204 - 224
    this.state = {
      position: {
        x: this.dimensions.width / 2 - 42 / 2,
        y: this.upperOffset - 20 / 2
      },
      velocity: 0,
      length: 5
    }
  }

  loop = () => {
    let speedX = this.state.velocity * this.speed;

    let newX = this.state.position.x + speedX;
    newX = newX <= this.sideOffset || (newX + 42) >= (this.dimensions.width - this.sideOffset) ? this.state.position.x : newX;

    this.setState({
      position: {
        x: newX,
        y: this.state.position.y
      }
    })
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
    this.accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
      this.setState({
        velocity: accelerometerData.x
      })
    })
  }

  componentWillUnmount() {
    this.accelerometerSubscription && this.accelerometerSubscription.remove();
    this.accelerometerSubscription = null;
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {

    return (
        <Sprite
          repeat={this.state.repeat}
          src={require('../../assets/soccerPong/sprites/player1.png')}
          tileWidth={180}
          tileHeight={86}
          state={0}
          steps={[0]}
          style={{transform: [
            {translateX: this.state.position.x},
            {translateY: this.state.position.y}
          ]}}
        />
    );
  }
}
