import { View, Text, SafeAreaView, Image, StatusBar, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { images } from '../../constants';
import Searchinput from '../../components/Searchinput';
import Emptystate from '../../components/Emptystate';
import { searchPost } from '../../lib/appwrite';
import useAppwrite from '../../lib/useappwrite';
import Videocard from '../../components/Videocard';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPost(query));

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [query]);

  return (
    <View className="flex-1 bg-black overflow-hidden">
      <SafeAreaView className="flex-1">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#252A32', '#0C0F14']}
          className="justify-center items-center w-screen h-screen"
        >
          <StatusBar backgroundColor={'#0C0F14'} />

          <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <Videocard video={item} />}
            ListHeaderComponent={() => (
              <View className="my-6 px-4">
                <Text className="font-pmedium text-sm text-gray-100 w-full">Search Results</Text>
                <Text className="font-psemibold text-2xl text-white">{query}</Text>
                <View className="mt-6 mb-8">
                  <Searchinput initialquery={query} />
                </View>
              </View>
            )}
            ListEmptyComponent={() => <Emptystate title="No video found" subtitle="Be the first one to upload" />}
          />
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default Search;
