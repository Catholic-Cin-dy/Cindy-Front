import React, { Component } from "react";
import { Image } from "react-native";
import bookmarkIcon from '../assets/btab-bookmark.png';

class BtabiconBookmark extends Component {

  render() {

    return (
      <Image
        source={bookmarkIcon}
        resizeMode='contain'
      />
    );

  }

}

export default BtabiconBookmark;
