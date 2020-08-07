import React from "react";
import SubMenu from "./SubMenu/SubMenu";
import SubKids from "./SubMenu/SubKids";

const Secondlist = ({ type, name, active, handleMouse }) => {
  return (
    <li
      className="secondList"
      onMouseEnter={() => handleMouse({ active: type })}
      onMouseLeave={() => handleMouse({ active: "none" })}
    >
      {name}
      <div className={active === type ? "on" : "off"}>
        {type === "new" || type === "women" ? <SubMenu /> : <SubKids />}
      </div>
    </li>
  );
};

export default Secondlist;
