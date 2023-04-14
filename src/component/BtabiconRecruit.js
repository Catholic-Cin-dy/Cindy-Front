import React, { Component } from "react";
import { Image } from "react-native";
import recruitIcon from '../assets/btab-recruit.png';

class BtabiconRecruit extends Component {

  render() {

    return (
      <Image
        source={recruitIcon}
        resizeMode='contain'
      />
    );

  }

}

export default BtabiconRecruit;
