import * as C from "@src/allFiles";
import * as S from "./style";

import React, { useState, useEffect } from "react";
import { customAxios } from "@src/api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Lab {
    userId: number;
    rentalDate: string;
    rentalStartTime: string;
    rentalUser: string;
    rentalUsers: string;
    rentalPurpose: string;
    hopeLab: string;
}

const RentManagement: React.FC = () => {
    const [approvalLab, setApprovalLab] = useState<Lab[]>([]);
    const [deletionLab, setDeletionLab] = useState<Lab[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [filterType, setFilterType] = useState<"all" | "approval" | "deletion">("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [actionType, setActionType] = useState<"apr" | "del">("apr");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([fetchApprovalLab(), fetchDeletionLab()]);
            } catch (error) {
                console.error(error);
                toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchApprovalLab = async () => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await customAxios.post(
                `/admin/approvalRental`,
                {},
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            setApprovalLab(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDeletionLab = async () => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await customAxios.post(
                `/admin/deletionRental`,
                {},
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            setDeletionLab(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAction = async (userId: number) => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (actionType === "apr") {
                const response = await customAxios.patch(`/admin/${userId}`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
                if (response) {
                    toast.success("랩실 승인이 성공하였습니다.");
                    fetchApprovalLab();
                }
            } else {
                const response = await customAxios.delete(`/admin/${userId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
                if (response) {
                    toast.success("랩실 신청을 성공적으로 삭제했습니다.");
                    setDeletionLab((prev) => prev.filter((request) => request.userId !== userId));
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(actionType === "apr" ? "랩실 승인을 하는 도중 오류가 발생했습니다." : "랩실 신청 삭제에 실패했습니다.");
        } finally {
            setIsModalOpen(false);
        }
    };

    const sortedLab = [...(filterType === "approval" ? approvalLab : filterType === "deletion" ? deletionLab : [...approvalLab, ...deletionLab])].sort(
        (a, b) => (sortOrder === "asc" ? new Date(a.rentalDate).getTime() - new Date(b.rentalDate).getTime() : new Date(b.rentalDate).getTime() - new Date(a.rentalDate).getTime())
    );

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(event.target.value as "all" | "approval" | "deletion");
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as "asc" | "desc");
    };

    const handleActionClick = (userId: number, type: "apr" | "del") => {
        setSelectedUserId(userId);
        setActionType(type);
        setIsModalOpen(true);
    };

    return (
        <>
            <C.TeacherSide />
            <S.TopCont>
                <S.Parent>
                    <S.Header>
                        <p>
                            <span style={{ color: "rgb(19, 99, 223)" }}>랩실 대여 관리</span> 페이지입니다.
                        </p>
                        <div>
                            <select id="filterType" value={filterType} onChange={handleFilterChange}>
                                <option value="all">전체 보기</option>
                                <option value="approval">승인만 보기</option>
                                <option value="deletion">취소만 보기</option>
                            </select>
                            <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                                <option value="asc">날짜 오름차순</option>
                                <option value="desc">날짜 내림차순</option>
                            </select>
                            <button onClick={() => { fetchApprovalLab(); fetchDeletionLab(); }}>조회</button>
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
                                    {sortedLab.length > 0 ? (
                                        sortedLab.map((request) => (
                                            <S.RentalUserWrap key={request.userId}>
                                                <S.Tooltip className="user_detail">
                                                    <p className="user_detail">
                                                        {request.hopeLab.length > 11 ? request.hopeLab.slice(0, 11) + "..." : request.hopeLab}
                                                    </p>
                                                    {request.hopeLab.length > 11 && <span className="tooltiptext">{request.hopeLab}</span>}
                                                </S.Tooltip>
                                                <p className="user_detail">{request.rentalUser}</p>
                                                <S.Tooltip className="user_detail">
                                                    <span>
                                                        {request.rentalUsers.length > 16 ? request.rentalUsers.slice(0, 16) + "..." : request.rentalUsers}
                                                    </span>
                                                    {request.rentalUsers.length > 16 && <span className="tooltiptext">{request.rentalUsers}</span>}
                                                </S.Tooltip>
                                                <S.Tooltip className="user_detail">
                                                    <span>
                                                        {request.rentalPurpose.length > 16 ? request.rentalPurpose.slice(0, 16) + "..." : request.rentalPurpose}
                                                    </span>
                                                    {request.rentalPurpose.length > 16 && <span className="tooltiptext">{request.rentalPurpose}</span>}
                                                </S.Tooltip>
                                                <p className="user_detail">{request.rentalDate}</p>
                                                <p className="user_detail">{request.rentalStartTime}</p>
                                                <div className="user_detail">
                                                    {approvalLab.some((lab) => lab.userId === request.userId) && (
                                                        <button className="approval_btn" onClick={() => handleActionClick(request.userId, "apr")}>
                                                            대여 승인
                                                        </button>
                                                    )}
                                                    {deletionLab.some((lab) => lab.userId === request.userId) && (
                                                        <button className="deletion_btn" onClick={() => handleActionClick(request.userId, "del")}>
                                                            대여 삭제
                                                        </button>
                                                    )}
                                                </div>
                                            </S.RentalUserWrap>
                                        ))
                                    ) : (
                                        <S.NotRentTextWrap>
                                            <p style={{ fontSize: 17 }}>
                                                {filterType === "approval" ? "승인 요청이 없습니다." : filterType === "deletion" ? "취소 요청이 없습니다." : "승인 및 취소 요청이 없습니다."}
                                            </p>
                                        </S.NotRentTextWrap>
                                    )}
                                </S.ApprovalCont>
                            )}
                        </S.BodyWrap>
                    </S.Body>
                </S.Parent>
                <ToastContainer />
                {isModalOpen && (
                    <C.TeacherModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        userId={selectedUserId}
                        actionType={actionType}
                        actionFunction={handleAction}
                    />
                )}
            </S.TopCont>
        </>
    );
};

export default RentManagement;
