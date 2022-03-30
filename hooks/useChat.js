import React from 'react';

import { io } from 'socket.io-client';

function useChat(userId) {
  const [dialogs, setDialogs] = React.useState([]);

  const { current: socket } = React.useRef(
    io('http://192.168.0.17:8000', {
      query: {
        userId: userId,
      },
    })
  );

  React.useEffect(() => {
    socket.on('user dialogs', (id) => {
      console.log('user dialogs', id);
    });
    socket.on('connection', () => {
      socket.emit('dialogs');
    });

    return () => socket.close();
  }, []);

  return { dialogs };
}

export default useChat;
