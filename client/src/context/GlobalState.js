import React, { useReducer, createContext, useCallback } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";

//initial state
const initialState = {
  location: [{ path: "root", type: "folder" }],
  content: [],
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions

  const addToLocation = (newLocation) => {
    const paths = state.location.map((l) => l.path);

    //#1 if new location is already in location array go directly to that location
    if (paths.indexOf(newLocation.path) !== -1) {
      goDirectlyToLocation(newLocation);
      return;
    }

    //#2 add the new location to location array if and only if  it is in the current location, aka the last element in the location array
    const newLocationPath = newLocation.path.split("-");
    const newLocationIsInCurrentLocation =
      paths[paths.length - 1] ===
      newLocationPath
        .filter((p, idx) => idx < newLocationPath.length - 1)
        .join("-");
    if (newLocationIsInCurrentLocation)
      dispatch({ type: "ADD_TO_LOCATION", payload: newLocation });
  };

  const popFromLocation = () => {
    if (state.location.length > 1) dispatch({ type: "POP_FROM_LOCATION" });
  };

  const goDirectlyToLocation = (location) => {
    dispatch({ type: "GO_TO_LOCATION", payload: location });
  };

  const getContent = useCallback(async () => {
    dispatch({ type: "CONTENT_REQUEST" });
    const locationToPass = state.location[state.location.length - 1].path;

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
        loading: state.loading,
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
