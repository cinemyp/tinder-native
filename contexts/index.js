import socketClient from 'socket.io-client';
import React from 'react';
import { SERVER_URL } from '../constants';

export const socket = socketClient(SERVER_URL);
const SocketContext = React.createContext(socket);

export default SocketContext;
