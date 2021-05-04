import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
    display: "flex",
    flexWrap: "wrap",
    height: theme.spacing(10),
    fontSize: theme.spacing(2),
  },
  location: {
    cursor: "pointer",
    color: "#9c9c9c",
    "&:hover": {
      fontWeight: "bold",
      color: "#000",
    },
  },
  currentLocation: { fontWeight: "bold", color: "#000" },
  seperator: {
    margin: theme.spacing(1),
  },
}));

const BreadCrumb = () => {
  const classes = useStyles();
  const { location, goDirectlyToLocation } = useContext(GlobalContext);
  return (
    <div className={classes.root}>
      {location.map((loc, idx) => (
        <div
          key={idx}
          onClick={() => goDirectlyToLocation(loc)}
          className={
            idx === location.length - 1
              ? classes.currentLocation
              : classes.location
          }
        >
          <span>{loc.split("-")[loc.split("-").length - 1]}</span>
          {idx !== location.length - 1 && (
            <span className={classes.seperator}>{`>`}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
