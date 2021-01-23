import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
} from '@chatscope/chat-ui-kit-react';
import React, { useContext, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import kitty from '../chatkitty';
import { AuthContext } from '../navigation/AuthProvider';
import { channelType } from '../types';

export const ChatScreen = ({ channel }) => {
  const { user } = useContext(AuthContext);

  const [contact, setContact] = useState(
    channel.members.find((member) => member.id !== user.id)
  );

  const [messages, updateMessages] = useImmer([]);

  useEffect(() => {
    const startChatSessionResult = kitty.startChatSession({
      channel,
      onReceivedMessage: (message) => {
        updateMessages((draft) => [...draft, message]);
      },
    });

    const onContactPresenceChangedUnsubscribe = kitty.onContactPresenceChanged(
      (changed) => {
        if (changed.id === contact.id) {
          setContact(changed);
        }
      }
    );

    setContact(channel.members.find((member) => member.id !== user.id));

    kitty
      .getMessages({
        channel,
      })
      .then((result) => {
        updateMessages(() => result.paginator.items.slice().reverse());
      });

    return () => {
      onContactPresenceChangedUnsubscribe();
      startChatSessionResult.session.end();
    };
  }, [channel]);

  const handleSend = async (message) => {
    await kitty.sendMessage({
      channel,
      body: message,
    });
  };

  return (
    <ChatContainer>
      <ConversationHeader className="chat-conversation-header">
        <Avatar
          src={contact.displayPictureUrl}
          name={contact.displayName}
          status={contact.presence.status.toLowerCase()}
        />
        <ConversationHeader.Content
          userName={contact.displayName}
          info={contact.presence.status}
        />
      </ConversationHeader>

      <MessageList scrollBehavior="auto" className="chat-message-list">
        {messages
          .map((m) => ({
            message: m.body,
            sender: m.user.displayName,
            sentTime: m.createdTime,
          }))
          .map((m) => (
            <Message key={m.id} model={m} />
          ))}
      </MessageList>

      <MessageInput
        placeholder="Type message here"
        fancyScroll
        className="chat-message-input"
        attachButton={false}
        onSend={handleSend}
      />
    </ChatContainer>
  );
};

ChatScreen.propTypes = {
  channel: channelType,
};

ChatScreen.defaultProps = {
  channel: null,
};

ChatScreen.displayName = 'Chat';

export default ChatScreen;
