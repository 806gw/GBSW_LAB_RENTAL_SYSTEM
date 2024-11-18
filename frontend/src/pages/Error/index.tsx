import * as S from "./style"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorCharacter from "@media/404.png"

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error("404 - 이전 페이지로 이동됩니다.", {
            position: "top-center",
            autoClose: 1500,
            pauseOnHover: false,
            closeButton: false,
        });
    }, []);

    setTimeout(() => {
        navigate(-1);
    }, 2000);

    return (
        <S.TopCont>
            <S.MainWrap>
                <img src={ErrorCharacter} alt="404 에러 캐릭터" />
                <h1>4<span>0</span>4</h1>
                <h2>이 페이지는 없는 페이지입니다.</h2>
            </S.MainWrap>
        </S.TopCont>
    )
};

export default NotFound