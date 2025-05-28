import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


const Formfield = ({ title, value, otherStyles, handleChangeText, placeholder, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-lg font-psemibold text-white tracking-wide pb-2 pt-2">
        {title}
      </Text>

      <View 
        className="
          w-full 
          h-16 
          px-5 
          rounded-2xl 
          border border-black-100 
          bg-black-200 
          flex-row 
          items-center 
          justify-between 
          shadow-lg 
          shadow-black-200 
          focus:border-secondary
          borderRadius: 16,
          borderWidth: 2,
        "
      >
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A1A1AA"
          className="
            flex-1 
            text-base 
            font-pregular 
            text-gray-100 
            tracking-wide 
            focus:text-white
            
          "
          {...props}
          secureTextEntry={title.toLowerCase() === 'password' && !showPassword}
        />

        {title.toLowerCase() === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-white text-base font-pregular">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Formfield;
