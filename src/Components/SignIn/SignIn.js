import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import "./SignIn.scss";
const { Kakao } = window;

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  loginHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginClickHandler = () => {
    const { email, password } = this.state;
    fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          alert("로그인 성공 ^^!");
          localStorage.setItem("token", res.token);
          this.props.close();
          this.props.logInHandler();
        } else {
          alert("로그인 실패, 다시 시도해 주세요.");
        }
      });
  };

  kakaoLogin = ({ close, logInHandler }) => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch(`${API}/auth/kakao`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authObj.access_token,
          },
        })
          .then((res) => res.json())
          .then(({ token }) => {
            if (token) {
              alert("로그인 성공 ^^!");
              localStorage.setItem("token", token);
              close();
              logInHandler();
            } else {
              alert("로그인 실패, 다시 시도해 주세요.");
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  render() {
    const { close } = this.props;
    return (
      <div className="SignIn">
        <div>
          <div className="loginModal">
            <span className="close" onClick={close}>
              &times;
            </span>
            <div className="modalContents">
              <img
                alt="나이키 로그인 아이콘"
                className="signinIcon"
                src="/Images/SignIn/signinIcon.png"
              />
              <input
                name="email"
                className="loginId"
                type="text"
                placeholder="아이디"
                onChange={this.loginHandler}
              />
              <input
                name="password"
                className="loginPw"
                type="password"
                placeholder="비밀번호"
                onChange={this.loginHandler}
              />
              <div className="loginMid">
                <label className="autoLogin" htmlFor="hint">
                  <input type="checkbox" id="hint" /> 로그인 유지하기
                </label>
                <div className="autoLogin">아이디/비밀번호 찾기</div>
              </div>
              <button className="loginBtn" onClick={this.loginClickHandler}>
                로그인
              </button>
              <div className="socialBox">
                <div className="kakao">
                  <img
                    alt="카카오톡 로고"
                    className="kakaoLogo"
                    src="/Images/SignIn/kakao.png"
                  />
                  <div
                    className="kakaoText"
                    onClick={() => this.kakaoLogin(this.props)}
                  >
                    카카오 계정으로 로그인
                  </div>
                </div>
                <div className="facebook">
                  <img
                    alt="페이스북 로고"
                    className="facebookLogo"
                    src="/Images/SignIn/facebook.png"
                  />
                  <div className="facebookText">페이스북 계정으로 로그인</div>
                </div>
              </div>
              <div className="loginEnd">
                <div className="loginLine">
                  회원이 아니신가요? <Link to="/signup">회원가입</Link>
                </div>
                <div className="noUser">비회원 주문 조회</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignIn;
