"use client";

import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="w-full relative flex items-center">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={(isShowPassword && "text") || type}
        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed
                        ${
                          errors[id]
                            ? "border-rose-400 focus:border-rose-600"
                            : "border-slate-300 focus:border-slate-500"
                        }
                        ${type === "password" ? "pr-10" : ""}
                  `}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
                    ${errors[id] ? "text-rose-500" : "text-slate-400"}
                  `}
      >
        {label}{" "}
        {required && (
          <span className="text-sm absolute pl-[2px] text-red-400">*</span>
        )}
      </label>
      {type === "password" && (
        <span
          className="absolute right-2 cursor-pointer p-2"
          title={`Show Password`}
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? <IoMdEye size={24} /> : <IoMdEyeOff size={24} />}
        </span>
      )}
    </div>
  );
};

export default Input;
