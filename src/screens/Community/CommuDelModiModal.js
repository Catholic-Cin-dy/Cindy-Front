import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-simple-modal';

const CommuDelModiModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.buttontext}>얏호!</Text>
      </TouchableOpacity>
      <Modal
        offset={0}
        open={open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => setOpen(false)}
        style={{ alignItems: 'center' }}
      >
        <View>
          <Text style={{ fontSize: 20 }}>모달창이요!</Text>
          <Text style={{ fontSize: 20 }}>너무 어려워요!</Text>
          <TouchableOpacity style={{ margin: 3 }} onPress={() => setOpen(false)}>
            <Text style={styles.text}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex:3,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  buttontext: {
    position: 'relative',
    left: 0,
    bottom: 0,
    fontSize: 15,
  },
  text: {
    position: 'relative',
    fontSize: 15,
    fontWeight: '700',
    left: '40%',
  },
});

export default CommuDelModiModal;
