import React, { useState } from "react";
import {
  Button,
  Form,
  Popover,
  OverlayTrigger,
  ButtonGroup,
} from "react-bootstrap";
import { ORDER_PHASE } from "../../constants";

function SummaryForm({ setOrderPhase }) {
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

        <ButtonGroup>
          <Button
            variant="primary"
            onClick={() => setOrderPhase(ORDER_PHASE.IN_PROGRESS)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            disabled={!termsConfirmed}
            onClick={() => setOrderPhase(ORDER_PHASE.COMPLETED)}
          >
            Confirm Order
          </Button>
        </ButtonGroup>
      </Form.Group>
    </Form>
  );
}

export default SummaryForm;
