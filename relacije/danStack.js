import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState } from 'react';
import Dan from '../komponente/dan';
import dodajPrihod from '../komponente/dodajPrihod';
import dodajRashod from '../komponente/dodajRashod';

import Header from '../komponente/header';
import KarticaRashoda from '../komponente/karticaRashoda';
import KarticaPrihoda from '../komponente/karticaPrihoda';


export default function DanStack({navigation}){
const Stack = createStackNavigator();
return (
       
      <Stack.Navigator>
        <Stack.Screen name="Dan"
        component={Dan}
        options ={{
          headerTitle: () => <Header navigation = {navigation} title = 'Dan' />, // ovo menja title
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
        <Stack.Screen name="DodajPrihod"
        component={dodajPrihod}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj prihod' />, // ovo menja title
          headerTitle: 'Dodaj prihod',    
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />
        <Stack.Screen name="DodajRashod"
        component={dodajRashod}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj Rashod' />, // ovo menja title
          headerTitle: 'Dodaj rashod',  
          
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />
        <Stack.Screen name="KarticaRashoda"
        component={KarticaRashoda}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj Rashod' />, // ovo menja title
          headerTitle: 'Kartica rashoda',  
          
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />
        <Stack.Screen name="KarticaPrihoda"
        component={KarticaPrihoda}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj Rashod' />, // ovo menja title
          headerTitle: 'Kartica prihoda',  
          
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />


      </Stack.Navigator>
     
)};
