import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';

interface Props {
  navigation: any,
  text: string
}

export default class App extends Component<Props> {
  state = {
    data: [],
    loading: false,
    search: '',
  };
  arrayholder = [];

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    const baseURL = 'http://192.168.15.58:8080/products';
    this.setState({ loading: true });

    fetch(baseURL)
    .then(response => response.json())
    .then(response => {
      this.setState({
        data: response,
        error: response.error || null,
        loading: false,
      });
      this.arrayholder = response;
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = (text:string) => {
    this.setState({
      value:text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Procure..."
        lightTheme
        round
        autoCorrect={false}
        onChangeText={text => this.searchFilterFunction(text)}
        value={this.state.value}
      />
    )
  }

  Listener = async({item}:{item:any}) => {
    this.props.navigation.navigate('ProductView',{
      id: item.id,
      name: item.name,
      price: item.price,
      date: item.date,
      description: item.description,
      images: item.images,
    });
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
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
    
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
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