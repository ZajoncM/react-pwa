import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./routes/root";
import Geolocation from "./routes/geolocation";
import Offline from "./routes/offline";
import Camera from "./routes/camera";
import DevicePosition from "./routes/device-position";
import PWAProvider from "./providers/pwa-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/geolocation",
    element: <Geolocation />,
  },
  {
    path: "/offline",
    element: <Offline />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
  {
    path: "/device-position",
    element: <DevicePosition />,
  },
]);

function App() {
  return (
    <PWAProvider>
      <RouterProvider router={router} />
    </PWAProvider>
  );
}

export default App;
