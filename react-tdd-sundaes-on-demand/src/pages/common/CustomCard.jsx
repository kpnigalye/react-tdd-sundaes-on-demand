import React from "react";
import { Card } from "react-bootstrap";

function CustomCard({ children }) {
  return (
    <Card
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Card.Header>Place Your Order</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}

export default CustomCard;
