import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef } from 'react';
import { icons } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

const Videocard = ({ video }) => {
  if (!video || !video.video) {
    console.log("❌ Video prop is missing or invalid");
    return null;
  }

  const { title, thumbnail, creator } = video;
  const username = creator?.username || "Unknown";
  const avatar = creator?.avatar || "";
  const [fullDesc, setFullDesc] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <View className="flex-col items-center px-4 mb-14">
      {/* Video Info */}
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
              <Text className="text-white font-psemibold text-sm" numberOfLines={fullDesc ? undefined : 3}>
                {title}
              </Text>
            </TouchableWithoutFeedback>
            <Text className="text-xs text-gray-100 font-regular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {playing ? (
        <View style={{ width: 210, height: 290, borderRadius: 35, overflow: "hidden" }}>
          <Video
            ref={videoRef}
            source={{ uri: video.video }}
            style={{ width: "100%", height: "100%" }}
            resizeMode={Video.RESIZE_MODE_CONTAIN} // ✅ Fix
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) setPlaying(false);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center shadow-lg"
          activeOpacity={0.8}
          onPress={() => setPlaying(true)}
        >
          <View className="absolute w-full h-full justify-center items-center rounded-xl overflow-hidden">
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#252A32", "#0C0F14"]}
              className="w-full h-full justify-center items-center"
              style={{
                borderRadius: 20,
                paddingVertical: 10,
                paddingHorizontal: 10,
                width: "100%",
              }}
            >
              {thumbnail ? (
                <Image
                  source={{ uri: thumbnail }}
                  className="rounded-lg"
                  style={{
                    width: "90%",
                    height: "100%",
                    borderRadius: 20,
                    opacity: 0.9,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-gray-400">No Thumbnail</Text>
              )}
              <View className="absolute w-16 h-16 bg-black/50 rounded-full justify-center items-center">
                <Image source={icons.play} className="w-10 h-10" resizeMode="contain" />
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Videocard;
