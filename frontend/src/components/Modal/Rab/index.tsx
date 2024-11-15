import * as S from './style';

import React, { useState, useEffect } from 'react';
import { IoIosWarning } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    onSuccess?: () => void;
    actionFunction: (userId: number) => Promise<void>;
}


const LabModal: React.FC<ModalProps> = ({ isOpen, onClose, userId, actionFunction }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleAction = async () => {
        if (userId === null) return;
        try {
            await actionFunction(userId);
            onClose();
        } catch (error) {
            console.error('Action failed', error);
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
                <p>
                    실습실 취소를 요청하면, 현재 빌린 실습실을 사용하지 못하며,
                    <br /> 다시 재신청을 해야합니다.
                </p>
                <S.BtnWrap>
                    <button onClick={handleAction} className='del_btn'>확인</button>
                    <button onClick={onClose} className='cancel_btn'>취소</button>
                </S.BtnWrap>
            </S.ModalWrapper>
        </S.ModalBackground>
    );
};

export default LabModal;
