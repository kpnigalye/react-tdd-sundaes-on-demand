import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

const SCOOPS_URL = "http://localhost:3030";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  const optionItems = items.map((item) => (
    <ItemComponent
      name={item.name}
      key={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}

export default Options;
