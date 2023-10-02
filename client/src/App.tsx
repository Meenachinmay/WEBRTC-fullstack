import { useEffect } from "react";
import "./App.css";

import socketIO from "socket.io-client";

const WS = "http://localhost:8080";

function App() {
  useEffect(() => {
    const socket = socketIO(WS);

    return () => {
      socket.disconnect();
    };
  }, [WS]);

  return (
    <>
      <div>Hello world</div>
    </>
  );
}

export default App;
