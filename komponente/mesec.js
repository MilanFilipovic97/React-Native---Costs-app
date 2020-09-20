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

export default function Mesec({navigation}) {
  
  const [selectedValue, setSelectedValue] = useState(1);


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

 //OVAJ JE NOVI
 useEffect(() => {
  const interval = setInterval(() => {
    ucitajSvePodakte()
  }, 1000);
  return () => clearInterval(interval);
}, [selectedValue]);


/*
  useEffect(() => {
    ucitajPodatke();
  }, []);

*/
  const navPrihod = () => {
    const datum = "2020-"+ selectedValue+ "-01";
    navigation.navigate('DodajPrihod', {datum: datum,imeKomponente: "Mesec"});
  }
  const navRashod = () => {
    const datum = "2020-"+ selectedValue+ "-01";
    navigation.navigate('DodajRashod', {datum: datum,imeKomponente: "Mesec"});
  }

  async function ucitajUkupanRashod(){
    try{
      var IDKorisnika = await AsyncStorage.getItem('userToken');
      fetch('https://projekatinterakcije.herokuapp.com/selectMesecniRashod/'+selectedValue+'/'+IDKorisnika)      
      
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
      var IDKorisnika = await AsyncStorage.getItem('userToken');
      fetch('https://projekatinterakcije.herokuapp.com/selectMesecniPrihod/'+selectedValue+'/'+IDKorisnika)      
      
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
      var IDKorisnika = await AsyncStorage.getItem('userToken');
      fetch('https://projekatinterakcije.herokuapp.com/selectListaRashodaMesec/'+selectedValue+'/'+IDKorisnika)      
      
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
    try{var IDKorisnika = await AsyncStorage.getItem('userToken');
      
      fetch('https://projekatinterakcije.herokuapp.com/grafikonRashodaMesec/'+selectedValue+'/'+IDKorisnika)      
      
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
      
      <Text style = {{fontSize: 16}}>Mesec:</Text>
      <Picker
      selectedValue={selectedValue}
      style={{height: 60, width: 150, }}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedValue(itemValue)
      }>
      <Picker.Item label="Januar" value="1" />
      <Picker.Item label="Februar" value="2" />
      <Picker.Item label="Mart" value="3" />
      <Picker.Item label="April" value="4" />
      <Picker.Item label="Maj" value="5" />
      <Picker.Item label="Jun" value="6" />
      <Picker.Item label="Jul" value="7" />
      <Picker.Item label="Avgust" value="8" />
      <Picker.Item label="Septembar" value="9" />
      <Picker.Item label="Oktobar" value="10" />
      <Picker.Item label="Novembar" value="11" />
      <Picker.Item label="Decembar" value="12" />
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
    <FontAwesome name="euro" size={28} color = "#4d85ff"  onPress = {() => navigation.navigate('KarticaPrihodaMesec', {mesec: selectedValue} )} /> 
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
    <Text>  {item.Name}  </Text>
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

    marginLeft: 60,     //margina
    flexDirection: 'row',
    marginRight: 15
  }
});
