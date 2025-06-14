import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const authlayout = () => {
  return (
   <>
   <Stack 
   screenOptions={{
    headerShown:false
   }}>
    <Stack.Screen name ="signin" 
    options={{
        headerShown: false,
    }}/>
    <Stack.Screen name ="signup"
    options={{headerShown:false}} />
   </Stack>
   <StatusBar style='light'/>
   </>
  )
}

export default authlayout