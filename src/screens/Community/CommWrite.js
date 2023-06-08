import React, {useCallback, useEffect, useState} from 'react';
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
import {Pressable, Platform, CameraRoll} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';
const baseUrl = 'https://www.awesominki.shop';
const baseUrl2 = 'http://localhost:9000';

const headers = {
  'Content-Type': 'multipart/form-data',
  'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
};

export default function CommWrite() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImage] = useState('');
  const [img2, setImage2] = useState('');
  const [imgurl, setImgurl] = useState([]);
  const [preview, setPreview] = useState('');
  //스크롤 될 때마다 사진을 불러올 경우 현재의 갤러리를 어디까지 불러왔는지에 대한 저장 값
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState(null);
  const [result, setResult] = useState([]);

  const openPicker = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        compressImageQuality: 0.5,
      });

      const selectedImages = [];

      for (const image of images) {
        const croppedImage = await ImagePicker.openCropper({
          mediaType: 'photo',
          path: image.path,
          width: 1000,
          height: 1000,
        });

        selectedImages.push(croppedImage.path);
      }

      setResult(prevResult => [...prevResult, ...selectedImages]);
      console.log('이것은', result);
    } catch (error) {
      console.log(error);
    }
  };
  //     .then(images => {
  //       // 선택한 이미지들을 처리합니다.
  //       console.log('이미지지지', images);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // const onChangeFile = useCallback(() => {
  //   // 갤러리 사진 사용하기
  //   return ImagePicker.openPicker({
  //     includeExif: true,
  //     includeBase64: true,
  //     mediaType: 'photo',
  //   })
  //     .then(onResponse)
  //     .catch(console.log);
  // }, [onResponse]);
  //
  // const onResponse = useCallback(async response => {
  //   console.log(response.width, response.height, response.exif);
  //   // mime 은 JPG/PNG 와 같은 타입을 말한다.
  //   // base64 는 Image 를 Text 로 변환시킬 때 사용된다.
  //   //   -> 이미지 데이터의 2진수를 글자로 매칭시켜서 표현하는 것이다.
  //   // exif 는 휴대폰을 어떤 방향으로 들고 사진을 찍었는지에 대한 정보를 말한다.
  //   setPreview({uri: `data:${response.mime};base64,${response.data}`});
  //   console.log('프리뷰는', preview);
  //
  //   // 이미지를 정사각형에 맞게 줄여준다.
  //   return ImageResizer.createResizedImage(
  //     response.path,
  //     600,
  //     600,
  //     response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
  //     100, // 퀄리티를 줄일수록 용량도 줄어든다.
  //     0,
  //   ).then(r => {
  //     console.log(r.uri, r.name);
  //
  //     setImage({
  //       uri: r.uri,
  //       name: r.name,
  //       type: response.mime,
  //     });
  //     console.log('이미지는', img);
  //   });
  // }, []);

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

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }

    console.log(res.assets[0].uri);

    setImage(res.assets[0].uri);

    const imgUrlsource = {
      uri: res.assets[0].uri,
      type: res.assets[0].type,
      name: res.assets[0].fileName,
    };
    console.log(imgUrlsource);
    setImgurl(imgUrlsource);
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
    const postBoard = {
      title: title,
      content: content,
      latitude: 11.12,
      longitude: 23.45,
      tags: [],
      imgFiles: [],
      imgTagList: [
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

    const formData = new FormData();
    //const imgUrl = imgurl;
    //console.log('i am', imgUrl);

    formData.append('title', postBoard.title.toString());
    formData.append('content', postBoard.content.toString());
    formData.append('latitude', postBoard.latitude.toString());
    formData.append('longitude', postBoard.longitude.toString());
    formData.append('tags', postBoard.tags);
    formData.append(
      'imgTagList',
      JSON.stringify(postBoard.imgTagList).toString(),
    );

    formData.append('imgFiles ', imgurl);

    console.log('imgUrl 은 이거임', imgurl);

    const formList = formData._parts;

    const arrayValue = formData._parts;
    const objectValue = Object.fromEntries(arrayValue);

    console.log('formData마지막:', formData);

    axios
      .post(baseUrl + '/boards/write', formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response) {
          console.log(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('음 1' + error.response.data);
          console.log('음 2' + error.response.status);
          console.log('음 3' + error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('음 4' + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Button title="이미지 선택" onPress={openPicker} />
          <View>
            {result.map((path, index) => (
              <Image
                key={index}
                source={{uri: path}}
                style={{width: 100, height: 100}}
              />
            ))}
          </View>
        </View>
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
    marginBottom: 30,
    width: 400,
    height: 200,
    backgroundColor: 'gray',
  },
});
