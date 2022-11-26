import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import LoadMoreButton from './Button/Button';
import { Wrapper } from './App.styled';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    request: '',
    arrayObjects: [],
    selectedImage: null,
    page: 1,
    active: false,
    modal: false,
  };

  handleFormSubmit = request => {
    if (this.state.request !== request) {
      this.setState({
        request: request,
        page: 1,
        arrayObjects: [],
        active: false,
      });
    } else {
      Notify.info('ви переглядаєте ' + request);
    }
  };

  hendleReceivedArray = arrayObjects => {
    this.setState({
      arrayObjects: this.state.arrayObjects.concat(arrayObjects),
    });
  };

  selectedImage = imageUrl => {
    this.setState({
      selectedImage: imageUrl,
      modal: true,
    });
  };

  activeButton = status => {
    this.setState({ active: status });
  };

  toggleModal = () => {
    this.setState({
      modal: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { request, page, arrayObjects, active, modal, selectedImage } =
      this.state;
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          searchQuery={request}
          page={page}
          hendleReceivedArray={this.hendleReceivedArray}
          loadMore={this.activeButton}
        >
          <ImageGalleryItem
            arrayObjects={arrayObjects}
            onClick={this.selectedImage}
          />
        </ImageGallery>

        {active && <LoadMoreButton onClick={this.loadMore} />}

        {modal && (
          <Modal selectedImage={selectedImage} closeModal={this.toggleModal} />
        )}
      </Wrapper>
    );
  }
}
