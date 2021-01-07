import React from 'react';

import { StyleSheet, Text, View, FlatList, 
Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {Feather} from '@expo/vector-icons';

function ProductsHeader(){
  const navigation = useNavigation();

  return(
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <Feather name="arrow-left" size={28} color="#e82041" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Meus Produtos</Text>
    </View>
  );
}

function Item({item} : {item: any}) {
  return (
    <View style={styles.listItem}>
      
        {/* IMAGE */}
        <Image source={{uri:item.photo}}  style={styles.image} />

        {/* CONTENT */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
          <Text style={styles.contentTextPrice}>R$: {item.price}</Text>
          <Text>{item.position}</Text>
        </View>
      
      {/* SIDE BUTTONS */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnModify}>
            <Text style={{color:"red"}}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnModify}>
            <Text style={{color:"gold"}}>Editar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default class App extends React.Component {
  state = {
    data:[
        {
            "name": "Samsung A01",
            "email": "miyah.myles@gmail.com",
            "price": "760,00",
            "position": "20/12/20",
            "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS62uzWdi1_FuoHgmKJaLDPcfid94y2dXcRcw&usqp=CAU"
        },
        {
            "name": "Moto G8",
            "email": "june.cha@gmail.com",
            "price": "1299,00",
            "position": "06/01/21",
            "photo": "https://brmotorola.vteximg.com.br/arquivos/ids/164052-1000-1000/Blackjack_Mermaid-Gradient_PDP-Hero.png?v=637237552056900000"
        },
        {
            "name": "Iphone 12",
            "email": "iida.niskanen@gmail.com",
            "price": "8799,00",
            "position": "10/01/21",
            "photo": "https:\/\/images.pexels.com\/photos\/887751\/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "name": "MI 10T Xiaomi",
            "email": "renee.sims@gmail.com",
            "price": "7991,20",
            "position": "20/12/20",
            "photo": "https://http2.mlstatic.com/D_NQ_NP_617625-MLA44346739606_122020-O.webp"
        },
        {
            "name": "LG K41S",
            "email": "jonathan.nu\u00f1ez@gmail.com",
            "price": "4500,00",
            "position": "28/12/20",
            "photo": "https:\/\/images.pexels.com\/photos\/404280\/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "name": "Iphone Xr",
            "email": "sasha.ho@gmail.com",
            "price": "3400,90",
            "position": "12/01/21",
            "photo": "https:\/\/images.pexels.com\/photos\/336948\/pexels-photo-336948.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        },
        {
            "name": "Samsumng S20+",
            "email": "abdullah.hadley@gmail.com",
            "price": "3440,07",
            "position": "05/05/21",
            "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2cW-cf2jkHYDfXOPMbHLF2oBpNo3RiViTNQ&usqp=CAU"
        },
        {
            "name": "Asus Zenfone 7",
            "email": "thomas.stock@gmail.com",
            "price": "5399,00",
            "position": "05/05/21",
            "photo": "https:\/\/images.pexels.com\/photos\/1042143\/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "name": "Galaxy Z Fold2",
            "email": "veeti.seppanen@gmail.com",
            "price": "12500,00",
            "position": "10/03/21",
            "photo": "https:\/\/images.samsung.com\/br\/smartphones\/galaxy-z-fold2\/images\/galaxy-z-fold2-share-image.jpg"
        },
        {
            "name": "HTC U12+",
            "email": "bonnie.riley@gmail.com",
            "price": "4487,58",
            "position": "30/05/21",
            "photo": "https:\/\/images.pexels.com\/photos\/699122\/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
    ]
  }

  render(){
    return (
      <View style={styles.container}>
        <ProductsHeader />
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '61%'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center'
  },
  backBtn:{
    marginTop:20,
    marginLeft:20,
    flex:1,
    padding:10
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:'#FFF',
    width:'80%',
    flex:1,
    alignSelf:'center',
    flexDirection:'row',
    borderRadius:5
  },
  image:{
    width:60,
    height:60,
    borderRadius:30
  },
  contentContainer:{
    alignItems: 'center',
    flex: 1
  },
  contentText:{
    fontWeight:'bold'
  },
  contentTextPrice:{
    color: 'red',
    fontWeight:'bold'
  },
  btnContainer:{
    alignItems: 'center',
    flex:1
  },
  btnModify:{
    height:30,
    width:50,
    justifyContent:'center',
    alignItems:'center'
  }
});