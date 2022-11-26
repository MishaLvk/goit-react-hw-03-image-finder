import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as IconSearch } from '../../icons/search.svg';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class Searchbar extends Component {
  state = {
    request: '',
  };

  handleRequestChange = event => {
    this.setState({ request: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { request } = this.state;
    event.preventDefault();
    if (request.trim() === '') {
      Notify.info('введіть пошуковий запит');
      return;
    }
    this.props.onSubmit(request);
    this.setState({
      request: '',
    });
  };

  render() {
    const { request } = this.state;
    return (
      <SearchBar className="searchbar">
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            <IconSearch />
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={this.handleRequestChange}
            value={request}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
