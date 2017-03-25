import React, { PropTypes } from 'react';
import { Dimensions } from 'react-native';
import { Sprite } from 'react-game-kit/native';

export default class Ball extends React.Component {
  static contextTypes = {
    scale: PropTypes.number,
    loop: PropTypes.object
  };

  constructor(props) {
    super(props)

    this.dimensions = Dimensions.get('window');
    this.maxBounces = 8;
    this.speedIncrements = 0.05;
    this.state = {
      speed: {
        x: 10,
        y: 10
      },
      position: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0.2,
        y: 0.2
      },
      bounces: 0,
      bounceMultiplier: 1,
      ticksPerFrame: 1,
      repeat: true
    }
  }

  loop = () => {

    let speedX = this.state.velocity.x * this.state.speed.x;
    speedX = speedX > this.state.speed.x ? this.state.speed.x : speedX < -this.state.speed.x ? -this.state.speed.x : speedX;

    let speedY = this.state.velocity.y * this.state.speed.y;
    speedY = speedY > this.state.speed.y ? this.state.speed.y : speedY < -this.state.speed.y ? -this.state.speed.y : speedY;

    let newX = this.state.position.x + speedX;
    let newY = this.state.position.y + speedY;

    let bounceX = false;
    let bounceY = false;
    let {x , y} = this.state.velocity;
    let bounces = this.state.bounces;
    let bounceMultiplier = this.state.bounceMultiplier;

    if((newX + 48) >= this.dimensions.width || newX <= 0) {
      bounceX = true;
      newX = this.state.position.x;
      x = -x;
    }

    if((newY + 48) >= this.dimensions.height || newY <= 0) {
      bounceY = true;
      newY = this.state.position.y;
      y = -y;
    }

    if(bounceY || bounceX) {
      bounces++;
      // add sfx
      if(bounces % bounceMultiplier == 0) {

        bounceMultiplier += bounces / this.maxBounces;
        if(Math.abs(x) < 1) {
          if(x >= 0) {
            x+=this.speedIncrements;
          }
          else {
            x-=this.speedIncrements;
          }
        }

        if(Math.abs(y) < 1) {
          if(y >= 0) {
            y+=this.speedIncrements;
          }
          else {
            y-=this.speedIncrements;
          }
        }
      }
    }

    this.setState({
      velocity: {
        x: x,
        y: y
      },
      position: {
        x: newX,
        y: newY
      },
      bounces,
      bounceMultiplier
    })

    this.calculateTicksPerFrame()
  };

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  calculateTicksPerFrame() {

    const minTicksPerFrame = 12;

    let ticksPerFrame = Math.floor((1 / this.state.velocity.y * minTicksPerFrame) / this.state.speed.y)
    let ticksPerFrameAbs = Math.abs(ticksPerFrame)
    if(ticksPerFrame > 0) {
      ticksPerFrame = ticksPerFrameAbs <= 1 ? 1 : Math.min(ticksPerFrame, minTicksPerFrame);
    }
    else {
      ticksPerFrame = ticksPerFrameAbs <= 1 ? 1 : Math.min(ticksPerFrameAbs, minTicksPerFrame);
    }

    this.setState({
      ticksPerFrame
    });
  }

  render() {

    return (
      <Sprite
        repeat={this.state.repeat}
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
