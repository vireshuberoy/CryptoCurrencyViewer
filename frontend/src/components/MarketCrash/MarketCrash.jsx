import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getLoginToken } from "../../global";
const loggedIn = getLoginToken();

export default function MarketCrash() {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        alert("You need to log in to view this page");
        history.push("/signin");
      }
    })();
  }, [history]);

  return (
    <div>
      <h1>Market Crash</h1>

      <h1>CRASH ALERT</h1>
      <h3>
        Every crypto having more than 2 five minute red candles will be listed
        down here, along with their information.
      </h3>

      <h4>Nothing to show</h4>
    </div>
  );
}
