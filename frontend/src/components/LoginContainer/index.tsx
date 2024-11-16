import * as S from "./style";

import React from "react";
import useAuth from "@hooks/useAuth";
import { AiFillExclamationCircle, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

const LoginContainer = () => {
    const { formData, handleFormChange, handleSignIn, isLoading } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <S.LoginInputCont>
            <S.LoginInputWrap onSubmit={handleSignIn}>
                <S.InputCont>
                    <S.LoginInput
                        type="text"
                        name="userid"
                        value={formData.userid}
                        onChange={handleFormChange}
                        placeholder="아이디"
                    />
                    <S.LoginIssueText>
                        <AiFillExclamationCircle className="issue_logo" />
                        <span>정보가 기억나지 않는다면 담당자 이보경 선생님께 문의해주세요.</span>
                    </S.LoginIssueText>
                </S.InputCont>

                <S.InputCont>
                    <S.LoginInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        placeholder="비밀번호"
                    />
                    <S.PasswordToggleButton type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <AiFillEyeInvisible className="show_logo" /> : <AiFillEye className="show_logo" />}
                    </S.PasswordToggleButton>
                </S.InputCont>
                <S.LoginBtn type="submit" disabled={isLoading}>
                    로그인
                </S.LoginBtn>
            </S.LoginInputWrap>
            <ToastContainer />
        </S.LoginInputCont>
    );
};

export default LoginContainer;