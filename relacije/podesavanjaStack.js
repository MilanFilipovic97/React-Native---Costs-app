import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState } from 'react';
import Podesavanja from '../komponente/podesavanja';
import VrsteRashoda from '../komponente/vrsteRashoda';
import VrstePrihoda from '../komponente/vrstePrihoda';


import Header from '../komponente/header';


export default function PodesavanjaStack({navigation}){
const Stack = createStackNavigator();
return (
       
      <Stack.Navigator>
        <Stack.Screen name="Podesavanja"
        component={Podesavanja}
        options ={{
          headerTitle: () => <Header navigation = {navigation} title = 'Podesavanja' />, // ovo menja title
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
        <Stack.Screen name="VrsteRashoda"
        component={VrsteRashoda}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj prihod' />, // ovo menja title
          headerTitle: 'Vrste rashoda',    
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />

      <Stack.Screen name="VrstePrihoda"
        component={VrstePrihoda}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj prihod' />, // ovo menja title
          headerTitle: 'Vrste prihoda',    
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />
        
        

      </Stack.Navigator>
     
)};
