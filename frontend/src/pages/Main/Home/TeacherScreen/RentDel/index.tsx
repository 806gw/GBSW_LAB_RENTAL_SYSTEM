import * as C from "@src/allFiles";
import * as S from "./style";

import React, { useState, useEffect } from 'react';
import { customAxios } from "@src/api/axios";

interface Lab {
    userId: number;
    rentalDate: string;
    rentalStartTime: string;
    rentalUser: string;
    rentalUsers: string;
    rentalPurpose: string;
    hopeLab: string;
}

const RentDel: React.FC = () => {
    const [deletionLab, setDeletionLab] = useState<Lab[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // To hold the userId for deletion

    useEffect(() => {
        const fetchDataAndAdminCheck = async () => {
            await handleFetchDeletionLab();
        };

        fetchDataAndAdminCheck();
    }, []);

    const handleFetchDeletionLab = async () => {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await customAxios.post(
                `/admin/deletionRental`, {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            setDeletionLab(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const delLab = async (userid: number) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await customAxios.delete(
                `/admin/${userid}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            if (response) {
                alert('랩실 신청을 삭제했습니다.');
                setDeletionLab((prev) => prev.filter(request => request.userId !== userid));
            }
        } catch (error) {
            console.error(error);
            alert('삭제 실패.');
        }
    };

    const handleDeleteClick = (userId: number) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const sortedDeletionLab = [...deletionLab].sort((a, b) => {
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
                        <p><span style={{ color: "rgb(19, 99, 223)" }}>랩실 대여 삭제</span> 페이지입니다.</p>
                        <div>
                            <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                                <option value="asc">날짜 오름차순</option>
                                <option value="desc">날짜 내림차순</option>
                            </select>
                            <button onClick={handleFetchDeletionLab}>조회</button>
                        </div>
                    </S.Header>
                    <S.Body>
                        <S.BodyWrap>
                            <S.RentalCont>
                                <p className="list_detail">대여 실습실</p>
                                <p className="list_detail">대표자</p>
                                <p className="list_detail">랩실 전체 사용자</p>
                                <p className="list_detail">사용 목적</p>
                                <p className="list_detail">대여날짜</p>
                                <p className="list_detail">대여시간</p>
                                <p className="list_detail" />
                            </S.RentalCont>
                            {isLoading ? (
                                <C.Loading />
                            ) : (
                                <S.DeleteCont>
                                    {sortedDeletionLab.length > 0 ? (
                                        sortedDeletionLab.map((request) => (
                                            <S.RentalUserWrap key={request.userId}>
                                                <S.Tooltip className="user_detail">
                                                    <p className="user_detail">
                                                        {request.hopeLab.length > 11 ? request.hopeLab.slice(0, 11) + '...' : request.hopeLab}
                                                    </p>
                                                    {request.hopeLab.length > 11 && (
                                                        <span className="tooltiptext">{request.hopeLab}</span>
                                                    )}
                                                </S.Tooltip>
                                                <p className="user_detail">{request.rentalUser}</p>
                                                <S.Tooltip className="user_detail">
                                                    <span>
                                                        {request.rentalUsers.length > 16 ? request.rentalUsers.slice(0, 16) + '...' : request.rentalUsers}
                                                    </span>
                                                    {request.rentalUsers.length > 16 && (
                                                        <span className="tooltiptext">{request.rentalUsers}</span>
                                                    )}
                                                </S.Tooltip>
                                                <S.Tooltip className="user_detail">
                                                    <span>
                                                        {request.rentalPurpose.length > 16 ? request.rentalPurpose.slice(0, 16) + '...' : request.rentalPurpose}
                                                    </span>
                                                    {request.rentalPurpose.length > 16 && (
                                                        <span className="tooltiptext">{request.rentalPurpose}</span>
                                                    )}
                                                </S.Tooltip>
                                                <p className="user_detail">{request.rentalDate}</p>
                                                <p className="user_detail">{request.rentalStartTime}</p>
                                                <div className="user_detail">
                                                    <button className="approval_btn" onClick={() => handleDeleteClick(request.userId)}>대여 삭제</button>
                                                </div>
                                            </S.RentalUserWrap>
                                        ))
                                    ) : (
                                        <S.NotRentTextWrap>
                                            <p style={{ fontSize: 17 }}>아직 대여 취소 신청을 안했습니다.</p>
                                        </S.NotRentTextWrap>
                                    )}
                                </S.DeleteCont>
                            )}
                        </S.BodyWrap>
                    </S.Body>
                </S.Parent>
            </S.TopCont>
            {/* Modal for deletion confirmation */}
            <C.TeacherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userId={selectedUserId}
                actionType="del"
                actionFunction={delLab}
            />
        </>
    );
};

export default RentDel;
