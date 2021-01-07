import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, 
Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

const baseURL = api.get('products');

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

function renderItem({item} : {item: any}) {
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
    data: [],
    
    loading: false,
  }

  componentDidMount(){
    this.loadRepositories();
  }

  loadRepositories = async() => {
    if (this.state.loading) return;

    this.setState({ loading: true });

    const response = await fetch(`${baseURL}`)
    const repositories = await response.json();

    this.setState({
      data: [ ...this.state.data, ...repositories.items],
      loading: false,
    });
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };


  render(){
    return (
      <View style={styles.container}>
        <ProductsHeader />
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={this.loadRepositories}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
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
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});