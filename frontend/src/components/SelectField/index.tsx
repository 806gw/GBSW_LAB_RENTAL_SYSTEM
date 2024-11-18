import * as S from "./style";

interface SelectFieldProps {
    label: string;
    children: string;
    name: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}
const SelectField: React.FC<SelectFieldProps> = ({
    label,
    children,
    name,
    value,
    options,
    onChange,
    required = false,
}) => {
    return (
        <S.SelectCont>
            <span>{label}</span>
            <select
                className="rental-input"
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="" disabled >{children}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </S.SelectCont>
    );
};

export default SelectField;
