import {
  Avatar,
  Conversation,
  ConversationList,
  MainContainer,
  Sidebar,
} from '@chatscope/chat-ui-kit-react';
import React, { useEffect, useState } from 'react';

import kitty from '../chatkitty';
import ConversationsHeader from '../components/ConversationsHeader';
import Welcome from '../components/Welcome';

import ChatScreen from './ChatScreen';

export const HomeScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleConversationChanges = (contact) => {
    kitty
      .createChannel({
        type: 'DIRECT',
        members: [{ id: contact.id }],
      })
      .then((result) => {
        setChannel(result.channel);
      });
  };

  useEffect(() => {
    let isCancelled = false;

    kitty.getContacts().then((result) => {
      if (!isCancelled) {
        setContacts(result.paginator.items);

        if (loading) {
          setLoading(false);
        }
      }
    });

    const unsubscribe = kitty.onContactPresenceChanged(() => {
      kitty.getContacts().then((result) => {
        setContacts(result.paginator.items);
      });
    });

    return () => {
      isCancelled = true;

      unsubscribe();
    };
  }, [loading]);

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <MainContainer className="chat-main-container" responsive>
        <Sidebar position="left" scrollable={false}>
          <ConversationsHeader />
          {contacts.length > 0 && (
            <ConversationList>
              {contacts.map((contact) => (
                <Conversation
                  key={contact.id}
                  active={
                    channel &&
                    channel.members.some((member) => member.id === contact.id)
                  }
                  unreadCnt={0}
                  onClick={() => handleConversationChanges(contact)}
                >
                  <Avatar
                    src={contact.displayPictureUrl}
                    status={contact.presence.status.toLowerCase()}
                  />
                  <Conversation.Content name={contact.displayName} />
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
