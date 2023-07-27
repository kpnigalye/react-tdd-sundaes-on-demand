import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  const { unmount } = render(<App />);

  // find order button
  const orderButton = screen.getByRole("button", { name: "Order" });
  expect(orderButton).toBeInTheDocument();

  // make sure Order button is disabled if grand total is $0.00
  const grandTotalText = screen.getByText("Grand Total: $", { exact: false });
  expect(grandTotalText).toHaveTextContent("$0.00");
  expect(orderButton).toBeDisabled();

  // add ice-cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: /hot fudge/i,
  });
  expect(vanillaInput).toBeInTheDocument();
  expect(hotFudgeCheckbox).toBeInTheDocument();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1"); // $2.00
  await user.click(hotFudgeCheckbox); // $3.50

  // check if order button is enabled
  expect(orderButton).toBeEnabled();

  // click on Order button
  await user.click(orderButton);

  // check summary information based on Order placed
  const summaryHeading = screen.queryByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $2.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // accept terms and conditions and click on Confirm Order button
  const confirmCheckbox = screen.getByRole("checkbox", {
    name: /I agree with Terms and Conditions/i,
  });
  expect(confirmCheckbox).toBeInTheDocument();

  await user.click(confirmCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm Order",
  });

  await user.click(confirmOrderButton);

  // confirm order number on confirmation page
  const loadingText = screen.getByText("Placing Order..");
  expect(loadingText).toBeInTheDocument();

  const thankYouText = await screen.findByText(/thank you/i);
  expect(thankYouText).toBeInTheDocument();

  const OrderConfirmedText = await screen.findByText("Your Order number:", {
    exact: false,
  });

  expect(OrderConfirmedText).toHaveTextContent("ABC12345");

  // click on new order
  const resetButton = screen.getByRole("button", {
    name: "Reset",
  });
  await user.click(resetButton);
  // check if scoops and toppings are reset
  const scoopsSubTotalText = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubTotalText).toHaveTextContent("0.00");

  const toppingsSubTotalText = screen.getByText("Toppings total: $0.00");
  expect(toppingsSubTotalText).toHaveTextContent("0.00");

  unmount();
});
