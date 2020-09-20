import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState } from 'react';
import Godina from '../komponente/godina';
import dodajPrihod from '../komponente/dodajPrihod';
import dodajRashod from '../komponente/dodajRashod';

import Header from '../komponente/header';
import KarticaRashoda from '../komponente/karticaRashoda';
import KarticaPrihodaGodina from '../komponente/karticaPrihodaGodina';


export default function GodinaStack({navigation}){
const Stack = createStackNavigator();
return (
       
      <Stack.Navigator>
        <Stack.Screen name="Godina"
        component={Godina}
        options ={{
          headerTitle: () => <Header navigation = {navigation} title = 'Godina' />, // ovo menja title
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
        <Stack.Screen name="KarticaPrihodaGodina"
        component={KarticaPrihodaGodina}
        options ={{
          //headerTitle: () => <Header navigation = {navigation} title = 'Dodaj Rashod' />, // ovo menja title
          headerTitle: 'Kartica godisnjih prihoda',  
          
          headerStyle: {
            backgroundColor: '#6699ff',
            height: 80, // velicina bloka
            },          
          }}
                    
        />

      </Stack.Navigator>
     
)};
