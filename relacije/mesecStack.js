import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState } from 'react';
import Mesec from '../komponente/mesec';
import dodajPrihod from '../komponente/dodajPrihod';
import dodajRashod from '../komponente/dodajRashod';

import Header from '../komponente/header';
import KarticaRashoda from '../komponente/karticaRashoda';
import KarticaPrihodaMesec from '../komponente/karticaPrihodaMesec';


export default function MesecStack({navigation}){
const Stack = createStackNavigator();
return (
       
      <Stack.Navigator>
        <Stack.Screen name="Mesec"
        component={Mesec}
        options ={{
          headerTitle: () => <Header navigation = {navigation} title = 'Mesec' />, // ovo menja title
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
      <Stack.Screen name="KarticaPrihodaMesec"
        component={KarticaPrihodaMesec}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj Rashod' />, // ovo menja title
          headerTitle: 'Kartica mesecnih prihoda',  
          
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />


      </Stack.Navigator>
     
)};
