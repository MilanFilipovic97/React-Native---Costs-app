import React, {useState,useEffect,} from 'react';
import { StyleSheet, Text, View, FlatList
  ,ActivityIndicator,Image,TextInput,Modal,Button, Alert,
  TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // ikonice
import { MaterialIcons } from '@expo/vector-icons'; // ikonice
//import { Formik } from 'formik';

export default function VrsteRashoda({navigation}) {
  
  const [isLoading, setLoading] = useState(true); // ovo je indikator dok ucitava
  const [podaci, setPodaci] = useState([
  ]); // podaci koje ucita tj. vrsta rashoda

  const [modalOpen,setModalOpen] = useState(false); // ovo je za modal
  const [modalOpenUpdate,setModalOpenUpdate] = useState(false); // ovo je za modal

  const [name, setName] = useState(''); // ovo su promenljive koje ce se slati kroz medal
  const [slicica, setSlicica] = useState('');
  const [color, setColor] = useState('');
  const [legendFontColor, setLegendFontColor] = useState('black');
  const [legendFontSize, setlegendFontSize] = useState(15);


  const [IDTroska,setIDTroska] = useState();

  /*useEffect(() => {
    ucitajPodatke();
  }, []);     // cim se pokrene aplikacija pokrece se ovo i prikazuje sve troskove
  */


//OVAJ JE DOBAR ISPOD 
 /*useEffect(() => {
  let aktivno = true;
  if (aktivno)
   ucitajPodatke();
   
   return () =>{
     aktivno = false;
 }
}, [podaci]);*/



//OVAJ JE NOVI
useEffect(() => {
  const interval = setInterval(() => {
    ucitajPodatke()
  }, 1000);
  return () => clearInterval(interval);
}, []);

  async function ucitajPodatke(){
    fetch('https://projekatinterakcije.herokuapp.com/selectVrsteRashoda')
      .then((response) => response.json())
      .then((json) => setPodaci(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));  
  }

const spremiParametreZaUpis = () =>{
    
  var x = Math.floor(Math.random() * 100) + 1;
  var y = Math.floor(Math.random() * 100) + 1;
  var z = Math.floor(Math.random() * 100) + 1;
  var pomocnaColor = 'rgba('+x+','+y+','+z+',1)';
 
  return pomocnaColor.toString();
 }

  async function dodajVrstuTroska(){
    try{

      const boja = spremiParametreZaUpis();
    //funkcija u kojoj cu dodati novi trosak koja ce se pozivati iz modala
    
      fetch('https://projekatinterakcije.herokuapp.com/dodajVrstuRashoda',
      {
        method: 'POST',
        headers: {
         "Content-Type": "application/json"
       },
        body: JSON.stringify({
         "name": name,
         "slicica": slicica,
         "color": boja,
         "legendFontColor": legendFontColor,
         "legendFontSize": legendFontSize
       }
          
        ),
      }).then((res) => res.text())
      .then((text) => proba = text)
      .then(res => {
         
        
         Alert.alert('Upozorenje',res ,[
          {text: 'OK', onPress: ()=> console.log('alert ugasen')}
        ]);  
        })
        .catch((error) => {
          
          Alert.alert('Upozorenje','Vrsta rashoda je vec kreirana.',[
            {text: 'OK', onPress: ()=> console.log('alert ugasen')}
          ]);  
        });
       
      setModalOpen(false);
      //await ucitajPodatke();
      }
      catch(error){
        console.error(error);
      }
    
  }

  const obrisiVrstuRashoda=(id) =>{
    
    (Alert.alert('Brisanje','Da li ste sigurni da zelite da obrisete kategoriju troskova ?',[
      
      {text: 'Ne', onPress: ()=> console.log('alert ugasen')},
      {text: 'Da', onPress: ()=> 
      {  
      fetch('https://projekatinterakcije.herokuapp.com/obrisiVrstuRashoda',
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
        //.then(res => { if(!res.ok) res.text()})
        .then(data => console.log(data))
        .then(Alert.alert('Obavestenje','Uspesno ste obrisali kategoriju troskova.',[
          {text: 'OK', onPress: ()=> console.log('alert ugasen')}
        ]))
        .then(setPodaci((prevPodaci) => {
          return prevPodaci.filter(podaci=> podaci.ID !=id)
        }))
        .catch(err => console.log(err));
        
    }}
    ]))

  }

  async function izmeniVrstuTroska(){
    try{

      //const boja = spremiParametreZaUpis();
    //funkcija u kojoj cu dodati novi trosak koja ce se pozivati iz modala
      //console.log("id troska " +IDTroska);
      
      console.log(name);
      console.log(slicica);
      console.log(IDTroska);

      fetch('https://projekatinterakcije.herokuapp.com/updateVrsteRashoda',
      {
        method: 'PUT',
        headers: {
         "Content-Type": "application/json"
       },
        body: JSON.stringify({
         "name": name,
         "slicica": slicica,
         "ID": IDTroska      
       },
          
        ),
      })
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.log(err));
      Alert.alert('Obavestenje','Uspesno ste izmenili kategoriju troskova.',[
        {text: 'OK', onPress: ()=> console.log('alert ugasen')}
      ])
      setModalOpenUpdate(false);
      //await ucitajPodatke();

      }
      catch(error){
        console.error(error);
      }
    
  }


  return (
    <View style={styles.container}>

      {/*// za insert
      */}
      <Modal visible = {modalOpen} animationType = 'slide'>
      
      <MaterialIcons 
            name = 'close'
            size = {24}
            style = {{...styles.modalToggle, ...styles.modalClose}}
            // ovo je neka destrukcija da imas vise stilova
            
            onPress = {() => setModalOpen(false)}
        />
        <Text style = {{textAlign:'center',fontSize: 15} }> Dodaj novu vrstu rashoda</Text>
        <TextInput
                minHeight ={60}
                
                    style={styles.input}
                    placeholder = 'Ime rashoda'
                    onChangeText= {setName}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
        
        <TextInput
                minHeight ={60}
                    style={styles.input}
                    placeholder = 'Link slicice rashoda'
                    onChangeText= {setSlicica}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
        {/*<Button title = 'Sacuvaj' color = 'maroon' onPress={console.log(name)}  />
        */}

        <Button title = 'Sacuvaj' color = 'maroon' onPress = {dodajVrstuTroska} />
      
      
      
      </Modal>
      {/*// za update 
      */}

      <Modal visible = {modalOpenUpdate} animationType = 'slide'> 
      
      <MaterialIcons 
            name = 'close'
            size = {24}
            style = {{...styles.modalToggle, ...styles.modalClose}}
            // ovo je neka destrukcija da imas vise stilova
            
            onPress = {() => setModalOpenUpdate(false)}
        />
        <Text style = {{textAlign:'center',fontSize: 15} }> Izmeni vrstu rashoda</Text>

        <TextInput
                minHeight ={60}
                
                    style={styles.input}
                    placeholder = 'Unesite novo ime rashoda'
                    onChangeText= {setName}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
        
        <TextInput
                minHeight ={60}
                    style={styles.input}
                    placeholder = 'Unesite novi link slicice rashoda'
                    onChangeText= {setSlicica}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
      <Button title = 'Sacuvaj' color = 'maroon' onPress = {izmeniVrstuTroska} />
      
      </Modal>


      <View>
      <MaterialIcons 
         name = 'add'
         size = {24}
         style = {styles.modalToggle}
         onPress = {() => setModalOpen(true)}
        />
      {isLoading ? <ActivityIndicator/> : (
      
      <FlatList
          data={podaci}
          keyExtractor = {(item,index) => /*item.id*/ index.toString()}
          renderItem={({ item }) => (
            
            <View style ={styles.lista}>
          <Image source = {{uri: item.Slicica}} style = {{width: 50, height: 50}} />

          <Text>  {item.Name} </Text>
            <View style ={styles.ikonice}>
            <MaterialIcons name = 'update'
                  size = {28}
                  color = '#333'
                  style ={styles.ikonice}
                  onPress = {() => {setModalOpenUpdate(true); setIDTroska(item.ID)}}
                  />
            <AntDesign name = 'delete'
                  size = {28}
                  color = '#333'
                  style ={styles.ikonice}
                  onPress ={() =>obrisiVrstuRashoda(item.ID)}
                  />
            </View>
          </View>
          
          )}
          
        />
        
        )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 15,
    paddingBottom:30,
    marginBottom: 50
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
  item:{
    marginTop: 10,
    
  },
  ikonice:{
    flexDirection: 'row',
    //marginRight: 'auto',
    //marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 7
  },

  //modal

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
input:{
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 10,
  fontSize: 18,
  borderRadius: 6,
  marginTop: 15
},
});
