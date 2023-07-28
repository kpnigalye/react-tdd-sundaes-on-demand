import { createContext, useContext, useState } from "react";
import { PRICE_PER_ITEM } from "../constants";

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
    // delete item from selectedOptions if new count set is 0
    if (newItemCount === 0) {
      delete newOptionsCounts[optionType][itemName];
    } else {
      newOptionsCounts[optionType][itemName] = newItemCount;
    }
    setOptionCounts(newOptionsCounts);
  };

  const resetItemCount = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  };

  const calculateTotal = (optionType) => {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    return totalCount * PRICE_PER_ITEM[optionType];
  };

  const getItemScoopCount = (scoop) => {
    return scoop in optionCounts.scoops ? optionCounts.scoops[scoop] : 0;
  };

  const isToppingSelected = (topping) => {
    return topping in optionCounts.toppings;
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = {
    optionCounts,
    totals,
    updateItemCount,
    resetItemCount,
    getItemScoopCount,
    isToppingSelected,
  };
  return <OrderDetils.Provider value={value} {...props} />;
}
