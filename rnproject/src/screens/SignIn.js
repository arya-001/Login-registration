import {View, StyleSheet, Image, useWindowDimensions, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import Background from './Background'
import login from '../assets/login.png'
import CustomInput from '../components/CustomInput';
import CustomeButton from '../components/CustomeButton';
import {useNavigation} from '@react-navigation/native'
import { useForm } from 'react-hook-form';
const SignIn = () => {
    //no separate state variable, but managed by form itself
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const {
        control, 
        handleSubmit, 
        formState: {errors},
    } = useForm();

// console.log(errors);

const onSignInPress = data => {
    console.log('handleSubmit triggered'); 
    console.log(data);
    navigation.navigate('Home');
};

const onForgotPassword= ()=>{
    navigation.navigate('RequestResetPassword');
};


const onSignInFacebook = ()=>{
};


const onSignInGoogle = ()=>{
};


const onSignUpPressed = ()=>{
    navigation.navigate('SignUp');
};



    return (
<Background>
               <ScrollView>

       <View style = {styles.image}>
    <Image source = {login} style={[styles.logo, {height:  height * 0.3}]} resizeMode="contain"/>
       
    <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username should be minimum 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username cannot be more than 24 characters',
              },
            }}
          />
        <CustomInput 
            secureTextEntry={true} 
            name= "password"
            placeholder="Password"
            rules={{required : 'Password is required', 
                    minLength : {value: 6, 
                                message: 'Password should be minimum 3 characters' }}}    
            control={control}/>

        <CustomeButton 
            text= "SignIn" 
            onPress = {handleSubmit(onSignInPress)} />
        <CustomeButton 
            text= "Forgot Password ?" 
            onPress={onForgotPassword} 
            type="SECONDARY"/>
        <CustomeButton 
            text= "SignIn with Facebook" 
            onPress={onSignInFacebook}
            bgColor="#fad7d7"
            fgColor="#fa6464" />
        <CustomeButton 
            text= "SignIn with Google" 
            onPress={onSignInGoogle}
            bgColor="#ffe6bf"
            fgColor= "#fca117"
            />
        <CustomeButton 
            text= "Don't have an account?" 
            onPress={onSignUpPressed} 
            type="SECONDARY"/>    
        </View>
        </ScrollView>
</Background>

    )
}

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
        maxWidth: 300,
        maxHeight: 200,
    }
})

export default SignIn ;