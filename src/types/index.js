import PropTypes from 'prop-types';

export const channelType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

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
