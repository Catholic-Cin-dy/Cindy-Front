import React, {useEffect, useState} from 'react';
import FormData from 'form-data';
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
    'https://example.com/image1.jpeg',
    'https://example.com/image2.jpeg',
    'https://example.com/image3.jpeg',
    // Add more URLs as needed
  ];
  const submitBtn = () => {
    const formData = new FormData();
    formData.append('content', JSON.stringify(content));
    formData.append('title', JSON.stringify(title));
    imageUrls.forEach((url, index) => {
      formData.append(`image${index + 1}`, {
        uri: url,
        name: `image${index + 1}.jpg`,
        type: 'image/jpeg',
      });
    });
    console.log('formData : ' + formData.title);
    const authToken =
      'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo';
    const requestOptions = {
      method: 'POST',
      headers: {
        // multipart/
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': authToken,
      },
      //body: formData,
    };
    fetch(baseUrl + '/boards/new', requestOptions)
      .then(response => {
        // Handle the response as needed
        // For example, check the response status and do appropriate actions
        if (response.ok) {
          console.log('Request successful');
        } else {
          console.log('Request failed');
        }
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
            <View style={styles.image} />
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
        <View style={styles.map} />
        <Text>제목을 작성해주세요</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="제목을 작성해주세요."
        />
        <Text> 내용을 작성해주세요</Text>
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
