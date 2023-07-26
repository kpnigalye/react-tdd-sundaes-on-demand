import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { PRICE_PER_ITEM } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";

const SCOOPS_URL = "http://localhost:3030";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    fetch(`${SCOOPS_URL}/${optionType}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => setError(false));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0]?.toUpperCase() + optionType?.slice(1);

  const optionItems = items.map((item) => (
    <ItemComponent
      name={item.name}
      key={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options;
