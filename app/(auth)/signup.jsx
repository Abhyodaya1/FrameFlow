import { View, Text, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { images } from '../../constants';
import "nativewind";
import Formfield from '../../components/Formfield';
import Custombutton from '../../components/Custombutton';
import { Link, useRouter } from 'expo-router';
import { createUser, getCurrentUser, signin } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Signup = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center min-h-[84vh] px-4 mt-20">
          <Image
            source={images.logo}
            className="w-[180px] h-[50px] absolute top-10 left-4"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-semibold font-psemibold mt-10 absolute top-20 left-4">
            Sign-up to FrameFlow
          </Text>
          <View className="w-full flex absolute top-32 left-4">
            <Formfield
              title="Username"
              value={form.username}
              handleChangeText={(text) => setForm({ ...form, username: text })}
              otherStyles="mt-10"
            />

            <Formfield
              title="Email"
              value={form.email}
              handleChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
              otherStyles="mt-8"
            />

            <Formfield
              title="Password"
              value={form.password}
              handleChangeText={(text) => setForm({ ...form, password: text })}
              secureTextEntry={true}
              otherStyles="mt-8"
            />

            <Custombutton
              title="Sign Up"
              handlePress={submit}
              containerStyle="mt-12"
              isLoading={isSubmitting}
            />
            <View className="justify-center items-center flex-row gap-2 mt-6">
              <Text className="text-gray-100 font-psemibold text-xs">
                Have an account?
              </Text>
              <Link href="/SignIn" className="text-secondary-100 font-psemibold text-xs">
                Sign-In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
