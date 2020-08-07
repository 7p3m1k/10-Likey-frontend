import React, { Component } from "react";
import SignIn from "./SignIn";

class button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <>
        <button onClick={() => this.setState({ isModalOpen: true })}>
          Modal Open
        </button>
        <SignIn isOpen={this.state.isModalOpen} close={this.closeModal} />
      </>
    );
  }
}

export default button;
