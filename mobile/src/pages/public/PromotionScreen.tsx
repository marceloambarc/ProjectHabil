import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity,
StyleSheet, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Feather, Fontisto, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

function PromotionHeader() {
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
          <TouchableOpacity onPress={() => {}}>
            <Feather style={styles.icon} name="menu" size={28} color="#191919" />
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
        <Text style={styles.foundText}>Resultados: `Roupas`</Text>
      </View>
    </SafeAreaView>
  );
}

interface Props {
  id: number,
  name: any,
  image: any,
  cnpj: any,
  business: any,
  phone: any,
  email: any,
  address: any,
  district: any,
  city: any,
  uf: any,
  navigation: any
}

function CompanyCard(){
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as Props;

  const companyId = params.id;
  const companyName = params.name;
  const companyImage = params.image;
  const companyCnpj = params.cnpj;
  const companyBusiness = params.business;
  const companyPhone = params.phone;
  const companyEmail = params.email;
  const companyAddress = params.address;
  const companyDistrict = params.district;
  const companyCity = params.city;
  const companyUf = params.uf;

  return(
    <View style={styles.background}>
      <View style={styles.companyContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: companyImage }}
            style={styles.companyImage}
          />
          <Text style={styles.companyName}>{ companyName }</Text>
        </View>
        <View style={styles.btnRow}>

          <TouchableOpacity style={styles.btnSupplierContact}>
            <Fontisto name="email" size={25} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact1}>
            <Feather name="phone-call" size={27} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact2} onPress={() => navigation.navigate('SupplierAbout',{
            name: companyName,
            image: companyImage,
            id: companyId,
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

          <TouchableOpacity style={styles.btnSupplierContact3}>
            <Entypo name="location-pin" size={27} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact4}>
            <Ionicons name="logo-whatsapp" size={25} color="#FFF" />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

interface HandleNextPage {
  navigation: any
}

export default class App extends React.Component<HandleNextPage> {
  state = {
    data: [
      {
        id: 0, 
        name: 'Camisa e Colete', 
        price: '119,00',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAltpOcvT80khv4rnHJVc77wuF1-czXtzrEkXQjVn96OLLSfFwGRdjR3SWlCsTy2Ti7F6jv3I&usqp=CAc",
        description: `Essa camisa social preta masculina é produzida em tricoline, de manga longa, quase não amassa e muito fácil de ser passada, perfeitas para ser utilizada no dia a dia, colete algodão de alta costura. LALALALALALALALAL LAA AS S S JJ SJJ SJ SJJJS JS SJ J J SJ J`,
      },
      { 
        id: 1,  
        name: 'Camisa Social', 
        price: '89,00',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGFKPHkbd11yTxA2kJr1Fudo1-5X-HNQNig&usqp=CAU",
        description: `Essa camisa social branca masculina é produzida em tricoline, de manga longa, quase não amassa e muito fácil de ser passada.`
      },
      {
        id: 2, 
        name: 'Abotoadura', 
        price: '109,00',
        image: "https://i.pinimg.com/originals/69/56/fd/6956fdb16cea3a63ad77762a9a8e6013.jpg",
        description: `Abotoaduras ou Botões de punho são acessórios de moda usados por homens e mulheres para prender os dois lados da bainha de uma camisa.`
      },
      { 
        id: 3, 
        name: 'Terno Slim Sob-Medida', 
        price: '780,00',
        image: "https://images-americanas.b2w.io/produtos/01/00/img/59516/1/59516106_1GG.jpg",
        description: `Terno preto veja e conheça AGORA. Produto diferenciado.`,
      },
      { 
        id: 4, 
        name: 'Meias Hugo Boss',
        price: '59,00',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35QY6lCMvNBnFxETbPVmcJqYpv4XSHBQFXQ&usqp=CAU",
        description: `Hugo Boss. KIT MASCULINO MEIA 2P PIANO`,
      },
      { 
        id: 5, 
        name: 'Gravata em Seda',
        price: '130,00',
        image: "https://img.elo7.com.br/product/main/34727BC/gravata-em-seda-100-luxuosa-gravata-italiana.jpg",
        description: `Gravatas de Seda feitas especialmente para você.`,
      },
      {
        id: 6,
        name: 'Calça  de Alfaiataria',
        price: '80',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJZ4gca5khWI5z_uUjkxJ7Zjw6aeKNi93-w&usqp=CAU",
        description: `Os looks com calça de alfaiataria estão cada vez mais variados… e estilosos! Essa roupa irá ajuda a arrasar com a peça que está super em alta.`,
      }
    ],
  };

  renderItem = ({ item }:{ item:any }) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.listItem}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
          <Text style={styles.contentText}>{item.price}</Text>
        </View>

        <TouchableOpacity style={styles.moreContainer} onPress={() => this.props.navigation.navigate('PromotionDetails',{
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description
        })}>
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
  }
});