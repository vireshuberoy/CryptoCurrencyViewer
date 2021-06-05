require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const db = new Datastore({ filename: "./db/main.db", autoload: true });

const PORT = process.env.PORT || 5000;
const NOMICS_API_KEY = process.env.NOMICS_API_KEY;
console.log("NOMICS API KEY IS ", NOMICS_API_KEY);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

function getDocumentFromDB(email) {
  return new Promise((resolve, reject) => {
    db.find({ email: email }, (err, docs) => {
      if (!err) resolve(docs);
      else reject(err);
    });
  });
}

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const documents = await getDocumentFromDB(email);
  if (documents.length > 0)
    return res.json({
      success: false,
      message: "Sorry, an account with that email already exists",
    });

  db.insert(
    { firstName, lastName, email, password, confirmPassword },
    (err, docs) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: JSON.stringify(err) });
      else return res.status(200).json({ success: true });
    }
  );
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("email and password are ", email, password);

  const document = await getDocumentFromDB(email);
  const user = document[0];
  console.log(user);
  if (user.password === password) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

app.get("/sparkline/:startDate/:id", async (req, res) => {
  const startDate = req.params.startDate;
  const { id } = req.params;
  console.log("id is ", id);

  console.log("start date is ", startDate);
  const response = await axios.get(
    `https://api.nomics.com/v1/currencies/sparkline?key=${NOMICS_API_KEY}&ids=${id}&start=${startDate}&convert=INR`
  );
  return res.json({ data: response.data });
});

app.get("/getTop5", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_API_KEY}&interval=1d,30d&convert=INR&per-page=5&page=1&sort=rank`
    );
    return res.json({ data: response.data });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
});

app.get("/markets", async (req, res) => {
  const response = await axios.get(
    `https://api.nomics.com/v1/markets?key=${NOMICS_API_KEY}&quote=BTC,ETH,LTC`
  );

  return res.json({ data: response.data });
});

app.get("/news", async (req, res) => {
  const response = await axios.get("https://cryptopanic.com/api/v1/posts/?auth_token=748e942ebc72ca3decefb06bd46a3a17a85c0e34");

  return res.json({data: response.data});
});

app.get("/getTop30", async (req, res) => {
  const { page } = req.query;
  try {
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_API_KEY}&interval=1d,30d&convert=INR&per-page=30&page=${page}&sort=rank`
    );
    return res.json({ data: response.data });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
});

app.get("/cryptocurrency/:id", async (req, res) => {
  const { id } = req.params;
  console.log("another id is ", id);

  try {
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies?key=${NOMICS_API_KEY}&ids=${id}`
    );
    return res.json({ data: response.data });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
