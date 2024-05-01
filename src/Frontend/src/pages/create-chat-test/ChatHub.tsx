// ChatComponent.tsx

import React, { useEffect } from "react";import { useAuthStore, useSignalRStore } from "../../entities";
;

const ChatHub: React.FC = () => {
    const { establishConnection, closeConnection} = useSignalRStore();
    const {isLoggedIn, id} = useAuthStore();

    useEffect(() => {
        if (isLoggedIn && id !== null && isLoggedIn === true) {
          establishConnection(id);
        } else if (isLoggedIn) {
          closeConnection();
        }
      }, [isLoggedIn, id]);

  return (
    <div>
      {/* Your chat UI */}
    </div>
  );
};

export default ChatHub;
