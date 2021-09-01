import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  if (process.env.NODE_ENV == "production") {
    var baseUrl = "/";
  } else {
    baseUrl = "http://localhost:5000";
  }
  useEffect(() => {
    console.log("ID PROVIDER===>", baseUrl);
    const newSocket = io(baseUrl, {
      cors: {
        origin: "http://localhost:5000",
        credentials: true,
      },
      transports: ["websocket"],
      query: { id },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
