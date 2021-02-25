import React, { useState, PureComponent } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity,
StyleSheet, Image, TouchableWithoutFeedback, FlatList, Linking } from 'react-native';
import { Feather, Fontisto, Ionicons, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Props {
    searchTerm: string,
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

  return (
    <SafeAreaView>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.cmaLogo}
            source={require("../../../assets/cmatextlogo.png")}
          />
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Welcome')}>
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Supplier')}>
            <AntDesign style={styles.icon} name="back" size={24} color="#191919" />
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
            source={{ uri: `data:image/jpeg;base64,${companyImage}`}}
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

const baseURL = 'http://192.168.15.200:8008/v1/companies/products/company_id';

export default class App extends PureComponent<HandleNextPage> {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    if(this.state.loading) return;

    const { route } = this.props;
    const params = route.params as Props;
    const companyId = params.companyId

    this.setState({ loading: true });
    const response = await fetch(`${baseURL}/${companyId}`);
    if(response.ok) {
      const repositories = await response.json();

      this.setState({
        data: [...this.state.data, ...repositories],
        loading: false,
      });
    }
    return;
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
      date: item.date,
      discount: item.discount,
      companyName: companyName,
      companyEmail: companyEmail,
      companyPhone: companyPhone,
      searchTerm: searchTerm,
    })
  }

  renderEmpty = () => {
    return (
    <View>
      <Text style={{textAlign: 'center'}}>Procurando produtos...</Text>
    </View>
    );
  }

  renderItem = ({ item }:{ item:any }) => (
     <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.listItem}>
        <Image
          source={{uri: `data:image/jpeg;base64,${item.image}`}}
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
        keyExtractor={(_item, index) => index.toString()}
        ListEmptyComponent={this.renderEmpty}
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
    paddingTop: 12,
    paddingBottom: 10,
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
  homeButton: {
    marginRight: 40,
  },

  /* COMPANY CARD */
  companyContainer: {
    paddingTop: 31,
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

  /* FOUND BANNER */
  foundContainer: {
    backgroundColor: '#bdc6cf',
    height: 25,
  },
  foundText: {
    fontSize: 12,
    color: '#8f98a1',
    paddingLeft: '12%',
    paddingRight: '20%',
    paddingTop: 2
  },
});