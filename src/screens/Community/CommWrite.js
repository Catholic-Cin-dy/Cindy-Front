import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Draggable from 'react-native-draggable';
import {useNavigation} from '@react-navigation/native';
import MapScreen from '../../trash/MapScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation(); // useNavigation 훅 사용

  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const hashTagRef = useRef(null);
  const [hashTag, setHashTag] = useState([]);
  const [tagName, setTagName] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
    if (text.length > 0) {
      const params = {
        content: text,
      };
      const config = {
        headers: {
          'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
        },
      };

      axios
        .get(baseUrl + '/boards/tag', {params, ...config})
        .then(response => {
          setSuggestions(response.data.result);
          console.log(response.data.result); // 추가된 console.log
        })
        .catch(error => console.error(error));
    } else {
      setSuggestions([]);
    }
  };

  //누른 item값을 태그의 배열에 추가하기
  const handleSuggestionPress = item => {
    setSearchText(item);
    setHashTag(prevTags => {
      if (prevTags.includes(item)) {
        // 이미 존재하는 태그인 경우, 이전 상태 그대로 반환
        return prevTags;
      } else {
        // 새로운 태그인 경우, 새로운 배열 생성하여 반환
        return [...prevTags, item];
      }
    });
    console.log(item);
  };

  const renderSuggestion = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const onChangeTitle = inputText => {
    setTitle(inputText);
  };

  const onChangeContent = inputText => {
    setContent(inputText);
  };

  const goToMap = () => {
    navigation.navigate(MapScreen);
  };

  const handleDrag = (index, event, gestureState) => {
    const {x, y} = gestureState;
    setSelectedImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index].x = x;
      updatedImages[index].y = y;
      return updatedImages;
    });
  };

  const handleTextChange = (index, text) => {
    setSelectedImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index].text = text;
      return updatedImages;
    });
  };

  const openPicker = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        compressImageQuality: 0.5,
      });

      for (const image of images) {
        const croppedImage = await ImagePicker.openCropper({
          mediaType: 'photo',
          path: image.path,
          width: 1000,
          height: 1000,
        });
        const imageUrl = {
          uri: croppedImage.path,
          type: croppedImage.mime,
          name: croppedImage.path.split('/').pop(),
        };

        selectedImages.push(imageUrl);
      }

      setImgurl(prevImages => [...prevImages, ...selectedImages]);
      console.log('이것은', selectedImages);
      console.log('이것은222', imgurl);
    } catch (error) {
      console.log(error);
    }
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
    //console.log(res);
    //console.log(res.uri);
    console.log(res.assets[0].uri);
    //imgUrlsource = res.assets[0].uri;
    setImage(res.assets[0].uri);
    // imgurl.type = 'image/jpeg';
    // imgurl.name = 'image.jpg';
    //submitBtn();
    //submitBtn(); 비로 실행되게 만듦 이유 :imgUrlsource 변수에 값을 할당되기 전 먼저 함수 호출된다 해서 ㅅㅍ
    const imgUrlsource = {
      uri: res.assets[0].uri,
      type: res.assets[0].type,
      name: res.assets[0].fileName,
    };
    console.log(imgUrlsource);
    //const newImgList = imgUrlsource;
    setImgurl(imgUrlsource);
  };

  const submitBtn = () => {
    const postBoard = {
      title: title,
      content: content,
      latitude: 11.12,
      longitude: 23.45,
      tags: hashTag,
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
    formData.append('tags', postBoard.tags.toString());
    formData.append(
      'imgTagList',
      JSON.stringify(postBoard.imgTagList).toString(),
    );

    // const form = {
    //   title: postBoard.title,
    //   content: postBoard.content,
    //   latitude: postBoard.latitude,
    //   longitude: postBoard.longitude,
    //   tags: postBoard.tags,
    //   imgList: postBoard.imgList,
    // };
    //formData.append('postBoard', JSON.stringify(form));
    formData.append('imgFiles ', imgurl);
    //console.log('postBoard 는 이거임', form);
    console.log('imgUrl 은 이거임', imgurl);
    //console.log(formData.imgList);

    //console.log('formData:', formData);
    const formList = formData._parts;
    //console.log(formList);
    //요기
    const arrayValue = formData._parts;
    const objectValue = Object.fromEntries(arrayValue);

    /*fetch(baseUrl + '/boards/new', payload, config)
          .then(response => {
            if (response.ok) {
              console.log('Request successful');
            } else {
              console.log('Request failed');
            }
          })
          .catch(error => console.error(error));*/

    //const payload = {imgUrl: imgUrl, postBoard: JSON.stringify(objectValue)};
    // console.log(payload.imgUrl);
    // console.log(payload.postBoard);
    // console.log(payload);
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
          <View style={{flexDirection: 'row'}}>
            {selectedImages.map((image, index) => (
              <View key={index}>
                <Image
                  source={{uri: image.uri}}
                  style={{width: 60, height: 80}}
                />
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.touchable} onPress={goToMap}>
          <Text style={styles.label2}>위치 선택</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input1}
          placeholder="검색어를 입력하세요."
          onChangeText={handleSearchTextChange}
          value={searchText}
        />
        <FlatList
          data={suggestions}
          renderItem={renderSuggestion}
          keyExtractor={item => item}
        />

        <Text>검색어 : {searchText}</Text>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="제목을 작성해주세요."
        />
        <Text style={styles.label}>글 작성</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeContent}
          value={content}
          placeholder="글을 작성해주세요."
        />
        <Button title="제출" style={styles.submitBtn} onPress={submitBtn} />
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  /*container: {
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
    position: 'absolute',
    width: 327,
    height: 48,
    left: 18,
    top: 892,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
  },
  submitBtn: {
    width: 327,
    height: 37,
    left: 15,
    top: 1212,
    backgroundColor: '#6B7AFF',
    borderRadius: 8,
  },
  label: {
    width: 28,
    height: 22,
    left: 677.08,
    top: 2647,
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: '140%',
    color: '#000000',
    transform: [{rotate: '0.2deg'}],
  },
  label2: {
    width: 28,
    height: 22,
    left: 677.08,
    top: 2647,
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: '140%',
    color: '#000000',
  },
  touchable: {
    marginTop: 8,
    marginBottom: 8,
  },*/
});
