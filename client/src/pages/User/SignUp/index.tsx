import * as C from "@src/allFiles";
import * as S from "./style";

import React from "react";
import useAuth from "@hooks/useAuth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SymbolNew from "@media/symbol-new-only.png";

const SignUp = () => {
    const { signupData, handleSignupChange, handleSignUp, isLoading } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <S.Container>
            <C.NotLoginSide />
            <S.TopCont>
                <S.Parent>
                    <S.MainCont>
                        <S.LoginCont>
                            <S.LoginSubCont>
                                <S.LoginTitle>
                                    <S.LoginLogoCont>
                                        <img src={SymbolNew} alt="logo-new" className="gbsw_new_logo" />
                                    </S.LoginLogoCont>
                                    <S.LoginTextCont>
                                        <div style={{ fontSize: "1.35rem" }}>
                                            <span style={{ color: "#00AA87" }}>경북소프트웨어 마이스터고등학교</span>
                                        </div>
                                        <div className="tag_bottom">실습실 대여 시스템 회원가입</div>
                                    </S.LoginTextCont>
                                </S.LoginTitle>
                                <div>
                                    <S.LoginInputCont>
                                        <S.LoginInputWrap
                                            as="form"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSignUp(e);
                                            }}
                                        >
                                            <S.InputCont>
                                                <S.LoginInput
                                                    type="text"
                                                    name="username"
                                                    value={signupData.username}
                                                    onChange={handleSignupChange}
                                                    placeholder="아이디"
                                                />
                                            </S.InputCont>
                                            <S.InputCont>
                                                <S.LoginInput
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={signupData.password}
                                                    onChange={handleSignupChange}
                                                    placeholder="비밀번호"
                                                />
                                                <S.PasswordToggleButton type="button" onClick={togglePasswordVisibility}>
                                                    {showPassword ? (
                                                        <AiFillEyeInvisible className="show_logo" />
                                                    ) : (
                                                        <AiFillEye className="show_logo" />
                                                    )}
                                                </S.PasswordToggleButton>
                                            </S.InputCont>
                                            <S.LoginBtn type="submit" disabled={isLoading}>
                                                회원가입
                                            </S.LoginBtn>
                                            <S.SignInBtn to={"/"}>
                                                <span>로그인으로 돌아가기</span>
                                            </S.SignInBtn>
                                        </S.LoginInputWrap>
                                    </S.LoginInputCont>
                                </div>
                            </S.LoginSubCont>
                        </S.LoginCont>
                    </S.MainCont>
                </S.Parent>
            </S.TopCont>
        </S.Container>
    );
};

export default SignUp;
