import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getLoginToken } from "../../global";
import {useHistory} from "react-router-dom";

const loggedIn = getLoginToken();

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
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

export default function Cryptocurrency(props) {
  const { id } = props.match.params;
  const classes = useStyles();
  const history = useHistory();

  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [metadata, setMetadata] = useState([]);

  async function getGraphData() {
    const startDate = moment().utc().subtract(30, "days").format();
    const response = await axios.get(
      `http://localhost:5000/sparkline/${encodeURIComponent(startDate)}/${id}`
    );
    let timestamps = response.data.data[0].timestamps;
    timestamps = timestamps.map((ele) =>
      moment(ele).utc().format("MMMM Do YYYY")
    );
    setXValues(timestamps);
    setYValues(response.data.data[0].prices);
    if (document.getElementById("cryptocurrency-graph"))
      document
        .getElementById("cryptocurrency-graph")
        .scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        alert("You need to log in to view this page");
        history.push("/signin");
      }
      const response = await axios.get(
        `http://localhost:5000/cryptocurrency/${id}`
      );
      setMetadata(response.data.data[0]);
    })();
  }, []);

  return (
    <div id="cryptocurrency" style={{ margin: 10 }}>
      <Card
        style={{
          backgroundImage: `url(${metadata.logo_url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={classes.root}
        variant="outlined"
      >
        <CardContent>
          <Typography
            color="textSecondary"
            variant="h5"
            component="h2"
            gutterBottom
          >
            <strong>Name: </strong>
            {metadata.name}
          </Typography>
          <Typography className={classes.title} style={{ color: "#93A" }}>
            <strong>Description: </strong>
            {metadata.description}
          </Typography>
          <Typography className={classes.title}>
            <strong>Website URL: </strong>
            <a href={metadata.website_url}>{metadata.website_url}</a>
          </Typography>
          <Typography className={classes.title}>
            <strong>Reddit URL: </strong>
            <a href={metadata.reddit_url}>{metadata.reddit_url}</a>
          </Typography>
          <Typography className={classes.title}>
            <strong>Research Paper: </strong>
            <a href={metadata.whitepaper_url}>{metadata.whitepaper_url}</a>
          </Typography>
          <Typography className={classes.title}>
            <strong>Blockchair: </strong>
            <a href={metadata.block_explorer_url}>
              {metadata.block_explorer_url}
            </a>
          </Typography>
        </CardContent>
      </Card>
      <Button
        color="primary"
        variant="contained"
        style={{ margin: 10 }}
        onClick={() => getGraphData()}
      >
        Get Graph
      </Button>
      <Line
        id="cryptocurrency-graph"
        data={{
          labels: xValues,
          datasets: [
            {
              label: `Prices for ${id} for the past 30 days (x-axis) in INR (y-axis)`,
              data: yValues,
              fill: true,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
}
