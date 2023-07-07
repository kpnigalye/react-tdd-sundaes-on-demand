import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function SummaryForm() {
  const [termsConfirmed, setTermsConfirmed] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No Ice-creames will be actually delivered.</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree with{" "}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
      .
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={termsConfirmed}
          onChange={(e) => setTermsConfirmed(e.target.checked)}
          label={checkboxLabel}
        />
        <Button variant="primary" type="submit" disabled={!termsConfirmed}>
          Confirm Order
        </Button>
      </Form.Group>
    </Form>
  );
}

export default SummaryForm;
