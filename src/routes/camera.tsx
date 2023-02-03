import { QrReader } from "react-qr-reader";
import Layout from "../layout/layout";
import { useState } from "react";

const Camera = () => {
  const [data, setData] = useState("No result");

  return (
    <Layout>
      <QrReader
        constraints={{ facingMode: "environment" }}
        containerStyle={{ width: "100%", height: "500px" }}
        onResult={(result) => {
          if (!!result) {
            setData(result?.getText());
          }
        }}
      />
      <p>{data}</p>
    </Layout>
  );
};

export default Camera;
