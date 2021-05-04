import React, { useReducer, createContext, useCallback } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";

//initial state
const initialState = {
  location: ["root"],
  content: [],
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions

  const addToLocation = (newLocation) => {
    if (newLocation in state.location) {
      goDirectlyToLocation(newLocation);
      return;
    }
    dispatch({ type: "ADD_TO_LOCATION", payload: newLocation });
  };

  const popFromLocation = () => {
    dispatch({ type: "POP_FROM_LOCATION" });
  };

  const goDirectlyToLocation = (location) => {
    dispatch({ type: "GO_TO_LOCATION", payload: location });
  };

  const getContent = useCallback(async () => {
    const locationToPass = state.location[state.location.length - 1];

    const res = await axios.get(`http://localhost:3001/path/${locationToPass}`);
    if (res.status === 200) {
      dispatch({ type: "CONTENT_LOADED", payload: res.data.content });
    }
  }, [state.location]);

  return (
    <GlobalContext.Provider
      value={{
        location: state.location,
        content: state.content,
        addToLocation,
        popFromLocation,
        goDirectlyToLocation,
        getContent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
