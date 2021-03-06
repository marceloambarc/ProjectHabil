import React from 'react';
import { StyleSheet, Text, View, FlatList, 
Image, TouchableOpacity, TouchableWithoutFeedback, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import { API_URL } from '../../../url.json';


interface Props{
  navigation: any,
  companyName: string,
  companyId: number,
  image: string,
  id: number,
  route: any,
  userToken: string,
  max_prom: number,
}

const baseURL = `${API_URL}/companies/products/company_id/all`;

function ProductsHeader(){
  const navigation = useNavigation();

  return(
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Feather style={styles.backBtn} name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Promoções</Text>
      </View>
    </View>
  );
}

export default class App extends React.Component<Props> {
  state = {
    data:[],
    loading: false,
    renderProm: ''
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    if (this.state.loading) return;

    const { route } = this.props;
    const params = route.params as Props
    const id = params.companyId;
    const max_prom = params.max_prom;

    this.setState({ loading: true, renderProm: max_prom });

    const response = await fetch(`${baseURL}/${id}`);
    if(response.ok){
      const repositories = await response.json();

      this.setState({
        data: [...this.state.data, ...repositories],
        loading: false,
      });
    }else{
      this.setState({
        loading: false,
      });
      return;
    }
  }

  handleView = async({item}:{item:any}) => {
    this.props.navigation.navigate('SupplierPromotionOverview',{
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      discount: item.discount,
      company_id: item.company_id,
      images: item.images,
    });
  }

  handleDelete = async({item}:{item:any}) => {
    const { route } = this.props;
    const params = route.params as Props
    const userToken = params.userToken;
    try{
      Alert.alert(
        "Deletar",
        `Quer mesmo deletar ${item.name}?`,
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          { text: "OK", 
          onPress: async() => await api.delete(`products/${item.id}`,{
            headers: {
              'Authorization': 'Bearer '+userToken
            }
          }).then(this.props.navigation.navigate('Home'))
        }
        ],
        { cancelable: false },
      );
      
    }catch(err){
      Alert.alert(
        'Ops!',
        'Tivemos um erro, entre em contato com o suporte.',
      );
    }
  }

  handleEdit = async({item}:{item:any}) => {
    const { route } = this.props;
    const params = route.params as Props
    const userToken = params.userToken;
    this.props.navigation.navigate('EditPromotion',{
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      discount: item.discount,
      company_id: item.company_id,
      image: item.image,
      userToken: userToken,
    });
  }

  items = ({item}:{item:any}) => {
    if(item.is_active === 0){
      return (
        <View style={styles.listItemInactive}>
        {/* IMAGE */}
        <Image source={{uri: `data:image/jpeg;base64,${item.image}`}} style={styles.image} />
  
        {/* CONTENT */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
          <Text style={styles.contentTextPrice}>R$: {item.price}</Text>
            <Text>{item.position}</Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnModify} onPress={() => {}}>
            <Text style={{color:"#fff"}}>Inativo</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
    }else{
      return(
        <TouchableWithoutFeedback onPress={() => this.handleView({item})}>
          <View style={styles.listItem}>
          {/* IMAGE */}
          <Image source={{uri: `data:image/jpeg;base64,${item.image}`}} style={styles.image} />
    
          {/* CONTENT */}
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{item.name}</Text>
            <Text style={styles.contentTextPrice}>R$: {item.price}</Text>
              <Text>{item.position}</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnModify} onPress={() => this.handleDelete({item})}>
              <Text style={{color:"red"}}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnModify} onPress={() => this.handleEdit({item})}>
              <Text style={{color:"gold"}}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      );
    }
  }

  renderItem = ({item}:{item: any}) => (
    <>
      {this.items({item})}
    </>
  )

  renderEmpty = () => {
    if(this.state.loading){
      return (
        <View style={styles.loading}>
          <Text style={{textAlign: 'center'}}>
            <ActivityIndicator color="#fa690a" size="large" />
          </Text>
        </View>
      )
    }else{
      return  (
        <View style={styles.loading}>
          <Text style={{textAlign: 'center'}}>
            Nenhum Produto Cadastrado...
          </Text>
        </View>
      )
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

  render(){
    return (
      <View style={styles.container}>
        <ProductsHeader />
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={this.renderItem}
          extraData={this.state}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.footerContainerText}>Máximo de Promoções</Text>
          <Text style={styles.footerContainerText}>{this.state.data.length}/{this.state.renderProm}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:'#FFF',
    width:'80%',
    flex:1,
    alignSelf:'center',
    flexDirection:'row',
    borderRadius:5
  },
  listItemInactive:{
    margin:10,
    padding:10,
    backgroundColor:'silver',
    width:'80%',
    flex:1,
    alignSelf:'center',
    flexDirection:'row',
    borderRadius:5
  },
  image:{
    width:60,
    height:60,
    borderRadius:30
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
  contentTextPrice:{
    color: 'red',
    fontWeight:'bold',
    marginLeft: 7,
  },
  btnContainer:{
    alignItems: 'center',
    flex:1
  },
  btnModify:{
    height:30,
    width:50,
    justifyContent:'center',
    alignItems:'center'
  },

  /*HEADER*/
  header: {
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
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    marginRight: '25%'
  },
  backBtn:{
    marginLeft: 10,
    paddingBottom: 5
  },
  description: {
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },

  /*FOOTER*/
  footerContainer: {
    alignItems: 'center',
    paddingBottom: Dimensions.get('window').height * 0.015
  },
  footerContainerText: {
    fontSize: Dimensions.get('window').height * 0.017,
    fontWeight: 'bold'
  }
});