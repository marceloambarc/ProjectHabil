import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from "expo-constants";
import api from '../../services/api';

interface CompanyDataRouteParams {
  name: string,
  id: number,
  image: string,
  userToken: string,
}

export default function HomeScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as CompanyDataRouteParams;

  const companyName = params.name;
  const companyId = params.id;
  const companyImage = params.image;
  const userToken = params.userToken;

  async function handleCancelSecondStep(){
    api.put(`companies/${companyId}`,{
      is_active: 0
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      alert('Sua conta foi inativada com sucesso!');
      navigation.navigate('Home');
    }).catch(err => {
      alert(err);
      console.log(err);
    })
  }

  async function handleCancelAccount() {
    Alert.alert(
      "Deseja Inativar sua conta?",
      "Voce deseja realmente inativar sua conta CompreMaisAki?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleCancelSecondStep()
        }
      ]
    );
  }

  return(
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo {companyName}</Text>

        <View style={styles.companyImageContainer}>

            
              <Image
                style={styles.companyImage}
                source={{uri: `data:image/jpeg;base64,${companyImage}`}}
              />
          
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('SupplierPromotion',{
          companyId,
          userToken
        })}>
          <Text style={styles.submitText}>Visualizar minhas promoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnNew} onPress={() => navigation.navigate('NewPromotion', {
          companyId,
          userToken
        })}>
          <Text style={styles.submitText}>Cadastrar promoção</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.outText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancelAccount} onPress={handleCancelAccount}>
          <Text style={styles.cancelText}>Desativar Conta</Text>
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
    marginBottom: 40
  },
  outText:{
    color: '#191919'
  },

  btnCancelAccount:{
    backgroundColor: '#fa690a',
    color: 'white',
    width: '40%',
    height: 45,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 70
  },
  cancelText: {
    color: 'white'
  },
});