import React, {Component} from 'react';
import {Image} from 'react-native';
import Logo from '../assets/AppLogo.png';

class LogoTitle extends Component {
  render() {
    return (
      <Image
        // style={{ width:50, height:50 }}
        source={Logo}
        resizeMode="contain"
      />
    );
  }
}

export default LogoTitle;
