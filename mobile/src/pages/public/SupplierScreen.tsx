import React, { PureComponent, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { Feather, AntDesign } from '@expo/vector-icons';
import { View, Text, ImageBackground, TouchableOpacity, Image,
  StyleSheet, FlatList, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator } from 'react-native';

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

const baseURL = 'http://192.168.15.200:8008/v1/companies'

export default class App extends PureComponent<Props> {
  state = {
    data: [],
    loading: false,
    searchGreyBar: '',
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    if(this.state.loading) return;

    const { route } = this.props;
    const params = route.params as Props;
    const searchTerm = params.searchTerm;

    if (searchTerm == '' || searchTerm == undefined || searchTerm == ' '){
      this.setState({ loading: true });
      const response = await fetch(`${baseURL}`);
      if(response.ok) {
        const repositories = await response.json();
  
        this.setState({
          data: [...this.state.data, ...repositories],
          loading: false,
          searchGreyBar: searchTerm,
        });
      }
      return;
    }else{
      this.setState({ loading: true });
      const response = await fetch(`${baseURL}/keywords/${searchTerm}`);
      if(response.ok) {
        const repositories = await response.json();
  
        this.setState({
          data: [...this.state.data, ...repositories],
          loading: false,
          searchGreyBar: searchTerm,
        });
      }
      return;
    }
  }

  handleSearch = async({search}:{search:any}) => {
    try {
      this.setState({
        data: [],
        loading: true 
      });
      const searchTerm = search;

      if(searchTerm =='' || searchTerm == undefined || searchTerm == ' '){
        const response = await fetch(`${baseURL}`);
        if(response.ok) {
          const repositories = await response.json();
    
          this.setState({
            data: [...this.state.data, ...repositories],
            loading: false,
            searchGreyBar: searchTerm,
          });
        }
        return;
      }else{
        const response = await fetch(`${baseURL}/keywords/${searchTerm}`);
        if(response.ok) {
          const repositories = await response.json();

          this.setState({
            data: [...this.state.data, ...repositories],
            loading: false,
            searchGreyBar: searchTerm,
          });
        }
        return;
      }
    }catch(err){
      alert(err);
    }
  }

  handleGoToPromotion = async ({item}:{item:any}) => {
    const searchTerm = this.state.searchGreyBar;
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
        searchTerm: searchTerm,
      });
    }catch(err){
      alert(err);
    }
  }

  renderHeader = () => {
    const [search, setSearch] = useState(this.state.searchGreyBar);
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
          <Text style={styles.foundText}>Resultados: {this.state.searchGreyBar}</Text>
        </View>
      </SafeAreaView>
    );
  }

  renderEmpty = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.emptyText}>Procurando Empresas...</Text>
      </View>
    );
  }

  renderPromo = ({item}:{item:any}) => {
    if(item.item){
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

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  renderItem = ({item}:{item:any}) => (
    <TouchableWithoutFeedback onPress={() => this.handleGoToPromotion({item})}>
      <ImageBackground source={{uri: `data:image/jpeg;base64,${item.image}`}} style={styles.imageBackground}>
        { this.renderPromo({item}) }
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );

  render(){
    return (
      <SafeAreaView style={styles.repositoriesContainer}>
        <WelcomeHeader />
        <FlatList 
          style={styles.list}
          contentContainerStyle={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item,index) => index.toString()}
          ListEmptyComponent={this.renderEmpty}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          removeClippedSubviews={true}
          initialNumToRender={4}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  repositoriesContainer: {
    marginBottom: 50
  },
  list: {
    paddingHorizontal: 2,
  },
  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    height: 200,
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

  /* Header */
  headerBackground: {
    backgroundColor: '#FFF'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10,
    marginTop: 5,
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
    emptyText: {
      textAlign:'center',
      fontSize: 20,
    },

    /*FOOTER*/
    loading: {
      alignSelf: 'center',
      marginVertical: 20,
    },
});