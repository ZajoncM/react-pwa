import { useEffect, useRef, useState } from "react";
import Layout from "../layout/layout";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const requestPermission = (
  DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
).requestPermission!;

const DevicePosition = () => {
  const [deviceOrientation, setDeviceOrientation] =
    useState<DeviceOrientationEvent | null>(null);
  let windowListenerExist = false;

  const getPermission = () => {
    if (!("DeviceOrientationEvent" in window)) {
      console.log("DeviceOrientationEvent not supported");
      return Promise.resolve("denied");
    }
    console.log("DeviceOrientationEvent exist");

    return requestPermission() || Promise.resolve("granted");
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    setDeviceOrientation(event);
  };

  const handleStart = () => {
    getPermission().then((positionAccess: any) => {
      if (positionAccess === "granted") {
        window.addEventListener("deviceorientation", handleOrientation, true);
        windowListenerExist = true;
      }
    });
  };

  useEffect(() => {
    return () => {
      if (windowListenerExist)
        window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <Layout>
      <button className="clClick" onClick={handleStart}>
        start
      </button>
      <p style={{ fontSize: "40px" }}>
        beta: {deviceOrientation?.beta?.toFixed(2) || 0}
      </p>
      <p style={{ fontSize: "40px" }}>
        gamma: {deviceOrientation?.gamma?.toFixed(2) || 0}
      </p>
    </Layout>
  );
};

export default DevicePosition;
