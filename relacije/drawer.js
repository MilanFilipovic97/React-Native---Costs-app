import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dan from '../komponente/dan';
import Mesec from '../komponente/mesec';
import Godina from '../komponente/godina';
import Podesavanja from '../komponente/podesavanja';

import DanStack from './danStack'; // stek navigacija:  dan -> dodajPrihod, dodajRashod 
import MesecStack from './mesecStack';
import GodinaStack from './godinaStack';
import PodesavanjaStack from './podesavanjaStack';
import Odjava from '../komponente/odjava';

export default function DrawerNavigacija() {
 
  const Drawer = createDrawerNavigator();
  return(
    
    <NavigationContainer>
        <Drawer.Navigator initialRouteName = "Dan">
          <Drawer.Screen name= "Dan" component = {DanStack} />
          <Drawer.Screen name= "Mesec" component = {MesecStack} />
          <Drawer.Screen name= "Godina" component = {GodinaStack} />
          <Drawer.Screen name= "Podesavanja" component = {PodesavanjaStack} />
          <Drawer.Screen name= "Odjava" component = {Odjava} />
        </Drawer.Navigator>

    </NavigationContainer>
    
    )

};