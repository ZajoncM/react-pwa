import { useState } from "react";
import Layout from "../layout/layout";
import { useMotion } from "react-use";

const DevicePosition = () => {
  const [deviceOrientation, setDeviceOrientation] =
    useState<DeviceOrientationEvent | null>(null);

  const state = useMotion();

  console.log(state);
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
