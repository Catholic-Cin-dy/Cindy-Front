import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, PanResponder, Button} from 'react-native';

const CommuWriteTag = () => {
  //tags에는 initial state
  const [tags, setTags] = useState([]);
  const [tags2, setTags2] = useState([]);
  const [nextBrandId, setNextBrandId] = useState(1);
  const [draggedTag, setDraggedTag] = useState(null);

  useEffect(() => {
    console.log('생성한 태그는', tags);
  }, [tags]);
  useEffect(() => {
    console.log('tags 업데이트:', tags);
  }, [tags]);

  useEffect(() => {
    console.log('tags2 업데이트:', tags2);
  }, [tags2]);

  const handleTagDragStart = tag => {
    if (tag.draggable) {
      setDraggedTag(tag);
    }
  };

  const handleTagCreation = () => {
    const newTag = {
      brandId: nextBrandId,
      name: `Tag ${nextBrandId}`,
      x: 0,
      y: 0,
      draggable: true, // 태그 생성 후에는 draggable을 true로 설정
    };
    setNextBrandId(prevId => prevId + 1);
    setTags(prevTags => [...prevTags, newTag]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (draggedTag) {
          const {dx, dy} = gestureState;
          const updatedX = draggedTag.x + dx;
          const updatedY = draggedTag.y + dy;

          const updatedTags = tags.map(tag =>
            tag.brandId === draggedTag.brandId
              ? {...tag, x: updatedX, y: updatedY}
              : tag,
          );
          setTags(updatedTags);
          setTags2(updatedTags);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (draggedTag) {
          const {x, y} = draggedTag;
          handleTagDrop(x, y);
          setDraggedTag(null); // 드롭 완료 후 드래그 중인 태그 초기화
        }
      },
    }),
  ).current;

  const handleTagPress = tag => {
    console.log('태그의 현재 위치는:', tag.x, tag.y);
  };

  const handleTagDrop = (x, y) => {
    if (draggedTag) {
      const updatedTags = tags.map(tag =>
        tag.brandId === draggedTag.brandId ? {...tag, x, y} : tag,
      );
      setTags(updatedTags);
      setDraggedTag(null);
      // 드롭 완료 후 드래그 중인 태그 초기화
    }
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      {tags.map(tag => (
        <TouchableOpacity
          key={tag.brandId}
          style={{
            position: 'absolute',
            left: tag.x,
            top: tag.y,
            width: 150, // 원하는 크기로 조정
            height: 150, // 원하는 크기로 조정
            borderColor: 'blue', // 파랑색 테두리
            borderWidth: 2, // 테두리 두께
          }}
          onLongPress={() => handleTagDragStart(tag)} // 드래그 앤 드롭 시작
          onPressOut={() => handleTagDrop(tag.x, tag.y)} // 태그 드롭 시 좌표 업데이트
          onPress={() => handleTagPress(tag)} // 태그를 누를 때 좌표 콘솔 출력
          {...panResponder.panHandlers}>
          <Text>{tag.name}</Text>
        </TouchableOpacity>
      ))}
      <View style={{position: 'absolute', bottom: 100, alignSelf: 'center'}}>
        <Button title="태그 생성" onPress={handleTagCreation} />
      </View>
    </View>
  );
};

export default CommuWriteTag;
