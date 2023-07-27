import { rest } from "msw";

// for loading text to appear
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
    res(
      ctx.json([
        { name: "Chocolate", image: "/images/chocolate.png" },
        { name: "Vanilla", image: "/images/vanilla.png" },
      ])
    )
  ),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
    res(
      ctx.json([
        { name: "Hot Fudge", image: "/images/hot-fudge.png" },
        { name: "Cherries", image: "/images/cherries.png" },
      ])
    )
  ),
  rest.post("http://localhost:3030/order", async (req, res, ctx) => {
    await sleep(10);
    return res(ctx.json({ orderNumber: "ABC12345" }));
  }),
];
