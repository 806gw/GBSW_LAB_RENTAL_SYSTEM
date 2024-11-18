import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "@src/api/axios";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginData {
  userid: string;
  password: string;
}

const toastId = "login-toast";

const useAuth = () => {
  const [name, setName] = useState<string | null>(
    localStorage.getItem("userName") || null
  );

  const [formData, setFormData] = useState<LoginData>({
    userid: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      localStorage.setItem("userName", name);
    } else {
      localStorage.removeItem("userName");
    }
  }, [name]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    toast.dismiss(toastId);

    toast.loading("잠시만 기다려주세요..", {
      position: "top-right",
      toastId,
      pauseOnHover: false,
      closeButton: false,
      transition: Flip,
    });

    try {
      const response = await customAxios.post("/auth/login", {
        userid: formData.userid,
        password: formData.password,
      });

      const { accessToken, authorities, name: userName } = response.data;

      toast.update(toastId, {
        render: `${userName}님, 환영합니다.`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        closeButton: false,
        transition: Flip,
      });

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userRole", authorities[0]);

      setName(userName);

      let userAuthorities = Array.isArray(authorities)
        ? authorities
        : [authorities];

      setTimeout(() => {
        if (userAuthorities[0] === "ROLE_ADMIN") {
          navigate("/admin");
        } else if (userAuthorities[0] === "ROLE_USER") {
          navigate("/student");
        } else {
          console.error("알 수 없는 권한:", userAuthorities);
        }
      }, 1200);
    } catch (err: any) {
      const status = err.response?.status;
      const errorMessage =
        status === 400
          ? "아이디 또는 비밀번호가 틀렸습니다."
          : "로그인에 실패했습니다. 다시 시도해주세요.";

      setError(errorMessage);

      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        closeButton: false,
        transition: Flip,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    toast.info("로그아웃되었습니다.", {
      position: "top-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: false,
      closeButton: false,
      transition: Flip,
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return {
    name,
    formData,
    handleFormChange,
    handleSignIn,
    handleLogout,
    isLoading,
    error,
  };
};

export default useAuth;
