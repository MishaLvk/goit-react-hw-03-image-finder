import PropTypes from 'prop-types';

import { ButtonStyle } from './Button.styled';

const LoadMoreButton = ({ onClick }) => (
  <ButtonStyle type="button" onClick={onClick}>
    Load more
  </ButtonStyle>
);

export default LoadMoreButton;

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
