import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { getLoginToken } from "../../global";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const loggedIn = getLoginToken();

export default function Top5(props) {
  const history = useHistory();

  const [top5Data, setTop5Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        alert("You need to log in to view this page");
        history.push("/signin");
      }
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/getTop5");
        setLoading(false);
        setTop5Data(response.data.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, [history]);

  function returnCryptocurrencyData(crypto, idx) {
    return (
      <Card
        key={idx}
        className={classes.root}
        style={{
          width: "300px",
          height: "300px",
          margin: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="outlined"
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              alt="logo"
              style={{ height: "150px", width: "150px" }}
              src={crypto.logo_url}
            />
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {crypto.name}
            </Typography>
            <Typography variant="h5" component="h2">
              {crypto.id}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Rank: </strong>
              {crypto.rank}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Current Price (INR): </strong>
              {crypto.price}
            </Typography>
            <Button
              style={{ marginTop: "5px" }}
              variant="contained"
              color="primary"
              onClick={() => {
                history.push(`/cryptocurrency/${crypto.id}`);
              }}
            >
              Show Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        flexBasis: "41%",
        padding: "10px",
      }}
    >
      {top5Data.map((ele, idx) => returnCryptocurrencyData(ele, idx))}
    </div>
  );
}
