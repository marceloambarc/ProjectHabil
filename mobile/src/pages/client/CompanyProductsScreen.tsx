import React from 'react';
import { StyleSheet, Text, View, FlatList, 
Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

interface Props{
  navigation: any,
  companyName: string,
  companyId: string,
}

const baseURL = `http://192.168.15.58:8080/products`;

function renderItem({item} : {item: any}) {
  return (
    <View style={styles.listItem}>
      
        {/* IMAGE */}
        {item.images.map((image:any) => {
          return(
            <Image source={{uri: image.url}} key={item.id.toString()} style={styles.image} />
          );
        })}
 
        {/* CONTENT */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
          <Text style={styles.contentTextPrice}>R$: {item.price}</Text>
          <Text>{item.position}</Text>
          <Text>{item.company_id}</Text>
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

export default class App extends React.Component<Props> {
  state = {
    data:[],
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    const id = '1';
    const response = await fetch(`${baseURL}/company_id/${id}`);
    const repositories = await response.json();
    this.setState({ data: repositories })
  }

  render(){
    return (
      <View style={styles.container}>
        <ProductsHeader />
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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