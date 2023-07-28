import React from "react";
import SummaryForm from "../summary/SummaryForm";
import CustomCard from "../common/CustomCard";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Object.keys(optionCounts.toppings);
  const toopingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  return (
    <CustomCard>
      <h1>Order Summary</h1>
      <h4>Scoops: {formatCurrency(totals.scoops)}</h4>
      <ul>{scoopList}</ul>
      {Object.keys(optionCounts.toppings).length > 0 && (
        <>
          <h4>Toppings: {formatCurrency(totals.toppings)}</h4>
          <ul>{toopingList}</ul>
        </>
      )}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </CustomCard>
  );
}

export default OrderSummary;
