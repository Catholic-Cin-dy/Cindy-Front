import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Pressable, Platform} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import UploadModeModal from './UploadModeModal';
import axios from 'axios';
const baseUrl = 'https://www.awesominki.shop';
export default function CommWrite() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImageSource] = useState('');

  const onChangeTitle = inputText => {
    setTitle(inputText);
  };

  const onChangeContent = inputText => {
    setContent(inputText);
  };

  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    includeBase64: Platform.OS === 'android',
  };
  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res);
    setImageSource(res.uri);
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);

  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      // 안드로이드
      setModalVisible(true); // visible = true
    } else {
      // iOS
    }
  };
  const imageUrls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    // Add more URLs as needed
  ];
  const submitBtn = () => {
    const config = {
      headers: {
        'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
      },
    };

    const payload = {
      content: content,
      title: title,
      imgList: imageUrls.map(imageUrl => ({
        imgTags: [
          {
            brandId: Math.floor(Math.random() * 4) + 1, // Random brandId between 1 and 4
            x: Math.floor(Math.random() * 300), // Random x coordinate between 0 and 300
            y: Math.floor(Math.random() * 300), // Random y coordinate between 0 and 300
          },
          // Add more imgTags as needed
        ],
      })),
    };

    axios
      .post(baseUrl + '/boards/new', payload, config)
      .then(response => {
        setData(response.data);
        // Reset the text and image state variables
        setTitle('');
        setContent('');
        setImageSource('');
        // setImageSource('');
      })
      .catch(error => console.error(error));
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text>이미지를 선택해주세요</Text>
        {img ? ( // 이미지가 있으면 라이브러리에서 받아온 이미지로 출력, 없으면 디폴트 이미지 출력!
          <Pressable style={styles.image} onPress={() => modalOpen()}>
            <Image source={{uri: img}} style={{width: 300, height: 300}} />
          </Pressable>
        ) : (
          <Pressable style={styles.image} onPress={() => modalOpen()}>
            <View style={styles.image}></View>
          </Pressable>
        )}
        <UploadModeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onLaunchCamera={onLaunchCamera}
          onLaunchImageLibrary={onLaunchImageLibrary}
        />
        {/*모달 띄우기*/}
        <Text>지도</Text>
        <View style={styles.map}></View>
        <Text>제목을 작성해주세요</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="제목을 작성해주세요."
        />
        <Text> 내용을 asdasd작성해주세요</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeContent}
          value={content}
          placeholder="글을 작성해주세요."
        />
        <Button title="제출" onPress={submitBtn} />
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginLeft: 50,
    width: 500,
    height: 500,
    backgroundColor: 'gray',
  },
  map: {
    marginTop: 40,
    marginLeft: 5,
    width: 400,
    height: 200,
    backgroundColor: 'gray',
  },
  input: {
    marginTop: 40,
    marginLeft: 5,
    marginBottom: 30,
    width: 400,
    height: 200,
    backgroundColor: 'gray',
  },
});
