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
import {useFocusEffect} from '@react-navigation/native';
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
    const [imgurl, setImgurl] = useState([]);

    const [suggestions, setSuggestions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const hashTagRef = useRef(null);
    const [hashTag, setHashTag] = useState([]);
    const [tagName, setTagName] = useState('');

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
              <Text>이미지를 선택해주세요</Text>
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
              <Text>지도</Text>
              <View style={styles.map} />
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
