import * as S from './style';

import React, { useState, useEffect } from 'react';
import { customAxios } from "@src/api/axios";
import { IoIosWarning } from "react-icons/io";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    fetchAvailableLabs: () => void;
}

const RabModal: React.FC<CustomModalProps> = ({ isOpen, onClose, userId, fetchAvailableLabs }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleDelete = async () => {
        if (userId === null) return;
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await customAxios.patch(`/lab/cancel/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            console.log(response.data)

            if (!response.data.auth) {
                alert('자신이 신청한 실습실이 아닙니다.');
                setIsVisible(false)
            } else {
                onClose();
                fetchAvailableLabs();
            }
        } catch (error: any) {
            console.error('실습실 취소 실패', error.response?.data || error.message);
        }
    };


    if (!isVisible) return null;

    return (
        <S.ModalBackground onClick={onClose}>
            <S.ModalWrapper $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <S.WarningTextWrap>
                    <IoIosWarning className='warning_logo' />
                    <h1>정말로 이 실습실 신청을 취소하시겠습니까?</h1>
                </S.WarningTextWrap>
                <p>실습실 취소를 요청하면, 현재 빌린 실습실을 사용하지 못하며, <br /> 다시 재신청을 해야합니다.</p>
                <S.BtnWrap>
                    <button onClick={handleDelete} className='del_btn'>확인</button>
                    <button onClick={onClose} className='cancel_btn'>취소</button>
                </S.BtnWrap>
            </S.ModalWrapper>
        </S.ModalBackground>
    );
};

export default RabModal;
