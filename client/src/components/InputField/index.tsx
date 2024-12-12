import * as S from "./style";
import React, { useState, useEffect } from "react";

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    required = false,
    placeholder,
}) => {
    const today = getTodayDate();
    const [inputValue, setInputValue] = useState(value || (type === "date" ? today : ""));

    useEffect(() => {
        if (type === "date" && !value) {
            setInputValue(today);
        } else if (value) {
            setInputValue(value);
        }
    }, [value, type, today]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e);
    };

    return (
        <S.InputCont>
            <span>{label}</span>
            <input
                type={type}
                name={name}
                value={inputValue}
                onChange={handleChange}
                required={required}
                placeholder={placeholder}
                min={type === "date" ? today : undefined}
            />
        </S.InputCont>
    );
};

export default InputField;
