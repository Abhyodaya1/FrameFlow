import { View, Text, SafeAreaView, Image, StatusBar, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { images } from "../../constants";
import Searchinput from "../../components/Searchinput";
import Trending from "../../components/Trending";
import Emptystate from "../../components/Emptystate";
import { getallpost, getLatestPost } from '../../lib/appwrite';
import useAppwrite from '../../lib/useappwrite';
import Videocard from '../../components/Videocard';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from '../../context/GlobalProvider';

const home = () => {
   const [refreshing, setRefreshing] = useState(false);
   const { data: posts, refetch } = useAppwrite(getallpost);
   const { data: latestpost } = useAppwrite(getLatestPost);
   const { user } = useGlobalContext();

   const onRefresh = async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
   };

   return (
      <View className="flex-1 bg-black overflow-hidden">
         <SafeAreaView className="flex-1">  
            <LinearGradient
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               colors={['#252A32', '#0C0F14']}
               className="flex-1 justify-center items-center"
            >
               <StatusBar backgroundColor={'#0C0F14'} />
               <FlatList 
                  data={posts}
                  keyExtractor={(item) => item.$id} 
                  renderItem={({ item }) => <Videocard video={item} />}
                  ListHeaderComponent={() => (
                     <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                           <View>
                              <Text className="font-pmedium text-sm text-gray-100 w-full">
                                 Welcome Back,
                              </Text>
                              <Text className="font-pbold text-2xl text-white">
                                 {user?.username}
                              </Text>
                           </View>
                           <View className="mt-2">
                              <Image 
                                 source={images.logoSmall}
                                 className="w-9 h-10"
                                 resizeMode="contain"
                              />
                           </View>
                        </View>
                        <Searchinput />
                        <View className="w-full flex-1 pt-5 pb-8">
                           <Text className="text-white text-xl font-pregular mb-2">
                              Latest Video
                           </Text>
                           <Trending posts={latestpost ?? []} />
                        </View>
                     </View>
                  )}
                  ListEmptyComponent={() => (
                     <Emptystate 
                        title="No video found"
                        subtitle="Be the first one to upload"
                     />
                  )}
                  refreshControl={
                     <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                     />
                  }
               />
            </LinearGradient>
         </SafeAreaView>
      </View>
   );
};

export default home;
