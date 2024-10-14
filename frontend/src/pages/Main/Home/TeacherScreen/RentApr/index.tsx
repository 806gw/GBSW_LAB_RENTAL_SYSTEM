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

const RentApr: React.FC = () => {
    const [approvalLab, setApprovalLab] = useState<Lab[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDataAndAdminCheck = async () => {
            try {
                await FetchApprovalLab();
            } catch (error) {
                console.error(error);
            }
        };

        fetchDataAndAdminCheck();
    }, []);

    const FetchApprovalLab = async () => {
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

    const AprLab = async (userid: number) => {
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
    }

    return (
        <>
            <C.TeacherSide />
            <S.TopCont>
                <S.Parent>
                    <S.Header>
                        <h1><span style={{ color: "rgb(19, 99, 223)" }}>랩실 대여 승인</span> 페이지입니다.</h1>
                        <button onClick={FetchApprovalLab}>조회</button>
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
                                    {approvalLab.length > 0 ? (
                                        approvalLab.map((request) => (
                                            <S.RentalUserWrap key={request.userId}>
                                                <S.Tooltip className="user_detail">
                                                    <p className="user_detail">
                                                        {request.hopeLab.length > 11 ?
                                                            request.hopeLab.slice(0, 11) + '...'
                                                            : request.hopeLab}
                                                    </p>
                                                    {request.hopeLab.length > 11 && (
                                                        <span className="tooltiptext">{request.hopeLab}</span>
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
                                                <div className="user_detail">
                                                    <button className="approval_btn" onClick={() => AprLab(request.userId)}>대여 승인</button>
                                                </div>
                                            </S.RentalUserWrap>
                                        ))
                                    ) : (
                                        <S.NotRentTextWrap>
                                            <p style={{ fontSize: 17 }}>아직 아무도 랩실 신청을 안했습니다.</p>
                                        </S.NotRentTextWrap>
                                    )}
                                </S.ApprovalCont>
                            )}
                        </S.BodyWrap>
                    </S.Body>
                </S.Parent>
            </S.TopCont>
        </>
    );
};

export default RentApr;
