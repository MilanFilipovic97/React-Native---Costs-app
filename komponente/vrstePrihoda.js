import React, {useState,useEffect,} from 'react';
import { StyleSheet, Text, View, FlatList
  ,ActivityIndicator,Image,TextInput,Modal,Button, Alert,
  TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // ikonice
import { MaterialIcons } from '@expo/vector-icons'; // ikonice


export default function VrstePrihoda() {
  
  const [isLoading, setLoading] = useState(true); // ovo je indikator dok ucitava
  const [podaci, setPodaci] = useState([
  ]); // podaci koje ucita tj. vrsta prihoda

  const [modalOpen,setModalOpen] = useState(false); // ovo je za modal insert
  const [modalOpenUpdate,setModalOpenUpdate] = useState(false); // ovo je za modal

  const [name, setName] = useState(''); // ovo su promenljive koje ce se slati kroz medal
  const [slicica, setSlicica] = useState('');
  const [color, setColor] = useState('');
  const [legendFontColor, setLegendFontColor] = useState('black');
  const [legendFontSize, setlegendFontSize] = useState(15);


  const [IDPrihoda,setIDPrihoda] = useState();

  /*useEffect(() => {
    ucitajPodatke();
  }, []);     // cim se pokrene aplikacija pokrece se ovo i prikazuje sve troskove
  */
 /*useEffect(() => {
   let aktivno = true;
   if (aktivno)
    ucitajPodatke();
    
    return () =>{
      aktivno = false;
  }
}, [podaci]);*/


useEffect(() => {
  const interval = setInterval(() => {
    ucitajPodatke()
  }, 1000);
  return () => clearInterval(interval);
}, []);


  async function ucitajPodatke(){
    fetch('https://projekatinterakcije.herokuapp.com/selectVrstePrihoda')
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

  const  dodajVrstuPrihoda =() => {
    try{

      const boja = spremiParametreZaUpis();
    //funkcija u kojoj cu dodati novi trosak koja ce se pozivati iz modala
    
      fetch('https://projekatinterakcije.herokuapp.com/dodajVrstuPrihoda',
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
       },
          
        ),
      }).then((res) => res.text())
      .then((text) => proba = text)
      .then(res => {
         
        
         Alert.alert('Upozorenje',res ,[
          {text: 'OK', onPress: ()=> console.log('alert ugasen')}
        ]);  
        })
        .catch((error) => {
          
          Alert.alert('Upozorenje','Vrsta prihoda je vec kreirana.',[
            {text: 'OK', onPress: ()=> console.log('alert ugasen')}
          ]);  
        });
      
      /*
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.log(err));
      Alert.alert('Obavestenje','Uspesno ste dodali kategoriju prihoda.',[
        {text: 'OK', onPress: ()=> console.log('alert ugasen')}
      ])*/
      
      setModalOpen(false);
      //await ucitajPodatke();
      }
      catch(error){
        console.error(error);
      }
    
  }

  const obrisiVrstuPrihoda=(id) =>{
    
    (Alert.alert('Brisanje','Da li ste sigurni da zelite da obrisete kategoriju prihoda ?',[
      
      {text: 'Ne', onPress: ()=> console.log('alert ugasen')},
      {text: 'Da', onPress: ()=> 
      {  


      fetch('https://projekatinterakcije.herokuapp.com/obrisiVrstuPrihoda',
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
      Alert.alert('Obavestenje','Uspesno ste obrisali kategoriju prihoda.',[
        {text: 'OK', onPress: ()=> console.log('alert ugasen')}
      ])

      setPodaci((prevPodaci) => {
        return prevPodaci.filter(podaci=> podaci.ID !=id)
      })
    
    }}
  ]))    
  }
  async function izmeniVrstuPrihoda(){
    try{

      fetch('https://projekatinterakcije.herokuapp.com/updateVrstePrihoda',
      {
        method: 'PUT',
        headers: {
         "Content-Type": "application/json"
       },
        body: JSON.stringify({
         "name": name,
         "slicica": slicica,
         "ID": IDPrihoda      
       },
          
        ),
      })
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.log(err));
      Alert.alert('Obavestenje','Uspesno ste izmenili kategoriju prihoda.',[
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

      {/*// za insert modal
      */}
      <Modal visible = {modalOpen} animationType = 'slide'>
      
      <MaterialIcons 
            name = 'close'
            size = {24}
            style = {{...styles.modalToggle, ...styles.modalClose}}
            // ovo je neka destrukcija da imas vise stilova
            
            onPress = {() => setModalOpen(false)}
        />
        <Text style = {{textAlign:'center',fontSize: 15} }> Dodaj novu vrstu prihoda</Text>
        <TextInput
                minHeight ={60}
                
                    style={styles.input}
                    placeholder = 'Ime prihoda'
                    onChangeText= {setName}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
        
        <TextInput
                minHeight ={60}
                    style={styles.input}
                    placeholder = 'Link slicice prihoda'
                    onChangeText= {setSlicica}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
        {/*<Button title = 'Sacuvaj' color = 'maroon' onPress={console.log(name)}  />
        */}

        <Button title = 'Sacuvaj' color = 'maroon' onPress = {dodajVrstuPrihoda} />
      
      
      
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
        <Text style = {{textAlign:'center',fontSize: 15} }> Izmeni vrstu prihoda</Text>

        <TextInput
                minHeight ={60}
                
                    style={styles.input}
                    placeholder = 'Unesite novo ime prihoda'
                    onChangeText= {setName}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
        
        <TextInput
                minHeight ={60}
                    style={styles.input}
                    placeholder = 'Unesite novi link slicice prihoda'
                    onChangeText= {setSlicica}
                    //value = {props.values.title}
                    //onBlur = {props.handleBlur('title')} 
                    // ovo da je valdiacija realtime
                />
      <Button title = 'Sacuvaj' color = 'maroon' onPress = {izmeniVrstuPrihoda} />
      
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
                  onPress = {() => {setModalOpenUpdate(true); setIDPrihoda(item.ID)}}
                  />
            <AntDesign name = 'delete'
                  size = {28}
                  color = '#333'
                  style ={styles.ikonice}
                  onPress ={() =>obrisiVrstuPrihoda(item.ID)}
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
