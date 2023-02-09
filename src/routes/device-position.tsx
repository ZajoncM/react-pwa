import { useEffect, useState } from "react";
import Layout from "../layout/layout";

const DevicePosition = () => {
  const [deviceOrientation, setDeviceOrientation] =
    useState<DeviceOrientationEvent | null>(null);

  useEffect(() => {
    if (typeof window.DeviceOrientationEvent === "function") {
      window.addEventListener(
        "deviceorientation",
        (e) => {
          setDeviceOrientation(e);
        },
        false
      );
    } else {
      console.log("orientation not supported");
    }
  }, []);

  return (
    <Layout>
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
