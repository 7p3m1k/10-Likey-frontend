import React, { Component } from "react";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import { detailAPI } from "../../config";
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
    };
  }

  doRequest = () => {
    fetch(`${detailAPI}${this.props.match.params.productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
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
      disabled: s === 0 ? true : false,
      quantity: 1,
      maxQuantity: s,
    });
  };

  render() {
    return (
      <div className="Detail">
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
          />
        </div>
      </div>
    );
  }
}

export default Detail;
