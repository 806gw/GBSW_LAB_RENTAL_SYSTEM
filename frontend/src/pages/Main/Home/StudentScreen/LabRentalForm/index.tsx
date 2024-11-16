import * as C from "@src/allFiles";
import * as S from "./style";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "@src/api/axios";
import InputField from "@src/components/InputField";
import SelectField from "@src/components/SelectField";
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};


const LabRentalForm = () => {
    const [rentalDate, setRentalDate] = useState(getTodayDate());
    const [rentalUser, setRentalUser] = useState('');
    const [rentalUsers, setRentalUsers] = useState('');
    const [rentalPurpose, setRentalPurpose] = useState('');
    const [rentalStartTime, setRentalStartTime] = useState('');
    const [hopeLab, setHopeLab] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!rentalDate || rentalDate < getTodayDate()) {
            toast.error('유효한 대여 희망일을 입력해주세요.', {
                pauseOnHover: false,
                transition: Flip,
            });
            return;
        }


        const accessToken = localStorage.getItem('accessToken');

        const jsonData = {
            rentalDate,
            rentalUser,
            rentalUsers,
            rentalPurpose,
            rentalStartTime,
            hopeLab,
        };

        try {
            await customAxios.post(
                `/lab/rental`,
                jsonData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success('랩실 대여 신청이 성공하였습니다! 2초 뒤에 메인 페이지로 이동합니다.', {
                autoClose: 2000,
                pauseOnHover: false,
                transition: Flip,
                onClose: () => navigate("/student"),
            });
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;

                if (errorMessage.includes('하나의 실습실 대여 요청만 보낼 수 있습니다.', {
                    pauseOnHover: false,
                    transition: Flip
                })) {
                    toast.error('하나의 실습실 대여 요청만 보낼 수 있습니다.', {
                        pauseOnHover: false,
                        transition: Flip
                    });
                } else if (errorMessage.includes('이미 해당 시간에 예약된 실습실이 있습니다.', {
                    pauseOnHover: false,
                    transition: Flip
                })) {
                    toast.error('이미 해당 시간에 예약된 실습실이 있습니다.', {
                        pauseOnHover: false,
                        transition: Flip
                    });
                } else if (errorMessage.includes('요청 대기 상태에서는 취소 요청을 보낼 수 없습니다', {
                    pauseOnHover: false,
                    transition: Flip
                })) {
                    toast.error('요청 대기 상태에서는 취소 요청을 보낼 수 없습니다.', {
                        pauseOnHover: false,
                        transition: Flip
                    });
                } else if (error.response.status === 409) {
                    toast.error('이미 대여 요청이 존재하거나 예약이 중복되었습니다.', {
                        pauseOnHover: false,
                        transition: Flip
                    });
                } else {
                    toast.error('실습실 대여 신청 중 오류가 발생하였습니다.', {
                        pauseOnHover: false,
                        transition: Flip
                    });
                }
            } else {
                toast.error('알 수 없는 오류가 발생하였습니다.', {
                    pauseOnHover: false,
                    transition: Flip
                });
            }
        }
    };

    const timeOptions = [
        '점심시간(12:30~13:40)',
        '방과후시간(16:30~18:10)',
        '저녁시간(18:10~19:10)',
        '야자시간(19:10~20:30)',
    ];

    const labOptions = [
        '2층 컴퓨터 교육실',
        '2층 메이커 실습실',
        '2층 LAP1',
        '2층 LAP2',
        '3층 프로젝트 실습실 (2-1 앞)',
        '3층 모바일 실습실 (2-2 앞)',
        '3층 임베디드 실습실 (2-3 앞)',
        '3층 응용프로그래밍 실습실1 (2-4 앞)',
        '3층 LAP3',
        '3층 LAP4',
        '4층 응용프로그래밍 실습실2 (1-1 앞)',
        '4층 게임개발 실습실 (1-2 앞)',
        '4층 채움교실 (1-4 앞)',
        '4층 LAP6',
        '4층 LAP7',
    ];

    return (
        <>
            <C.StudentSide />
            <S.TopCont>
                <S.Parent>
                    <S.FormCont className='rental-screen'>
                        <h1>실습실 대여하기</h1>
                        <form onSubmit={handleSubmit}>
                            <InputField
                                label="1. 대여희망일"
                                type="date"
                                name="rentalDate"
                                value={rentalDate}
                                placeholder="대여희망일"
                                onChange={(e) => setRentalDate(e.target.value)}
                                required
                            />
                            <InputField
                                label="2. 대표자 이름 기재 (반 / 이름)"
                                type="text"
                                name="rentalUser"
                                value={rentalUser}
                                placeholder="대표자 이름 기재 (반 / 이름)"
                                onChange={(e) => setRentalUser(e.target.value)}
                                required
                            />
                            <InputField
                                label="3. 사용 인원 전원 기재 (반 / 이름)"
                                type="text"
                                name="rentalUsers"
                                value={rentalUsers}
                                placeholder="사용 인원 전원 기재 (반 / 이름)"
                                onChange={(e) => setRentalUsers(e.target.value)}
                                required
                            />
                            <S.TextareaCont>
                                <span>4. 사용 목적</span>
                                <textarea
                                    className='rental-textarea'
                                    name='rentalPurpose'
                                    value={rentalPurpose}
                                    onChange={(e) => setRentalPurpose(e.target.value)}
                                    required
                                />
                            </S.TextareaCont>
                            <SelectField
                                label="5. 사용 대여 시간"
                                name="rentalStartTime"
                                value={rentalStartTime}
                                options={timeOptions}
                                onChange={(e) => setRentalStartTime(e.target.value)}
                                required
                            />
                            <SelectField
                                label="6. 대여 희망 실습실"
                                name="hopeLab"
                                value={hopeLab}
                                options={labOptions}
                                onChange={(e) => setHopeLab(e.target.value)}
                                required
                            />
                            <button type='submit' className='rental_btn'>대여하기</button>
                        </form>
                    </S.FormCont>
                </S.Parent>
                <ToastContainer limit={1} />
            </S.TopCont>
        </>
    );
};

export default LabRentalForm;
