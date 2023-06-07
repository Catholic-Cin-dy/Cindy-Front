import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {red} from 'react-native-reanimated/src';
import axios from 'axios';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const baseUrl = 'https://www.awesominki.shop';

export default function Detail1() {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
            },
        };

        axios
          .get(baseUrl + '/home/recommend', {...config})
          .then(response => setData(response.data.result))
          .catch(error => console.error(error));
    }, []);

    const navigation = useNavigation();
    const handleItemPress = productId => {
        // 해당 상품 정보를 route.params로 넘겨주고 ProductDetail 화면으로 이동
        console.log('product ID : ' + productId);
        navigation.navigate('ProductDetail', {productId});
    };
    return (
      <ScrollView>
          <View style={styles.content}>
              {data &&
                data.map(item1 => (
                  <View style={styles.contentbox}>
                      <TouchableOpacity
                        onPress={() => handleItemPress(item1.productId)}>
                          <Image
                            key={item1.productId}
                            style={styles.box}
                            source={{uri: item1.productImgUrl}}
                          />
                      </TouchableOpacity>
                      <View style={styles.intext}>
                          <Text key={item1.productId} style={styles.Info1}>
                              {item1.brand}
                          </Text>
                          <Text key={item1.productId} style={styles.Info2}>
                              {item1.productName}
                          </Text>
                      </View>
                  </View>
                ))}
          </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',

        flex: 1,
        // flexDirection: 'row',
    },
    contentbox: {
        width: 167,
        height: 240,
        marginLeft: 25,
    },
    intext: {
        padding: 10,
        height: 70,
        width: 150,
        marginLeft: 5,
    },
    box: {
        width: 156,
        height: 168,
        backgroundColor: 'gray',
        borderRadius: 8,
        marginLeft: 10,
    },
    Info1: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 13,
    },
    Info2: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
});
