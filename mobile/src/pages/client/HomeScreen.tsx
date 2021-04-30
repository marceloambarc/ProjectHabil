import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from "expo-constants";
import api from '../../services/api';

interface CompanyDataRouteParams {
  name: string,
  id: number,
  image: string,
  cnpj: string,
  userToken: string,
}

export default function HomeScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as CompanyDataRouteParams;

  const companyName = params.name;
  const companyId = params.id;
  const companyImage = params.image;
  const companyCnpj = params.cnpj;
  const userToken = params.userToken;

  async function handleEditCompanyNavigation(){
    api.post('companies/cnpj',{
      cnpj: companyCnpj
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      navigation.navigate('EditCompany',{
        id: companyId,
        name: res.data.name,
        image: res.data.image,
        cnpj: companyCnpj,
        business: res.data.business,
        phone: res.data.phone,
        email: res.data.email,
        address: res.data.address,
        district: res.data.district,
        city: res.data.city,
        uf: res.data.uf,
        keywords: res.data.keywords,
        userToken: userToken
      })
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Tivemos um erro, entre em contato com o Suporte.'
      );
    });
  }

  async function handleCancelSecondStep(){
    api.put(`companies/${companyId}`,{
      is_active: 2
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      Alert.alert(
        'Obrigado',
        'Sua conta foi cancelada com sucesso! Esperamos que breve volte para o CompreMaisAki.'
      );
      navigation.navigate('Home');
    }).catch(err => {
      Alert.alert(
        'Ops!',
        'Tivemos um erro, entre em contato com o Suporte'
      );
      navigation.navigate('Home');
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

  async function handleChangePassword(){
    navigation.navigate('ChangePassword',{
      userToken,
      companyCnpj,
      companyId
    });
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

        <TouchableOpacity style={styles.btnSubmitEdit} onPress={handleEditCompanyNavigation}>
          <Text style={styles.submitText}>Editar Empresa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnChange} onPress={handleChangePassword}>
          <Text style={styles.submitText}>Mudar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.outText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancelAccount} onPress={handleCancelAccount}>
          <Text style={styles.cancelText}>Cancelar Conta</Text>
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
    height: Constants.statusBarHeight + 20
  },
  companyImageContainer:{
    flex:1,
    justifyContent:'center',
  },
  companyImage: {
    width: Dimensions.get('window').width * .47,
    height: Dimensions.get('window').height * .20,
    borderRadius: 20,
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    paddingTop: Dimensions.get('window').height * 0.01
  },
  title:{
    fontSize: Dimensions.get('window').height * 0.025,
    color: '#FFF',
    marginTop: Dimensions.get('window').height * 0.023
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20
  },
  btnSubmitEdit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.025,
  },
  btnChange: {
    backgroundColor: '#fa690a',
    width: '90%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.027,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnNew:{
    backgroundColor: '#52D984',
    width: '90%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.045
  },
  btnLogout:{
    backgroundColor: '#f1f1f1',
    width: '70%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: Dimensions.get('window').height * 0.022
  },
  outText:{
    color: '#191919'
  },

  btnCancelAccount:{
    backgroundColor: '#fa690a',
    color: 'white',
    width: '40%',
    height: Dimensions.get('window').height * 0.062,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20
  },
  cancelText: {
    color: 'white'
  },
});