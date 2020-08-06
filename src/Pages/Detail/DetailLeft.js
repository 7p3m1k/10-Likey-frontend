import React, { Component } from "react";
import "./DetailLeft.scss";

export default class DetailLeft extends Component {
  render() {
    const { images } = this.props;
    return (
      <div className="DetailLeft">
        <ul>
          {images.map((idx) => {
            return (
              <li className="imgList">
                <div className="imgbox">
                  <img src={idx} alt="shoes_images" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
