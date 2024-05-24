import React, {useEffect, useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';
import {Button} from 'react-native-paper';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(true);
  const [devices, setDevices] = useState([]);

  // console.log('Devices list: ', devices);

  useEffect(() => {
    const bluetooth = async () => {
      const av = await RNBluetoothClassic.isBluetoothAvailable();
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      const paired = await RNBluetoothClassic.getBondedDevices();
      const connected = await RNBluetoothClassic.getConnectedDevices();
      let bonded = await RNBluetoothClassic.getBondedDevices();

      setDevices([...paired]);

      // console.log('Bluetooth state: ', av);
      // console.log('Bluetooth enabled: ', enabled);
      // console.log('Bluetooth paired: ', paired);
      // console.log('Bluetooth connected: ', connected);
      // console.log('Bluetooth bonded: ', bonded);
    };
    bluetooth();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let isConnected;
  let connectState;

  const handleConnectDevice = async deviceID => {
    connectState = await RNBluetoothClassic.connectToDevice(deviceID);
    isConnected = await RNBluetoothClassic.isDeviceConnected(deviceID);
    console.log('Connected to ', deviceID, ' ', isConnected);
  };

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 1 / 2,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 15,
          }}>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <IconF name="bluetooth" size={60} color="#0082FC" />
          </View> */}

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
            }}
            onPress={toggleModal}>
            <IconM name="cancel" size={30} color="#999" />
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
              paddingTop: 10,
              paddingBottom: 5,
            }}>
            Availiable Devices
          </Text>
          {devices.length == 0 ? (
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#999'}}>
                No bluetooth device available to connect.
              </Text>
            </View>
          ) : (
            devices.map(device => {
              return (
                <Pressable
                  onPress={() => handleConnectDevice(device.id)}
                  style={{
                    flex: 1 / 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#999',
                    marginTop: 5,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: 15}}>
                    {device.name}
                  </Text>
                </Pressable>
              );
            })
          )}
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;
