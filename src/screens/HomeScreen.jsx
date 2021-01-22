import {
  Avatar,
  Conversation,
  ConversationList,
  MainContainer,
  Sidebar,
} from '@chatscope/chat-ui-kit-react';
import React, { useContext, useEffect, useState } from 'react';

import kitty from '../chatkitty';
import ConversationsHeader from '../components/ConversationsHeader';
import Welcome from '../components/Welcome';
import { AuthContext } from '../navigation/AuthProvider';

export const HomeScreen = () => {
  const { user } = useContext(AuthContext);

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const onContactPresenceChangedUnsubscribe = kitty.onContactPresenceChanged(
      () => {
        kitty.getContacts().then((result) => {
          setContacts(result.paginator.items);
        });
      }
    );

    return () => {
      isCancelled = true;

      onContactPresenceChangedUnsubscribe();
    };
  }, [loading]);

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <MainContainer className="chat-main-container" responsive>
        <Sidebar position="left" scrollable={false}>
          <ConversationsHeader user={user} />
          {contacts.length > 0 && (
            <ConversationList>
              {contacts.map((contact) => (
                <Conversation key={contact.id}>
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
        <Welcome />
      </MainContainer>
    </div>
  );
};

HomeScreen.displayName = 'Home';

export default HomeScreen;
