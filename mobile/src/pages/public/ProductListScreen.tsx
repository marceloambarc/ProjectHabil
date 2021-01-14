import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

const baseURL = 'http://192.168.15.58:8080/products';

interface Props {
  navigation: any
}

export default class App extends Component<Props> {
  state = {
    data: [],
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    const response = await fetch(`${baseURL}`);
    const repositories = await response.json();
    
    this.setState({
      data: [ ...this.state.data, ...repositories],
    });
  }

  Listener = async({item}:{item:any}) => {
    console.log("Navigation is :", this.props.navigation.navigate('ProductView',{
      id: item.id,
      name: item.name,
      price: item.price,
      date: item.date,
      description: item.description
    }));
  }
  
  renderItem = ({ item }: {item: any}) => (
    <TouchableWithoutFeedback onPress={() => this.Listener({item})}>
      <View style={styles.listItem}>
        {item.images.map((image:any) => {
          return(
            <Image source={{uri: image.url}} key={item.id.toString()} style={styles.image} />
          );
          })}
            
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
          <Text style={styles.contentTextPrice}>R$: {item.price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 30
  },
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listItem:{
    margin:7,
    padding:10,
    backgroundColor:'#FFF',
    width:'91%',
    height: 100,
    flex:1,
    alignSelf:'center',

    flexDirection:'row',
    borderRadius:5
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  contentText:{
    fontWeight:'bold'
  },
  contentTextPrice:{
    color: 'red',
    fontWeight:'bold'
  },
});