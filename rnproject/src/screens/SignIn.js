import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Background from './Background';
import loginlogo from '../assets/loginlogo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import axios from 'axios';
const SignIn = () => {
  const API_URL = `http://10.0.2.2:3000`;

  //no separate state variable, but managed by form itself
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},reset
  } = useForm();

  // const onSignInPress = async (data) => {
  //     console.log("func called");
  //     try {
  //       const response = await axios.post(`${API_URL}/login`, {
  //         email: data.email,
  //         password: data.password,
  //       });
  //       const token = response.data.token;
  //       // do something with the token, such as saving it to the device's storage
  //       navigation.navigate("Home");
  //     } catch (error) {
  //       console.log(error);
  //       // handle the error, such as showing an error message to the user
  //     }
  //   };

  const onSignInPress = async data => {
    console.log('func called');
    try {
      const response = await axios.post(`${API_URL}/login`, {
        emailOrUsername: data.emailOrUsername,
        password: data.password,
      });
      const token = response.data.token;
      // do something with the token, such as saving it to the device's storage
      reset();
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      // handle the error, such as showing an error message to the user
    }
  };

  const onForgotPassword = () => {
    navigation.navigate('RequestResetPassword');
  };

  const onSignInFacebook = () => {};

  const onSignInGoogle = () => {};

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Background>
      <ScrollView>
        <View style={styles.image}>
          <Image
            source={loginlogo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
          />

          <CustomInput
            name="emailOrUsername"
            placeholder="Add email Or Username"
            control={control}
            rules={{
              required: 'Email is required',
              minLength: {
                value: 6,
                message: 'Email should be minimum 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Email cannot be more than 24 characters',
              },
            }}
          />
          <CustomInput
            secureTextEntry={true}
            name="password"
            placeholder="Password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be minimum 3 characters',
              },
            }}
            control={control}
          />

          <CustomButton text="SignIn" onPress={handleSubmit(onSignInPress)} />
          <CustomButton
            text="Forgot Password ?"
            onPress={onForgotPassword}
            type="SECONDARY"
          />
          <CustomButton
            text="SignIn with Facebook"
            onPress={onSignInFacebook}
            bgColor="#fad7d7"
            fgColor="#fa6464"
          />
          <CustomButton
            text="SignIn with Google"
            onPress={onSignInGoogle}
            bgColor="#ffe6bf"
            fgColor="#fca117"
          />
          <CustomButton
            text="Don't have an account?"
            onPress={onSignUpPressed}
            type="SECONDARY"
          />
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    //     flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    maxWidth: 100,
    maxHeight: 100,
    padding: 20,
  },
});

export default SignIn;
