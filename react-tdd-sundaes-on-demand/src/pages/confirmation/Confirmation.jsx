import React, { useEffect, useState } from "react";
import CustomCard from "../common/CustomCard";
import { ORDER_PHASE } from "../../constants";
import { useOrderDetails } from "../../context/OrderDetails";
import { Button } from "react-bootstrap";

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetItemCount } = useOrderDetails();

  useEffect(() => {
    const orderController = new AbortController();

    fetch("http://localhost:3030/order", {
      method: "post",
      signal: orderController.signal,
    })
      .then((res) => res.json())
      .then((response) => setOrderNumber(response.orderNumber))
      .catch((error) => console.error(error));

    return () => {
      orderController.abort();
    };
  }, []);

  if (orderNumber) {
    return (
      <CustomCard>
        <h5>Thank You!!!</h5>
        <h1>Your Order number: {orderNumber}</h1>
        <Button
          variant="secondary"
          onClick={() => {
            resetItemCount();
            setOrderPhase(ORDER_PHASE.IN_PROGRESS);
          }}
        >
          Reset
        </Button>
      </CustomCard>
    );
  } else {
    return <CustomCard>Placing Order..</CustomCard>;
  }
}

export default OrderConfirmation;
