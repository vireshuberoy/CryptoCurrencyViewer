import React, { useEffect, useState } from "react";
import { getLoginToken } from "../../global";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import axios from "axios";

const loggedIn = getLoginToken();

export default function Profile() {
  const history = useHistory();

  useEffect(() => {
    if (!loggedIn) {
      alert("You need to log in to view this page");
      history.push("/signin");
    }
  }, [history]);

  return (
    <div style={{ margin: 10 }}>
      <h1>Profile</h1>

      <TableContainer>
        <Table>
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
                <strong>Country</strong>
              </TableCell>
              <TableCell>
                <strong>Currency</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{loggedIn?.firstName}</TableCell>
              <TableCell>{loggedIn?.lastName}</TableCell>
              <TableCell>{loggedIn?.email}</TableCell>
              <TableCell>{loggedIn?.username}</TableCell>
              <TableCell>{loggedIn?.country}</TableCell>
              <TableCell>{loggedIn?.currency}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button style={{margin: 10}} variant='contained' onClick={async () => {
        await axios.get(`http://localhost:5000/deleteProfile/${encodeURIComponent(loggedIn.email)}`);
        history.push("/editprofile/edit");
      }}>Edit Profile</Button>
    </div>
  );
}
