import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity,
StyleSheet, Image, TouchableWithoutFeedback, FlatList, Linking, ActivityIndicator } from 'react-native';
import { Feather, Fontisto, Ionicons, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Props {
  searchTerm: any,
  companyId: number,
  companyName: any,
  companyImage: any,
  companyCnpj: any,
  companyBusiness: any,
  companyPhone: any,
  companyEmail: any,
  companyAddress: any,
  companyDistrict: any,
  companyCity: any,
  companyUf: any,
  route: any
}

function PromotionHeader() {
  const route = useRoute();
  const params = route.params as Props;

  const searchTerm = params.searchTerm;

  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.cmaLogo}
            source={require("../../../assets/cmatextlogo.png")}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Supplier')}>
            <AntDesign style={styles.icon} name="back" size={24} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
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
          <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('Supplier')}>
            <Feather name="search" size={20} color="white" />
            <Text style={styles.searchBtnText}>Procurar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.foundContainer}>
        <Text style={styles.foundText}>Resultados: { searchTerm }</Text>
      </View>
    </SafeAreaView>
  );
}

function CompanyCard(){
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as Props;
  
  const companyId = params.companyId;
  const companyName = params.companyName;
  const companyImage = params.companyImage;
  const companyCnpj = params.companyCnpj;
  const companyBusiness = params.companyBusiness;
  const companyPhone = params.companyPhone;
  const companyEmail = params.companyEmail;
  const companyAddress = params.companyAddress;
  const companyDistrict = params.companyDistrict;
  const companyCity = params.companyCity;
  const companyUf = params.companyUf;

  async function handleSendEmail(){
    try{
      Linking.openURL(`mailto:${companyEmail}?subject=Contato CompreMaisAki&body=
        ${companyName}, encontrei seu contato pelo aplicativo CompreMaisAqui!
      `)
    }catch(err){
      alert(err);
    }
  }

  async function handleCall(){
    try{
      Linking.openURL(`tel:0${companyPhone}`);
    }catch(err){
      alert(err);
    }
  }

  async function handleGoogleMaps(){
    try{
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${companyAddress},${companyDistrict},${companyCity},${companyUf}`)
    }catch(err){
      alert(err);
    }
  }

  async function handleWhatsapp(){
    try{
      Linking.openURL(`https://api.whatsapp.com/send?phone=${companyPhone}&text=%20Olá%20${companyName}%20encontrei%20seu%20contato%20pelo%20aplicativo%20CompreMaisAki%20+`);
    }catch(err){
      alert(err);
    }
  }

  return(
    <View style={styles.background}>
      <View style={styles.companyContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: companyImage }}
            style={styles.companyImage}
            key={companyId}
          />
          <Text style={styles.companyName}>{ companyName }</Text>
        </View>
        <View style={styles.btnRow}>

          <TouchableOpacity style={styles.btnSupplierContact} onPress={handleSendEmail}>
            <Fontisto name="email" size={25} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact1} onPress={handleCall}>
            <Feather name="phone-call" size={27} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact2} onPress={() => navigation.navigate('SupplierAbout',{
            name: companyName,
            image: companyImage,
            cnpj: companyCnpj,
            business: companyBusiness,
            phone: companyPhone,
            email: companyEmail,
            address: companyAddress,
            district: companyDistrict,
            city: companyCity,
            uf: companyUf
          })}>
            <Feather name="info" size={25} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact3} onPress={handleGoogleMaps}>
            <Entypo name="location-pin" size={27} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact4} onPress={handleWhatsapp}>
            <Ionicons name="logo-whatsapp" size={25} color="#FFF" />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

interface HandleNextPage {
  navigation: any,
  route: any,
}

const promoBaseURL = 'http://192.168.15.200:8008/v1/companies/products/company_id/'

export default class App extends React.Component<HandleNextPage> {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    if (this.state.loading) return;

    this.setState({ loading: true });
    const { route } = this.props;
    const params = route.params as Props;
    const companyId = params.companyId;

    const response = await fetch(`${promoBaseURL}/${companyId}`);
    const repositories = await response.json();
    this.setState({
      data: repositories,
      loading: false,
    });
  }

  renderFooter = () => {
    if(!this.state.loading) return null;
    return(
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    )
  }

  renderDiscount({item}:{item: any}) {
    if(item > 0){
      return(
        <View style={styles.discountCol}>
          <Text style={styles.titleDiscount}>DESCONTO</Text>
          <Text style={styles.discountText}>{item.discount}</Text>
          <Feather name="percent" size={16} color="#FFF" />
        </View>
      );
    }else{
      return (
        <View style={styles.discountColEmpty}>
          <Text style={styles.discountText}>{item.discount}</Text><Feather name="percent" size={16} color="#FFF" />
        </View>
      )
    }
  }

  handlePromotionDetail = async({item}:{item:any}) => {
    const { route } = this.props;
    const params = route.params as Props;

    const companyName = params.companyName;
    const companyEmail = params.companyEmail;
    const companyPhone = params.companyPhone;
    const searchTerm = params.searchTerm;

    this.props.navigation.navigate('PromotionDetails',{
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      discount: item.discount,
      companyName: companyName,
      companyEmail: companyEmail,
      companyPhone: companyPhone,
      searchTerm: searchTerm,
    })
  }

  renderItem = ({ item }:{ item:any }) => (
     <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.listItem}>
        { this.renderDiscount({ item }) }
        <Image
          source={{uri: item.image !== ""? item.image : undefined}}
          style={styles.image}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
          <Text style={styles.contentText}>R$ {item.price}</Text>
        </View>

        <TouchableOpacity style={styles.moreContainer} onPress={() => this.handlePromotionDetail({item})}>
          <View style={styles.moreCol}>
              <Text style={styles.moreText}>Saiba Mais </Text>
              <MaterialIcons name="read-more" size={30} color="white" />
          </View>
        </TouchableOpacity>


      </View> 
    </TouchableWithoutFeedback>
  )

  render() {
    return (
    <View style={styles.container}>
      <PromotionHeader />
      <CompanyCard />
      <FlatList 
        style={{ flex: 1, backgroundColor: '#bdc6cf', marginTop: -140, paddingTop: 10, marginBottom: 10}}
        data={this.state.data}
        renderItem={this.renderItem}
        ListFooterComponent={this.renderFooter}
        keyExtractor={item => item.id.toString()}
      />
    </View>
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
  headerText: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 10
  },
  cmaLogo: {
    height: 20,
    width: 100,
    marginLeft: 10
  },

  /* SEARCH */
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

  /* COMPANY CARD */
  companyContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 7
  },
  companyImage: {
    alignItems: 'center',
    backgroundColor: '#191919',
    height: 150,
    width: 250,
    borderRadius: 20,
  },
  companyName: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '600'
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 40,
    paddingLeft: 40,
  },
  btnSupplierContact:{
    borderRadius: 40,
    height: 40,
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cb4113'
  },
  btnSupplierContact1:{
    borderRadius: 40,
    height: 40,
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#099463'
  },
  btnSupplierContact2:{
    borderRadius: 40,
    height: 40,
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#017895'
  },
  btnSupplierContact3:{
    borderRadius: 40,
    height: 40,
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0A719'
  },
  btnSupplierContact4:{
    borderRadius: 40,
    height: 40,
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25d366'
  },

  /* BODY */
  background:{
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listItem:{
    margin: 2,
    padding: 7,
    backgroundColor:'#FFF',
    width:'90%',
    flex:1,
    alignSelf:'center',
    flexDirection:'row',
    borderRadius:5
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
    marginLeft: 10
  },
  contentContainer:{
    alignItems: 'center',
    flex: 1
  },
  contentText:{
    fontWeight:'bold',
    marginLeft: 7,
    textAlign: 'center'
  },
  moreContainer: {
    backgroundColor: '#017895',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 5
  },
  moreCol: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  moreText: {
    textAlign: 'center',
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 10,
    color: '#FFF'
  },

  /*DISCOUNT PIN*/
  discountCol: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    flexDirection: 'column',
    padding: '2%',
    borderRadius: 5
  },
  discountColEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    padding: '2%',
    borderRadius: 5
  },
  titleDiscount: {
    fontSize: 5,
    color: '#FFF',
    fontWeight: 'bold'
  },
  discountText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  
    /* FOOTER */
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});