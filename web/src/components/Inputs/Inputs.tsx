import "./Inputs.scss";
import { Props } from "./types";

export const TextInput = ({
  type = "text",
  labelStyle = {},
  wrapperStyle = {},
  inputStyle = {},
  label,
  name,
  value,
  onChange,
  ...rest
}: Props): JSX.Element => {
  return (
    <div className="input-wrapper" style={wrapperStyle}>
      <label className="input-label" style={labelStyle}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
        {...rest}
      />
    </div>
  );
};
