import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { MeetingRoomProvider } from "./context/MeetingRoomContext.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./component/NotFound.tsx";
import ErrorBoundary from "./component/ErrorBoundary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <MeetingRoomProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </MeetingRoomProvider>
  </ChakraProvider>
);
