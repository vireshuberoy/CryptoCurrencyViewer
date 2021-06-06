import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Admin() {
  const history = useHistory();
  const classes = useStyles();
  const [see, setSee] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const password = window.prompt("Enter the password to access this");
      if (!(password === "admin")) {
        alert("Wrong Password!");
        history.push("/");
      } else {
        setSee(true);
        const response = await axios.get("http://localhost:5000/admin");
        setRows(response.data.response);
      }
    })();
  }, [history]);

  return (
    see && (
      <div>
        <h1> Admin </h1>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>
                  <strong>e-mail</strong>
                </TableCell>
                <TableCell>
                  <strong>Username</strong>
                </TableCell>
                <TableCell>
                  <strong>Currency</strong>
                </TableCell>
                <TableCell>
                  <strong>Country</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.currency}</TableCell>
                  <TableCell>{row.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
}
