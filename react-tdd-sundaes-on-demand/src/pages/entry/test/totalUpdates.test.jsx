import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import GrandTotal from "../GrandTotal";
import OrderEntry from "../OrderEntry";

describe("Should update order sub-total and total", () => {
  const user = userEvent.setup();

  test("should update scoop sub-total on scoop change", async () => {
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

describe("Should update Grant Total", () => {
  const user = userEvent.setup();

  test("initial grand total should be $0.00", () => {
    render(<GrandTotal />);

    const grandTotalText = screen.getByText("Grand total: $0.00");
    expect(grandTotalText).toBeInTheDocument();
  });

  test("grand total should update properly when scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotalText = screen.getByText("Grand total: $", { exact: false });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });

    // change vanilla scoop to 2 and grand total should be updated to $4.00
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotalText).toHaveTextContent("$4.00");

    // add Cherries topping and grand total should be updated to $5.50
    await user.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("$5.50");
  });

  test("grand total should update properly when topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotalText = screen.getByText("Grand total: $", { exact: false });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });

    // add Cherries topping and grand total should be updated to $1.50
    await user.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("$1.50");

    // change vanilla scoop to 1 and grand total should be updated to $3.50
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotalText).toHaveTextContent("$3.50");
  });

  test("grand total should reset to $0.00 when all items are removed", async () => {
    render(<OrderEntry />);

    const grandTotalText = screen.getByText("Grand total: $", { exact: false });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });

    // add Cherries topping and grand total should be updated to $1.50
    await user.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("$1.50");

    // change vanilla scoop to 1 and grand total should be updated to $3.50
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotalText).toHaveTextContent("$3.50");

    // uncheck topping
    await user.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("$2.00");

    // remove vanilla scoops
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "0");
    expect(grandTotalText).toHaveTextContent("$0.00");
  });
});
