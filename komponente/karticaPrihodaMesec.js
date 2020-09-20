import React,{useState,useEffect,} from 'react';
import { StyleSheet, Text, View,FlatList , Image, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // ikonice
import {AsyncStorage} from 'react-native'
export default function KarticaPrihodaMesec({route,navigation}) {
  
    const {mesec} = route.params;
    const [kartica, setKartica] = useState();

    async function ucitajKarticu(){
        try{
         
          var IDKorisnika = await AsyncStorage.getItem('userToken');       
          fetch('https://projekatinterakcije.herokuapp.com/selectKarticaPrihodaMesec/'+mesec+'/'+IDKorisnika)      
          
        .then((response) => response.json())
        .then((json) => setKartica(json))
        .catch((error) => console.error(error))
        
          }
          catch(error){
            console.error(error);
          }
      }

      useEffect(() => {
        ucitajKarticu();
      }, []);
    
      
      const obrisiPrihod=(id) =>{
        console.log(id);
       
        (Alert.alert('Brisanje','Da li ste sigurni da zelite da prihod ?',[
      
          {text: 'Ne', onPress: ()=> console.log('alert ugasen')},
          {text: 'Da', onPress: ()=> 
          {  
        try{
          fetch('https://projekatinterakcije.herokuapp.com/obrisiPrihod',
          {
            method: 'DELETE',
            headers: {
             "Content-Type": "application/json"
           },
            body: JSON.stringify({
             "ID": id       
            },
            ),
          })
          .then(res => res.text())
          .then(data => console.log(data))
          .catch(err => console.log(err));
          Alert.alert('Obavestenje','Uspesno ste obrisali prihod.',[
            {text: 'OK', onPress: ()=> console.log('alert ugasen')}
          ])
    
          setKartica((prevKartica) => {
            return prevKartica.filter(kartica=> kartica.ID !=id)
          })
          }
          catch(error){
            console.error(error);
          }
   
        }}
      ]))    
      }


    return (
    <View style={styles.container}>
      <Text style = {{fontSize: 18}}>Prihodi za mesec : {mesec}</Text>

      <FlatList
          data={kartica}
          keyExtractor = {(item,index) => index.toString()}
          renderItem={({ item }) => (
            <View style ={styles.lista}>
           <Image source = {{uri: item.Slicica}} style = {{width: 50, height: 50}} />
          <Text > {item.Name} = {item.Vrednost} </Text>
          <AntDesign name = 'delete'
                  size = {28}
                  color = '#333'
                  //style ={styles.ikonice}
                  onPress ={() =>obrisiPrihod(item.ID)}
                  />
          </View>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  lista:{
  
    textAlign: 'center',
    marginTop: 20,
    padding: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    borderStyle: 'dashed',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
