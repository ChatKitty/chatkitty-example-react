import {
  Avatar,
  Button,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';

import kitty from '../chatkitty';
import { AuthContext } from '../navigation/AuthProvider';

export const ConversationsHeader = () => {
  const { user } = useContext(AuthContext);

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
          onClick={() => kitty.endSession()}
          className="chat-conversation-header__logout-btn"
          title="Logout"
        />
      </ConversationHeader.Actions>
    </ConversationHeader>
  );
};

export default ConversationsHeader;
