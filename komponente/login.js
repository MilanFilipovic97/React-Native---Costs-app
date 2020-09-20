
import React,{useState, useContext} from 'react';
import { StyleSheet, Text, View, Button, TextInput,Alert,
  TouchableWithoutFeedback,Keyboard } from 'react-native';
import { AuthContext } from '../context';
import {AsyncStorage} from 'react-native'
import { set } from 'react-native-reanimated';

export default function Login({navigation}) {
  
  const [korisnickoIme,setKorisnickoIme] = useState('');
  const [lozinka,setLozinka] = useState('');
  
  var ID; //IDkorisnika
  const { signIn } = React.useContext(AuthContext);

    const navRegistracija = () => {
            navigation.navigate("Registracija");
        }
    
    async function uglogujSe(){
      try{
      if(korisnickoIme != '' && lozinka != '')
      {
      
        fetch('https://projekatinterakcije.herokuapp.com/selectKorisnik/'+korisnickoIme+'/'+lozinka)      
        
        .then((response) => response.json())
        .then((json) => ID = json[0].ID)     //OVDE SAM HTEO DA POKUSAM NESTO TAKO
        .then(async(response) => {
         
            //console.log(JSON.stringify(response));  // OVDE SAM HTEO DA ISPISEM ID
            console.log(ID);
            await AsyncStorage.setItem('userToken',''+ID);
            await signIn(''+ID);
          
      
          }).catch((error) => {
            
            Alert.alert('Upozorenje','Doslo je do greske, proverite unete podatke.',[
              {text: 'OK', onPress: ()=> console.log('alert ugasen')}
            ])  
          
          });
    }
  
  
      else{
        Alert.alert('Obavestenje',"Potrebno je popuniti oba kriterijuma.",[
          {text: 'OK', onPress: ()=> console.log('alert ugasen')}
        ])
      }
    }
    catch(error){
      Alert.alert('Upozorenje','Doslo je do greske, proverite unete podatke.',[
        {text: 'OK', onPress: ()=> console.log('alert ugasen')}
      ])  
    }
    }  

    return (
      <TouchableWithoutFeedback onPress = {() => 
        Keyboard.dismiss() }>
    <View style = {styles.container} >
        
        <Text style = {{marginTop: 5 ,fontSize: 18}}>Prijavite se </Text>

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
      <Button title = 'Prijavi se' color = 'maroon' onPress={uglogujSe}  />
      </View>
      <Text style = {{fontSize:18, marginBottom: 10}}>Nemate profil ? Registrujte se.</Text>
      <Button title = 'Registruj se' color = 'maroon' onPress={navRegistracija}  />
        
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
