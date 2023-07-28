import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { OPTIONS } from "../../constants";

function ScoopOption({ name, imagePath }) {
  const { updateItemCount, getItemScoopCount } = useOrderDetails();
  const handleChange = (event) => {
    updateItemCount(name, parseInt(event.target.value), OPTIONS.scoops);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "50%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} Scoop`}
      />
      <Form.Group
        as={Row}
        controlId={`${name}-count`}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            value={getItemScoopCount(name).toString()}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

export default ScoopOption;
