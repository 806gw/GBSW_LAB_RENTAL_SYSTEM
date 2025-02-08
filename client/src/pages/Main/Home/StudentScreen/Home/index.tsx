import * as C from "@src/allFiles";
import * as S from "./style";

import React, { useState, useEffect } from 'react';
import { customAxios } from "@src/api/axios";
import GBSW from '@media/symbol-new-only.png';
import trash from '@assets/trash.svg';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import { Flip, toast } from 'react-toastify';
import MeisterCharacter from "@media/meister-character.png"
import SWCharacter from "@media/meister-sw-character.png"
import GameCharacter from "@media/meister-game-character.png"

interface Lab {
    userId: number;
    rentalDate: string;
    rentalStartTime: string;
    rentalUser: string;
    rentalUsers: string;
    rentalPurpose: string;
    deletionRental: boolean;
    labName: string;
}

const StudentScreen: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    const [rentalRequests, setRentalRequests] = useState<Lab[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { getUsername } = useAuth();
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const navigate = useNavigate();

    const username = getUsername()

    useEffect(() => {
        fetchAvailableLabs();

        window.history.pushState(null, '', window.location.href);

        const handlePopState = () => navigate(0);

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const fetchAvailableLabs = async () => {
        setIsLoading(true);
        try {
            const response = await customAxios.get("/lab");
            setRentalRequests(response.data.body);
        } catch (error) {
            toast.error('실습실 목록을 불러오는 중 문제가 발생했습니다.', {
                autoClose: 1000,
                closeOnClick: false,
                pauseOnHover: false,
                closeButton: false,
                transition: Flip,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (requestId: number) => {
        setUserId(requestId);
        setOpen(true);
    };

    const closeModal = () => setOpen(false);

    const sortedRequests = Array.isArray(rentalRequests)
        ? [...rentalRequests].sort((a, b) => {
            return sortOrder === 'asc'
                ? new Date(a.rentalDate).getTime() - new Date(b.rentalDate).getTime()
                : new Date(b.rentalDate).getTime() - new Date(a.rentalDate).getTime();
        })
        : [];

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    const handleModalSuccess = () => {
        toast.success('실습실 취소 요청이 성공적으로 되었습니다.', {
            autoClose: 1000,
            closeOnClick: false,
            pauseOnHover: false,
            closeButton: false,
            transition: Flip,
        });
        fetchAvailableLabs();
    };

    const handleDelete = async (id: number) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await customAxios.patch(`/lab/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.data.auth) {
                toast.error('본인이 신청한 실습실이 아닙니다.', {
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: false,
                    closeButton: false,
                    transition: Flip,
                })
                throw new Error('자신이 신청한 실습실이 아닙니다.');
            }

            handleModalSuccess();
        } catch (error: any) {
            console.error('실습실 취소 실패', error.response?.data || error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <>
            <C.StudentSide />
            <S.TopCont>
                <S.Parent>
                    <S.Header>
                        <S.RentCont>
                            <img src={GBSW} alt='경소고 로고' className='gbsw' />
                            <S.RentSubCont>
                                <S.LinkRent to={'/student/rental'}>실습실 대여하기</S.LinkRent>
                                <FaArrowRight className='arrow' />
                            </S.RentSubCont>
                        </S.RentCont>
                        <S.NoticeCont>
                            <S.NoticeSubCont>
                                <div>
                                    <p className='important_text'>매일 점심 시간 (13시 40분) 신청 마감</p>
                                    <S.NoticeRuleCont>
                                        <p className='notice_text'>야자 시간 전 미리 문 열어놓기 !</p>
                                        <p className='explanation'>
                                            미리 안 열어놓고 야자시간에 열쇠달라고 해도 안 열어줌, 손으로 따다 적발 시 벌점 20점
                                        </p>
                                    </S.NoticeRuleCont>
                                    <S.NoticeRuleCont>
                                        <p className='notice_text'>실습실 사용 후 정리는 매너이자 필수 !</p>
                                        <p className='explanation'>
                                            전원, 냉난방, 조명, 책상 의자 배치 등 정리 / 지켜지지 않을 시 2주간 실습실 이용 제한
                                        </p>
                                    </S.NoticeRuleCont>
                                </div>
                            </S.NoticeSubCont>
                        </S.NoticeCont>
                    </S.Header>
                    <S.StudentHeader>
                        <p>안녕하세요, <span style={{ color: '#00AA87', fontWeight: "600" }}>{username}</span>님</p>
                        <div>
                            <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                                <option value="asc">날짜 오름차순</option>
                                <option value="desc">날짜 내림차순</option>
                            </select>
                            <button onClick={fetchAvailableLabs}>조회</button>
                        </div>
                    </S.StudentHeader>
                    <S.Body>
                        <S.BodyWrap>
                            <S.RentalCont>
                                <p className="list_detail">대여 실습실</p>
                                <p className="list_detail">대표자</p>
                                <p className="list_detail">사용 인원</p>
                                <p className="list_detail">사용 목적</p>
                                <p className="list_detail">대여날짜</p>
                                <p className="list_detail">대여시간</p>
                                <p className="list_detail" />
                            </S.RentalCont>
                            {isLoading ? (
                                <C.Loading />
                            ) : sortedRequests.length > 0 ? (
                                <S.RentalUserCont>
                                    {sortedRequests.map((request) => (
                                        <S.RentalUserWrap key={request.userId}>
                                            <S.Tooltip className="user_detail">
                                                <span>
                                                    {request.labName.length > 11 ? request.labName.slice(0, 11) + '...' : request.labName}
                                                </span>
                                                {request.labName.length > 11 && (
                                                    <span className="tooltiptext">{request.labName}</span>
                                                )}
                                            </S.Tooltip>
                                            <p className="user_detail">{request.rentalUser}</p>
                                            <S.Tooltip className="user_detail">
                                                <span>
                                                    {request.rentalUsers.length > 12 ? request.rentalUsers.slice(0, 12) + '...' : request.rentalUsers}
                                                </span>
                                                {request.rentalUsers.length > 12 && (
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
                                            {request.deletionRental ? (
                                                <div className='user_detail'>대기중</div>
                                            ) : (
                                                <div className="user_detail" onClick={() => openModal(request.userId)}>
                                                    <img
                                                        src={trash}
                                                        alt="delete_img"
                                                        className="delete_btn"
                                                    />
                                                </div>
                                            )}
                                        </S.RentalUserWrap>
                                    ))}
                                </S.RentalUserCont>
                            ) :
                                (
                                    <S.NotRentTextWrap>
                                        <S.CharacterWrap>
                                            <img src={MeisterCharacter} alt="" className="meister_character" />
                                            <img src={SWCharacter} alt="" className="sw_character" />
                                            <img src={GameCharacter} alt="" className="game_character" />
                                        </S.CharacterWrap>
                                        <p style={{ fontSize: 17 }}>아직 신청 완료된 실습실이 없습니다.</p>
                                    </S.NotRentTextWrap>
                                )}
                        </S.BodyWrap>
                    </S.Body>
                </S.Parent>
                <C.LabModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    userId={userId}
                    onSuccess={handleModalSuccess}
                    actionFunction={handleDelete}
                />
            </S.TopCont>
        </>
    );
};

export default StudentScreen;
