import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        position: "relative",
        bottom: 0,
        justifyContent: "center",
        backgroundColor: "#2a2a72",
        backgroundImage: "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
        marginTop: "15px"
      }}
    >
      <h3>
        For any queries, contact us at{" "}
        <a href="mailto:sk7723@srmist.edu.in">sk7723@srmist.edu.in</a>
      </h3>
    </div>
  );
}
