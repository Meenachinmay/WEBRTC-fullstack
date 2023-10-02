import { createContext, useCallback, useState } from "react";
import socketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";

const WS = "http://localhost:8080";

interface MeetingRoomContextProps {
  children: React.ReactNode;
}

interface MeetingRoomContextType {
  ws: Socket | null;
  initializeSocket: () => void;
  closeSocket: () => void;
}

export const MeetingRoomContext = createContext<MeetingRoomContextType | null>(
  null
);

export const MeetingRoomProvider: React.FC<MeetingRoomContextProps> = ({
  children,
}) => {
  const [ws, setWs] = useState<Socket | null>(null);

  const initializeSocket = useCallback(() => {
    const socket = socketIOClient(WS);
    setWs(socket);
  }, []);

  const closeSocket = useCallback(() => {
    if (ws) {
      ws.disconnect();
      setWs(null);
    }
  }, [ws]);

  return (
    <MeetingRoomContext.Provider value={{ ws, initializeSocket, closeSocket }}>
      {children}
    </MeetingRoomContext.Provider>
  );
};
