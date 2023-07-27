import React from "react";
import Options from "./Options";
import GrandTotal from "./GrandTotal";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
import { Button } from "react-bootstrap";
import CustomCard from "../common/CustomCard";
import { ORDER_PHASE } from "../../constants";

const isGrandTotalValid = (totals) =>
  formatCurrency(totals.scoops + totals.toppings) === "$0.00";

function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  const orderButtonDisabled = isGrandTotalValid(totals);

  return (
    <CustomCard>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <GrandTotal />

      <Button
        variant="primary"
        size="lg"
        disabled={orderButtonDisabled}
        onClick={() => setOrderPhase(ORDER_PHASE.REVIEW)}
      >
        Order
      </Button>
    </CustomCard>
  );
}

export default OrderEntry;
