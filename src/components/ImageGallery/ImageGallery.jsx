import PropTypes from 'prop-types';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ImageGallery extends Component {
  state = {
    queryResult: [],
    isLoadingImage: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.props;

    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.selectImage(searchQuery);
    }
  }

  selectImage = async select => {
    const { page, loadMore, hendleReceivedArray } = this.props;
    try {
      this.setState({ isLoadingImage: true });
      const response = await axios.get('/', {
        params: {
          q: select,
          page: page,
          key: '30074653-21ce3b3057d55da5e0a16da3c',
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: '12',
        },
      });

      if (response.data.hits.length === 0) {
        Notify.info('забражень не знайдено');
        loadMore(false);
        return;
      }
      this.setState({ queryResult: response.data.hits });
      hendleReceivedArray(response.data.hits);
      loadMore(true);
    } catch (eror) {
      Notify.info('забражень немає');
      loadMore(false);
    } finally {
      this.setState({ isLoadingImage: false });
    }

    //
  };

  render() {
    const { isLoadingImage } = this.state;
    const { children } = this.props;
    return (
      <Gallery className="gallery">
        {this.state.queryResult.length > 0 && children}

        <Loader isLoadingImage={isLoadingImage} />
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  hendleReceivedArray: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};
