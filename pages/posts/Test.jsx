import React, { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import { useRouter } from "next/router";
function Test() {
  const router = useRouter();
  const Login = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    font-family: "face";
    .test {
      font-size: 25px;
    }
    .id-box {
      width: 300px;
      height: 50px;
      border: solid 1px black;
    }
    .pw-box {
      margin-top: 20px;
      width: 300px;
      height: 50px;
      border: solid 1px black;
    }
  `;
  const KaKaoBtn = styled(KaKaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #ffeb00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
    }
  `;
  const [display, setDisplay] = useState("");
  const __test = useCallback(() => {
    setDisplay("테스트 완료");
  }, []);
  useEffect(() => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "OsTXzSdiiUVciXNscAyt",
      callbackUrl: `${window.location.origin}/posts/Test`,
      isPopup: true,
      callbackHandle: true,
      loginButton: { color: "white", type: 1, height: "47" },
    });
    if (naverLogin) {
      naverLogin.init();
    }
    naverLogin.getLoginStatus(function (status) {
      console.log(naverLogin.user);
      console.log(status);
    });

    return () => {};
  }, []);
  useEffect(() => {
    const path = router.asPath.split("=")[1];
    if (path) {
      console.log(path.split("&")[0]);
    }
    return () => {};
  }, [router]);
  return (
    <Login>
      <div onClick={__test}>누르면 튀어나옴</div>
      <div>{display}</div>
      <div className="test">로그인</div>
      <input type="text" className="id-box" />
      <input type="text" className="pw-box" />
      <Link href="/">이동</Link>
      로그인
      <KaKaoBtn
        token={"912e13d0226b4d857a7a74e749e1a888"}
        buttonText="KaKao"
        onSuccess={(e) => {
          console.log(e);
        }}
        getProfile={true}
      />
      <div id="naverIdLogin" className="naver" />
      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: "cafe24";
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </Login>
  );
}

export default Test;
