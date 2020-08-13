import React, { Component } from "react";
import LoadingModal from "../LoadingModal/LoadingModal";
import "./CartList.scss";

class CartList extends Component {
  state = {
    isLoading: false,
    isLogin: localStorage.getItem("token"),
  };

  handleModals = () => {
    const { size, productId } = this.props.cart;
    this.props.deleteOneHandler({ productId, size });
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 350);
  };

  render() {
    const { count, imageUrl, title, price, size, productId } = this.props.cart;
    return (
      <>
        <div className="cartItem">
          <div className="imgBox">
            <img className="itemImg" alt="item" src={imageUrl} />
          </div>
          <div className="itemText">
            <a className="itemName">{title}</a>
            <a className="itemStyle">스타일 :{productId}</a>
            <a className="itemSize">사이즈 : {size}</a>
            <a className="itemSize">수량 : {count}</a>
          </div>
          <div className="changeOption">옵션 변경</div>
          <div className="totalPrice">
            {(count * price).toLocaleString()} 원
          </div>
          <div className="xPointer" onClick={() => this.handleModals()}>
            &times;
          </div>
          {this.state.isLoading && <LoadingModal />}
        </div>
        <div className="itemWish">
          <span>위시리스트에 추가</span>
          <span className="buyLater">나중에 구매하기</span>
        </div>
      </>
    );
  }
}
export default CartList;
