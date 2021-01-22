import {
  Avatar,
  Button,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import { userType } from '../types';

export const ConversationsHeader = ({ user, onLogoutClick }) => {
  return (
    <ConversationHeader className="chat-conversation-header">
      <Avatar
        src={user.displayPictureUrl}
        name={user.displayName}
        status={user.presence.status.toLowerCase()}
      />
      <ConversationHeader.Content
        userName={user.name}
        info={user.presence.status}
      />
      <ConversationHeader.Actions>
        <Button
          type="button"
          icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          onClick={onLogoutClick}
          className="chat-conversation-header__logout-btn"
          title="Logout"
        />
      </ConversationHeader.Actions>
    </ConversationHeader>
  );
};

ConversationsHeader.propTypes = {
  user: userType,
  onLogoutClick: PropTypes.func,
};

ConversationsHeader.defaultProps = {
  user: null,
  onLogoutClick: () => {},
};

export default ConversationsHeader;
