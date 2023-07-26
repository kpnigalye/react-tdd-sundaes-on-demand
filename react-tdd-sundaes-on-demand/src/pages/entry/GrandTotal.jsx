import React from "react";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

function GrandTotal() {
  const { totals } = useOrderDetails();

  return (
    <div>
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
}

export default GrandTotal;
