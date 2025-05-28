import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';


const Custombutton = ({ textstyles, title, containerstyle, handlePress, isloading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`rounded-xl min-h-[62px] items-center justify-center 
      ${containerstyle} ${isloading ? 'opacity-50' : ''}`}
      disabled={isloading}
    >
      <LinearGradient
        colors={['#F9A8D4', '#EC4899']} // Gradient colors (secondary-200 to secondary-100)
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ 
          borderRadius: 12, 
          minHeight: 62, 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '100%'  // Ensure gradient fills the button
        }}
      >
        <Text className={`text-white font-psemibold text-lg ${textstyles}`}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Custombutton;
