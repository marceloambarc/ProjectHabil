import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity,
ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather, Fontisto, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';

function PromotionDetailsHeader(){
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
      <Text style={styles.companyTitle}>Empresa</Text>
    </SafeAreaView>
  );
}

interface handlePromotionDetailParams {
  id: number,
  name: any,
  price: any,
  image: any,
  description: any,
}

export default function PromotionDetailsScreen(){
  const route = useRoute();
  const params = route.params as handlePromotionDetailParams;

  const productName = params.name;
  const productPrice = params.price;
  const productImage = params.image;
  const productDescription = params.description;
  return (
    <SafeAreaView style={{flex:1}}>
      <PromotionDetailsHeader />
      <View style={styles.container}>
        <View style={styles.borderContainer}>
          <View>

          <ImageZoom cropWidth={350}
                    cropHeight={370}
                   imageWidth={330}
                   imageHeight={350}>
            
            <Image
              style={{width:'100%', height: '100%', borderRadius: 20}}
              source={{ uri: productImage }}
            />
            
          </ImageZoom>
          </View>
          <View style={styles.productDescription}>
            <Text style={styles.productTextPrice}>Preço: R$ {productPrice}</Text>
            
            <Text style={styles.productTextName}>{productName}</Text>
            
            <ScrollView style={{maxHeight: 90, maxWidth: '90%'}}>
              <Text style={styles.productTextDescription}>{productDescription}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btnSupplierContact}>
            <Fontisto name="email" size={30} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact1}>
            <Feather name="phone-call" size={35} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact2}>
            <Ionicons name="logo-whatsapp" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
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
  companyTitle: {
    marginLeft: '7%'
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

    /*BODY*/
    container: {
      alignItems: 'center',
      height: '100%',
      flex: 1,
      paddingHorizontal: 10
    },
    borderContainer: {
      backgroundColor: '#FFF',
      width: '100%',
      height: '90%',
      borderRadius: 20,
      alignItems: 'center',
    },

    /*PRODUCT*/
    productDescription: {
      paddingTop: 2,
      paddingHorizontal: '2%',
      alignItems: 'center'
    },
    productTextPrice: {
      fontSize: 27,
      marginBottom: 4
    },
    productTextName: {
      fontSize: 26,
      marginBottom: 4,
    },
    productTextDescription: {
      fontSize: 16,
      marginBottom: 4,
      textAlign: 'justify'
    },

    /*CONTACT FOOTER*/
     btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnSupplierContact:{
    borderRadius: 40,
    height: 50,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cb4113'
  },
  btnSupplierContact1:{
    borderRadius: 40,
    height: 50,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#017895'
  },
  btnSupplierContact2:{
    borderRadius: 40,
    height: 50,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25d366'
  },
});