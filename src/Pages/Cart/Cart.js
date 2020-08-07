import React, { Component } from "react";
import CartList from "../../Components/CartList/CartList";
import "./Cart.scss";
// import { cartAPI } from "../../config";
class Cart extends Component {
  state = {
    carts: [],
  };
  componentDidMount = () => {
    fetch("http://10.58.1.133:8000/cart", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ carts: res.carts }));
  };
  render() {
    const { carts } = this.state;
    const totalPrice =
      carts.length && //reduce는 배열에 값이 없으면 실행이 안되니까 조건을 걸어준다.
      carts
        .reduce((totalPrice, cart) => {
          totalPrice = totalPrice + cart.price * cart.count;
          return totalPrice;
        }, 0)
        .toLocaleString();
    return (
      <>
        <div className="cartWrapper">
          <div className="contentArea">
            <div className="cart">
              <div className="cartContents">
                <h2 className="cartTitle">장바구니</h2>
                <div className="cart">
                  <span>{this.state.carts.length}개 상품</span>
                </div>
                <div className="itemContainer">
                  <div className="info">
                    <p>사용 가능한 쿠폰이 있습니다.</p>
                    <p>아래 프로모 코드 입력란에 입력하여 사용하세요.</p>
                  </div>
                  <div className="cartPage">
                    <div className="cartFlex">
                      <div className="cartLeft">
                        <div className="allDelete">
                          <a>전체삭제</a>
                        </div>
                        {carts.map((cart) => (
                          <CartList cart={cart} />
                        ))}
                      </div>
                      <div className="cartRight">
                        <div className="rightTitle">주문예정금액</div>
                        <div className="payBox">
                          <div className="infoPrice">
                            <div className="itemPrice">
                              <div>상품 금액</div>
                              <div>{totalPrice} 원</div>
                            </div>
                            <div className="itemPrice">
                              <div>예상 배송비</div>
                              <div>0 원</div>
                            </div>
                            <div className="itemPrice">
                              <div>상품 할인 금액</div>
                              <div className="payColor">0 원</div>
                            </div>
                            <div className="itemPrice">
                              <div>주문 할인 금액</div>
                              <div className="payColor">0 원</div>
                            </div>
                          </div>
                          <div className="totalPrice">
                            <div className="totalPriceText">
                              총 결제 예정 금액
                            </div>
                            <div className="totalPricePay">{totalPrice} 원</div>
                          </div>
                          <div className="orderBtn">
                            <div className="orderButton">주문하기</div>
                          </div>
                        </div>
                        <img src="/Images/Cart/cart.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Cart;
