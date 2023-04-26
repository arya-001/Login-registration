import {View, StyleSheet, Image, useWindowDimensions, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput';
import CustomeButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native'


const ConfirmSignUp = () => {
    const {control, handleSubmit} = useForm({
        defaultValues: {username: route?.params?.username},});

  const navigation = useNavigation();
  const route = useRoute();

const onResendCode = ()=>{
    console.warn("onResendCode ");
}

const onBackToSignIn = ()=>{
    console.warn("onBackToSignIn");
    navigation.navigate('SignIn')
}


const onConfirmPress = (data)=>{
    console.warn("onConfirmPress ");
     navigation.navigate('Home')
}

    return (

               <ScrollView>

       <View style = {styles.image}>
       <Text style = {styles.title}> Confirm Your Email </Text>
       
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
            placeholder="Enter Your Confirmation Code"
            name='code'
            control={control}
            rules={{
                required: 'Enter the code',
                minLength: {value: 4, message: 'Code cannot be more than 4'},
                }}/>
        
        <CustomeButton 
            text= "Confirm" 
            onPress={handleSubmit(onConfirmPress)}/>
       
        <CustomeButton 
            text = "Resend Code" 
            onPress={onResendCode} 
            type="TERTIARY" />    
  
        <CustomeButton 
            text= "Back to SignIn" 
            onPress={onBackToSignIn}
            type="TERTIARY" />

        </View>
        </ScrollView>


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
    },
 title: {
    fontSize: 20,
    color: 'black',
    margin: 10,
    fontWeight: 'bold',
 },
 text: {
    backfaceVisibility: 'visible',
    color: 'white',
    fontWeight: 'bold',
    marginVertical:10,
 },
 link:{
    color: '#f5c840'
 }
})

export default ConfirmSignUp ;