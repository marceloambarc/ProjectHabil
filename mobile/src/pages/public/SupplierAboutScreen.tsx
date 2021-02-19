import React, { useState } from 'react';
import { View ,Image ,TextInput, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Props {
  name: any,
  image: any,
  cnpj: string,
  business: string,
  phone: string,
  email: string,
  address: string,
  district: string,
  city: string,
  uf: string,
  navigation: any
}

export default function SupplierAboutScreen(){
  const route = useRoute();
  const params = route.params as Props;

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

  const [name] = useState(`${companyName}`);
  const [cnpj] = useState(`${companyCnpj}`);
  const [business] = useState(`${companyBusiness}`);
  const [phone] = useState(`${companyPhone}`);
  const [email] = useState(`${companyEmail}`);
  const [address] = useState(`${companyAddress}`);
  const [district] = useState(`${companyDistrict}`);
  const [city] = useState(`${companyCity}`);
  const [uf] = useState(`${companyUf}`);
  return (
    <ScrollView>
      <View style={styles.background}>
        <View style={styles.container}>
          <Image
              style={styles.cmaLogo}
              source={require("../../../assets/cmatextlogo.png")}
            />
          <Image
            source={{ uri: companyImage }}
            style={{width: 250, height: 170, marginBottom: 7, borderRadius: 20}}
          />

          <TextInput
          style={styles.input}
          placeholder="Nome Fantasia"
          autoCorrect={false}
          value={name}
          />

          <TextInput
          style={styles.input}
          placeholder="CNPJ"
          autoCorrect={false}
          value={cnpj}
          />

          <TextInput
          style={styles.input}
          placeholder="Ramo"
          autoCorrect={false}
          value={business}
          />

          <TextInput
          style={styles.input}
          placeholder="Telefone"
          autoCorrect={false}
          value={phone}
          />

          <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          value={email}
          />

          <TextInput
          style={styles.input}
          placeholder="Endereço"
          autoCorrect={false}
          value={address}
          />

          <TextInput
          style={styles.input}
          placeholder="Bairro"
          autoCorrect={false}
          value={district}
          />

          <TextInput
          style={styles.input}
          placeholder="Cidade"
          autoCorrect={false}
          value={city}
          />

          <TextInput
          style={styles.input}
          placeholder="UF"
          autoCorrect={false}
          value={uf}
          />

          
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 20
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  cmaLogo: {
    height: 25,
    width: 150,
    marginVertical: 7
  },
  input:{
    backgroundColor:'#a9acb1',
    textAlign: 'center',
    width:'90%',
    marginBottom: 15,
    color:'#222',
    fontSize: 17,
    borderRadius:7,
    padding:10
  },
});