import React, { Component } from "react";
import SubCategories from "./SubCategories";
import NavData from "../NavData";
import "./SubKids.scss";

class SubKids extends Component {
  render() {
    return (
      <div className="SubKids">
        <div className="subKidsWrapper">
          <ul className="subLeftListWrapper">
            {NavData.Kids.map((data, idx) => (
              <li key={idx}>{data.list}</li>
            ))}
            <span>LAST CHANCE</span>
            <br />
            <span>SALE</span>
          </ul>
          <SubCategories title="신발" name="shoes" datas={NavData} />
          <SubCategories title="의류" name="clothes" datas={NavData} />
          <SubCategories title="스포츠" name="sports" datas={NavData} />
        </div>
      </div>
    );
  }
}

export default SubKids;
