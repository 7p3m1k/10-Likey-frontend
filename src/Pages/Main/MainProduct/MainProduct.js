import React, { useState } from "react";
import "./MainProduct.scss";

const MainProduct = () => {
  const [state, setState] = useState(0);
  return (
    <div className="MainProduct">
      <div className="productWrapper"></div>
    </div>
  );
};

export default MainProduct;
