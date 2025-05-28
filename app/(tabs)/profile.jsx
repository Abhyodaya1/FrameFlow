import { View, Text, SafeAreaView, Image, StatusBar, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import Emptystate from '../../components/Emptystate';
import { getuserpost, signout } from '../../lib/appwrite';
import useAppwrite from '../../lib/useappwrite';
import Videocard from '../../components/Videocard';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from '../../context/GlobalProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from '../../constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Infobox from '../../components/Infobox';
import { router } from 'expo-router';

const profile = () => {
  
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  
  
  const { data: posts =[] } = useAppwrite(() => getuserpost(user.$id));

  // ✅ Logout Function
  const logout = async () => {
    await signout();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/SignIn')
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    
    <View className="overflow-hidden">
      <SafeAreaView className="h-full">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#252A32', '#0C0F14']}
          className=" w-screen h-screen"
        >
          <StatusBar backgroundColor={'#0C0F14'} />

          <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <Videocard video={item} />}
            ListHeaderComponent={() => (
              <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                <View className="w-full flex-row-reverse justify-between items-center">
                 <TouchableOpacity onPress={logout}>
                  <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
                 </TouchableOpacity>
                </View>
               
              <View className="w-20 h-20 border border-secondary rounded-lg justify-center items-center overflow-hidden">
                 <Image
                      source={{ uri: user?.avatar }}
                      className="w-[90%] h-[90%] rounded-lg"
                      resizeMode="cover"
                    />
                </View>
                
                <Infobox 
                title={user?.username}
                containerStyle="mt-5"
                titlestyles = "text-lg"
                />
                <View className="flex-row  gap-4 mt-5">
                  <Infobox title={posts.length || 0} subtitle="Posts" containerStyle='mr-10' titlestyles="text-xl" />
                  <Infobox title="1.2k" subtitle="Followers" titlestyles="text-xl" />
                </View>
                </View>
            )}
            ListEmptyComponent={() => <Emptystate title="No videos found" subtitle="Be the first one to upload" />}
          />
        </LinearGradient>
      </SafeAreaView>
    </View>
    </GestureHandlerRootView>
  );
};

export default profile;
