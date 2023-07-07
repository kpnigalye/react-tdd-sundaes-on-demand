//////// initial stage
// check if checkbox is disabled by default
// check if button is disabled by default

import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm";

//////// interactions
// if checkbox is enabled, button is enabled
// if checkbox is disabled, button is disabled

describe("Order Confirmation", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: "Confirm Order" });

    // should have checkbox with label which is disabled by default
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // should have a submit button which is disabled by default
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("checking/unchecking the checbox should enable/disable the submit button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: "Confirm Order" });

    // checking the checbox should enable the submit button
    fireEvent.click(checkbox);
    expect(submitButton).toBeEnabled();

    // unchecking the checkbox should disable the submit button
    fireEvent.click(checkbox);
    expect(submitButton).toBeDisabled();
  });
});
