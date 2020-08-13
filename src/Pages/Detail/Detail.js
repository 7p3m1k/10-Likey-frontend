import React, { Component } from "react";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import PageTop from "../../Components/PageTop/PageTop";
import CartModal from "../../Components/CartModal/CartModal";
import { API } from "../../config";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
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
      if (adj === 1 && quantity === maxQuantity) {
        return;
      }
      this.setState({ quantity: quantity + adj });
    }
  };

  handleSelectedSize = (s) => {
    this.setState({
      disabled: s.counts === 0 ? true : false,
      quantity: 1,
      maxQuantity: s.counts,
      selectedSize: s.size,
    });
  };

  handleMiniCart = () => {
    const productId = this.props.match.params.productId;
    const { selectedSize, quantity } = this.state;

    fetch(`${API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //method가 post일때 body내용이 json형식이라는 것을 미리 알려줌. body가없는 getmethod는 필요없음 ㅎㅎ
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId,
        size: selectedSize,
        count: quantity,
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          miniCart: true,
        })
      );
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
            handleSelectedSize={this.handleSelectedSize}
            handleOption={this.handleOption}
            handleMiniCart={this.handleMiniCart}
          />
        </div>
        <ScrollLock isActive={this.state.miniCart} />
        <div>
          {this.state.miniCart && (
            <div>
              <CartModal
                {...this.state}
                productId={productId}
                history={this.props.history}
              />
              <div
                className="cartMask"
                onClick={() => this.setState({ miniCart: false })}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Detail;
