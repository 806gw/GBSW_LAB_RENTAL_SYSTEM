import * as C from "@src/allFiles";
import * as S from "./style";

import React, { useState, useEffect } from 'react';
import { customAxios } from "@src/api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "@src/hooks/useAuth";

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
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const { name } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAvailableLabs();

        window.history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            navigate(0);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const fetchAvailableLabs = async () => {
        setIsLoading(true);
        try {
            const response = await customAxios.get<Lab[]>("/lab/available");
            setRentalRequests(response.data);
        } catch (error) {
            console.error('실습실 조회 실패', error);
        } finally {
            setIsLoading(false);
        }
    };

    const sortedRequests = [...rentalRequests].sort((a, b) => {
        return sortOrder === 'asc'
            ? new Date(a.rentalDate).getTime() - new Date(b.rentalDate).getTime()
            : new Date(b.rentalDate).getTime() - new Date(a.rentalDate).getTime();
    });

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    return (
        <>
            <C.TeacherSide />
            <S.TopCont>
                <S.Parent>
                    <S.Header>
                        <p>안녕하세요, <span style={{ color: "rgb(19, 99, 223)" }}>{name}</span></p>
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
                                <p className="list_detail">사용인원</p>
                                <p className="list_detail">사용 목적</p>
                                <p className="list_detail">대여날짜</p>
                                <p className="list_detail">대여시간</p>
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
                                                        ? request.labName.slice(0, 11) + '...'
                                                        : request.labName}
                                                </p>
                                                {request.labName.length > 11 && (
                                                    <span className="tooltiptext">{request.labName}</span>
                                                )}
                                            </S.Tooltip>
                                            <p className="user_detail">{request.rentalUser}</p>
                                            <S.Tooltip className="user_detail">
                                                <span>
                                                    {request.rentalUsers.length > 16
                                                        ? request.rentalUsers.slice(0, 16) + '...'
                                                        : request.rentalUsers}
                                                </span>
                                                {request.rentalUsers.length > 16 && (
                                                    <span className="tooltiptext">{request.rentalUsers}</span>
                                                )}
                                            </S.Tooltip>
                                            <S.Tooltip className="user_detail">
                                                <span>
                                                    {request.rentalPurpose.length > 16
                                                        ? request.rentalPurpose.slice(0, 16) + '...'
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
                                    <p style={{ fontSize: 17 }}>랩실 대여 승인 페이지에서 승인을 완료하면 표시됩니다.</p>
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
