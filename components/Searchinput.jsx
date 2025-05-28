import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";
import { usePathname, router } from 'expo-router';

const Searchinput = ({ initialquery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialquery || '');

  return (
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
      "
      style={{ borderRadius: 16, borderWidth: 2 }}
    >
      <TextInput
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder="Find your Video"
        placeholderTextColor="#CDCDE0"
        className="
          flex-1 
          text-base 
          font-pregular 
          text-gray-100 
          tracking-wide 
          focus:text-white
          items-center
        "
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Please enter a search query");
          }
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

export default Searchinput;
