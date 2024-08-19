import React from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../../components/InputComponent";
import axiosApi from "../../axios";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";

interface IRegister {
  loginId: string;
  name: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IRegister>();

  const password = watch("password");

  const registerUser = async (data: IRegister) => {
    const { loginId, name, password } = data;
    const res = await axiosApi.post("/join", {
      loginId,
      name,
      password,
    });
    if (res.status === 200) {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-[#320E50] via-[#301635] to-[#271921]">
      <Title />
      <div className="my-4">
        <span className="text-white ">다양한 장르의 영미 고전문학 학습</span>
      </div>
      <form
        onSubmit={handleSubmit(registerUser)}
        className="flex flex-col items-center justify-center w-full "
      >
        <InputComponent
          id="loginId"
          type="text"
          label="아이디"
          register={register}
        />
        {errors.loginId && (
          <span className="text-red-600 w-[60%] font-bold text-center">
            {errors.loginId.type === "required" && "아이디를 입력해주세요"}
          </span>
        )}

        <InputComponent
          id="name"
          type="text"
          label="이름"
          register={register}
        />
        {errors.name && (
          <span className="text-red-600 w-[60%] font-bold text-center">
            {errors.name.type === "required" && "이름을 입력해주세요"}
          </span>
        )}

        <InputComponent
          id="password"
          type="password"
          label="비밀번호"
          register={register}
        />
        {errors.password && (
          <span className="text-red-600 w-[60%] font-bold text-center">
            {errors.password.type === "required" && "비밀번호를 입력해주세요"}
          </span>
        )}

        <div className="flex flex-col items-center w-[30%] mb-4">
          <div className="flex w-[100%]">
            <label
              htmlFor="confirmPassword"
              className="text-xs text-[white] font-bold mb-1 ml-2 hover:opacity-60"
            >
              비밀번호 확인
            </label>
          </div>
          <div className="flex w-[100%]">
            <input
              type="password"
              id="confirmPassword"
              className="w-[100%] rounded-2xl py-2 px-1"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password,
              })}
            />
          </div>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-600 w-[60%] font-bold text-center">
            {errors.confirmPassword.type === "required" &&
              "비밀번호를 한번 더 입력해주세요"}
            {errors.confirmPassword.type === "validate" &&
              "비밀번호가 일치 하지 않습니다."}
          </span>
        )}

        <button className="bg-[#6100C2] text-white w-[30%] rounded-lg mb-4 p-2 hover:opacity-60 font-bold">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Register;
