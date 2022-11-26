import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  imageUrl = url => {
    this.props.onClick(url);
  };

  render() {
    const { arrayObjects } = this.props;
    return arrayObjects.map(el => (
      <ImageItem className="gallery-item" key={el.id}>
        <Image
          src={el.webformatURL}
          alt=""
          onClick={() => this.imageUrl(el.largeImageURL)}
        />
      </ImageItem>
    ));
  }
}

ImageGalleryItem.propTypes = {
  arrayObjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
