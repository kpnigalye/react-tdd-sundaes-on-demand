import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("should display images for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // find alt texts
  const altText = scoopImages.map((image) => image.alt);
  expect(altText).toEqual(["Chocolate Scoop", "Vanilla Scoop"]);
});

test("should display images for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(2);

  // find alt texts
  const altText = toppingImages.map((image) => image.alt);
  expect(altText).toEqual(["Hot Fudge Topping", "Cherries Topping"]);
});
