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

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
    },
};

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

    const onPickImage = res => {
        if (res.didCancel || !res) {
            return;
        }
        //console.log(res);
        //console.log(res.uri);
        console.log(res.assets[0].uri);
        imgUrlsource = res.assets[0].uri;
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
        //const newImgList = imgUrlsource;
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
        const postBoard = {
            title: title,
            content: content,
            latitude: 11.12,
            longitude: 23.45,
            tags: [],
            imgList: [
                {
                    imgTags: [],
                },
            ],
        };

        const formData = new FormData();
        console.log('ddddfdf', formData);
        const imgUrl = imgurl;
        console.log('i am', imgUrl);

        formData.append('title', JSON.stringify(postBoard.title), {
            type: 'application/json',
        });
        formData.append('content', JSON.stringify(postBoard.content), {
            type: 'application/json',
        });
        formData.append('latitude', JSON.stringify(postBoard.latitude), {
            type: 'application/json',
        });
        formData.append('longitude', JSON.stringify(postBoard.longitude), {
            type: 'application/json',
        });
        formData.append('tags', JSON.stringify(postBoard.tags), {
            type: 'application/json',
        });
        formData.append('imgList', JSON.stringify(postBoard.imgList), {
            type: 'application/json',
        });
        formData.append('imgUrl', imgurl);

        //console.log(formData.imgList);

        console.log('formData:', formData);
        const formList = formData._parts;
        console.log(formList);
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

        const payload = {imgUrl: imgUrl, postBoard: JSON.stringify(objectValue)};
        console.log(payload.imgUrl);
        console.log(payload.postBoard);
        console.log(payload);

        console.log('formData마지막:', formData);
        axios.post(baseUrl + '/boards/new', payload, {...config}).catch(error => {
            // POST 요청이 실패한 경우 실행되는 코드
            console.error(error);
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
