import { View} from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useSegments } from 'expo-router'
import "../global.css";

const MainLayout = ()=> {
  const {isAuthenticated} = userAuth();
  const segments = useSegments();

  useEffect(()=>{

  }, [isAuthenticated])
}

export default function _layout() {
  return (
    <View className="flex-1 ">
      <Slot/>
    </View>
  )
}