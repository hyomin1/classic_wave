import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import { useForm } from "react-hook-form";
import axiosApi from "../../axios";
import { FaBook } from "react-icons/fa";
import Title from "../../components/Title";

interface ILogin {
  loginId: string;
  password: string;
}

function Login() {
  const { register, handleSubmit } = useForm<ILogin>();
  const navigate = useNavigate();

  const loginUser = async (data: ILogin) => {
    const { loginId, password } = data;
    const res = await axiosApi.post("/login", {
      loginId,
      password,
    });
    if (res.status === 200) {
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/home");
    }
    console.log(res.data);
  };
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
        onSubmit={handleSubmit(loginUser)}
        className="flex flex-col items-center justify-center w-full "
      >
        <InputComponent
          id="loginId"
          label="아이디"
          type="text"
          register={register}
        />
        <InputComponent
          id="password"
          label="비밀번호"
          type="password"
          register={register}
        />
        <button className="bg-[#6100C2] text-white w-[30%] rounded-2xl mb-4 p-2 hover:opacity-60">
          로그인
        </button>
      </form>
      <div className="text-white ">
        <span className="font-bold">계정이 없으신가요? </span>
        <Link to={"/register"} className="hover:opacity-60">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;
