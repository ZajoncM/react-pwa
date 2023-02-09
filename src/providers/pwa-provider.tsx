import { PropsWithChildren, useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import "./reolad-prompt.css";

interface Props extends PropsWithChildren {}

const PWAProvider = ({ children }: Props) => {
  const [offline, setOffline] = useState(false);
  const { updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_, r) {
      r &&
        setInterval(() => {
          r.update();
        }, 500);
    },
    onNeedRefresh() {
      console.log("update");
      updateServiceWorker(true);
    },
  });

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOffline(true);
    });

    window.addEventListener("online", () => {
      setOffline(false);
    });
  }, []);

  return (
    <>
      {children}
      <div className="ReloadPrompt-container">
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-message" style={{ color: "black" }}>
            <span style={{ color: "black" }}>
              {offline ? "offline" : "online"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PWAProvider;
