import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const userType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  displayName: PropTypes.string,
  displayPictureUrl: PropTypes.string,
  presence: PropTypes.shape({
    status: PropTypes.string,
    online: PropTypes.bool,
  }),
});
