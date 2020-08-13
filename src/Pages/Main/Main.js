import React, { Component } from "react";
import { API } from "../../config";
import Nav from "../../Components/Nav/Nav";
import PageTop from "../../Components/PageTop/PageTop";
import Products from "../Main/Products/Products";
import "./Main.scss";
import mainData from "./mainData";

const LIMIT = 20;

class Main extends Component {
  state = {
    color: "",
    genderActive: false,
    colorActive: false,
    filterWrapperActive: false,
    sortActive: false,
    products: [],
    sortTitle: "",
    offSet: 0,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.infiniteScroll);
    fetch(`${API}/product?offset=${this.state.offSet}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          products: res.products,
          offSet: this.state.offSet + LIMIT,
        });
      });
  }

  chooseColor = ({ color }) => {
    fetch(`${API}/product?color=${color}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res.products });
      });
  };

  chooseGender = ({ gender }) => {
    fetch(`${API}/product?gender=${gender}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res.products });
      });
  };

  chooseNewest = (e) => {
    this.setState({ sortTitle: e });
    fetch(`${API}/product?offset=0&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res.products });
      });
  };

  chooseLowestCost = (e) => {
    this.setState({ sortTitle: e });
    fetch(`${API}/product?offset=${this.state.offSet}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res.products });
        const lowestCost = this.state.products.sort(
          (a, b) => a.price - b.price
        );
        this.setState({ lowestCost });
      });
  };

  chooseHighestCost = (e) => {
    this.setState({ sortTitle: e });
    fetch(`${API}/product?offset=${this.state.offSet}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res.products });
        const highestCost = this.state.products.sort(
          (a, b) => b.price - a.price
        );
        this.setState({ highestCost });
      });
  };

  infiniteScroll = () => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      fetch(`${API}/product?offset=${this.state.offSet}&limit=${LIMIT}`)
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            products: [...this.state.products, ...res.products],
            offSet: this.state.offSet + LIMIT,
          });
        });
    }
  };

  render() {
    const {
      chooseGender,
      chooseColor,
      chooseNewest,
      chooseLowestCost,
      chooseHighestCost,
    } = this;

    const {
      genderActive,
      colorActive,
      filterWrapperActive,
      sortActive,
      sortTitle,
      products,
    } = this.state;

    return (
      <div className="Main">
        <PageTop />
        <Nav />
        <div className="wrapper">
          <div className="header">
            <div className="headerTitleWrapper">
              <h1 className="headerTitle">신상품 전체보기</h1>
            </div>
            <div className="headerControl">
              <div className="filterBtnWrapper">
                <button
                  onClick={() =>
                    this.setState({ filterWrapperActive: !filterWrapperActive })
                  }
                  className="filterButton"
                >
                  FILTER
                  <img alt="filterImg" src="/Images/Main/filter.png" />
                </button>
              </div>
              <div
                onClick={() => this.setState({ sortActive: !sortActive })}
                className="sortBtnWrapper"
              >
                {!sortTitle ? `신상품순` : sortTitle}
                <img
                  alt="arrowDown"
                  src={
                    !sortActive
                      ? "/Images/Main/화살표내림.png"
                      : "/Images/Main/화살표올림.png"
                  }
                />
                <ul
                  onMouseLeave={() =>
                    this.setState({ sortActive: !sortActive })
                  }
                  className={!sortActive ? "off" : "sortBtn"}
                >
                  <li onClick={() => chooseNewest("신상품순")}>신상품순</li>
                  <li onClick={() => chooseLowestCost("낮은 가격순")}>
                    낮은 가격순
                  </li>
                  <li onClick={() => chooseHighestCost("높은 가격순")}>
                    높은 가격순
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="leftWrapper">
            <div className={!filterWrapperActive ? "off" : "leftFilterWrapper"}>
              <div className="line"></div>
              <div
                onClick={() => this.setState({ genderActive: !genderActive })}
                className="titleWrapper"
              >
                <span>성별 </span>
                <img
                  alt="arrowUp"
                  src={
                    genderActive
                      ? "/Images/Main/화살표올림.png"
                      : "/Images/Main/화살표내림.png"
                  }
                />
              </div>
              <div className={!genderActive ? "off" : "genderListWrapper"}>
                <ul>
                  {mainData.gender.map((data, idx) => (
                    <li onClick={() => chooseGender(data)} key={idx}>
                      <span>{data.gender}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="line"></div>
              <div
                onClick={() => this.setState({ colorActive: !colorActive })}
                className="titleWrapper"
              >
                <span>색상 </span>
                <img
                  alt="arrowUp"
                  src={
                    colorActive
                      ? "/Images/Main/화살표올림.png"
                      : "/Images/Main/화살표내림.png"
                  }
                />
              </div>
              <div className={!colorActive ? "off" : "colorContainer"}>
                <ul>
                  {mainData.color.map((data, idx) => (
                    <li onClick={() => chooseColor(data)} key={idx}>
                      <span className="colorLabelWrapper">
                        <button
                          style={{ backgroundColor: `${data.background}` }}
                        ></button>
                        <span>{data.color}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div className="contentsBodyWrapper">
            <div
              className={
                !filterWrapperActive ? "contentsBody2" : "contentsBody"
              }
            >
              {products.map((data, idx) => (
                <Products key={idx} product={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
