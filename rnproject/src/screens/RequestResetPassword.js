import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomeButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form'


const RequestResetPassword = () => {
//   const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();
 
  const onResetPassword = (data) => {
    console.warn(data);
    navigation.navigate('NewPassword');
  };

  const onBackToSignIn = () => {
    console.warn('onBackToSignIn');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}> Request to Reset Password</Text>
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

        <CustomeButton text="Send" onPress={handleSubmit(onResetPassword)} />

        <CustomeButton
          text="Back to SignIn"
          onPress={onBackToSignIn}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
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
    marginVertical: 10,
  },
  link: {
    color: '#f5c840',
  },
});

export default RequestResetPassword;
