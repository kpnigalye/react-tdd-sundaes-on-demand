import React from "react";
import Options from "./Options";
import GrandTotal from "./GrandTotal";

function OrderEntry() {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <GrandTotal />
    </div>
  );
}

export default OrderEntry;
