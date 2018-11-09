/* eslint react/prefer-stateless-function: 0 */
// import React from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
// } from 'react-native';
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   font: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     color: 'white',
//   },
// });
//
// const Screen = () => (
//   <View style={styles.container}>
//     <Text style={styles.font}> This is profile menu !</Text>
//     {/* <Button
//       onPress={() => pushIn(componentId, 'navigation.test.screen2')}
//       title="Next Screen"
//     /> */}
//   </View>
// );
//
// export default Screen;

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

const CIRCLE_RADIUS = 36;
const CORNER_SIZE = 16;
const CORNER_BORDER_WIDTH = 2;
const styles = StyleSheet.create({
  mainContainer: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginTop: 0,
    width: CIRCLE_RADIUS * 5,
    height: CIRCLE_RADIUS * 5,
    // borderWidth: 1,
    // borderColor: '#e1e1e1',
    transform: [{ rotate: '45deg' }],
  },
  cornerUpleft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderTopWidth: CORNER_BORDER_WIDTH,
    borderLeftWidth: CORNER_BORDER_WIDTH,
    borderColor: 'rgba(255,255,255,.35)',
  },
  cornerUpright: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderTopWidth: CORNER_BORDER_WIDTH,
    borderRightWidth: CORNER_BORDER_WIDTH,
    borderColor: 'rgba(255,255,255,.35)',
  },
  cornerBottomleft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderBottomWidth: CORNER_BORDER_WIDTH,
    borderLeftWidth: CORNER_BORDER_WIDTH,
    borderColor: 'rgba(255,255,255,.35)',
  },
  cornerBottomright: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderBottomWidth: CORNER_BORDER_WIDTH,
    borderRightWidth: CORNER_BORDER_WIDTH,
    borderColor: 'rgba(255,255,255,.35)',
  },
  bounder: {
    position: 'absolute',
    width: CIRCLE_RADIUS * 3.2,
    height: CIRCLE_RADIUS * 3.2,
    borderRadius: CIRCLE_RADIUS * 1.6,
    // backgroundColor: '#ecf0f1',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    // opacity: 0.8
  },
  dropZone: {
    height: 100,
    backgroundColor: '#2c3e50',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
  },
  draggableContainer: {
    position: 'absolute',
  },
  circle: {
    // backgroundColor: '#e8eeef',
    backgroundColor: '#45d9f3',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 2.5,
    // borderColor: '#e74c3c',
    borderColor: 'rgba(69,217,243,.25)',
    opacity: 1,
    elevation: 6,
  },
});

class Joystick extends Component {
  constructor(props) {
    super(props);
    this.onRotate = this.onRotate.bind(this);
    this.state = {
      bounderPos: {},
      nipplePos: {},
      pan: new Animated.ValueXY(),
    };

    // const RADIUS = 36
    const _bounds = 36 * 1.6;
    const MAX_LINEAR_SPEED = 1;
    const MAX_ANGULAR_VEL = 3.14;
    const PUBILISH_RATE = 25;

    let speed = {
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    };

    let intervalMessage;

    // normalize vector
    const _normalize = (x, y) => {
      const length = Math.sqrt(x * x + y * y);
      return { x: x / length, y: y / length };
    };

    //  const _accel = (f,s) => {
    //      s.linear.x += (-f * 0.01);
    //      s.linear.x = Math.min(s.linear.x, MAX_LINEAR_SPEED);
    //      return s;
    //
    //  }

    // create panResponder
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // init action
      // onPanResponderGrant: () => {
      //   intervalMessage = setInterval(() => {
      //     this.props.output(speed, this.props.ctrlRobot);
      //   }, 1000 / PUBILISH_RATE);
      //
      //   // intervalMessage = setInterval(this.props.output(speed, this.props.ctrlRobot), 50);
      // },

      onPanResponderMove: (e, { dx, dy }) => {
        let s_linear;
        let w_angular;
        let dis = dx * dx + dy * dy;

        if (dis < _bounds * _bounds) {
          this.state.pan.setValue({ x: dx, y: dy });
          s_linear = -dy / _bounds * MAX_LINEAR_SPEED;
          w_angular = -dx / _bounds * MAX_ANGULAR_VEL;
          this.state.pan.setValue({ x: dx, y: dy });
        } else {
          const nVec = _normalize(dx, dy);
          dis = _bounds * _bounds;
          s_linear = -nVec.y * MAX_LINEAR_SPEED;
          w_angular = -nVec.x * MAX_ANGULAR_VEL;
          this.state.pan.setValue({ x: _bounds * nVec.x, y: _bounds * nVec.y });
        }
        if (this.props.ctrlRobot && this.props.output && typeof this.props.output === 'function') {
          speed = {
            linear: {
              x: s_linear,
              y: 0,
              z: 0,
            },
            angular: {
              x: 0,
              y: 0,
              z: w_angular,
            },
          };
        }
      },

      onPanResponderRelease: (e, gesture) => {
        clearInterval(intervalMessage);
        // this.props.output(speed, this.props.ctrlRobot) //?? need to send 0 speed here??
        Animated.spring(
          this.state.pan,
          { toValue: { x: 0, y: 0 } },
        ).start();
      },
    });
  }


  // componentDidMount() {
  //   // Event Listener for orientation changes
  //   Dimensions.addEventListener('change', () => {
  //     let s= Dimensions.get('window');
  //     this.setState({
  //       bounderPos: {top: s.height/2 - CIRCLE_RADIUS*1.6, left: s.width/2 - CIRCLE_RADIUS*1.6},
  //       nipplePos: {top: s.height/2 - CIRCLE_RADIUS, left: s.width/2 - CIRCLE_RADIUS},
  //     });
  //   });
  // }

  componentWillMount() {
    // init joystick position
    const s = Dimensions.get('window');
    this.setState({
      bounderPos: { top: s.height / 2 - (CIRCLE_RADIUS * 1.6 + 40), left: s.width / 2 - CIRCLE_RADIUS * 1.6 },
      nipplePos: { top: s.height / 2 - (CIRCLE_RADIUS + 40), left: s.width / 2 - CIRCLE_RADIUS },
    });
  }

  componentWillUnmount() {
    // important to remove the listener when componet unmount
    // Dimensions.removeEventListener('change');
  }

  onRotate(e) {
    const w = e.nativeEvent.layout.width;
    const h = e.nativeEvent.layout.height;
    this.setState({
      bounderPos: { top: h / 2 - CIRCLE_RADIUS * 1.6, left: w / 2 - CIRCLE_RADIUS * 1.6 },
      nipplePos: { top: h / 2 - CIRCLE_RADIUS, left: w / 2 - CIRCLE_RADIUS },
    });
  }

  render() {
    return (
      <View
        style={styles.mainContainer}
        // onLayout={this.onRotate}
      >
        <View style={styles.indicator}>
          <View style={styles.cornerUpleft} />
          <View style={styles.cornerUpright} />
          <View style={styles.cornerBottomleft} />
          <View style={styles.cornerBottomright} />
        </View>
        <View style={[styles.bounder, this.state.bounderPos]} />
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    return (
      <View style={[styles.draggableContainer, this.state.nipplePos]}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.circle, this.state.pan.getLayout()]}
        />
      </View>
    );
  }
}

export default Joystick;
