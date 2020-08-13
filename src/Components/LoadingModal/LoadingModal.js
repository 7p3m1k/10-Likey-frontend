import React, { component } from "react";
import "./LoadingModal.scss";

function LoadingModal() {
  return (
    <div className="LoadingModal">
      <div className="loding">
        <img alt="loading" src="/Images/Loading/ajax-loader.gif" />
        <div className="loadingText">처리중 입니다.</div>
      </div>
    </div>
  );
}

export default LoadingModal;
