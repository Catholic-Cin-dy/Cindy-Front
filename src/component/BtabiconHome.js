import React, { Component } from "react";
import { Image } from "react-native";
import homeIcon from '../assets/btab-home.png';

class BtabiconHome extends Component {

  render() {

    return (
      <Image
        source={homeIcon}
        resizeMode='contain'
      />
    );

  }

}

export default BtabiconHome;
