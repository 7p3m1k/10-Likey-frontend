import React, { useEffect, useState } from "react";
import { cartAPI, token } from "../../config";
import { withRouter } from "react-router-dom";
import "./CartModal.scss";

const CartModal = (props) => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetch(cartAPI, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => setCarts(res.carts.reverse()));
  }, []);

  const deleteItem = (productObj) => {
    fetch(`${cartAPI}${productObj.productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }, //stateless
      body: JSON.stringify({ size: productObj.size }),
    }).then((res) =>
      setCarts(
        carts.filter((cart) => {
          if (
            cart.productId === productObj.productId &&
            cart.size === productObj.size
          ) {
            return false;
          }
          return true;
        })
      )
    );
  };

  const totalPrice = () => {
    let total = 0;
    let eachPrice = carts.map((elements) => {
      return elements.price * elements.count;
    });
    for (let i = 0; i < eachPrice.length; i++) {
      total += eachPrice[i];
    }
    return total.toLocaleString();
  };

  return (
    <div className="CartModal">
      <div className="miniCart">미니 장바구니</div>
      <div className="produtLists">
        {carts.map((el) => {
          return (
            <section className="productInfo">
              <img className="productImg" alt="productImg" src={el.imageUrl} />
              <div className="orderInfo">
                <div className="productId">
                  <p>{el.title}</p>
                  <i className="closingBtn" onClick={() => deleteItem(el)}>
                    &times;
                  </i>
                </div>
                <p>{`스타일 : ${el.productId}`}</p>
                <p>{`사이즈: ${el.size}`}</p>
                <span>{`수량: ${el.count}`}</span>
                <p className="productPrice">
                  {`${(el.price * el.count).toLocaleString()} 원`}
                </p>
              </div>
            </section>
          );
        })}
      </div>
      <section className="bottomBox">
        <div className="totalPrice">
          <span>총 상품금액</span>
          <strong>{`${totalPrice()} 원`}</strong>
        </div>
        <p>배송비는 주문서에서 확인이 가능합니다.</p>
      </section>
      <section className="btnBox">
        <button
          className="toCart btns"
          onClick={() => {
            props.history.push("/cart");
          }}
        >
          장바구니 가기
        </button>
        <button className="buyNow btns">바로구매</button>
      </section>
    </div>
  );
};

export default withRouter(CartModal);
