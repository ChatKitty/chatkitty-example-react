import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageGroup,
  MessageInput,
  MessageList,
  TypingIndicator,
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

  const [typing, setTyping] = useState(null);

  useEffect(() => {
    const startChatSessionResult = kitty.startChatSession({
      channel,
      onReceivedMessage: (message) => {
        updateMessages((draft) => [...draft, message]);
      },
      onTypingStarted: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
        }
      },
      onTypingStopped: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },
    });

    kitty
      .getMessages({
        channel,
      })
      .then((result) => {
        updateMessages(() => result.paginator.items.slice().reverse());
      });

    return startChatSessionResult.session.end;
  }, [channel]);

  useEffect(() => {
    const unsubscribe = kitty.onUserPresenceChanged((changed) => {
      if (changed.id === contact.id) {
        setContact(changed);
      }
    });

    setContact(channel.members.find((member) => member.id !== user.id));

    return unsubscribe;
  }, [channel]);

  const handleMessageChanged = async (message) => {
    await kitty.sendKeystrokes({
      channel,
      keys: message,
    });
  };

  const handleSend = async (message) => {
    await kitty.sendMessage({
      channel,
      body: message,
    });
  };

  const renderTypingIndicator = (() => {
    if (typing) {
      return <TypingIndicator content={`${typing.displayName} is typing`} />;
    }

    return null;
  })();

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

      <MessageList
        typingIndicator={renderTypingIndicator}
        scrollBehavior="auto"
        className="chat-message-list"
      >
        {messages
          .map((m) => ({
            key: m.id,
            message: m.body,
            sender: m.user.displayName,
            senderUsername: m.user.name,
            sentTime: m.createdTime,
          }))
          .map((m) => (
            <MessageGroup
              key={m.key}
              sender={m.sender}
              sentTime={m.sentTime}
              direction={
                m.senderUsername === user.name ? 'outgoing' : 'incoming'
              }
            >
              <MessageGroup.Messages>
                <Message key={m.key} model={m} />
              </MessageGroup.Messages>
            </MessageGroup>
          ))}
      </MessageList>

      <MessageInput
        placeholder="Type message here"
        fancyScroll
        className="chat-message-input"
        attachButton={false}
        onChange={handleMessageChanged}
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
