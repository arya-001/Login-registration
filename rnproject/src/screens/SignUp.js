



import {  View,  StyleSheet,  ScrollView,  Text,} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomeButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Background from './Background';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer from '../actions/reducers';
import { SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../actions/reducers';

const EMAIL_REGEX =
  /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = () => {
  const API_URL = `http://10.0.2.2:3000`;

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch, reset
  } = useForm();


  const pwd = watch('password');
  const dispatch = useDispatch();


  const onSignUpPress = async (data) => {
    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
  
    console.log("func called");
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log("response", JSON.stringify(res));
      console.log(res);
      console.log(res.data);
  
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          user: res.data.user,
          token: res.data.token
        }
      });
  reset();
      navigation.navigate("ConfirmSignUp");
    } catch (error) {
      console.log("error", error);
  
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error.message
      });
    }
  };
  

  const onSignInFacebook = () => {
    console.warn('Facebook');
  };

  const onSignInGoogle = () => {
    console.warn('Google ');
  };

  const onTermsOfUse = () => {
    console.warn('Terms of User ');
  };

  const onPrivacyPolicy = () => {
    console.warn('Privacy Policy ');
  };

  const onSignInPressed = () => {
    console.warn('onSignInPressed ');
    navigation.navigate('SignIn');
  };

  return (
    <Background>
      <ScrollView>
        <View style={styles.image}>
          <Text style={styles.title}> Create An Account </Text>

          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username should be minimum 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username cannot be more than 24 characters',
              },
            }}
          />
          <CustomInput
            placeholder="Email"
            name="email"
            control={control}
            rules={{
              required: 'Enter your email id',
              pattern: {value: EMAIL_REGEX, message: 'Enter valid email'},
            }}
          />

          <CustomInput
            secureTextEntry={true}
            // secureTextEntry     //same
            placeholder="Password"
            name="password"
            control={control}
            rules={{
              required: 'Enter the password',
              minLength: {
                value: 6,
                message: 'Password should be minimum 6 characters',
              },
              // maxLength: {value: 20, message: 'Password cannot be more than 20 characters'}
            }}
          />
          <CustomInput
            secureTextEntry={true}
            // secureTextEntry     //same
            name="confirmPassword"
            placeholder="Confirm Password"
            control={control}
            rules={{
              // required: 'Enter the password',
              // minLength: {value: 6, message: 'Password should be minimum 6 characters'},
              required: 'Confirm password is required',
              validate: (value) => value === pwd || 'Password do not match',
            }}
          />

          <CustomeButton
            text="Register"
            onPress={handleSubmit(onSignUpPress)}
          />

          <Text style={styles.text}>
            {' '}
            By registering, you confirm that you accept our {''}
            <Text style={styles.link} onPress={onTermsOfUse}>
              Terms of use
            </Text>{' '}
            and {''}
            <Text style={styles.link} onPress={onPrivacyPolicy}>
              Privacy Policy
            </Text>
          </Text>

          <CustomeButton
            text="SignIn with Facebook"
            onPress={onSignInFacebook}
            bgColor="#fad7d7"
            fgColor="#fa6464"
          />
          <CustomeButton
            text="SignIn with Google"
            onPress={onSignInGoogle}
            bgColor="#ffe6bf"
            fgColor="#fca117"
          />
          <CustomeButton
            text="Have an account? Sign In"
            onPress={onSignInPressed}
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
  
  },
  logo: {
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 20,
    color: 'white',
    margin: 10,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  link: {
    color: '#f5c840',
  },
});

export default (SignUp);





































































  // const onSignUpPress = async (data) => {
  //   if (data.password !== data.confirmPassword) {
  //     console.log("Passwords do not match");
  //     return;
  //   }
  //   console.log("func called");
  //   try {
  //     const res = await axios.post(`${API_URL}/signup`, {
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //     });
  //     console.log("response", JSON.stringify(res));
  //     console.log(res);
  //     console.log(res.data);
  //     navigation.navigate("ConfirmSignUp");
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  

  // const onSignUpPress = (data) => {
  //   console.log("func called");
  //   axios.post(`${API_URL}/signup`, { username: data.username, email:data.email, password: data.password }).then(res => {
  //       console.log("response", JSON.stringify(res));
  //       console.log(res);
  //       console.log(res.data)
  //       navigation.navigate("ConfirmSignUp");
  //   }).catch(error => console.log("error", error)); 
  // };


//   const onSignUpPress = (data) => {
// // /*     console.log("signing up? god hoja na bhai ");
// //     console.warn("signing up? god hoja na bhai ");
// //  */
//     console.log("func called");
//     axios.post(`${API_URL}/signup`, { username: data.username, email:data.email, password: data.password }).then(res => {
//         console.log("response", JSON.stringify(res));
//         console.log(res);
//         console.log(res.data)
//         navigation.navigate("ConfirmSignUp");
//     }).catch(error => console.log("error", error)); 

// //     console.warn("signing up? god hoja na bhai ");

// //     // //navigation.navigate('confirmSignup');
// //      signup(
// //       data.username,
// //       data.email,
// //       data.password,
// //       navigation
// //     )(dispatch);
// //     // dispatch(signup(username, email, password, navigation));

//   };

// const onSignUpPress = async (data) => {
//   const result = await dispatch(signup(data.username, data.email, data.password, data.confirmPassword));
//   if (result.success) {
//     navigation.navigate('confirmSignUp');
//   }
// };

