import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

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

export default function News() {
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:5000/news");

      setNews(response.data.data.results);
    })();
  }, []);

  const [news, setNews] = useState([]);

  function returnDetailsOfNews(currentNew, idx) {
    return (
      <Card className={classes.root} variant="outlined" key={idx}>
        <CardContent>
          <Typography
            color="textSecondary"
            variant="h5"
            component="h2"
            gutterBottom
          >
            <strong>Title: </strong>
            {currentNew.title}
          </Typography>
          <Typography className={classes.title}>
            <strong>Link: </strong>
            <a href={currentNew.url}>{currentNew.url}</a>
          </Typography>
          <Typography className={classes.title}>
            <strong>Time: </strong>
            {moment(currentNew.published_at).format("LLLL")}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return <div>{news.map((ele, idx) => returnDetailsOfNews(ele, idx))}</div>;
}
