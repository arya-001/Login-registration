import {View, StyleSheet, Image, useWindowDimensions, ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput';
import CustomeButton from '../components/CustomButton';
// import Navigation from '../navigation';
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'

const NewPassword = () => {
    // const [code , setCode] = useState('');
    // const [newPassword, setNewPassword] = useState('');
    const {control, handleSubmit} = useForm();
const navigation = useNavigation();

const onSubmitPassword = (data)=>{
    console.warn(data);
    navigation.navigate('Home');

}

const onBackToSignIn = ()=>{
    console.warn("onBackToSignIn");
    navigation.navigate('SignIn');
}


    return (

               <ScrollView>

       <View style = {styles.image}>
       <Text style = {styles.title}> New Password</Text>
        <CustomInput 
            name = 'code'
            placeholder="Enter the Confirmation Code"
            control= {control}
            rules={{required: 'Enter your received code', minLength: {value : 4, message: 'Code cannot be more than 4 characters'}
            }}/>

        <CustomInput 
            placeholder="New Password"
            name='password'
            secureTextEntry
            control={control}
            rules={{required: 'Enter new password'}}
            />
       
        <CustomeButton 
            text = "Submit" 
            onPress={handleSubmit(onSubmitPassword)} 
           />    
  
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

export default NewPassword;