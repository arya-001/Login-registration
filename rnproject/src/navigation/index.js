import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ConfirmSignUp from '../screens/ConfirmSignUp';
import RequestResetPassword from '../screens/RequestResetPassword';
import NewPassword from '../screens/NewPassword';
import Home from '../screens/Home';
import Background from '../screens/Background';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (

    <NavigationContainer>
      <Background height="100%">
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name= "SignIn" component={SignIn}/>
    <Stack.Screen name= "SignUp" component={SignUp}/>
    <Stack.Screen name= "ConfirmSignUp" component={ConfirmSignUp}/>
    <Stack.Screen name= "RequestResetPassword" component={RequestResetPassword}/>
    <Stack.Screen name= "NewPassword" component={NewPassword}/>
    <Stack.Screen name= "Home" component={Home}/>

    </Stack.Navigator>
    </Background>
    </NavigationContainer>
    
  )
}

export default Navigation


// 

// </Background>