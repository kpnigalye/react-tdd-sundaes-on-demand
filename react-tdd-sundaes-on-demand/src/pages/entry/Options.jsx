import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

const SCOOPS_URL = "http://localhost:3030";

function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${SCOOPS_URL}/${optionType}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

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
