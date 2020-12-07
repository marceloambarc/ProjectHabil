import * as React from 'react';

import { Text, View, StyleSheet } from 'react-native';

export default function Term(){
  return(
    <View style={styles.background}>
      <Text style={styles.title}>
        Termos de Uso
      </Text>
      <View style={styles.container}>
        <Text style={styles.text}>
          XXXXXXXXXXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXXXXXXXXXX
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#191919'
  },
  title:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    alignItems:'center',
    justifyContent: 'center'
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    width: '90%',
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems:'center',
    justifyContent: 'center'
  }
});