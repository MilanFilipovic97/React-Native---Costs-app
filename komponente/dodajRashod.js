import React, {useState,useEffect,} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image,
  TouchableOpacity,Modal,Button,Alert,ActivityIndicator} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // ikonice
import {AsyncStorage} from 'react-native'
import RadioForm from 'react-native-radio-form';

export default function DodajRashod({route,navigation}) {

  const [podaci, setPodaci] = useState([
  ]); // vrste rashoda
  const [isLoading, setLoading] = useState(true); // ovo je indikator dok ucitava
  const [vrednost, setVrednost] = useState();
  const [IDTroska, setIDTroska] = useState();

  const {datum} = route.params;
  const {imeKomponente} = route.params;
  const [modalOpen,setModalOpen] = useState(false); // ovo je za modal upis vrednosti
  var IDKorisnika; // ovo je id korisnika iz async storage

  const [kurs,setKurs] = useState(1);
  const valute = [
    {
        label: 'Dinar',
        value: '1'
    },
    {
        label: 'Evro',
        value: '120'
    }
];

const promeniValutu = ( item ) => {
  setKurs(item.value);
  
};

useEffect(() => {
  console.log(kurs);
}, [kurs]);  // poziva se ovaj useeffect kad se promeni vrednost kursa
  

  useEffect(() => {
    ucitajPodatke();
  }, []); 



  const ucitajPodatke = () =>{
    fetch('https://projekatinterakcije.herokuapp.com/selectVrsteRashoda')
      .then((response) => response.json())
      .then((json) => setPodaci(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));  
  }

  async function upisiVrednostRashoda(){
    var pomoc = vrednost * kurs;
    IDKorisnika = await AsyncStorage.getItem('userToken');
      console.log("idkorisnika " + IDKorisnika);
      fetch('https://projekatinterakcije.herokuapp.com/dodajVrednostRashoda',
      {
        method: 'POST',
        headers: {
         "Content-Type": "application/json"
       },
        body: JSON.stringify({
         "Datum": datum,
         "Vrednost": pomoc,
         "ID_Vrste_Rashoda": IDTroska,
         "ID_Korisnika": IDKorisnika
       },
          
        ),
      })
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.log(err));
      Alert.alert('Obavestenje','Uspesno ste upisali trosak.',[
        {text: 'OK', onPress: ()=> console.log('alert ugasen')}
      ])
      setModalOpen(false);      
      navigation.navigate(imeKomponente);
     // Alert.alert('Obavestenje','Potrebno je kliknuti na dugme prikazi kako bi se ucitale izmene.',[
     //   {text: 'OK', onPress: ()=> console.log('alert ugasen')}
     // ])
          
  }


  return (
    <View style={styles.container}>
      
      <Modal visible = {modalOpen} animationType = 'slide'>
      <MaterialIcons 
            name = 'close'
            size = {24}
            style = {{...styles.modalToggle, ...styles.modalClose}}
            // ovo je neka destrukcija da imas vise stilova
            
            onPress = {() => setModalOpen(false)}
        />
      <Text style = {{textAlign:'center'}}>Datum za koji se unosi trosak je {datum}</Text>

      <View style = {{marginTop: 20, textAlign: 'center'}}>
      <RadioForm
              style={{ width: 350 - 30 }}
              dataSource={valute}
              itemShowKey="label"
              itemRealKey="value"
              circleSize={22}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              onPress={(item) => promeniValutu(item)}
              
      />
      </View>


        <TextInput
        minHeight ={60}
        style={styles.input}
        placeholder = 'Vrednost rashoda'
        keyboardType = 'numeric'	
        onChangeText= {setVrednost}
      />
      <Button title = 'Unesi' color = 'maroon' onPress = {upisiVrednostRashoda} />
      
      </Modal>

      <Text style = {{marginTop:10,fontSize:20, textAlign:'center'}}>Izaberite kategoriju troska</Text>
      <Text style = {{marginTop:10,fontSize:17, textAlign:'center'}}>na dan {datum}</Text>
      {isLoading ? <ActivityIndicator/> : (

      <FlatList
          data={podaci}
          numColumns = {2}
          keyExtractor = {(item,index) => /*item.id*/ index.toString()}
          renderItem={({ item }) => (
            <View style ={styles.lista}>
                <TouchableOpacity onPress={() => {setModalOpen(true) , setIDTroska(item.ID)}}>
          <Image source = {{uri: item.Slicica}} style = {{width: 50, height: 50}} />

          <Text >  {item.Name} </Text>
          </TouchableOpacity>
          </View>
          
          )}
          
        />
        )}

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  lista:{
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    
  },
  input:{
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 15,
    textAlign:'center'
  },
  modalToggle:{
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
},
modalClose:{
    marginTop: 20,
    marginBottom: 0
},
modalContent:{
    flex: 1
},
});
