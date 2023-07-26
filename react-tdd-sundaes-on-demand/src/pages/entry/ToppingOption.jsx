import React from "react";
import { Col, Form } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { OPTIONS } from "../../constants";

function ToppingOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0, OPTIONS.toppings);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "50%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} Topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
}

export default ToppingOption;
