import React, { Component } from "react";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import PageTop from "../../Components/PageTop/PageTop";
import CartModal from "../../Components/CartModal/CartModal";
import { API } from "../../config";
import "./Detail.scss";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      quantity: 1,
      maxQuantity: 0,
      sizes: [],
      title: "",
      categories: "",
      price: 0,
      options: [],
      disabled: false,
      miniCart: false,
      selectedSize: 0,
    };
  }

  doRequest = () => {
    fetch(`${API}/product/${this.props.match.params.productId}`)
      .then((res) => res.json())
      .then((res) => {
        const {
          images,
          title,
          categories,
          price,
          sizes,
          options,
        } = res.product;

        this.setState({
          images,
          title,
          categories,
          price,
          sizes,
          options,
          disabled: true,
        });
      });
  };

  componentDidMount = () => {
    this.doRequest();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.match.params.productId !== this.props.match.params.productId
    ) {
      this.doRequest();
    }
  };

  handleQauntity = (adj) => {
    const { quantity, maxQuantity } = this.state;
    if (adj === -1 && quantity === 1) {
      this.setState({ quantity: 1 });
    } else if (quantity >= 1) {
      if (adj === +1 && quantity === maxQuantity) {
        return;
      }
      this.setState({ quantity: quantity + adj });
    }
  };

  //사이즈버튼 클릭시 실행되는 함수
  //해당 사이즈의 재고(counts)가 0일때 수량조절버튼을 disabled="true"로, 0이 아닐때 disabled="false" (true로 초기에설정함으로써 버튼이 한번도 안눌렸을땐 활성화X)
  //해당사이즈의 재고량을 state의 maxQuantity키의 값으로 저장한다.

  selectedSize = (s) => {
    this.setState({
      disabled: s.counts === 0 ? true : false,
      quantity: 1,
      maxQuantity: s.counts,
      selectedSize: s.size,
    });
  };

  handleMiniCart = () => {
    const productId = this.props.match.params.productId;
    const { size, count } = this.state.sizes;

    fetch(`${API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //method가 post일때 body내용이 json형식이라는 것을 미리 알려줌. body가없는 getmethod는 필요없음 ㅎㅎ
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjJlNWU1Yzg5NThlZTY5MmFjM2Y5OWEiLCJpYXQiOjE1OTcwMzY5Nzh9.8GkIA0kB9DeOSSDTNI0MVXNxx-kOUyv33Lfp9efgMI4",
      },
      body: JSON.stringify({
        productId,
        size,
        count,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    this.setState({
      miniCart: !this.state.miniCart,
    });
  };

  render() {
    const productId = this.props.match.params.productId;

    return (
      <div className="Detail">
        <PageTop />
        <div className="DetailLeft">
          <DetailLeft images={this.state.images} />
        </div>
        <div className="DetailRight">
          <DetailRight
            history={this.props.history}
            {...this.state}
            handleQauntity={this.handleQauntity}
            selectedSize={this.selectedSize}
            handleOption={this.handleOption}
            handleMiniCart={this.handleMiniCart}
          />
        </div>
        <div>
          {this.state.miniCart && (
            <CartModal {...this.state} productId={productId} />
          )}
        </div>
        {this.state.miniCart && (
          <div className="cartMask" onClick={this.handleMiniCart}></div>
        )}
      </div>
    );
  }
}

export default Detail;
