import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Products.scss";

const Products = ({ product }) => {
  const [active, setActive] = useState(false);
  const [productImg, setProductImg] = useState("");

  return (
    <div
      onMouseEnter={() => setActive(!active)}
      onMouseLeave={() => setActive(!active)}
      className="container"
    >
      <Link className="link" to={`detail/${product.productId}`}>
        <img
          className="img"
          alt="nikeCloth"
          src={!productImg ? product.images : productImg}
        />
        <div className="productInfoWrapper">
          <div className="productDisplay">
            <div className="productInfoLeft">
              <span>{product.title}</span>
              <p>{`${product.gender} ${product.sorts}`}</p>
              <p>{product.sports}</p>
              <p className={!active ? "color" : "off"}>
                {product.options.length ? product.options.length : 1} 컬러
              </p>
            </div>
            <div className="productInfoRight">
              <span>{`${product.price.toLocaleString()} 원`}</span>
            </div>
          </div>
          <div className="ulWrapper">
            <ul className={!active ? "off" : "ul"}>
              {product.options.map((data, idx) => (
                <li
                  onMouseEnter={() =>
                    setProductImg(data.imageUrl.replace("option", "gallery"))
                  }
                  key={idx}
                >
                  <img alt="nikeblue" src={`${data.imageUrl}`} />
                </li>
              ))}
            </ul>
            <span className={active ? "span" : "off"}>
              {product.options.length - 5 <= 0
                ? ""
                : `+${product.options.length - 5}컬러`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Products;
