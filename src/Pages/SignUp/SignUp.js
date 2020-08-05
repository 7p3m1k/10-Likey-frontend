import React, { Component } from "react";
import "../SignUp/SignUp.scss";

const { Kakao } = window;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      genderChecks: "",
      email: null,
      password: null,
      passwordCheck: null,
      name: null,
      phone: null,
    };
  }

  checkBoxHandler = () => {
    const { check } = this.state;
    this.setState({ check: !check });
  };

  genderBoxHandler = (e) => {
    this.setState({ genderChecks: e.target.dataset.name });
  };

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signUpHandler = () => {
    const { email, password, name, phone } = this.state;

    fetch("`signUpAPI`", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      });
  };

  kakaoLogin = (props) => {
    Kakao.Auth.login({
      success: function (authObj) {
        console.log(JSON.stringify(authObj));
        fetch("http://10.58.2.17:8000/auth/kakao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authObj.access_token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.message === "User created") {
              alert("회원가입에 성공하셨습니다.");
              props.history.push("/signin");
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  render() {
    const {
      checkBoxHandler,
      genderBoxHandler,
      inputHandler,
      signUpHandler,
      kakaoLogin,
    } = this;

    const {
      check,
      genderChecks,
      email,
      password,
      passwordCheck,
      name,
      phone,
    } = this.state;

    return (
      <div className="SignUp">
        <div className="contentArea">
          <div className="signUpWarp">
            <div className="signUpHeader">
              <h2>나이키 멤버 가입</h2>
              <div className="headerGray">
                <p>멤버가 되어 나이키가 제공하는</p>
                <p>최고의 제품과 혜택을 만나보세요.</p>
              </div>
            </div>
            <div className="socialBox">
              <div className="kakao">
                <img className="kakaoLogo" src="/Images/SignUp/kakao.png" />
                <div className="kakaoText" onClick={kakaoLogin}>
                  카카오 계정으로 신규가입
                </div>
              </div>
              <div className="facebook">
                <img
                  className="facebookLogo"
                  src="/Images/SignUp/facebook.png"
                />
                <div className="facebookText">페이스북 계정으로 신규가입</div>
              </div>
            </div>
            <div className="orLine">
              <span className="orText">OR</span>
            </div>
            <div className="inputArea">
              <input
                className={`inputHigh ${
                  email !== null
                    ? email.includes("@" && ".com")
                      ? ""
                      : "value"
                    : ""
                }`}
                name="email"
                placeholder="사용하실 ID를 입력해주세요.(수신 가능 E-mail)"
                onChange={inputHandler}
              />
              <span
                className={`noneValue ${
                  email !== null
                    ? !email.includes("@" && ".com")
                      ? "value"
                      : ""
                    : ""
                }`}
              >
                {email && !email.includes("@" && ".com")
                  ? "이메일 형태로 입력해주세요. 해당 계정으로 주문 내역이 발송됩니다."
                  : "필수 입력 항목입니다."}
              </span>
              <input
                className={`inputLow ${password !== null ? "value" : ""}`}
                name="password"
                placeholder="영문+숫자+특수문자 8~16자리(특수문자 괄호()는 사용불가)"
                onChange={inputHandler}
              />
              <span className={`noneValue ${password !== null ? "value" : ""}`}>
                필수 입력 항목입니다.
              </span>
              <input
                className={`inputLow ${passwordCheck !== null ? "value" : ""}`}
                name="passwordCheck"
                placeholder="패스워드를 다시 입력해 주세요."
                onChange={inputHandler}
              />
              <span
                className={`noneValue ${passwordCheck !== null ? "value" : ""}`}
              >
                필수 입력 항목입니다.
              </span>
              <input
                className={`inputLow ${name !== null ? "value" : ""}`}
                name="name"
                placeholder="이름을 입력해 주세요."
                onChange={inputHandler}
              />
              <span className={`noneValue ${name !== null ? "value" : ""}`}>
                필수 입력 항목입니다.
              </span>
              <input
                className={`inputLow ${phone !== null ? "value" : ""}`}
                name="phone"
                placeholder="휴대폰 번호 '-'표 없이 입력해 주세요."
                onChange={inputHandler}
              />
              <span className={`noneValue ${phone !== null ? "value" : ""}`}>
                필수 입력 항목입니다.
              </span>
            </div>
            <img className="twoDragon" src="/Images/SignUp/twodragon.png" />
            <p>
              <input type="checkbox" id="1-input-checkbox"></input>
              <label for="1-input-checkbox">[필수] 약관에 동의 합니다.</label>
            </p>
            <img className="twoDragon" src="/Images/SignUp/twodragon2.png" />
            <p>
              <input type="checkbox" id="2-input-checkbox"></input>
              <label for="2-input-checkbox">
                [필수] 개인정보 수집.이용동의
              </label>
            </p>
            <div className="signUpFooterText">
              <div>
                ※ 약관 및 개인정보 처리방침은 홈페이지 하단에 전문이 게재되어
                있습니다.
              </div>
              <div>
                ※ 이용약관 및 개인정보 수집.이용 내용에 대해 동의 거부가
                가능하며,
              </div>
              <div>이 경우 회원가입 및 관련 서비스는 이용이 불가합니다.</div>
            </div>
            <img className="twoDragon" src="/Images/SignUp/twodragon3.png" />
            <p>
              <input
                type="checkbox"
                id="3-input-checkbox"
                onClick={checkBoxHandler}
              ></input>
              <label for="3-input-checkbox">
                [선택] 개인정보 수집.이용동의
              </label>
            </p>
            <div className={!check ? "none" : "selectionHide"}>
              <div className="orLine">
                <span className="orText">선택</span>
              </div>
              <input
                className="birthDay"
                placeholder="생년월일 예)1992.07.31"
              />
              <div className="gender">
                <span
                  className={
                    genderChecks === "남성" ? "genderDark" : "genderCheck"
                  }
                  data-name="남성"
                  onClick={genderBoxHandler}
                >
                  남성
                </span>
                <span
                  className={
                    genderChecks === "여성" ? "genderDark" : "genderCheck"
                  }
                  data-name="여성"
                  onClick={genderBoxHandler}
                >
                  여성
                </span>
              </div>
            </div>
            <div className="selection">
              <p>
                <input type="checkbox" id="4-input-checkbox"></input>
                <label for="4-input-checkbox">
                  <u>(선택)</u> <u>쇼핑정보 E-mail 수신 동의</u>
                </label>
              </p>
              <p>
                <input type="checkbox" id="5-input-checkbox"></input>
                <label for="5-input-checkbox">
                  <u>(선택)</u> <u>쇼핑정보 SMS 수신 동의</u>
                </label>
              </p>
            </div>
            <div className="signUpFooterTextEnd">
              <div>
                ✣ 약관 및 개인정보 처리방침은 홈페이지 하단에 전문이 게재되어
                있습니다.
              </div>
              <div>✣ 선택 항목으로 동의하지 않아도 불이익을 받지 않습니다.</div>
            </div>
            <div className="signUpEndText">
              만 14세 미만은 회원가입 및 서비스 이용이 불가합니다.
            </div>
            <button className="signUpBtn" onClick={signUpHandler}>
              회원가입하기 (만 14세 이상)
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
