import * as S from "./style";

import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import SchoolFullLogo from "@media/gbsmh.png"

const NotLoginSide = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleOverlayClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <IoMenu onClick={toggleSidebar} style={{ cursor: "pointer", fontSize: "30px", margin: "10px" }} />
            {isOpen && <S.Overlay onClick={handleOverlayClick} />}
            <S.SidebarCont className={isOpen ? "active" : ""}>
                <S.SidebarWrap>
                    <img src={SchoolFullLogo} alt="school_logo" className="school_logo" />
                    <p>로그인이 필요합니다.</p>
                </S.SidebarWrap>
            </S.SidebarCont>
        </>
    );
};

export default NotLoginSide;
