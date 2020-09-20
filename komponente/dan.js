import React, {useState,useEffect,} from 'react';
import { StyleSheet, Text, View, Button, FlatList,ActivityIndicator,Image,
Alert,TouchableOpacity } from 'react-native';
import { globalStyles } from '../stilovi/global';

import DatePicker from '@react-native-community/datetimepicker'; // kalendar


import { AntDesign } from '@expo/vector-icons'; // ikonica
import { FontAwesome } from '@expo/vector-icons'; 

import { Dimensions } from "react-native";
import {PieChart} from "react-native-chart-kit";
import {AsyncStorage} from 'react-native'

export default function Dan({navigation}) {
  
  //#region - Kalendar
  const [date, setDate] = useState(new Date(/*1598051730000*/));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  /*ovde pokusavam sad datumom ovo*/
  var danProba = new Date().getDate();
  var mesecProba = new Date().getMonth() + 1;
  var godinaProba = new Date().getFullYear();
  var trenutniDatum= godinaProba + '-' + mesecProba + '-' + danProba;
  //
 // const [date, setDate] = useState(new Date() );
 // const [datum,setDatum] = useState('2020-01-01');  bilo je ovako

 const [datum,setDatum] = useState(trenutniDatum);

 

 //OVAJ JE NOVI
useEffect(() => {
  const interval = setInterval(() => {
    ucitajSvePodakte();
    onChange();
    //console.log(datum);
  }, 1700);
  return () => clearInterval(interval);
}, [datum]);

  var IDKorisnika; // ovo je id korisnika iz async storage

  const onChange = (event, selectedDate) => {
    //console.log("datum koji ce biti je "+selectedDate);
/*
    var currentDate;
    if(typeof(selectedDate) == 'undefined' || selectedDate == null)
    {
      currentDate = new Date();
    }
    else{
       currentDate = selectedDate;
       setDate(currentDate);
    }
   */
    const currentDate = selectedDate || date;
 
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
        
    setDatum(spremiDatumZaUpis(currentDate));
    
   // setDatum(datumPom);
    
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
// do ovde je za kalendar 
const spremiDatumZaUpis = (currentDate) =>{
  const mesec = currentDate.getMonth()+1
  const pomocniDatum = currentDate.getFullYear() + "-" +mesec + "-"+currentDate.getDate();
  //console.log("pomocni "+ pomocniDatum);
  return pomocniDatum.toString();
 }

 //#endregion


const [isLoading, setLoading] = useState(true);
  const [podaci, setPodaci] = useState([
  ]);
  const [podaciGrafikon, setPodaciGrafikon] = useState([
  ]);

  const chartConfig = {
    /*color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,*/

    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1.5,
    useShadowColorFromDataset: false // optional
  };
  const [prihodi, setPrihodi] = useState([0]);
  const [rashodi, setRashodi] = useState([0]);
/*
  useEffect(() => {
    getIDKorisnika();
  }, []);

*/
async function getIDKorisnika(){
  IDKorisnika = await AsyncStorage.getItem('userToken');
  console.log(IDKorisnika);
}

  const navPrihod = () => {
    navigation.navigate('DodajPrihod', {datum: datum, imeKomponente: "Dan"});
  }
  const navRashod = () => {
    navigation.navigate('DodajRashod', {datum: datum,imeKomponente: "Dan"});
  }

  async function ucitajUkupanRashod(){
    try{
      IDKorisnika = await AsyncStorage.getItem('userToken');
      fetch('https://projekatinterakcije.herokuapp.com/selectUkupniRashod/'+datum+'/'+IDKorisnika)      
      
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
      fetch('https://projekatinterakcije.herokuapp.com/selectUkupniPrihod/'+datum+'/'+IDKorisnika)      
      
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
      fetch('https://projekatinterakcije.herokuapp.com/selectListaRashoda/'+datum+'/'+IDKorisnika)      
      
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
    try{
      IDKorisnika = await AsyncStorage.getItem('userToken');
      fetch('https://projekatinterakcije.herokuapp.com/grafikonRashodaDan/'+datum+'/'+IDKorisnika)      
      
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

  return (
    <View style = {styles.container}>
      <View style = {styles.dugme}>
      <AntDesign 
                
                name = 'minuscircleo'
                 size = {50}
                 color = '#ff5c33'
                 onPress = {navRashod}
                 />
                       
                       {/*KALENDAR */}
      <View style = {styles.kalendar}> 
          
      <View style = {{alignItems: 'center'}}>
      <AntDesign  
                name = 'calendar'
                 size = {50}
                 color = '#ff5c33'
                 onPress = {showDatepicker}
                 />
        
        <Text>Datum: {datum} </Text>
      </View>
      
      {show && (
        <DatePicker
          mode = "date"
          value={new Date()}
          onChange={onChange}
          format="YYYY-MM-DD"
      />
      )}
      

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
    <FontAwesome name="euro" size={28} color = "#4d85ff"  onPress = {() => navigation.navigate('KarticaPrihoda', {datum: datum} )} /> 
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
  kalendar:{
    marginLeft: 70,
    flexDirection: 'row',
    marginRight: 70
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
 
});


