import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View , TextInput,Button,
      Alert} from 'react-native';
import { AuthContext } from '../context';
import {AsyncStorage} from 'react-native'

export default function Odjava({navigation}) {
    
    const { signOut } = React.useContext(AuthContext);

    async function logOut(){
        await AsyncStorage.removeItem('userToken');
        await signOut();
    }
  return (
      <View style = {styles.container}> 
          <Text style = {{fontSize:18, textAlign: 'center',marginBottom:5}}>Ukoliko ste sigurni da zelite da se odjavite kliknite na dugme ispod.</Text>
          <Button title="Odjavi se" onPress={logOut} />
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30

  },
  
});


