import {
  Avatar,
  Conversation,
  ConversationList,
  MainContainer,
  Sidebar,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import React, { useEffect, useState } from 'react';

import kitty from '../chatkitty';
import ConversationsHeader from '../components/ConversationsHeader';
import Welcome from '../components/Welcome';

import ChatScreen from './ChatScreen';

export const HomeScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);
  const [channel, setChannel] = useState(null);
  const [typing, setTyping] = useState(null);

  const handleConversationChanges = (aContact) => {
    setContact(aContact);

    kitty
      .createChannel({
        type: 'DIRECT',
        members: [{ id: aContact.id }],
      })
      .then((result) => {
        setChannel(result.channel);
      });
  };

  useEffect(() => {
    kitty.getContacts().then((result) => {
      setContacts(result.paginator.items);
    });

    return kitty.onContactPresenceChanged(() => {
      kitty.getContacts().then((result) => {
        setContacts(result.paginator.items);
      });
    });
  }, []);

  useEffect(() => {
    return kitty.onParticipantStartedTyping((participant) => {
      if (!(contact && contact.name === participant.name)) {
        setTyping(participant);
      }
    });
  }, []);

  useEffect(() => {
    return kitty.onParticipantStoppedTyping((participant) => {
      if (!(contact && contact.name === participant.name)) {
        setTyping(null);
      }
    });
  }, []);

  const renderTypingIndicator = (aContact) => {
    if (typing && typing.name === aContact.name) {
      return (
        <TypingIndicator className="chat-conversation__typing-indicator" />
      );
    }

    return null;
  };

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <MainContainer className="chat-main-container" responsive>
        <Sidebar position="left" scrollable={false}>
          <ConversationsHeader />
          {contacts.length > 0 && (
            <ConversationList>
              {contacts.map((aContact) => (
                <Conversation
                  key={aContact.id}
                  active={
                    channel &&
                    channel.members.some((member) => member.id === aContact.id)
                  }
                  unreadCnt={0}
                  onClick={() => handleConversationChanges(aContact)}
                >
                  <Avatar
                    src={aContact.displayPictureUrl}
                    status={aContact.presence.status.toLowerCase()}
                  />
                  <Conversation.Content
                    name={aContact.displayName}
                    info={renderTypingIndicator(aContact)}
                  />
                </Conversation>
              ))}
            </ConversationList>
          )}
        </Sidebar>
        {channel && <ChatScreen channel={channel} />}
        {channel === null && <Welcome />}
      </MainContainer>
    </div>
  );
};

HomeScreen.displayName = 'Home';

export default HomeScreen;
