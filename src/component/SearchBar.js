import React, { Component } from "react";
import { Image } from "react-native";
import searchIcon from '../assets/search-icon.png';

class SearchBar extends Component {

    render() {

        return (
            <Image
                source={searchIcon}
                resizeMode='contain'
            />
        );

    }

}

export default SearchBar;
