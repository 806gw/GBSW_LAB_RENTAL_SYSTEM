import * as C from "@src/allFiles"
import * as S from "./style";

import useAuth from "@hooks/useAuth";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import SchoolFullLogo from "@media/gbsmh.png";
import { FaUserAlt, FaWpforms, FaFileAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const StudentSide = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true)

    const { getUsername, handleLogout } = useAuth();

    const username = getUsername()

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleOverlayClick = () => {
        setIsOpen(false);
    };

    const confirmLogout = () => {
        closeModal();
        handleLogout();
    };

    return (
        <>
            <IoMenu onClick={toggleSidebar} style={{ cursor: "pointer", fontSize: "30px", position: "fixed", margin: "10px" }} />
            {isOpen && <S.Overlay onClick={handleOverlayClick} />}
            <S.SidebarCont className={isOpen ? "active" : ""}>
                <S.SidebarWrap>
                    <img src={SchoolFullLogo} alt="school_logo" className="school_logo" />
                    <S.NameWrap>
                        <FaUserAlt className="user_logo" />
                        <p><span>{username}</span>님, 환영합니다</p>
                    </S.NameWrap>
                </S.SidebarWrap>
                <S.ListCont>
                    <S.LinkWrap to={"/student/rental"}>
                        <div>
                            <FaFileAlt className="link_logo" />
                            <span>랩실 대여하기</span>
                        </div>
                    </S.LinkWrap>
                    <S.LinkWrap to={"/student"}>
                        <div>
                            <FaWpforms className="link_logo" />
                            <span>대여 현황</span>
                        </div>
                    </S.LinkWrap>
                    <S.ListWrap onClick={openModal}>
                        <div>
                            <LuLogOut className="link_logo" />
                            <span>로그아웃</span>
                        </div>
                    </S.ListWrap>
                </S.ListCont>
                <C.LogOutModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmLogout}
                />
            </S.SidebarCont>
        </>
    );
};

export default StudentSide;
