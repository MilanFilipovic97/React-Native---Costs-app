import React from 'react';
import { StyleSheet, Text, View,Button, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function Podesavanja({navigation}) {
  

const navVrsteRashoda = () => {
  navigation.navigate('VrsteRashoda');
}
const navVrstePrihoda = () => {
  navigation.navigate('VrstePrihoda');
}
 
  return (
    <View style={styles.container}>
      
      <View style={styles.mesec}>
      <AntDesign name="pluscircle" size={35} color="green" onPress ={navVrstePrihoda}/>
      <Text style = {{fontSize: 20 , marginBottom: 30}}>Vrste prihoda</Text>
      <AntDesign name="minuscircle" size={35} color="red" onPress ={navVrsteRashoda} />
      <Text style = {{fontSize: 20 , marginBottom: 30}}>Vrste rashoda</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff'
    
  },
  mesec:{
    marginTop:50,
    marginVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    padding: 20,
    
  }
});
