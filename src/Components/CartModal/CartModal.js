import React, { Component } from "react";
import "./CartModal.scss";

function CartModal(props) {
  return (
    <div className="cartModalContent">
      <>
        <div className="miniCart">미니 장바구니</div>
        <section className="productInfo">
          <img className="productImg" alt="productImg" src={props.images[0]} />
          <div className="orderInfo">
            <div className="productId">
              <p>{props.title}</p>
              <i className="closingBtn">&times;</i>
            </div>
            <p>{`스타일 : ${props.productId}`}</p>
            <p>사이즈: {props.selectedSize}</p>
            <span>{`수량: ${props.quantity}`}</span>
            <p className="productPrice">{props.price.toLocaleString()}</p>
          </div>
        </section>
        <section className="bottomBox">
          <div className="totalPrice">
            <span>총 상품금액</span>
            <strong>{`${(
              props.price * props.quantity
            ).toLocaleString()} 원`}</strong>
          </div>
          <p>배송비는 주문서에서 확인이 가능합니다.</p>
        </section>
        <section className="btnBox">
          <button className="toCart btns">장바구니 가기</button>
          <button className="buyNow btns">바로구매</button>
        </section>
      </>
    </div>
  );
}

export default CartModal;
