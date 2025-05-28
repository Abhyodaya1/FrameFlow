import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { Video } from 'expo-av';

const zoomIn = { 0: { scale: 0.8 }, 1: { scale: 1 } };
const zoomOut = { 0: { scale: 1 }, 1: { scale: 0.8 } };

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={300}
    >
      {play ? (
        <View style={{ width: 210, height: 290, borderRadius: 35, overflow: 'hidden' }}> 
          <Video
            ref={videoRef}
            source={{ uri: item.video }}
            style={{ width: '100%', height: '100%' }} 
            resizeMode="cover"
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) setPlay(false);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.8}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] overflow-hidden my-5 shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <View className="absolute w-16 h-16 bg-black/50 rounded-full justify-center items-center">
            <Text className="text-white text-2xl font-bold">▶</Text>
          </View>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.item.$id);
    }
  }).current;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <TrendingItem item={item} activeItem={activeItem} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
