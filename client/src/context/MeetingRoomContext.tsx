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
}

export const MeetingRoomContext = createContext<MeetingRoomContextType | null>(
  null
);

export const MeetingRoomProvider: React.FC<MeetingRoomContextProps> = ({
  children,
}) => {
  const [ws, setWs] = useState<Socket | null>(null);

  // Automatically initialize the socket connection when the component mounts
  useEffect(() => {
    const socket = socketIOClient(WS);

    socket.on("connect", () => {
      setWs(socket);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Clean up the socket connection when the provider component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
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
    <MeetingRoomContext.Provider value={{ ws, closeSocket }}>
      {children}
    </MeetingRoomContext.Provider>
  );
};

export default MeetingRoomProvider;