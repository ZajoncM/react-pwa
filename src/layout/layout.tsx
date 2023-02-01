import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <div
      style={{
        height: "100vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "1rem",
        boxSizing: "border-box",
        width: "100vw",
      }}
    >
      <Link to="/">Go back</Link>
      {children}
    </div>
  );
};

export default Layout;
