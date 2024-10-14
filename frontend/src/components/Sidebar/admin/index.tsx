import * as C from "@src/allFiles"
import * as S from "./style";

import useAuth from "@hooks/useAuth";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import SchoolFullLogo from "@media/SchoolFullLogo.png";
import { useAuthContext } from "@src/context/AuthContext";
import { FaUserAlt, FaWpforms, FaFileAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";

const TeacherSide = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true)

    const { name } = useAuthContext();
    const { handleLogout } = useAuth();

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
            <IoMenu onClick={toggleSidebar} style={{ cursor: "pointer", fontSize: "30px", position: "fixed" }} />
            {isOpen && <S.Overlay onClick={handleOverlayClick} />}
            <S.SidebarCont className={isOpen ? "active" : ""}>
                <S.SidebarWrap>
                    <img src={SchoolFullLogo} alt="school_logo" className="school_logo" />
                    <S.NameWrap>
                        <FaUserAlt className="user_logo" />
                        <p><span>{name}</span>선생님, 환영합니다</p>
                    </S.NameWrap>
                </S.SidebarWrap>
                <S.ListCont>
                    <S.LinkWrap to={"/rentapr"}>
                        <div>
                            <FaFileAlt className="link_logo" />
                            <span>대여 요청 보기</span>
                        </div>
                    </S.LinkWrap>
                    <S.LinkWrap to={"/rentdel"}>
                        <div>
                            <RiDeleteBin5Fill className="link_logo" />
                            <span>삭제 요청 보기    </span>
                        </div>
                    </S.LinkWrap>
                    <S.LinkWrap to={"/admin"}>
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
            </S.SidebarCont >
        </>
    );
};

export default TeacherSide;
