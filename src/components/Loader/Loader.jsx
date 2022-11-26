import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = ({ isLoadingImage }) => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={isLoadingImage}
    />
  );
};

Loader.propTypes = {
  isLoadingImage: PropTypes.bool.isRequired,
};
