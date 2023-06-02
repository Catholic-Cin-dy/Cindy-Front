import React from 'react';
import { TouchableOpacity, View, TouchableWithoutFeedback, Text } from 'react-native';
import IconPopup from './IconPopup';
import styles from './styles';

const CommuModal = (props) => {
  const layout = { flex: 1, left: props.x, top: props.y };

  return (
    <>
      <TouchableOpacity onPress={props.closeCameraPopupMenu} style={{ flex: 1 }}>
        <View style={layout}>
          <TouchableWithoutFeedback>
            <View style={styles.cameraModalView}>
              <View style={styles.cameraView}>
                <TouchableOpacity onPress={props.goCameraScreen}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconPopup name="camera" size={25} color={'black'} />
                    <Text style={styles.modal_text}>카메라   </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.galleryView}>
                <TouchableOpacity onPress={props.goGalleryScreen}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconPopup name="image" size={25} color={'black'} />
                    <Text style={styles.modal_text}>앨범</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CommuModal;
