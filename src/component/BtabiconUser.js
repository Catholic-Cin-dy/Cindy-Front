import React, { Component } from "react";
import { Image } from "react-native";
import userIcon from '../assets/btab-user.png';

class BtabiconUser extends Component {

  render() {

    return (
      <Image
        source={userIcon}
        resizeMode='contain'
      />
    );

  }

}

export default BtabiconUser;
