import React from "react";
import Content from "./components/Content";
import BreadCrumb from "./components/BreadCrumb";
import { GlobalProvider } from "./context/GlobalState";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <GlobalProvider>
      <CssBaseline />
      <div className={classes.content}>
        <BreadCrumb />
        <Content />
      </div>
    </GlobalProvider>
  );
}

export default App;
