import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const TabIcon = ({ color, name, focused, icon }) => {
  return (
    <View className="items-center justify-center flex-1 relative">
      <Image 
        source={icon} 
        className="w-7 h-7"  
        resizeMode="contain"
        tintColor={focused ? "#FF9C01" : "#CDCDE0"}
      />
      <Text style={{
         color: focused ? "#FF9C01" : "#CDCDE0",
        fontSize: 9,
        marginTop: 2,
        fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
      }}>
        {name}
      </Text>
    </View>
  )
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarBackground: () => (
          <View style={styles.BlurViewWrapper}>
            <BlurView blurAmount={15} style={StyleSheet.absoluteFill} />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name="Home" focused={focused} icon={icons.home} />
          )
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name="Create" focused={focused} icon={icons.plus} />
          )
        }}
      />
     
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name=" Profile" focused={focused} icon={icons.profile} />
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    paddingTop: 10,
    backgroundColor: 'rgba(12,15,20,0.6)', // Ensures no FlatList visibility
    borderTopWidth: 0,
    elevation: 0,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
  },
  BlurViewWrapper: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(12,15,20,0.9)', // More opacity to prevent FlatList visibility
  },
});

export default _layout;
