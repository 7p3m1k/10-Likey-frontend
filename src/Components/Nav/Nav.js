import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import { detailAPI } from "../../config";
import Secondlist from "./Secondlist";
import "./Nav.scss";
class Nav extends Component {
  state = {
    active: "",
    mask: "",
    value: "",
    products: [],
    isModalOpen: false,
  };
  componentDidMount() {
    fetch(`${detailAPI}titles`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res.titles });
      });
  }
  getValue = (e) => {
    this.setState({ value: e.target.value });
  };
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { mask, value, products } = this.state;
    const { getValue } = this;
    return (
      <div className="Nav">
        <div className="navWrapper">
          <div className="navFirst">
            <ul className="navFirstLeft">
              <li className="leftList">
                <Link className="link" to="/">
                  Nike
                </Link>
              </li>
              <li className="leftList">Join Us</li>
              <li className="leftList">
                <img alt="jordanImage" src="/Images/Main/jordan.png" />
              </li>
              <li className="leftList">
                <img
                  className="converse"
                  alt="converseImage"
                  src="/Images/Main/converse.png"
                />
              </li>
            </ul>
            <ul className="navFirstRight">
              <li className="rightList">
                <Link className="signUp" to="/signup">
                  회원가입
                </Link>
              </li>
              <li className="rightList">
                <span onClick={this.openModal}>&nbsp; / 로그인</span>
                <SignIn
                  isOpen={this.state.isModalOpen}
                  close={this.closeModal}
                />
              </li>
              <li className="rightList">고객센터</li>
              <li className="rightList">
                <img className="cart" alt="cart" src="/Images/Main/cart.png" />
              </li>
              <li className="rightList">
                <img
                  className="address"
                  alt="address"
                  src="/Images/Main/대한민국.png"
                />
              </li>
            </ul>
          </div>
          <div className="navSecond">
            <div className="logoWrapper">
              <Link to="/">
                <img className="logo" alt="logo" src="/Images/Main/logo.png" />
              </Link>
            </div>
            <ul className="navSecondMenu">
              <Secondlist
                type="new"
                name="NEW RELEASES"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
              <Secondlist
                type="men"
                name="MEN"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
              <Secondlist
                type="women"
                name="WOMEN"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
              <Secondlist
                type="kids"
                name="KIDS"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
            </ul>
            <span className="searchWrapper">
              <img alt="search" src="/Images/Main/search.png" />
              <input
                onClick={() => this.setState({ mask: !mask })}
                onChange={getValue}
                className="searchInput"
                placeholder="검색"
              />
              <div className={mask ? "searchFilterWrapper" : "off"}>
                <h4>검색어를 입력해주세요</h4>
                <ul className="filterKeywordWrapper">
                  {products.map(({ productId, title }, idx) => {
                    if (value && title.includes(value)) {
                      return (
                        <li key={idx} className="filterKeyword">
                          <Link
                            className="filterLink"
                            to={`/detail/${productId}`}
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </span>
          </div>
        </div>
        <div
          onClick={() => this.setState({ mask: false })}
          className={mask ? "searchMask" : "off"}
        ></div>
      </div>
    );
  }
}
export default Nav;
