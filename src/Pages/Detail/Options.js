import React, { Component } from "react";
import "./Options.scss";

export default class Options extends Component {
  handleOptionClick = (productId) => {
    const { history } = this.props;
    history.push(`/detail/${productId}`);
  };

  render() {
    const { options } = this.props;
    return (
      <div className="Options">
        <ul>
          {options.map((option) => {
            return (
              <li>
                <img
                  className="optionsImg"
                  src={option.imageUrl}
                  alt="product_options"
                  onClick={() => this.handleOptionClick(option.productId)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
