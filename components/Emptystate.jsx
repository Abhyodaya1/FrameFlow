import { View, Text, Image } from 'react-native'
import React from 'react'
import {images} from '../constants'
import Custombutton from '../components/Custombutton' 
import { router } from 'expo-router';
const Emptystate = ({title,subtitle}) => {
  return (
    <View className="justify-centre items-center  px-4">
        <Image
          source = {images.empty}
          className = "w-[270px] h-[215px]"
          resizeMode = 'contain' 
          />
        <Text className="font-pbold text-2xl text-center text-white mb-2">
          {title}
         </Text>
        <Text className="font-pmedium text-sm text-center text-gray-100 w-full mb-2">
          {subtitle}
        </Text> 
      <Custombutton 
      title = "Create video"
      handlePress = {()=>router.push('/create')}
      containerstyle="w-full my-5"/>
    </View>
  )
}

export default Emptystate