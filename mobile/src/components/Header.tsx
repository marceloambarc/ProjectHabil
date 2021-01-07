import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header(){
  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <Text>Header</Text>
      <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Root')}>
        <Text style={styles.textBtn}>Empresas</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#191919',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  }
});