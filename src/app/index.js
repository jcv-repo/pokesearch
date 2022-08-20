import { useState, useEffect } from "react";

export const AppOverlay = ({ appState }) => {
  const timeCapBeforeDisplayingInfo = 10;
  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  useEffect(() => {
    if (appState.status === "ready") {
      setShouldShowInfo(false);
      return;
    }
    if (!appState.shouldGiveUserConsent) {
      return;
    }

    let waitSetMessage;

    switch (appState.status) {
      case "waiting":
        waitSetMessage = setTimeout(() => {
          setShouldShowInfo(true);
        }, timeCapBeforeDisplayingInfo);

        break;

      case "error":
        setShouldShowInfo(true);
        break;
    }

    return () => {
      clearTimeout(waitSetMessage);
    };
  }, [appState]);

  return (
    <>
      {shouldShowInfo === true && appState.status !== "ready" && (
        <div
          id="status-overlay"
          className="fixed left-1/2 bottom-4 transform translate-x-[-50%] z-40 px-4 py-2 rounded-md bg-on-tertiary text-tertiary-color"
        >
          <div className="bottom-4 mx-auto">{appState.message}</div>
        </div>
      )}
    </>
  );
};
