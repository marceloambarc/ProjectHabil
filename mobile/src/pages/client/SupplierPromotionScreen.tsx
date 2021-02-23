import React from 'react';
import { StyleSheet, Text, View, FlatList, 
Image, TouchableOpacity, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';

interface Props{
  navigation: any,
  companyName: string,
  companyId: number,
  id: number,
  route: any
}

const baseURL = 'http://192.168.15.58:8080/companies/products/company_id/';

function ProductsHeader(){
  const navigation = useNavigation();

  return(
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <Feather name="arrow-left" size={28} color="#e82041" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Meus Produtos</Text>
    </View>
  );
}

export default class App extends React.Component<Props> {
  state = {
    data:[],
    loading: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    if (this.state.loading) return;

    this.setState({ loading: true });

    const { route } = this.props;
    const params = route.params as Props
    const id = params.companyId;

    const response = await fetch(`${baseURL}/${id}`);
    const repositories = await response.json();
    this.setState({ 
      data: repositories,
      loading: false,
    });
  }

  handleView = async({item}:{item:any}) => {
    this.props.navigation.navigate('SupplierPromotionOverview',{
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      company_id: item.company_id,
      images: item.images,
    });
  }

  handleDelete = async({item}:{item:any}) => {
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
          onPress: () => api.delete(`products/${item.id}`).then(this.props.navigation.navigate('Home'))
        }
        ],
        { cancelable: false },
      );
      
    }catch(err){
      alert(err);
    }
  }

  handleEdit = async({item}:{item:any}) => {
    this.props.navigation.navigate('EditPromotion',{
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      company_id: item.company_id,
      images: item.images,
    });
  }

  renderItem = ({item}:{item: any}) =>(
      <TouchableWithoutFeedback onPress={() => this.handleView({item})}>
        <View style={styles.listItem}>
          
            {/* IMAGE */}
            {item.images.map((image:any) => {
              return(
                <Image source={{uri: image.url}} key={item.id.toString()} style={styles.image} />
              );
            })}
    
            {/* CONTENT */}
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>{item.name}</Text>
              <Text style={styles.contentTextPrice}>R$: {item.price}</Text>
              <Text>{item.position}</Text>
            </View>
          
          {/* SIDE BUTTONS */}
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
    
  )
  
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
          keyExtractor={item => item.id.toString()}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '67%'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center'
  },
  backBtn:{
    marginTop:20,
    marginLeft:23,
    flex:1,
    padding:10
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
});