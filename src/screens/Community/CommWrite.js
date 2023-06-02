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
  const [imgurl, setImgurl] = useState([]);

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
  let imgUrlsource;

  const onPickImage = async res => {
    if (res.didCancel || !res) {
      return;
    }
    //console.log(res);
    //console.log(res.uri);
    console.log(res.assets[0].uri);

    imgUrlsource = res.assets[0].uri;
    const response = await fetch(imgUrlsource);
    const blob = await response.blob();
    setImageSource(res.assets[0].uri);
    //submitBtn();
    //submitBtn(); 비로 실행되게 만듦 이유 :imgUrlsource 변수에 값을 할당되기 전 먼저 함수 호출된다 해서 ㅅㅍ
    const newImgList = [
      {
        uri: imgUrlsource,
        type: 'image/jpeg',
        name: 'image.jpg',
      },
    ];
    setImgurl(newImgList);
  };

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  // 갤러리에서 사진 선택
  const ShowPicker = () => {
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

  const submitBtn = () => {
    const formData = new FormData();
    //const postBoard = new FormData();
    formData.append('imgUrl', imgurl[0], {
      type: 'multipart/form-data',
    });
    const postBoard = {
      title: title,
      content: content,
      latitude: 11.12,
      longitude: 23.45,
      tags: [],
      imgList: [
        {
          imgTags: [
            {
              brandId: 3,
              x: 70,
              y: 67,
            },
            {
              brandId: 4,
              x: 125,
              y: 125,
            },
          ],
        },
        {
          imgTags: [
            {
              brandId: 1,
              x: 30,
              y: 67,
            },
            {
              brandId: 2,
              x: 251,
              y: 125,
            },
          ],
        },
      ],
    };
    // const postBoardBlob = new Blob([JSON.stringify(postBoard1)], {
    //   type: 'application/json',
    // });
    //formData.append('postBoard', postBoardBlob);

    formData.append('postBoard', JSON.stringify(postBoard), {
      type: 'application/json',
    });
    // postBoard.append('title', JSON.stringify(postBoard1.title));
    // postBoard.append('content', JSON.stringify(postBoard1.content));
    // postBoard.append('latitude', JSON.stringify(postBoard1.latitude));
    // postBoard.append('longitude', JSON.stringify(postBoard1.longitude));
    // postBoard.append('tags', JSON.stringify(postBoard1.tags));
    //
    // postBoard1.imgList.forEach((imgObj, index) => {
    //   imgObj.imgTags.forEach(imgTag => {
    //     postBoard.append(
    //       `imgList[${index}][imgTags][${index}]brandId`,
    //       JSON.stringify(imgTag.brandId),
    //     );
    //     postBoard.append(
    //       `imgList[${index}][imgTags][${index}]x`,
    //       JSON.stringify(imgTag.x),
    //     );
    //     postBoard.append(
    //       `imgList[${index}][imgTags][${index}]y`,
    //       JSON.stringify(imgTag.y),
    //     );
    //   });
    // });

    //console.log('postBoard:', postBoard);

    console.log('imgUrl:', imgurl);
    //console.log('imgUrl폼:', Object(imgUrl));
    console.log('postboard폼:', Object(postBoard));

    const authToken =
      'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo';
    const imgConfig = {
      method: 'POST',
      headers: {
        // multipart/
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': authToken,
      },
      body: formData,
    };
    // console.log('바디' + body);
    // const boardConfig = {
    //   method: 'POST',
    //   headers: {
    //     // multipart/
    //     'Content-Type': 'application/json',
    //     'X-AUTH-TOKEN': authToken,
    //   },
    //   body: imgUrl,
    // };

    fetch(baseUrl + '/boards/new', imgConfig)
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

    //   fetch(baseUrl + '/boards/new', boardConfig)
    //     .then(response => {
    //       if (response.ok) {
    //         console.log('Board creation successful');
    //       } else {
    //         console.log('Board creation failed');
    //       }
    //     })
    //     .catch(error => console.error(error));
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text1}>이미지를 선택해주세요</Text>
        {img ? ( // 이미지가 있으면 라이브러리에서 받아온 이미지로 출력, 없으면 디폴트 이미지 출력!
          <Pressable style={styles.image} onPress={() => modalOpen()}>
            <Image source={{uri: img}} style={{width: 380, height: 400}} />
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
          onLaunchImageLibrary={ShowPicker}
        />
        {/*모달 띄우기*/}
        <Text style={styles.text1}>지도</Text>
        <View style={styles.map} />
        <Text style={styles.text1}>제목을 작성해주세요</Text>
        <TextInput
          style={styles.input1}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="제목을 작성해주세요."
        />
        <Text style={styles.text1}> 내용을 작성해주세요</Text>
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
  text1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  image: {
    marginLeft: 10,
    width: 380,
    height: 400,
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
    marginBottom: 10,
    width: 400,
    height: 200,
    backgroundColor: 'gray',
  },
  input1: {
    marginTop: 40,
    marginLeft: 5,
    marginBottom: 30,
    width: 400,
    height: 80,
    backgroundColor: 'gray',
  },
});
