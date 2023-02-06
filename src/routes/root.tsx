import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Link to="geolocation">Geolocation</Link>
      <Link to="offline">Offline notes</Link>
      <Link to="camera">Camera</Link>
      <Link to="device-position">Device Position</Link>
    </div>
  );
};

export default Root;
