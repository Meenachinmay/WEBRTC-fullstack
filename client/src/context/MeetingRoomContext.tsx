import Peer from "peerjs";
import { v4 as uuidV4} from 'uuid';
import { createContext, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";

const WS = "http://localhost:8080";

interface MeetingRoomContextProps {
  children: React.ReactNode;
}

interface MeetingRoomContextType {
  ws: Socket | null;
  closeSocket: () => void;
  me: Peer | undefined,
  isWsReady: boolean,
  isPeerReady: boolean,
}

export const MeetingRoomContext = createContext<MeetingRoomContextType | null>(
  null
);

export const MeetingRoomProvider: React.FC<MeetingRoomContextProps> = ({
  children,
}) => {
  const [ws, setWs] = useState<Socket | null>(null);
  const [me, setMe] = useState<Peer>();

  const [isWsReady, setIsWsReady] = useState(false);
  const [isPeerReady, setIsPeerReady] = useState(false);

  // Automatically initialize the socket connection when the component mounts
  useEffect(() => {
    const socket = socketIOClient(WS);
    const meID = uuidV4();

    socket.on("connect", () => {
      setWs(socket);
      const peer = new Peer(meID);
      setMe(peer);
      setIsWsReady(true);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Clean up the socket connection when the provider component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
        setIsWsReady(false);
      }
    };
  }, []);

  const closeSocket = () => {
    if (ws) {
      ws.disconnect();
      setWs(null);
    }
  };

  return (
    <MeetingRoomContext.Provider value={{ ws, closeSocket, me, isPeerReady, isWsReady }}>
      {children}
    </MeetingRoomContext.Provider>
  );
};

export default MeetingRoomProvider;