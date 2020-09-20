import React,{useState,useEffect,} from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import {AsyncStorage} from 'react-native'

export default function KarticaRashoda({route,navigation}) {
  
    const {Name} = route.params;
    const [kartica, setKartica] = useState();

    async function ucitajKarticu(){
        try{
            //console.log(Name);
            var IDKorisnika = await AsyncStorage.getItem('userToken');
          fetch('https://projekatinterakcije.herokuapp.com/selectKarticaRashoda/'+Name+'/'+IDKorisnika)      
          
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
    
    return (
    <View style={styles.container}>
      <Text style = {{fontSize: 18}}>{Name}</Text>
      <Text style = {{fontSize: 17}}>Kartica rashoda za ceo period</Text>
      <FlatList
          data={kartica}
          keyExtractor = {(item,index) => index.toString()}
          renderItem={({ item }) => (
            <View style ={styles.lista}>
           
          <Text > {item.Datum}  = {item.Vrednost} </Text>
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
