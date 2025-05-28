import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Redirect } from 'expo-router';
import { images } from '../constants';
import Custombutton from '../components/Custombutton';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from '../context/GlobalProvider';

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#252A32', '#0C0F14']}
        className="justify-center items-center w-full h-full"
      >
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View
            className="w-full justify-center items-center h-[85vh] px-4"
            style={{ paddingBottom: 90, margin: 'auto' }}
          >
            <Image source={images.logo} className="w-[150px] h-[70px]" resizeMode="contain" />
            <Image source={images.cards} className="max-w-[380px] w-full max-h-[300px]" resizeMode="contain" />
            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless{''} Possibilities with {' '}
              </Text>
              <Text className="text-3xl text-secondary-100 font-bold text-center">FrameFlow</Text>
              <Image source={images.path} className="w-[170px] h-[20px] absolute bottom-2 -right-8" resizeMode="contain" />
            </View>
            <Text className="text-gray-100 font-pregular text-center mt-3">
              FrameFlow is a platform that allows you to create and share your own custom frames with the world.
            </Text>
            <Custombutton
              title="Continue with email"
              handlePress={() => {
                router.push('/SignIn');
              }}
              containerstyle="w-full mt-7"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}