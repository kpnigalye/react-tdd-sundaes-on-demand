//////// initial stage
// check if checkbox is disabled by default
// check if button is disabled by default

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

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

  test("Checking/unchecking the checbox should enable/disable the submit button", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: "Confirm Order" });

    // checking the checbox should enable the submit button
    await user.click(checkbox);
    expect(submitButton).toBeEnabled();

    // unchecking the checkbox should disable the submit button
    await user.click(checkbox);
    expect(submitButton).toBeDisabled();
  });

  test("Popover responds to hover", async () => {
    const user = userEvent.setup();

    // initial state should be hidden
    render(<SummaryForm />);
    const nullPopOver = screen.queryByText(
      /no ice-creames will be actually delivered/i
    );
    expect(nullPopOver).not.toBeInTheDocument();

    // on mouseover show popup
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice-creames will be actually delivered/i
    );
    expect(popover).toBeInTheDocument();

    // on mouse out popover disappears
    await user.hover(termsAndConditions);
    expect(nullPopOver).not.toBeInTheDocument();
  });
});
