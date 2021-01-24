import React, { useEffect, useState } from 'react';

import kitty from '../chatkitty';

export const Welcome = () => {
  const [onlineContactsCount, setOnlineContactsCount] = useState(0);

  useEffect(() => {
    kitty.getContactsCount({ filter: { online: true } }).then((result) => {
      setOnlineContactsCount(result.count);
    });

    return kitty.onContactPresenceChanged(() => {
      kitty.getContactsCount({ filter: { online: true } }).then((result) => {
        setOnlineContactsCount(result.count);
      });
    });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
      {onlineContactsCount > 0 && (
        <div className="text-center">Select a user to start a conversation</div>
      )}
      {onlineContactsCount === 0 && (
        <div className="text-center">
          Wait for other users to connect
          <br /> or
          <br /> login as different user in next browser tab
        </div>
      )}
    </div>
  );
};

export default Welcome;
