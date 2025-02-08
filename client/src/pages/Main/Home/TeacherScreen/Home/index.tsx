import * as C from "@src/allFiles";
import * as S from "./style";

import React, { useState, useEffect } from "react";
import { customAxios } from "@src/api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "@src/hooks/useAuth";
import MeisterCharacter from "@media/meister-character.png";
import SWCharacter from "@media/meister-sw-character.png";
import GameCharacter from "@media/meister-game-character.png";

interface Lab {
    userId: number;
    rentalDate: string;
    rentalStartTime: string;
    rentalPurpose: string;
    rentalUser: string;
    rentalUsers: string;
    deletionRental: boolean;
    labName: string;
    location: string;
    available: boolean;
}

const TeacherScreen: React.FC = () => {
    const [rentalRequests, setRentalRequests] = useState<Lab[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const { getUsername } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAvailableLabs();

        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            navigate(0);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    const fetchAvailableLabs = async () => {
        setIsLoading(true);
        try {
            const response = await customAxios.get<Lab[]>("/lab");
            setRentalRequests(response.data);
        } catch (error) {
            console.error("실습실 조회 실패", error);
        } finally {
            setIsLoading(false);
        }
    };

    const sortedRequests = Array.isArray(rentalRequests)
        ? [...rentalRequests].sort((a, b) => {
            return sortOrder === "asc"
                ? new Date(a.rentalDate).getTime() - new Date(b.rentalDate).getTime()
                : new Date(b.rentalDate).getTime() - new Date(a.rentalDate).getTime();
        })
        : [];

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as "asc" | "desc");
    };

    return (
        <>
            <C.TeacherSide />
            <S.TopCont>
                <S.Parent>
                    <S.Header>
                        <p>
                            안녕하세요,{" "}
                            <span style={{ color: "#00aa87", fontWeight: "600" }}>
                                {getUsername()}
                            </span>
                            님
                        </p>
                        <div>
                            <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                                <option value="desc">날짜 오름차</option>
                                <option value="asc">날짜 내림차</option>
                            </select>
                            <button onClick={fetchAvailableLabs}>조회</button>
                        </div>
                    </S.Header>
                    <S.Body>
                        <S.BodyWrap>
                            <S.RentalCont>
                                <p className="list_detail">대여 실습실</p>
                                <p className="list_detail">대표자</p>
                                <p className="list_detail">사용 인원</p>
                                <p className="list_detail">사용 목적</p>
                                <p className="list_detail">대여 날짜</p>
                                <p className="list_detail">대여 시간</p>
                            </S.RentalCont>
                            {isLoading ? (
                                <C.Loading />
                            ) : rentalRequests.length > 0 ? (
                                <S.RentalUserCont>
                                    {sortedRequests.map((request) => (
                                        <S.RentalUserWrap key={request.userId}>
                                            <S.Tooltip className="user_detail">
                                                <p className="user_detail">
                                                    {request.labName.length > 11
                                                        ? request.labName.slice(0, 11) + "..."
                                                        : request.labName}
                                                </p>
                                                {request.labName.length > 11 && (
                                                    <span className="tooltiptext">{request.labName}</span>
                                                )}
                                            </S.Tooltip>
                                            <p className="user_detail">{request.rentalUser}</p>
                                            <S.Tooltip className="user_detail">
                                                <span>
                                                    {request.rentalUsers.length > 12
                                                        ? request.rentalUsers.slice(0, 12) + "..."
                                                        : request.rentalUsers}
                                                </span>
                                                {request.rentalUsers.length > 12 && (
                                                    <span className="tooltiptext">{request.rentalUsers}</span>
                                                )}
                                            </S.Tooltip>
                                            <S.Tooltip className="user_detail">
                                                <span>
                                                    {request.rentalPurpose.length > 16
                                                        ? request.rentalPurpose.slice(0, 16) + "..."
                                                        : request.rentalPurpose}
                                                </span>
                                                {request.rentalPurpose.length > 16 && (
                                                    <span className="tooltiptext">{request.rentalPurpose}</span>
                                                )}
                                            </S.Tooltip>
                                            <p className="user_detail">{request.rentalDate}</p>
                                            <p className="user_detail">{request.rentalStartTime}</p>
                                        </S.RentalUserWrap>
                                    ))}
                                </S.RentalUserCont>
                            ) : (
                                <S.NotRentTextWrap>
                                    <S.CharacterWrap>
                                        <img src={MeisterCharacter} alt="" className="meister_character" />
                                        <img src={SWCharacter} alt="" className="sw_character" />
                                        <img src={GameCharacter} alt="" className="game_character" />
                                    </S.CharacterWrap>
                                    <p style={{ fontSize: 17 }}>
                                        아직 승인된 실습실 대여가 없습니다.
                                    </p>
                                </S.NotRentTextWrap>
                            )}
                        </S.BodyWrap>
                    </S.Body>
                </S.Parent>
            </S.TopCont>
        </>
    );
};

export default TeacherScreen;
