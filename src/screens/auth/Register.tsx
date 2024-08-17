import React from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../../components/InputComponent";
import axiosApi from "../../axios";
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import Title from "../../components/Title";

interface IRegister {
  loginId: string;
  name: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();
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
  const { register, handleSubmit } = useForm<IRegister>();
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-white"
      style={{
        background:
          "conic-gradient(from 180deg at 50% 50%, rgb(97, 0, 194) 175.51deg, rgb(25, 24, 23) 342.49deg)",
      }}
    >
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
        <InputComponent
          id="name"
          type="text"
          label="이름"
          register={register}
        />
        <InputComponent
          id="password"
          type="password"
          label="비밀번호"
          register={register}
        />
        <InputComponent
          id="confirmPassword"
          type="password"
          label="비밀번호 확인"
          register={register}
        />
        <button className="bg-[#6100C2] text-white w-[30%] rounded-2xl mb-4 p-2 hover:opacity-60">
          로그인
        </button>
      </form>
    </div>
  );
}

export default Register;
