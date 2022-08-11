import { useState, useEffect } from "react";
import { useAppContext } from "./context";
import { AppNotice } from "./components/AppNotice";

export const AppOverlay = () => {
  const timeCapBeforeDisplayingInfo = 2000;
  const [showInfo, setShowInfo] = useState(false);
  const { appState } = useAppContext();

  useEffect(() => {
    console.log("app status ", appState.status);
    if (appState.shouldGiveUserConsent) {
      switch (appState.status) {
        case "waiting":
          //setTimeout(() => {
          //if (appState.status === "waiting") {
          setShowInfo(true);
          //}
          //}, timeCapBeforeDisplayingInfo);
          break;

        case "error":
          setShowInfo(true);
          break;
      }
    }
  }, [appState.status]);

  return (
    <div id="app-overlay" className="fixed">
      {showInfo && <AppNotice message={appState.message} />}
    </div>
  );
};
