import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Formfield from '../../components/Formfield';
import { Video } from 'expo-av';
import { icons } from '../../constants';
import Custombutton from '../../components/Custombutton';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import {useGlobalContext} from '../../context/GlobalProvider';

const { width } = Dimensions.get('window');

const Create = () => {
  const {user} = useGlobalContext();
  const [upload, setUpload] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });
   const openPicker = async (selectType) =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

  if(!result.canceled){
    if(selectType === 'image'){
      setForm({...form, thumbnail: result.assets[0]})
    }
    else if(selectType === 'video'){
      setForm({...form, video: result.assets[0]})
    }
    else {
      setTimeout(() => {
        Alert.alert("document picked", JSON.stringify(result,null,2))
      }, 1000);
    }
   }}
  const submit = async ()=>{
    if(!form.title || !form.video || !form.thumbnail || !form.prompt){
      Alert.alert("Error", "Please fill in all fields")
      return
    }
    setUpload(true)
    try{
          await createVideo({
            ...form, userId: user.$id}
          )
          Alert.alert("Success", "Video uploaded successfully") 
          router.replace('/home')
    }
    catch(error){
      Alert.alert("Error", error.message)
    }
    finally{
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      })
      setUpload(false)
  }};

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#252A32', '#0C0F14']}
        className="flex-1 justify-center items-center"
      >
        <ScrollView className="w-full px-4 my-6">
          <Text className="text-2xl text-white font-semibold text-center mb-6">Upload Video</Text>
          <View className="w-full justify-center items-center">
          <Formfield
            title="Video Title"
            value={form.title}
            placeholder="Enter video title"
            handleChangeText={(text) => setForm({ ...form, title: text })}
            otherStyles="w-full mb-3 "
          />
          </View>
          <View className="w-full mb-3">
            <Text className="text-lg text-white font-semibold mb-1">Upload Video</Text>
            <TouchableOpacity className="w-full  rounded-2xl justify-center items-center p-4" onPress={() => openPicker('video')}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  style={{ width: width - 40, height: 200 }}
                  resizeMode="cover"
                  className="rounded-2xl"
                />
              ) : (
                <View className="w-full h-40 bg-black-100 rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                    <Image source={icons.upload} className="w-6 h-6" resizeMode="contain" />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="w-full mb-3">
            <Text className="text-lg text-white font-semibold mb-1">Upload Thumbnail</Text>
            <TouchableOpacity className="w-full rounded-2xl justify-center items-center p-3"  onPress={() => openPicker('image')}>
              {form.thumbnail ? (
                <Image source={{ uri: form.thumbnail.uri }} style={{ width: width - 40, height: 200 }} resizeMode="cover" className="rounded-2xl" />
              ) : (
                <View className="w-full h-20 bg-black-100 rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                    <Image source={icons.upload} className="w-6 h-6" resizeMode="contain" />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Formfield
            title="Prompt"
            value={form.prompt}
            placeholder="Enter prompt"
            handleChangeText={(text) => setForm({ ...form, prompt: text })}
            otherStyles="w-full mb-5"
          />
          <Custombutton title="Upload" handlePress={submit} isLoading={upload} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Create;