import { useState } from "react";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/Confirmation";
import { OrderDetailsProvider } from "./context/OrderDetails";
import { ORDER_PHASE } from "./constants";
import "./App.css";

function App() {
  /** maintain varibale called `orderPhase` to keep track of order status
   * it can have one of the following values
   * 1. inProgress
   * 2. review
   * 3. completed
   *  */
  const [orderPhase, setOrderPhase] = useState(ORDER_PHASE.IN_PROGRESS);

  let Component = OrderEntry;
  switch (orderPhase) {
    case ORDER_PHASE.IN_PROGRESS:
      Component = OrderEntry;
      break;
    case ORDER_PHASE.REVIEW:
      Component = OrderSummary;
      break;
    case ORDER_PHASE.COMPLETED:
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
