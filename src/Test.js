import React, {useState} from 'react';
import {
  Button,
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Test({navigation, route}) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    navigation.navigate('Test2', {
      categoryList: route.params.categoryList,
      gender: route.params.gender,
      name: route.params.name,
      nickname,
      password: route.params.password,
      profileImgUrl: route.params.profileImgUrl,
      socialId: route.params.socialId,
      isRequired: route.params.isRequired,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>프로필을 설정해주세요</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => {
          setNickname(text);
        }}
        placeholder="닉네임 입력"
        value={nickname}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1abc9c',
    borderRadius: 5,
    padding: 15,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});






// import React, {Component} from 'react';
// import {
//   Button,
//   Alert,
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
//
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NavigationContainer} from '@react-navigation/native';
//
// export default class Test extends Component {
//   state = {
//     text: '',
//     inputText: '',
//   };
//   submitBtn = () => {
//
//     this.setState({text: this.state.inputText});
//   };
//   submitBtn = () => {
//     this.setState({text: this.state.inputText});
//   };
//
//   render() {
//     return (
//       <View style={styles.default}>
//         <Text style={styles.header3}>프로필을 설정해주세요</Text>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={text => {
//             this.setState({inputText: text});
//           }}
//           placeholder="닉네임 입력"
//         />
//         <TouchableOpacity style={styles.button} onPress={this.submitBtn}>
//           <Text style={styles.buttonText}>다음</Text>
//         </TouchableOpacity>
//         <Text style={styles.showText}>{this.state.text}</Text>
//       </View>
//     );
//   }
// }




// function Test() {
//
//     return (
//         <View style={styles.default}>
//             <Text style={styles.header3}>프로필을 설정해주세요</Text>
//             <TextInput
//                 style={styles.textInput}
//                 onChangeText={(text)=>{this.setState({inputText: text})}}
//                 placeholder="닉네임 입력"/>
//             <Button title="다음" onPress={this.submitBtn} />
//             <Text style ={styles.showText}>{this.state.text}</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//   default: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingLeft: 16,
//     paddingRight: 16,
//     paddingTop: 16,
//   },
//   header3: {
//     textAlign: 'left',
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   textInput: {
//     marginTop: 80,
//     marginBottom: 32,
//     height: 48,
//     borderBottomWidth: 1,
//   },
//   showText: {
//     marginTop: 17,
//     fontSize: 16,
//     color: 'white',
//   },
//   btn_move: {
//     weight: 320,
//     height: 50,
//     backgroundColor: 'black',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: 'black',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 4,
//   },
// });
