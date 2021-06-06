import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getLoginToken } from "../../global";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const loggedIn = getLoginToken();

export default function BasicTable() {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        alert("You need to log in to view this page");
        history.push("/signin");
      }
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/getTop30?page=${page}&currency=${loggedIn?.currency}`
      );
      setLoading(false);
      setRows(response.data.data);
    })();
  }, [page, history]);

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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Rank</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>ID</strong>
            </TableCell>
            <TableCell>
              <strong>Status</strong>
            </TableCell>
            <TableCell>
              <strong>Symbol</strong>
            </TableCell>
            <TableCell>
              <strong>Price ({loggedIn?.currency})</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Visit Page</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="right">
                <Link
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  to={`/cryptocurrency/${row.id}`}
                >
                  <Button variant="contained" color="primary">
                    Visit Page
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={10}
        page={page}
        onChange={(evt, val) => setPage(val)}
        showFirstButton
        showLastButton
      />
    </TableContainer>
  );
}
