import { View, Text , StyleSheet, Pressable} from 'react-native'
import React from 'react'
//props and default value
const CustomeButton = ({onPress, text = "PRIMARY", type = "PRIMARY", bgColor, fgColor}) => {
  return (
    <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`], 
                bgColor ? {backgroundColor: bgColor} : {},
                ]}>
      <Text style={[
            styles.text, 
            styles[`text_${text}`],
            fgColor ? {color: fgColor} : {},
            ]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor : 'black',
        width: '90%',
        
        marginVertical: 5,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },
    container_SECONDARY: {
        borderColor: "white",
        borderWidth: 2,
    },
    container_TERTIARY: { backgroundColor: 'gray'},
   

    text: {
        fontWeight:'bold',
        color:'white'
    },
    
    text_TERTIARY:{
        color: 'gray',
        fontWeight:'bold',
    },
    text_SECONDARY: {
        color: 'white',
    }
})
export default CustomeButton



//onpress as props becasue we dont know for what it maybe used