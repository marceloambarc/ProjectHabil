import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, 
Image, TouchableWithoutFeedback, ActivityIndicator,
TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

interface Props {
  navigation: any,
  text: string
}

function WelcomeHeader(){
  const navigation = useNavigation();

  return (
    <View style={styles.welcomeHeaderBackground}>
      <View style={styles.welcomeHeaderContainer}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.headerImage}
        />
        <TouchableOpacity>
          <Feather style={styles.icon} name="menu" size={28} color="#191919"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default class App extends Component<Props> {
  state = {
    data: [],
    loading: false,
    search: '',
    value: ''
  };
  arrayholder = [];

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    const baseURL = 'http://192.168.15.58:8080/companies';
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
        autoCorrect={true}
        onChangeText={text => this.searchFilterFunction(text)}
        value={this.state.value}
      />
    )
  }

  handleView = async({item}:{item:any}) => {
    this.props.navigation.navigate('SupplierView',{
      id: item.id,
    });
  }

  renderItem = ({ item } : { item: any }) => (
    <TouchableWithoutFeedback style={styles.itemContainer} onPress={() => this.handleView({item})}>
      <View style={styles.listItem}>
        {item.images.map((image:any) => {
          return(
            <Image source={{uri: image.url}} key={item.id.toString()} style={styles.image} />
          );
        })}

        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
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
      <View style={styles.fullContainer}>
        <WelcomeHeader />
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={this.renderHeader}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  /* HEADER */
  welcomeHeaderBackground: {
    backgroundColor: '#FFF'
  },
  welcomeHeaderContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerImage: {
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  icon:{
    marginRight: 10,
  },

  /*BODY*/
  list: {
    flex: 1,
    marginTop: 30
  },
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  fullContainer: {
    flex: 1,
    backgroundColor: '#FFF',
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
    position: 'absolute',
    width:'100%',
    height:'100%',
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
  itemContainer: {
    alignItems: 'center'
  }
});