import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import HomeScreen from './screen/HomeScreen'
import { StyleSheet, Text, View } from 'react-native';
import { io } from 'socket.io-client';

export default function App() {
  return <HomeScreen/>;
}
