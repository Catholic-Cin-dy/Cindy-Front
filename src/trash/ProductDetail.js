import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import Main from '../Main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const baseUrl = 'https://www.awesominki.shop'; //api 연결을 위한 baseUrl

export default function ProductDetail({navigation}) {
  const [data, setData] = useState({});
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {params} = useRoute();
  const productId = 67;

  useEffect(() => {
    const config = {
      headers: {
        'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
      },
    };
    const params = {
      page: 0,
      size: 100,
      filter: 0,
    };
    setLoading(true);

    axios
      .get(baseUrl + `/products/${productId}`, config)
      .then(response => {
        const result = response.data.result;
        setData({
          productId: result.productId,
          brandName: result.brandName,
          productName: result.productName,
          bookmark: result.bookmark,
          imgUrl: result.imgUrl,
          productUrl: result.productUrl,
        });
      })
      .catch(error => {
        console.error(error);
        setError('Error fetching data');
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  }, []);

  return (
    <View style={styles.layerMain}>
      <View style={styles.layer1}>
        {data.map(item => (
          <View key={item.productId}>
            <Image style={styles.imageBig} source={{uri: item.imgUrl}} />
            <View>
              <Text style={styles.text1}>{item.brandName}</Text>
              <Text style={styles.text1}>{item.productName}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

//   return (
//     <View style={styles.layerMain}>
//       {data &&
//         data.map(item => (
//           <View style={styles.layer1}>
//             <View>
//               <Image
//                 key={item.productId}
//                 style={styles.imageBig}
//                 source={{uri: item.imgUrl}}
//               />
//             </View>
//             <View>
//               <Text key={item.text1} style={styles.Info1}>
//                 {item.brandName}
//               </Text>
//               <Text key={item.text2} style={styles.Info2}>
//                 {item.productName}
//               </Text>
//             </View>
//           </View>
//         ))}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  layerMain: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
    flexDirection: 'row',
  },
  layer1: {
    width: '100%',
    height: 410,
    borderWidth: 1,
    borderColor: 'magenta',
    flexDirection: 'row',
  },
  layer2: {
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: 'orange',
    flexDirection: 'row',
  },
  imageBig: {
    width: 334,
    height: 334,
    backgroundColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
