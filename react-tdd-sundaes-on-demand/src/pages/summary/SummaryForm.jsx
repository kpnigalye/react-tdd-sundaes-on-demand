import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SummaryForm() {
  const [termsConfirmed, setTermsConfirmed] = useState(false);
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={termsConfirmed}
          onChange={(e) => setTermsConfirmed(e.target.checked)}
          label="I agree with Terms and Conditions."
        />
        <Button variant="primary" type="submit" disabled={!termsConfirmed}>
          Confirm Order
        </Button>
      </Form.Group>
    </Form>
  );
}

export default SummaryForm;
