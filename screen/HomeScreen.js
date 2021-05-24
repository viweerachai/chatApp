import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import  io from 'socket.io-client';

export default function HomeScreen() {
const [messageToSend, setMessageToSend] = useState("");
const [recvMessage, setRecvMessage] = useState([]);
const socket = useRef(null);

  useEffect(()=>{
    socket.current = io("http://192.168.1.83:3001", { transports : ['websocket'] });
    socket.current.on("message", message =>{
        setRecvMessage(prevState => [...prevState, message]);
    });
  },[]);

  const sendMessage = ()=>{ 
    socket.current.emit("message", messageToSend);
    setMessageToSend("");
  }

  const textOfRecvMessages = recvMessage.map(msg => 
    (
      <Text key={msg}>{msg}</Text>
    ));

  return (
    <View style={styles.container}>
      {textOfRecvMessages}
      <TextInput 
      value = {messageToSend} 
      onChangeText = {text=> setMessageToSend(text)} 
      onSubmitEditing ={sendMessage}
      placeholder="Enter chat massages"/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
   