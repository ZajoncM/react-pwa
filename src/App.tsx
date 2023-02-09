import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import PWAProvider from "./providers/pwa-provider";
import { Suspense, lazy } from "react";

const Root = lazy(() => import("./routes/root"));
const Geolocation = lazy(() => import("./routes/geolocation"));
const Offline = lazy(() => import("./routes/offline"));
const Camera = lazy(() => import("./routes/camera"));
const DevicePosition = lazy(() => import("./routes/device-position"));

function App() {
  return (
    <PWAProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Suspense fallback={<>...</>}>
                <Root />
              </Suspense>
            }
          />
          <Route
            path="geolocation"
            element={
              <Suspense fallback={<>...</>}>
                <Geolocation />
              </Suspense>
            }
          />
          <Route
            path="offline"
            element={
              <Suspense fallback={<>...</>}>
                <Offline />
              </Suspense>
            }
          />
          <Route
            path="camera"
            element={
              <Suspense fallback={<>...</>}>
                <Camera />
              </Suspense>
            }
          />
          <Route
            path="device-position"
            element={
              <Suspense fallback={<>...</>}>
                <DevicePosition />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </PWAProvider>
  );
}

export default App;
