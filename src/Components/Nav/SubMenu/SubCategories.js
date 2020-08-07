import React from "react";

const SubCategories = ({ title, name, datas }) => {
  return (
    <div className="subCenterListWrapper">
      <ul>
        <li>
          <span>{title}</span>
        </li>
        {datas.Kids.map((data, idx) => (
          <li key={idx}>{data[name]}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategories;
