import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class SearchBarComponent extends React.Component {
  state = {
    search: '',
  };

  updateSearch = ({search}:{search:any}) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Digite sua pesquisa..."
        onChangeText={this.updateSearch}
        value={search}
        lightTheme={true}
      />
    );
  }
}