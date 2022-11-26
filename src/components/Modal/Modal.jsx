import * as basicLightbox from 'basiclightbox';
import React, { Component } from 'react';
import { Overlay, Mod } from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { selectedImage } = this.props;
    return (
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <Mod className="modal">
          <img src={selectedImage} alt="" />
        </Mod>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
