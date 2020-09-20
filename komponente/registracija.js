import React,{useState, useContext} from 'react';
import { StyleSheet, Text, View,TextInput,Button,Alert,
  TouchableWithoutFeedback,Keyboard 
 } from 'react-native';
import { AuthContext } from '../context';
import {AsyncStorage} from 'react-native'

export default function Registracija({navigation}) {
  
  const [ime,setIme] = useState('');
  const [prezime,setPrezime] = useState('');
  const [korisnickoIme,setKorisnickoIme] = useState('');
  const [lozinka,setLozinka] = useState('');

  var ID; // id korisnika

  const {signUp} = React.useContext(AuthContext);

 

  async function dodajNovogKorisnika(){
    try{
      if(ime != '' && prezime != '' && korisnickoIme != '' && lozinka != '')
    {
         
      fetch('https://projekatinterakcije.herokuapp.com/dodajNovogKorisnika',
      {
        method: 'POST',
        headers: {
         "Content-Type": "application/json"
       },
        body: JSON.stringify({
         "Ime": ime,
         "Prezime": prezime,
         "KorisnickoIme": korisnickoIme,
         "Lozinka": lozinka
       },
          
        ),
      })
      .then((response) => response.json())
      .then((json) => ID = json[0].ID)
      .then(async(response) => {
          console.log(ID);
          await AsyncStorage.setItem('userToken',''+ID);
          await signUp(''+ID);
        
        }).catch((error) => {
          
          Alert.alert('Upozorenje','Korisnicko ime je vec iskorisceno.',[
            {text: 'OK', onPress: ()=> console.log('alert ugasen')}
          ]);  
        });
     
    }
    else{
      Alert.alert('Upozorenje','Potrebno je popuniti sve kriterijume.',[
        {text: 'OK', onPress: ()=> console.log('alert ugasen')}
      ]);  
    }
  }
  catch (error)
  {
    console.log(error);
  }
  }

  return (
    <TouchableWithoutFeedback onPress = {() => 
      Keyboard.dismiss() }>

    <View style = {styles.container}>
        <Text style = {{marginTop: 5 ,fontSize: 18}}>Izvrsite registraciju</Text>

        <TextInput
        minHeight ={60}
        style={styles.input}
        placeholder = 'Ime'
        onChangeText= {setIme}
      />
      <TextInput
        minHeight ={60}
        style={styles.input}
        placeholder = 'Prezime'
        onChangeText= {setPrezime}
      />

        <TextInput
        minHeight ={60}
        style={styles.input}
        placeholder = 'Korisnicko ime'
        onChangeText= {setKorisnickoIme}
      />

      <TextInput
        minHeight ={60}
        style={styles.input}
        placeholder = 'Lozinka'
        onChangeText= {setLozinka}
        secureTextEntry={true} 
      />  
      <View style = {{marginTop: 20, marginBottom:120}}>
      <Button title = 'Registruj se' color = 'maroon' onPress={dodajNovogKorisnika}  />
      </View>
      
    </View>
      </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 15,
    textAlign:'center',
    width: 300
  },
});
