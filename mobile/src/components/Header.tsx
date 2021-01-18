import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "expo-constants";

export default function Header(){
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Hábil App 0.0.4</Text>
      <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Company')}>
        <Text style={styles.textBtn}>Empresas</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Constants.statusBarHeight + 40
  },
  btnLogin: {
    backgroundColor: '#35AAFF',
    width: '31%',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  textBtn: {
    color: '#FFF',
    fontSize: 16
  },
  title:{
    marginLeft:50,
    color: '#FFF'
  }
});