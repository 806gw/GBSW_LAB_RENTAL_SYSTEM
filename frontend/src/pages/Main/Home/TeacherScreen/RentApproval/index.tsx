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

const RentApproval: React.FC = () => {
    const [approvalLab, setApprovalLab] = useState<Lab[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // To hold the userId for approval

    useEffect(() => {
        const fetchDataAndAdminCheck = async () => {
            try {
                await fetchApprovalLab();
            } catch (error) {
                console.error(error);
            }
        };

        fetchDataAndAdminCheck();
    }, []);

    const fetchApprovalLab = async () => {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await customAxios.post(
                `/admin/approvalRental`, {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            setApprovalLab(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const aprLab = async (userid: number) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await customAxios.patch(
                `/admin/${userid}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            if (response) {
                alert('랩실 승인이 성공하였습니다.');
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            alert('승인 실패.');
        }
    };

    const handleApprovalClick = (userId: number) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const sortedApprovalLab = [...approvalLab].sort((a, b) => {
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
                        <p><span style={{ color: "rgb(19, 99, 223)" }}>랩실 대여 승인</span> 페이지입니다.</p>
                        <div>
                            <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                                <option value="asc">날짜 오름차순</option>
                                <option value="desc">날짜 내림차순</option>
                            </select>
                            <button onClick={fetchApprovalLab}>조회</button>
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
                                <S.ApprovalCont>
                                    {sortedApprovalLab.length > 0 ? (
                                        sortedApprovalLab.map((request) => (
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
                                                    <button className="approval_btn" onClick={() => handleApprovalClick(request.userId)}>대여 승인</button>
                                                </div>
                                            </S.RentalUserWrap>
                                        ))
                                    ) : (
                                        <S.NotRentTextWrap>
                                            <p style={{ fontSize: 17 }}>아직 신청한 랩실이 없습니다.</p>
                                        </S.NotRentTextWrap>
                                    )}
                                </S.ApprovalCont>
                            )}
                        </S.BodyWrap>
                    </S.Body>
                </S.Parent>
            </S.TopCont>
            <C.TeacherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userId={selectedUserId}
                actionType="apr"
                actionFunction={aprLab}
            />
        </>
    );
};

export default RentApproval;
