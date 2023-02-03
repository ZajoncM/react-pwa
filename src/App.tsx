import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./routes/root";
import Geolocation from "./routes/geolocation";
import Offline from "./routes/offline";
import Camera from "./routes/camera";
import Reachability from "./routes/reachability";
import DevicePosition from "./routes/device-position";

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
    path: "/reachability",
    element: <Reachability />,
  },
  {
    path: "/device-position",
    element: <DevicePosition />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
