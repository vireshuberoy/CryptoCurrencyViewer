import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getLoginToken} from "../../global";

const loggedIn = getLoginToken();

export default function Homepage(props) {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        alert("You need to log in to view this page");
        history.push("/signin");
      }
    })();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
