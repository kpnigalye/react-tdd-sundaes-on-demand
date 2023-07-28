import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";

test("should show error if scoop count is non-int or out of range", async () => {
  const user = userEvent.setup();
  // render
  render(<ScoopOption />);

  // find vanilla scoop element
  const vanillaInput = screen.getByRole("spinbutton");

  // check for negative number
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // check for decimal input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // check for inputs above max limit
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // check if it works for valid input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
