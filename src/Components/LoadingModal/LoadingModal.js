import React, { Component } from "react";
import "./LoadingModal.scss";

class LoadingModal extends Component {
  render() {
    return (
      <div className="loading">
        <img alt="loading" src="/Images/Loading/ajax-loader.gif" />
      </div>
    );
  }
}

export default LoadingModal;
