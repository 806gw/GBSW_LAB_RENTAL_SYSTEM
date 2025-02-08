import * as C from "@src/allFiles";
import * as S from "./style";

import React, { useState, useEffect, useMemo } from "react";
import { customAxios } from "@src/api/axios";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MeisterCharacter from "@media/meister-character.png";
import SWCharacter from "@media/meister-sw-character.png";
import GameCharacter from "@media/meister-game-character.png";

interface Lab {
    id?: number;
    rentalDate?: string;
    rentalStartTime?: string;
    rentalUser?: string;
    rentalUsers?: string;
    rentalPurpose?: string;
    labName?: string;
    approvalRental?: boolean;
    deletionRental?: boolean;
    status?: string;
}

const RentManagement: React.FC = () => {
    const [labs, setLabs] = useState<(Lab)[]>([]);
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
                const [approvalLabs, deletionLabs] = await Promise.all([fetchApprovalLab(), fetchDeletionLab()]);

                const mergedLabs = [...approvalLabs, ...deletionLabs].filter(lab => lab.id !== undefined);
                const uniqueLabsMap = new Map<number, Lab>();

                mergedLabs.forEach((lab) => {
                    if (lab.id === undefined) {
                        console.error("랩실을 찾을 수 없습니다.", lab);
                        return;
                    }
                    if (uniqueLabsMap.has(lab.id)) {
                        uniqueLabsMap.set(lab.id, { ...uniqueLabsMap.get(lab.id), status: "all" });
                    } else {
                        uniqueLabsMap.set(lab.id, lab);
                    }
                });

                setLabs(Array.from(uniqueLabsMap.values()));
            } catch (error) {
                toast.error("데이터를 불러오는 중 오류가 발생했습니다.", {
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
        fetchData();
    }, []);

    const fetchApprovalLab = async () => {
        try {
            const response = await customAxios.get<{ success: boolean; body: Lab[] }>("/lab/approved");
            const approvalLabs = response.data.body.filter((lab) => lab && lab.id !== undefined).map((lab) => ({
                ...lab,
                status: "approval",
            }));
            console.log("승인쪽 요청")
            return approvalLabs;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const fetchDeletionLab = async () => {
        try {
            const response = await customAxios.get<{ success: boolean; body: Lab[] }>("/lab/deletion");
            const deletionLabs = response.data.body.filter((lab) => lab && lab.id !== undefined).map((lab) => ({
                ...lab,
                status: "deletion",
            }));
            return deletionLabs;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const handleAction = async (id: number) => {
        try {
            const labName = labs.find((it) => it.id === id)?.labName;
            const payload = {
                approvalRental: true,
                labName: actionType === "apr" ? labName : undefined,
            };
            await customAxios.patch(`/lab/${id}`, payload);

            toast.success(
                actionType === "apr"
                    ? "승인이 성공적으로 완료되었습니다."
                    : "삭제가 성공적으로 완료되었습니다.",
                {
                    autoClose: 500,
                    closeOnClick: false,
                    pauseOnHover: false,
                    transition: Flip,
                }
            );

            setLabs((prev) => prev.filter((lab) => lab.id !== id))
        } catch (error: any) {
            toast.error(
                actionType === "apr"
                    ? "승인 처리 중 오류가 발생했습니다."
                    : "삭제 처리 중 오류가 발생했습니다.",
                {
                    autoClose: 500,
                    closeOnClick: false,
                    pauseOnHover: false,
                    closeButton: false,
                    transition: Flip,
                }
            );
        } finally {
            setIsModalOpen(false);
        }
    };

    const sortedLab = useMemo(() => {
        const filteredLabs = labs.filter((lab) => {
            if (filterType === "approval") return lab.status === "approval";
            if (filterType === "deletion") return lab.status === "deletion";
            return true;
        });

        return filteredLabs.sort((firstLab, secondLab) =>
            sortOrder === "asc"
                ? new Date(firstLab.rentalDate ? firstLab.rentalDate : 0).getTime() -
                new Date(secondLab.rentalDate ? secondLab.rentalDate : 0).getTime()
                : new Date(secondLab.rentalDate ? secondLab.rentalDate : 0).getTime() -
                new Date(firstLab.rentalDate ? firstLab.rentalDate : 0).getTime()
        );

    }, [labs, filterType, sortOrder]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(event.target.value as "all" | "approval" | "deletion");
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as "asc" | "desc");
    };

    const handleLabNameChange = (userId: number, newValue: string) => {
        setLabs(prevLabs =>
            prevLabs.map(lab =>
                lab.id === userId ? { ...lab, labName: newValue } : lab
            )
        );
    };

    const handleActionClick = (userId: number, type: "apr" | "del") => {
        setSelectedUserId(userId);
        setActionType(type);
        setIsModalOpen(true);
    };

    const labOptions = [
        "2층 컴퓨터 교육실",
        "2층 메이커 실습실",
        "2층 LAP1",
        "2층 LAP2",
        "3층 프로젝트 실습실 (2-1 앞)",
        "3층 모바일 실습실 (2-2 앞)",
        "3층 임베디드 실습실 (2-3 앞)",
        "3층 응용프로그래밍 실습실1 (2-4 앞)",
        "3층 LAP3",
        "3층 LAP4",
        "4층 응용프로그래밍 실습실2 (1-1 앞)",
        "4층 게임개발 실습실 (1-2 앞)",
        "4층 채움교실 (1-4 앞)",
        "4층 LAP6",
        "4층 LAP7",
    ];

    return (
        <>
            <C.TeacherSide />
            <S.TopCont>
                <S.Parent>
                    <S.Header>
                        <p>
                            <span style={{ color: "#00aa87", fontWeight: "600" }}>실습실 대여 관리</span> 페이지입니다.
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
                                        sortedLab.map((lab, index) => (
                                            <S.RentalUserWrap key={`${lab.id}-${index}`}>
                                                {lab.status == "approval" || lab.status == "all" ? (
                                                    <select
                                                        name="labName"
                                                        className="hopeLab_detail"
                                                        value={lab.labName}
                                                        onChange={(e) => handleLabNameChange((lab.id ? lab.id : -1), e.target.value)}
                                                        required
                                                    >
                                                        <option value={lab.labName}>{lab.labName}</option>
                                                        {labOptions
                                                            .filter((labName) => labName !== lab.labName)
                                                            .map((lab, labIndex) => (
                                                                <option key={`${lab}-${labIndex}`} value={lab}>
                                                                    {lab}
                                                                </option>
                                                            ))}
                                                    </select>
                                                ) : (
                                                    <S.Tooltip className="user_detail">
                                                        <span>
                                                            {lab.labName !== undefined && lab.labName.length > 16
                                                                ? lab.labName?.slice(0, 16) + "..."
                                                                : lab.labName}
                                                        </span>
                                                        {lab.labName !== undefined && lab.labName.length > 16 && (
                                                            <span className="tooltiptext">{lab.labName}</span>
                                                        )}
                                                    </S.Tooltip>
                                                )}
                                                <p className="user_detail">{lab.rentalUser}</p>
                                                <S.Tooltip className="user_detail">
                                                    <span>
                                                        {lab.rentalUsers !== undefined && lab.rentalUsers.length > 12
                                                            ? lab.rentalUsers.slice(0, 12) + "..."
                                                            : lab.rentalUsers}
                                                    </span>
                                                    {lab.rentalUsers !== undefined && lab.rentalUsers.length > 12 && (
                                                        <span className="tooltiptext">{lab.rentalUsers}</span>
                                                    )}
                                                </S.Tooltip>
                                                <S.Tooltip className="user_detail">
                                                    <span>
                                                        {lab.rentalPurpose !== undefined && lab.rentalPurpose.length > 16
                                                            ? lab.rentalPurpose.slice(0, 16) + "..."
                                                            : lab.rentalPurpose}
                                                    </span>
                                                    {lab.rentalPurpose !== undefined && lab.rentalPurpose.length > 16 && (
                                                        <span className="tooltiptext">{lab.rentalPurpose}</span>
                                                    )}
                                                </S.Tooltip>
                                                <p className="user_detail">{lab.rentalDate}</p>
                                                <p className="user_detail">{lab.rentalStartTime}</p>
                                                <div className="user_detail">
                                                    {!lab.approvalRental && (
                                                        <button
                                                            className="approval_btn"
                                                            onClick={() => handleActionClick(lab.id ? lab.id : -1, "apr")}
                                                        >
                                                            대여 승인
                                                        </button>
                                                    )}
                                                    {lab.deletionRental && (
                                                        <button
                                                            className="deletion_btn"
                                                            onClick={() => handleActionClick(lab.id ? lab.id : -1, "del")}
                                                        >
                                                            대여 삭제
                                                        </button>
                                                    )}
                                                </div>
                                            </S.RentalUserWrap>
                                        ))
                                    ) : (
                                        <S.NotRentTextWrap>
                                            <S.CharacterWrap>
                                                <img src={MeisterCharacter} alt="" className="meister_character" />
                                                <img src={SWCharacter} alt="" className="sw_character" />
                                                <img src={GameCharacter} alt="" className="game_character" />
                                            </S.CharacterWrap>
                                            <p style={{ fontSize: 17 }}>
                                                {filterType === "approval"
                                                    ? "승인 요청이 없습니다."
                                                    : filterType === "deletion"
                                                        ? "취소 요청이 없습니다."
                                                        : "승인 및 취소 요청이 없습니다."}
                                            </p>
                                        </S.NotRentTextWrap>
                                    )}
                                </S.ApprovalCont>
                            )}
                        </S.BodyWrap>
                    </S.Body>
                </S.Parent>
                {isModalOpen && (
                    <C.TeacherModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        userId={selectedUserId}
                        actionType={actionType}
                        actionFunction={handleAction}
                    />
                )}
            </S.TopCont >
        </>
    );
};

export default RentManagement;
