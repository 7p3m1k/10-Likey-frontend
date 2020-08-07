import React, { Component } from "react";
import Nav from "../../Components/Nav/Nav";
import mainData from "./mainData";
import PageTop from "../../Components/PageTop/PageTop";
import "./Main.scss";

class Main extends Component {
  state = {
    genderActive: true,
    colorActive: true,
  };

  render() {
    const { genderActive, colorActive } = this.state;

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
                <button className="filterButton">
                  FILTER
                  <img alt="filterImg" src="/Images/Main/filter.png" />
                </button>
              </div>
              <div className="sortBtnWrapper">
                신상품순
                <img alt="arrowDown" src="/Images/Main/화살표내림.png" />
              </div>
            </div>
          </div>
          <div className="leftWrapper">
            <div className="leftFilterWrapper">
              <div className="line"></div>
              <div
                onClick={() => this.setState({ genderActive: !genderActive })}
                className="titleWrapper"
              >
                <span>성별 </span>
                <img alt="arrowUp" src="/Images/Main/화살표내림.png" />
              </div>
              <div
                className={!genderActive ? "genderNone" : "genderListWrapper"}
              >
                <ul>
                  {mainData.gender.map((data, idx) => (
                    <li key={idx}>
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
                <img alt="arrowUp" src="/Images/Main/화살표내림.png" />
              </div>
              <div className={!colorActive ? "colorNone" : "colorContainer"}>
                <ul>
                  {mainData.color.map((data, idx) => (
                    <li key={idx}>
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
          <div className="contentsBody">
            <div className="container">
              {/* Link  */}
              <img alt="nikeCloth" src="/Images/Main/나이키.png" />
              {/* Link */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
