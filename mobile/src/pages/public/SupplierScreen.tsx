import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image,
StyleSheet, FlatList, TouchableWithoutFeedback, SafeAreaView, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

function WelcomeHeader(){
  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
         <Image
            style={styles.cmaLogo}
            source={require("../../../assets/cmatextlogo.png")}
          />
          <TouchableOpacity onPress={() => {}}>
            <Feather style={styles.icon} name="menu" size={28} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

interface Props {
  navigation: any,
  text: string
}

export default class App extends Component<Props> {
  state = {
    data: [
      { 
        id: 0, 
        name: 'Alfaiate Klein', 
        image: "https://img.diytrade.com/cdimg/1995729/31020741/0/1353484016/Modern_Clothing_Store_Fixture.jpg",
        cnpj: '50.409.655/0001-96',
        business: 'Roupas',
        phone: '5551992381717',
        email: 'kleinalfa@alfaiatek.com',
        address: 'R. Waldemar Vicente da Costa, 468',
        district: 'Centro',
        city: 'Nova Santa Rita',
        uf: 'RS',
        isPromo: 1
      },
      { 
        id: 1, 
        name: 'Tênis do Guga', 
        image: "https://kissmiklos.com/i/12/40/0/2223.jpg",
        isPromo: 0
      },
      {
        id: 2, 
        name: 'Marta Dress', 
        image: "https://i.pinimg.com/originals/69/56/fd/6956fdb16cea3a63ad77762a9a8e6013.jpg",
        isPromo: 1
      },
      { 
        id: 3, 
        name: 'R&B Bolsas', 
        image: "https://dynamic.brandcrowd.com/asset/logo/823feadf-f9b9-4ab7-a26b-3bcbe0d2fe52/logo?v=4",
        isPromo: 0
      },
      { 
        id: 4, 
        name: 'Boutique Gentil', 
        image: "https://www.crystalclutch.com/wp-content/uploads/2017/03/Display-Handbags-370x240_c.jpg",
        isPromo: 0
      },
    ],
  };

  renderHeader = () => {
    return (
      <SafeAreaView>
      <View style={styles.searchRow}>
        <View style={styles.searchBarContainer}>
          <SearchBar 
            style={styles.searchBar}
            placeholder="Procure Aki as promoções..."
            lightTheme
            round
            autoCorrect={true}
            onChangeText={() => {}}
          />
        </View>
        <View style={styles.searchBtnContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={() => this.props.navigation.navigate('Supplier')}>
            <Feather name="search" size={20} color="white" />
            <Text style={styles.searchBtnText}>Procurar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.foundContainer}>
        <Text style={styles.foundText}>Resultados: `Roupas`</Text>
      </View>
      </SafeAreaView>
    );
  }

  renderPromo({ item }:{ item:any }){
    if(item.isPromo == '1' ){
      return(
        <View style={styles.isPromoContainer}>
          <View style={styles.isPromoRow}>
            <Text style={styles.isPromoText}>Temos Promoções</Text><Feather name="percent" size={24} color="#FFF" />
          </View>
        </View>
      );
    }else{
      return;
    }
  }

  renderItem = ({ item }:{ item: any }) => (
    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Promotions',{
      id: item.id,
      name: item.name,
      image: item.image,
      cnpj: item.cnpj,
      business: item.business,
      phone: item.phone,
      email: item.email,
      address: item.address,
      district: item.district,
      city: item.city,
      uf: item.uf
    })}>
      <ImageBackground source={{uri: item.image}} style={styles.image}>
        { this.renderPromo({item}) }
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <SafeAreaView style={styles.repositoriesContainer}>
        <WelcomeHeader />
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    /* Header */
  headerBackground: {
    backgroundColor: '#FFF'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10
  },
  icon: {
    marginRight: 10,
    paddingBottom: 5
  },
  searchBtnContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBtn: {
    width: 90,
    padding: 10,
    paddingRight: 7,
    backgroundColor: '#ff6600',
    borderRadius: 10
  },
  searchBtnText: {
    fontSize: 10,
    color: '#FFF'
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
  },
  searchBarContainer: {
    width: '80%'
  },
  searchBar: {
    width: '100%'
  },

  /* FOUND BANNER */
  foundContainer: {
    backgroundColor: '#bdc6cf',
    height: 25,
  },
  foundText: {
    fontSize: 12,
    color: '#8f98a1',
    paddingLeft: '12%',
    paddingRight: '30%',
    paddingTop: 2
  },

  /* BODY */
  repositoriesContainer: {
    marginBottom: 50
  },
  list: {
    paddingHorizontal: 2,
  },
  titleContainer :{
    marginTop: 20,
    alignItems: 'center',
    maxWidth: '65%',
    backgroundColor: 'rgba(1, 120, 149, 0.8)'
  },
  titleText: {
    paddingHorizontal: 20,
    fontSize: 30,
    color: 'aliceblue'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    height: 200,
  },
  isPromoContainer: {
    backgroundColor: '#ff6600',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: '0%',
    top: '13%',
    borderRadius: 7
  },
  isPromoRow: {
    flexDirection: 'row',
    alignItems:'center',
    padding: 8
  },
  isPromoText: {
    textAlign: 'right',
    fontSize: 10,
    color: '#FFF'
  }
});