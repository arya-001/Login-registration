/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {  SafeAreaView, StyleSheet, useWindowDimensions} from 'react-native';
import Navigation from './src/navigation';
import Background from './src/screens/Background';
import rootReducer from './src/actions/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';


const App = () => {
  const {height} = useWindowDimensions();

  
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>

    <SafeAreaView style={styles.root}>
          <Background height={height}>
     <Navigation/>
     </Background>
    </SafeAreaView>
    </Provider>




  );
}

const styles = StyleSheet.create({
 root : {
  flex : 1,
 }
});

export default App;
