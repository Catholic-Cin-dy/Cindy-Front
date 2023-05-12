import React, { useState, useEffect }  from 'react';
import {StyleSheet, Text, View, Button, Alert,Image,SafeAreaView,ScrollView} from 'react-native';
import Swiper from 'react-native-swiper'
import axios from 'axios';
const baseUrl = 'https://www.awesominki.shop';

export default function Mainslider() {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
        };

        axios.get(baseUrl + '/home/banner', {...config })
          .then(response =>setData(response.data.result))
          .catch(error => console.error(error))
    }, []);


    return (
      <View style={styles.container1}>
          <Swiper
            autoplay={true}
            autoplayTimeout = {2.5}
            showsPagination={false}>
              {data.map(item => (
                <View style={styles.slide} key={item.id} >
                    <Image style={styles.image} source={{ uri: item.bannerUrl}}/>
                    <Text  style={styles.text1}>{item.title}</Text>
                    <Text  style={styles.text2}>{item.content}</Text>

                </View>
              ))}

          </Swiper>
      </View>
    );

}

const styles = StyleSheet.create({
    container1: {
        width:'100%',
        height: 519,
    },
    wrapper: {

    },
    slide: {
        flex: 1,

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    text1:{ //타이틀
        position: 'absolute',
        color:'white',
        fontSize: 30,
        marginTop:350,
        marginLeft:27,
        fontWeight:"bold",
    },
    text2:{ //타이틀 밑에
        position: 'absolute',
        color:'white',
        fontSize: 16,
        marginTop:400,
        marginLeft:30,
        fontWeight:"bold",
    },


});

//<View style={[styles.slideContainer,styles.slide2]}>
//   <Text>Sdsklmd</Text>
//</View>
//<View style={[styles.slideContainer,styles.slide3]}>
//  <Text>Slide 3</Text>
//</View>

//slide1: {
// backgraoundColor: 'rgba(200,20,20,0.3)',
//},
//slide2: {
// backgroundColor: 'rgba(20,200,20,0.3)',
//},
//slide3: {
//   backgroundColor: 'rgba(200,20,20,0.3)',
//},
