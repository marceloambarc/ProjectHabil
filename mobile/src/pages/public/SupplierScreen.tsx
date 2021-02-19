import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image,
StyleSheet, FlatList, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { Feather, AntDesign } from '@expo/vector-icons';

const baseURL = 'http://192.168.15.200:8008/v1/companies/';
const promoURL = 'http://192.168.15.200.8008/v1/products/';

function WelcomeHeader(){
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
         <Image
            style={styles.cmaLogo}
            source={require("../../../assets/cmatextlogo.png")}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
            <AntDesign style={styles.icon} name="back" size={24} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

interface Props {
  navigation: any,
  route: any,
  text: string,
  searchTerm: string,
}

export default class App extends Component<Props> {
  state = {
    data: [],
    loading: false,
    promoData: [],
    promoLoading: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async() => {
    try{
      if (this.state.loading) return;
      this.setState({ loading: true });

      fetch(baseURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response,
          error: response.error || null,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

    }catch(err){
      alert(err);
    }
  }

  loadPromo = async() => {
    try{
      if (this.state.promoLoading) return;
      this.setState({ promoLoading: true });

      fetch(promoURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          promoData: response,
          error: response.error || null,
          promoLoading: false,
        });
      })
      .catch(error => {
        this.setState({ error, promoLoading: false });
      });

    }catch(err){
      alert(err);
    }
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  handleSearch = async({search}:{search:any}) => {
    try {
      const searchTerm = search;
      this.props.navigation.navigate('Supplier',{
        searchTerm
      });
    }catch(err){
      alert(err);
    }
  }

  renderHeader = () => {
    const { route } = this.props;
    const params = route.params as Props;
    const searchTerm = params.searchTerm;

    const [search, setSearch] = useState('');

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
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <View style={styles.searchBtnContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={() => this.handleSearch({search})}>
            <Feather name="search" size={20} color="white" />
            <Text style={styles.searchBtnText}>Procurar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.foundContainer}>
        <Text style={styles.foundText}>Resultados: {searchTerm}</Text>
      </View>
      </SafeAreaView>
    );
  }

  handleGoToPromotion = async ({item}:{item:any}) => {
    const { route } = this.props;
    const params = route.params as Props;
    const searchTerm = params.searchTerm;
    try{
      this.props.navigation.navigate('Promotions',{
        companyId: item.id,
        companyName: item.name,
        companyImage: item.image,
        companyCnpj: item.cnpj,
        companyBusiness: item.business,
        companyPhone: item.phone,
        companyEmail: item.email,
        companyAddress: item.address,
        companyDistrict: item.district,
        companyCity: item.city,
        companyUf: item.uf,
        companyKeywords: item.keywords,
        searchTerm: searchTerm,
      });
    }catch(err){
      alert(err);
    }
  }

  renderPromo = () => {
      if(this.state.promoData){
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
    <TouchableWithoutFeedback onPress={() => this.handleGoToPromotion({item})}>
      <ImageBackground source={{uri: item.image !== ""? item.image : undefined}} style={styles.image}>
        { this.renderPromo() }
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
          ListFooterComponent={this.renderFooter}
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

  /*ISPROMO*/
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
  },

  /*FOOTER*/
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});