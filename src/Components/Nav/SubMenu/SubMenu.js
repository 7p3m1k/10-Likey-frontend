import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./SubMenu.scss";
import NavData from "../navData";

class SubMenu extends Component {
  goToMain = (idx) => {
    if (idx === 0) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="SubMenu">
        <div className="subMenuWrapper">
          <ul className="subLeftListWrapper">
            {NavData.NewReleases.map((data, idx) => (
              <li onClick={() => this.goToMain(idx)} key={idx}>
                {data.list}
                <span> {data.span}</span>
              </li>
            ))}
          </ul>
          {NavData.NewCenter.slice(0, 3).map((data, idx) => (
            <div key={idx} className="subCenterListWrapper">
              <ul>
                <li>
                  <span>{data.span}</span>
                </li>
                {NavData.NewCenter.map((data, idx) => (
                  <li key={idx}>{data.list}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(SubMenu);
