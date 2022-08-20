import React, { createContext, useState, useContext } from "react";
import { AppOverlay } from "../";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const defaultState = {
    status: "ready",
    message: "",
    progress: null,
    shouldGiveUserConsent: true,
  };

  const [appState, setAppState] = useState(defaultState);

  const changeAppState = (params) => {
    const validStateParams = [
      "status",
      "message",
      "progress",
      "shouldGiveUserConsent",
    ];

    if (
      typeof params !== "object" ||
      params === null /* null is an object for some reason */
    ) {
      throw new Error(`${params} must be an object with valid parameters`);
    }

    let newState = {};

    for (const key in params) {
      if (!params.hasOwnProperty(key)) {
        continue;
      }

      if (!validStateParams.includes(key)) {
        console.warn(
          `${key} is not a valid parameter for the app's status, but it just has been ignored`
        );
        continue;
      }

      const value = params[key];

      // Some validation before updating
      switch (key) {
        case "status":
          const validStateKeys = ["ready", "busy", "waiting", "error"];
          if (!validStateKeys.includes(value)) {
            throw new Error(`The status of the app cannot be ${value}`);
          }
          break;

        case "message":
          if (typeof value !== "string") {
            throw new Error(
              `The app's status message can only be a string. It was passed ${value}`
            );
          }
          break;

        case "shouldGiveUserConsent":
          if (typeof value !== "boolean") {
            throw new Error(
              `shouldGiveUserConsent can only be a boolean. It was passed ${value}`
            );
          }
          break;

        default:
          break;
      }

      newState[key] = value;
    }

    setAppState({ ...defaultState, ...newState });
  };

  return (
    <AppContext.Provider value={{ appState, changeAppState }}>
      <AppOverlay appState={appState} />
      <div id="app">{children}</div>
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("AppContext was used outside of its provider");
  }

  return context;
};

export { AppContextProvider, useAppContext };
