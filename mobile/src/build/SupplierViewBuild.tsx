import * as React from 'react';
import { View, Text, TouchableOpacity, 
TouchableWithoutFeedback, Image, FlatList,
 StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, Fontisto } from '@expo/vector-icons';

interface Props {
  route: any,
  navigation: any
}

function PromotionsHeader(){
  const navigation = useNavigation();

  return (
    <View style={styles.header}>

      <View style={styles.backBtnContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => {}}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Promoções</Text>
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image 
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={styles.headerImage}
          />
          </View>
        <View style={styles.btnFirstRow}>

          <TouchableOpacity style={styles.btnSupplierContact}>
            <Fontisto name="email" size={40} color="#199" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact}>
            <Ionicons name="logo-whatsapp" size={40} color="#80f502" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSupplierContact}>
            <Feather name="phone-call" size={45} color="#119999" />
          </TouchableOpacity>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Nome</Text>
        </View>
      </View>
    </View>
  );
}

export default class App extends React.Component<Props> {
  state = {
    data:[],
    loading: false,
  };

  renderItem = ({item}:{item:any}) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.listItem}>

        {/* IMAGE */}
          
        <Image 
          source={require('../../../assets/adaptive-icon.png')} 
          key={item.id.toString()} 
          style={styles.image}
        />
          

        {/* CONTENT */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
        </View>

        {/* SIDE BUTTONS */}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnPromotionContact}>
            <Text>Saber Mais</Text>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  )

  render() {
    return (
      <View style={styles.container}>
        <PromotionsHeader />
        <FlatList 
          style={{flex: 1}}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /*HEADER*/
  header: {
    backgroundColor: '#191919',
    height: 340,
    marginBottom: 20
  },
  headerContainer: {
    position: 'relative',
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    height: 270,
    width: '85%',
    padding: 35,
    margin: 30,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerImageContainer: {
    alignItems: 'center',
  },
  headerImage: {
    alignItems: 'center',
    backgroundColor: '#191919',
    height: 80,
    width: 90,
    borderRadius: 20,
    marginBottom: 20
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center'
  },
  btnFirstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 40,
    paddingBottom: 5,
    paddingLeft: 40,
    marginBottom: 10
  },
  nameContainer: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 28,
    marginTop: 10
  },
  backBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backBtn:{
    marginTop:20,
    marginLeft:23,
    padding:10
  },
  btnSupplierContact:{
    height: 30,
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  /* BODY */
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
  btnPromotionContact:{
    height: 30,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  /* FOOTER */
  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});