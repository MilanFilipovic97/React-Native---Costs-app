import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import React, { useState } from 'react';
import Login from '../komponente/login';
import Registracija from '../komponente/registracija';
import Header from '../komponente/header';

export default function LoginStack({navigation}){
const Stack = createStackNavigator();
return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login"
        component={Login}
        options ={{
          headerTitle:'Login' , // ovo menja title
          headerStyle:{
            backgroundColor: '#6699ff',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle:{
            fontWeight: 'bold',
            alignItems: 'center',
          },
       
          }}
                    
        />
        <Stack.Screen name="Registracija"
        component={Registracija}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj prihod' />, // ovo menja title
          headerTitle: 'Registracija',    
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />

      </Stack.Navigator>
      </NavigationContainer>
)};
