import * as S from "./style";

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    required = false,
}) => {
    const today = getTodayDate();

    return (
        <S.InputCont>
            <span>{label}</span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                min={type === "date" ? today : undefined}
            />
        </S.InputCont>
    );
};

export default InputField;

