import React, {useState,useEffect,} from 'react';
import { StyleSheet, Text, View, Button, FlatList,ActivityIndicator,Image,
Alert,TouchableOpacity } from 'react-native';
import { globalStyles } from '../stilovi/global';

import {Picker} from '@react-native-community/picker';

import { AntDesign } from '@expo/vector-icons'; // ikonica
import { FontAwesome } from '@expo/vector-icons'; 

import { Dimensions } from "react-native";
import {PieChart} from "react-native-chart-kit";
import {AsyncStorage} from 'react-native'
export default function Godina({navigation}) {
  
  const [selectedValue, setSelectedValue] = useState(2020);


  const [isLoading, setLoading] = useState(true);
  const [podaci, setPodaci] = useState([
  ]);
  const [podaciGrafikon, setPodaciGrafikon] = useState([
  ]);

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  const [prihodi, setPrihodi] = useState([0]);
  const [rashodi, setRashodi] = useState([0]);
/*
  useEffect(() => {
    ucitajPodatke();
  }, []);

*/

  useEffect(() => {
  const interval = setInterval(() => {
    ucitajSvePodakte()
  }, 1500);
  return () => clearInterval(interval);
  }, [selectedValue]);


  const navPrihod = () => {
    const datum = selectedValue +"-01-01";
    navigation.navigate('DodajPrihod', {datum: datum,imeKomponente: "Godina"});
  }
  const navRashod = () => {
    const datum = selectedValue +"-01-01";
    navigation.navigate('DodajRashod', {datum: datum,imeKomponente: "Godina"});
  }

  async function ucitajUkupanRashod(){
    try{IDKorisnika = await AsyncStorage.getItem('userToken');

      fetch('https://projekatinterakcije.herokuapp.com/selectGodisnjiRashod/'+selectedValue+'/'+IDKorisnika)      
      
    .then((response) => response.json())
    .then((json) => setRashodi(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

      }
      catch(error){
        console.error(error);
      }
  }
  
  async function ucitajUkupanPrihod(){
    try{
      IDKorisnika = await AsyncStorage.getItem('userToken');
      fetch('https://projekatinterakcije.herokuapp.com/selectGodisnjiPrihod/'+selectedValue+'/'+IDKorisnika)      
      
    .then((response) => response.json())
    .then((json) => setPrihodi(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

      }
      catch(error){
        console.error(error);
      }
  }

  async function ucitajPodatke(){
    try{
      IDKorisnika = await AsyncStorage.getItem('userToken');
      fetch('https://projekatinterakcije.herokuapp.com/selectListaRashodaGodina/'+selectedValue+'/'+IDKorisnika)      
      
    .then((response) => response.json())
    .then((json) => setPodaci(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
      }
      catch(error){
        console.error(error);
      }
  }

  async function ucitajGrafikon(){
    try{IDKorisnika = await AsyncStorage.getItem('userToken');
      
      fetch('https://projekatinterakcije.herokuapp.com/grafikonRashodaGodina/'+selectedValue+'/'+IDKorisnika)      
      
    .then((response) => response.json())
    .then((json) => setPodaciGrafikon(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
      }
      catch(error){
        console.error(error);
      }
  }

 const ucitajSvePodakte = () =>{
  ucitajPodatke();
  ucitajGrafikon();
  ucitajUkupanPrihod();
  ucitajUkupanRashod();
 }

//<Button title = 'Prikazi' color = 'maroon' onPress={ucitajSvePodakte} />
  return (
    <View style={styles.container}>
      
      <View style = {styles.dugme}>
      <AntDesign 
                
                name = 'minuscircleo'
                 size = {50}
                 color = '#ff5c33'
                 onPress = {navRashod}
                 />
      
      <View style = {styles.mesec}>
      
      <Text style = {{fontSize: 16}}>Godina:</Text>
      <Picker
      selectedValue={selectedValue}
      style={{height: 60, width: 110, }}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedValue(itemValue)
      }>
      <Picker.Item label="2020" value="2020" />
      <Picker.Item label="2021" value="2021" />
      <Picker.Item label="2022" value="2022" />
      <Picker.Item label="2023" value="2023" />
      <Picker.Item label="2024" value="2024" />
      <Picker.Item label="2025" value="2025" />
      <Picker.Item label="2026" value="2026" />
      <Picker.Item label="2027" value="2027" />
      <Picker.Item label="2028" value="2028" />
      <Picker.Item label="2029" value="2029" />
      <Picker.Item label="2030" value="2030" />
      </Picker>
    
      </View> 
      <View>
          <AntDesign name = 'pluscircleo'
                 size = {50}
                 color = 'green'
                 onPress = {navPrihod}
                 />
        </View>
      </View>
      

      <View style = {styles.vrednosti}>

      <Text style = {styles.prihod}>Ukupan prihod: {prihodi[0].Vrednost} </Text>
      <Text style = {styles.rashod}>Ukupan rashod: {rashodi[0].Vrednost} </Text>
      <Text style = {styles.saldo}>Saldo: {prihodi[0].Vrednost - rashodi[0].Vrednost  }</Text>
      </View>

      <View style={styles.grafikon}>
      <PieChart
        data={podaciGrafikon}
        width={Dimensions.get('window').width}
        height={230}
        chartConfig={chartConfig}
        accessor="vrednost"
        backgroundColor="transparent"
        paddingLeft="15"
        //absolute
      />
    </View>
    <View style = {{width: 100 }}>
    <FontAwesome name="euro" size={28} color = "#4d85ff"  onPress = {() => navigation.navigate('KarticaPrihodaGodina', {godina: selectedValue} )} /> 
    <Text >Kartica prihoda</Text>
    </View>
    <Text style = {styles.naslovTroslovi} >Troskovi</Text>

    <View style = {styles.container}>

      
<FlatList
    data={podaci}
    keyExtractor = {(item,index) => index.toString()}
    renderItem={({ item }) => (
      <View style ={styles.lista}>
        <TouchableOpacity onPress = {() => navigation.navigate('KarticaRashoda',  item )}> 
    <Image source = {{uri: item.Slicica}} style = {{width: 50, height: 50}} />
    <Text>  {item.Name} </Text>
    </TouchableOpacity>
    </View>
    )}
  />
 
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    
  },
  
  lista:{
  
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#bbb',
    borderStyle: 'dashed',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  naslovTroslovi:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  },
  grafikon:{
    marginTop: 10,
    flex: 1
  },
  ikonica:{
    flexDirection: 'row',
    //marginRight: 10,
    //marginLeft: 10
    
  },
  dugme:{
    marginTop: 10,
    flexDirection: 'row',
 
    },
  
  prihod:{ // vrednost prihoda
    marginTop: 15,
    color: 'green',
    fontSize: 15
  },
  rashod:{
    color: 'red',
    fontSize: 15
  },
  saldo:{
    color: 'blue',
    fontSize: 15
  },
  vrednosti:{
    alignItems: 'center',
  },
  grafikon: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mesec:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,

    marginLeft: 70,
    flexDirection: 'row',
    marginRight: 30
  }
});
