import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

const Background = ({children, height}) => {
  return (
    <View style = {{height}}>
      <ImageBackground source={require("../assets/abstract.jpg")}
                       style= {{height : '100%', opacity: 0.98 }} />
    <View style={{position: 'absolute',  top: 0, left: 0, right: 0, bottom: 0 }}>
        {children}
    </View>
    </View>

  );
};

export default Background;