import React, { PropTypes } from 'react';
import { Dimensions } from 'react-native';
import { Sprite } from 'react-game-kit/native';
import { Accelerometer } from 'expo';

export default class Ball extends React.Component {
  static contextTypes = {
    scale: PropTypes.number,
    loop: PropTypes.object
  };

  constructor(props) {
    super(props)

    this.dimensions = Dimensions.get('window');

    this.state = {
      speed: {
        x: 5,
        y: 5
      },
      position: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      ticksPerFrame: 60
    }
  }

  loop = () => {

    let speedX = this.state.velocity.x * this.state.speed.x;
    speedX = speedX > this.state.speed.x ? this.state.speed.x : speedX < -this.state.speed.x ? -this.state.speed.x : speedX;

    let speedY = this.state.velocity.y * this.state.speed.y;
    speedY = speedY > this.state.speed.y ? this.state.speed.y : speedY < -this.state.speed.y ? -this.state.speed.y : speedY;

    let newX = this.state.position.x + speedX;
    let newY = this.state.position.y + speedY;

    this.setState({
      position: {
        x: (newX + 48) < this.dimensions.width && newX > 0 ? newX : this.state.position.x,
        y: (newY + 48) < this.dimensions.height && newY > 0 ? newY : this.state.position.y
      }
    })

    this.calculateTicksPerFrame()
  };

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);

    this.accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
      this.setState({
        velocity: {
          x: accelerometerData.x,
          y: -accelerometerData.y
        }
      })
    })
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);

    this.accelerometerSubscription && this.accelerometerSubscription.remove();
    this.accelerometerSubscription = null;
  }

  calculateTicksPerFrame() {
    let ticksPerFrame = 1;
    if(Math.abs(this.state.velocity.y) <= 0.1) {
      ticksPerFrame = 60;
    }
    else {
        ticksPerFrame = Math.floor(this.state.speed.y / this.state.velocity.y)
    }

    console.log(ticksPerFrame, Math.floor(this.state.speed.y / this.state.velocity.y))
    if(this.state.ticksPerFrame != 60) {
      this.setState({
        ticksPerFrame: ticksPerFrame
      })
    }



  }

  render() {

    return (
      <Sprite
        repeat={true}
        src={require('../../assets/soccerPong/sprites/ball_frames.png')}
        tileWidth={48}
        tileHeight={48}
        ticksPerFrame={this.state.ticksPerFrame}
        scale={this.context.scale}
        state={0}
        steps={[5]}
        style={{
          transform: [
            {translateX: this.state.position.x},
            {translateY: this.state.position.y}
          ]
        }}
      />
    );
  }
}
