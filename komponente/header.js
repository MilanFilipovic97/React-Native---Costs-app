import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function Header({ navigation, title }) {
  
  const openMenu = () =>{
       
    navigation.openDrawer();
  } 

  return (
    
    <View style={styles.header}>
      <MaterialIcons name = 'menu' size = {28} onPress = {openMenu} style = {styles.icon}/>
      <Text style = {styles.title}>{title}</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  header: {
    
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
     
  },
  title:{
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
    letterSpacing: 1.5,
    marginLeft: 20, // ovako centriram naslov nece ono samo  
  },
  
});
