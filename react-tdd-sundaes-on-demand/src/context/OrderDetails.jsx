import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetils = createContext();

// create a custom hook to check whether we are in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetils);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = (itemName, newItemCount, optionType) => {
    const newOptionsCounts = { ...optionCounts };
    newOptionsCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionsCounts);
  };

  const resetItemCount = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  };

  const calculateTotal = (optionType) => {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetItemCount };
  return <OrderDetils.Provider value={value} {...props} />;
}
