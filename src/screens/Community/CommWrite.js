import React, {useCallback, useEffect, useState, useRef} from 'react';
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
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Draggable from 'react-native-draggable';
import {useNavigation} from '@react-navigation/native';
import MapScreen from '../../trash/MapScreen';
import UploadModeModal from './UploadModeModal';
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

      // setImgurl(prevImages => [...prevImages, ...selectedImages]);
      setImgurl(selectedImages); // 선택된 이미지로 imgurl 상태 업데이트
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
    //const newImgList = imgUrlsource;
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

    formData.append('title', postBoard.title.toString());
    formData.append('content', postBoard.content.toString());
    formData.append('latitude', postBoard.latitude.toString());
    formData.append('longitude', postBoard.longitude.toString());
    formData.append('tags', postBoard.tags.toString());
    formData.append(
      'imgTagList',
      JSON.stringify(postBoard.imgTagList).toString(),
    );

    formData.append('imgFiles ', imgurl);
    console.log('imgUrl확인', imgurl);
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
          navigation.pop();
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('음 1' + error.response.data);
          console.log('음 2' + error.response.status);
          console.log('음 3' + error.response.headers);
        } else if (error.request) {
          console.log('음 4' + error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.whiteBG}>
        <View>
          <View style={styles.layout}>
            <Text style={styles.label}>사진 업로드</Text>
          </View>
          {/*<View style={{flexDirection: 'row', marginLeft: 10}}>*/}
          {/*<TouchableOpacity onPress={onPickImage}>*/}
          {/*  <Image source={require('../../assets/imgAdd.png')} />*/}
          {/*</TouchableOpacity>*/}

          {/*{selectedImages.map((image, index) => (*/}
          {/*  <View key={index}>*/}
          {/*    <Image*/}
          {/*      source={{uri: image.uri}}*/}
          {/*      style={{width: 100, height: 100}}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*))}*/}
          {img ? ( // 이미지가 있으면 라이브러리에서 받아온 이미지로 출력, 없으면 디폴트 이미지 출력!
            <Pressable style={styles.image} onPress={() => modalOpen()}>
              <Image source={{uri: img}} style={{width: 100, height: 100}} />
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
          {/*</View>*/}
        </View>
        <View style={styles.layout}>
          <Text style={styles.label}>나의 위치</Text>
        </View>
        <TouchableOpacity style={{marginLeft: 16}} onPress={goToMap}>
          <Image source={require('../../assets/location.png')} />
        </TouchableOpacity>
        <View style={styles.layout}>
          <Text style={styles.label}>해시태그 입력</Text>
        </View>
        <View>
          <TextInput
            style={styles.input1}
            placeholder="해시태그를 입력하세요."
            onChangeText={handleSearchTextChange}
            value={searchText}
          />
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={item => item}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.searchText1}>해시태그 : </Text>
            <Text style={styles.searchText2}>{searchText}</Text>
          </View>
        </View>
        <View style={styles.layout}>
          <Text style={styles.label}>제목</Text>
        </View>
        <View style={styles.whiteBG}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
            placeholder="제목을 작성해주세요."
          />
        </View>
        <View style={styles.layout}>
          <Text style={styles.label}>글 작성</Text>
        </View>
        <View style={styles.whiteBG}>
          <TextInput
            style={styles.input2}
            onChangeText={onChangeContent}
            value={content}
            placeholder="글을 작성해주세요."
          />
        </View>
        <View style={[styles.whiteBG, {marginTop: 20, marginBottom: 20}]}>
          <TouchableOpacity style={styles.submitBtn} onPress={submitBtn}>
            <Text style={{color: '#fff'}}>제출하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    marginLeft: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F4F4F4',
  },
  layout: {
    height: 56,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  label: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: 'medium',
    fontSize: 18,
    color: '#000000',
  },
  searchText1: {
    marginLeft: 15,
    marginTop: 5,
  },
  searchText2: {
    backgroundColor: '#FF1AA0',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
  },
  input1: {
    width: '94%',
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignSelf: 'center',
  },
  input2: {
    width: '94%',
    height: 148,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignSelf: 'center',
    textAlignVertical: 'top',
  },
  submitBtn: {
    width: '94%',
    height: 36,
    backgroundColor: '#6B7AFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    width: '94%',
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignSelf: 'center',
  },
  whiteBG: {
    backgroundColor: 'white',
  },
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
