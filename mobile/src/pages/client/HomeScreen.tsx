import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from "expo-constants";

interface CompanyDataRouteParams {
  name: string,
  token: string,
  id: number,
  images: Array <{
    id: number;
    path: string;
  }>;
}

export default function HomeScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as CompanyDataRouteParams;

  const companyName = params.name;
  const companyToken = params.token;
  const companyId = params.id;
  const companyImages = params.images;

  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo {companyName}</Text>

        <View style={styles.companyImageContainer}>
          {companyImages.map(image => { 
            return(
              <Image
                key={image.id}
                style={styles.companyImage}
                source={{ uri: `http://192.168.15.58:8080/uploads/${image.path}` }}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('CompanyProducts',{
          companyId
        })}>
          <Text style={styles.submitText}>Visualizar minhas promoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnNew} onPress={() => navigation.navigate('NewPromotion', {
          companyId
        })}>
          <Text style={styles.submitText}>Cadastrar promoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.outText}>Sair</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#191919',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height: Constants.statusBarHeight + 40
  },
  companyImageContainer:{
    flex:1,
    justifyContent:'center',
  },
  companyImage: {
    width: 160,
    height: 160,
    borderRadius: 20,
    marginBottom: 32,
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    paddingTop: 20
  },
  title:{
    fontSize: 20,
    color: '#FFF',
    marginTop: 20
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnNew:{
    backgroundColor: '#52D984',
    width: '90%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 70
  },
  btnLogout:{
    backgroundColor: '#f1f1f1',
    width: '70%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 70
  },
  outText:{
    color: '#191919'
  }
});