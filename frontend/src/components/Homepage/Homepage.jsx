import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { getLoginToken } from "../../global";
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

export default function Homepage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [see, setSee] = useState(false);

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        alert("You need to log in to view this page");
        history.push("/signin");
      } else {
        setSee(true);
      }
    })();
  }, [history]);

  return see && (
    <div>
      <Card className={classes.root} style={{ margin: "10px" }}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            <h3>
              <strong>What is Cryptocurrency?</strong>
            </h3>
          </Typography>
          <Typography variant="body2" component="p">
            Cryptocurrency is a form of payment that can be exchanged online for
            goods and services. Many companies have issued their own currencies,
            often called tokens, and these can be traded specifically for the
            good or service that the company provides. Think of them as you
            would arcade tokens or casino chips. You'll need to exchange real
            currency for cryptocurrency to access the goods or service.
            <br />
            Cryptocurrencies work using a technology called blockchain.
            Blockchain is a decentralized technology spread across many
            computers that manage and record transactions. Part of the appeal of
            this technology is its security.
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root} style={{ margin: "10px" }}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            <h3>
              <strong>How to invest in Crypto?</strong>
            </h3>
          </Typography>
          <Typography variant="body2" component="p">
            There are always two sides to the crypto coin. One suggests that if
            the prices are sliding, you buy the dip because things will get
            better again. The other suggests to cut your losses and get out. If
            you have been following the cryptocurrency markets off late, you'd
            have noticed what can only be described as carnage. Bitcoin and
            cryptocurrency prices have falled significantly, partly spooked by
            what Elon Musk keeps tweeting and China's new guidelines that bar
            financial institutions and payment companies from trading in
            cryptocurrencies (individuals aren't within the purview of these new
            rules).
            <br />
            In the midst of all this, memes explode on social media.
            Nevertheless, seriosu investors or those wiht some ability to absorb
            risks will be looking at this as a blip on the horizon that would
            likely see crypto prices spike again. There also exist a lot of
            applications/websites, that let you invest in crypto easily.
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root} style={{ margin: "10px" }}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            <h3>
              <strong>What happens when something crashes?</strong>
            </h3>
          </Typography>
          <Typography variant="body2" component="p">
            <h1> You DO NOT lose money until you sell</h1>
            Market crashes are just a part of investing, of markets, and market
            cycles. The housing market crashes, the stock market crashes; all
            the markets crash at some point.
            <br />
            It can be terrifying to wonder about what a crash means - and what
            to do. Fortunately, the traditional stock market can provide some
            context and help when it comes to deciding what to do with your
            crypto investments if the market takes a downturn.
            <br />A business has 3 components, <strong>People</strong>,{" "}
            <strong>Process</strong>, and <strong>Product</strong>. You need all
            three to make a solid winner.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
