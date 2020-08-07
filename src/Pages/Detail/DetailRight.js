import React, { Component } from "react";
import Options from "./Options";
import "./DetailRight.scss";

export default class DetailRight extends Component {
  render() {
    const {
      quantity,
      maxQuantity,
      sizes,
      title,
      categories,
      price,
      disabled,
      options,
      handleQauntity,
      handleMiniCart,
      selectedSize,
      history,
    } = this.props;

    return (
      <div className="DetailRight">
        <div className="info">
          <div>
            <span className="category">{categories}</span>
            <span className="price">{price.toLocaleString()} 원</span>
          </div>
          <div className="title">{title}</div>
          <span className="forMembers"> For Members</span>
          <Options options={options} history={history} />
        </div>
        <div className="selectSize">
          <span className="size">사이즈 선택</span>
          <span className="sizeGuide">사이즈 가이드</span>
        </div>
        <div className="sizeBtns">
          {sizes.map((el) => {
            return (
              <button
                className={
                  el.counts > 0 ? "inStock stockBtn" : "notInStock stockBtn"
                }
                onClick={() => selectedSize(el)}
              >
                {el.size}
              </button>
            );
          })}
        </div>
        <div className="notification">NOTIFY ME 입고 알림 신청</div>
        <div className="quantity">
          <span>수량</span>
          <input type="text" placeholder={quantity} />
          <button disabled={disabled} onClick={() => handleQauntity(-1)}>
            -
          </button>
          <button disabled={disabled} onClick={() => handleQauntity(+1)}>
            +
          </button>
        </div>
        <div className={quantity === maxQuantity ? "maxQuantity" : "hide"}>
          {maxQuantity}개 까지 구매가능 합니다.
        </div>
        <div className="orderWrap">
          <button className="orderNow">바로구매</button>
          <div>
            <button className="add cart" onClick={handleMiniCart}>
              장바구니
            </button>
            <button className="add">위시리스트 ♡</button>
          </div>
        </div>
        <img
          src="/Images/Detail/otherInfo.png"
          className="img"
          alt="moredetail"
        />
      </div>
    );
  }
}
