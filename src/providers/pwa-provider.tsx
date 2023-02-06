import { PropsWithChildren } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

interface Props extends PropsWithChildren {}

const PWAProvider = ({ children }: Props) => {
  const reloadSW = "__RELOAD_SW__";
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // eslint-disable-next-line no-console
      console.log(`Service Worker at: ${swUrl}`);
      // @ts-expect-error just ignore
      if (reloadSW === "true") {
        r &&
          setInterval(() => {
            // eslint-disable-next-line no-console
            console.log("Checking for sw update");
            r.update();
          }, 1 /* 20s for testing purposes */);
      } else {
        // eslint-disable-next-line prefer-template,no-console
        console.log("SW Registered: " + r);
      }
    },
    onRegisterError(error) {
      // eslint-disable-next-line no-console
      console.log("SW registration error", error);
    },
  });

  console.log(offlineReady);

  return <>{children}</>;
};

export default PWAProvider;
