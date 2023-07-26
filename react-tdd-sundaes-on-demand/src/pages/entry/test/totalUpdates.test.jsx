import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe("Should update order sub-total and total", () => {
  const user = userEvent.setup();

  test.skip("should update scoop sub-total on scoop change", async () => {
    render(<Options optionType="scoops" />);

    // check if sub-total is $0.00
    const subTotalText = screen.getByText("Scoops total: $", { exact: false });
    expect(subTotalText).toHaveTextContent("0.00");

    // change sub-total of scoop when vanialla scoop changes to 1
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(subTotalText).toHaveTextContent("2.00");

    // change sub-total of scoop when chocolate scoop changes to 2
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(subTotalText).toHaveTextContent("6.00");
  });

  test("should update toppings total and sub-total", async () => {
    render(<Options optionType="toppings" />);

    // check if toppings sub-total is $0.00
    const subTotalText = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(subTotalText).toHaveTextContent("0.00");

    // check toppings sub-total when first topping is selected
    const hotfudgeCheckbox = await screen.findByRole("checkbox", {
      name: /Hot Fudge/i,
    });

    await user.click(hotfudgeCheckbox);
    expect(subTotalText).toHaveTextContent("1.50");

    // check toppings sub-total when second topping is selected
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    await user.click(cherriesCheckbox);
    expect(subTotalText).toHaveTextContent("3.00");
  });
});
