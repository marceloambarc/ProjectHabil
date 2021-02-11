import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, 
StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  navigation: any,
  text: string
}

const image = { uri: "https://reactjs.org/logo-og.png" };

function WelcomeHeader(){
  const navigation = useNavigation();
  return (
    <View style={styles.headerBackground}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>CompreMaisAki</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Supplier')}>
          <Feather style={styles.icon} name="menu" size={28} color="#191919" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default class App extends Component<Props> {
  state = {
  data: [
      { id: 0, full_name: 'Repo 1' },
      { id: 1, full_name: 'Repo 2' },
      { id: 2, full_name: 'Repo 3' },
      { id: 3, full_name: 'Repo 4' },
      { id: 4, full_name: 'Repo 5' },
    ],
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder = "Procure..."
        lightTheme={true}
      />
    );
  }

  renderItem = ({ item }: { item:any }) => (
    <TouchableWithoutFeedback onPress={() => {}}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.titleText}>{item.full_name}</Text>
        </ImageBackground>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View>
        <WelcomeHeader />
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Header */
  headerBackground: {
    backgroundColor: '#FFF'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    paddingBottom: 5
  },

  /*BODY*/
  fullContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  list: {
    paddingHorizontal: 2,
  },
  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
    height: 200,
  },
  titleText: {
    paddingHorizontal: 20,
    fontSize: 40,
    color: 'aliceblue'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginTop: 20,
    padding: 30,
    height: 200,
  },
});