import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { getLoginToken, removeLoginToken } from "../../global.js";

const loggedIn = getLoginToken();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white", fontWeight: "600", fontSize: "32px" }}>
              BANKS
            </Link>
          </Typography>
          <Link
            to="/marketcrash"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">Market Crash</Button>
          </Link>
          <Link to="/top5" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Top 5 Cryptocurrencies In India</Button>
          </Link>
          <Link to="/top30" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Top 300 Cryptocurrencies</Button>
          </Link>
          <Link to="/news" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">News</Button>
          </Link>
          {!loggedIn ? (
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                removeLoginToken();
                window.location.reload();
              }}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
