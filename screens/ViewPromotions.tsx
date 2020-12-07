import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default function ViewPromotions({ navigation }){
  const productDetailsHandler = () => {
    navigation.navigate('ProductDetails');
  }

  return(
    <ScrollView style={styles.container}>
      <List.Item
      onPress={productDetailsHandler}
      style={styles.item}
      title="First Item"
      description="Valor: R$ XX,XX"
      left={props => <List.Icon {...props} icon="alert-decagram" />}
      />

      <List.Item
      style={styles.item}
      title="Second Item"
      description="Valor: R$ XX,XX"
      left={props => <List.Icon {...props} icon="alert-decagram" />}
      />

      <List.Item
      style={styles.item}
      title="Third Item"
      description="Valor: R$ XX,XX"
      left={props => <List.Icon {...props} icon="alert-decagram" />}
      />

      <List.Item
      style={styles.item}
      title="Fourth Item"
      description="Valor: R$ XX,XX"
      left={props => <List.Icon {...props} icon="alert-decagram" />}
      />

      <List.Item
      style={styles.item}
      title="Fifth Item"
      description="Valor: R$ XX,XX"
      left={props => <List.Icon {...props} icon="alert-decagram" />}
      />

      <List.Item
      style={styles.item}
      title="Sixth Item"
      description="Valor: R$ XX,XX"
      left={props => <List.Icon {...props} icon="alert-decagram" />}
      />

      <List.Item
      style={styles.item}
      title="Seventh Item"
      description="Valor: R$ XX,XX"
      left={props => <List.Icon {...props} icon="alert-decagram" />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  item:{
    borderBottomColor: '#191919',
    borderBottomWidth: 1,
  }
});