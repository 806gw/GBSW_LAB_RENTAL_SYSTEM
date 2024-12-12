import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "@src/api/axios";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginData {
  login: string;
  password: string;
}

interface SignupData {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
}

interface CheckTokenResponse {
  success: boolean;
  body: {
    userId: {
      id: number;
      type: "refresh" | "access";
    };
    userStatus: {
      id: number;
      username: string;
      role: "admin" | "user";
    };
    token: string;
  };
}

const toastId = "auth-toast";

const useAuth = () => {
  const [formData, setFormData] = useState<LoginData>({
    login: "",
    password: "",
  });

  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token || !isMounted) {
        return;
      }

      const isValid = await verifyToken(token);
      if (!isValid.success) {
        toast.warn("세션이 만료되었습니다.", {
          position: "top-right",
          autoClose: 1500,
          pauseOnHover: false,
          closeOnClick: true,
          transition: Flip,
        });
        handleLogout(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUsername = (): string | null => {
    return localStorage.getItem("username");
  };

  const verifyToken = async (
    token: string
  ): Promise<{
    success: boolean;
    username?: string;
    role?: "admin" | "user";
  }> => {
    try {
      const checkTokenResponse = await customAxios.get<CheckTokenResponse>(
        "/auth/check_token",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!checkTokenResponse.data.success) {
        return { success: false };
      }

      const { username, role } = checkTokenResponse.data.body.userStatus;

      return { success: true, username, role };
    } catch (err) {
      return { success: false };
    }
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
      const loginResponse = await customAxios.post<AuthResponse>(
        "/auth/login",
        {
          login: formData.login,
          password: formData.password,
        }
      );

      if (!loginResponse.data.success || !loginResponse.data.accessToken) {
        throw new Error("Login failed");
      }

      const accessToken = loginResponse.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", formData.login);

      const verificationResult = await verifyToken(accessToken);

      if (!verificationResult.success) {
        throw new Error("Token verification failed");
      }

      const { username, role } = verificationResult;

      toast.update(toastId, {
        render: `${username}님, 환영합니다.`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        closeButton: false,
        transition: Flip,
      });

      localStorage.setItem("username", username!);
      localStorage.setItem("role", role!);

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/student");
        } else {
          console.error("알 수 없는 권한:", role);
        }
      }, 1200);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "로그인에 실패했습니다. 다시 시도해주세요.";
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

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    toast.dismiss(toastId);
    toast.loading("회원가입 중입니다...", {
      position: "top-right",
      toastId,
      pauseOnHover: false,
      closeButton: false,
      transition: Flip,
    });

    try {
      const signupResponse = await customAxios.post<SignupResponse>(
        "/user/signup",
        signupData
      );

      if (!signupResponse.data.success) {
        throw new Error(signupResponse.data.message || "회원가입 실패");
      }

      toast.update(toastId, {
        render: "회원가입이 완료되었습니다. 로그인하세요.",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        closeButton: false,
        transition: Flip,
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "회원가입에 실패했습니다. 다시 시도해주세요.";
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

  const handleLogout = (showMessage: boolean = true) => {
    if (showMessage) {
      toast.info("로그아웃되었습니다.", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        closeButton: false,
        transition: Flip,
      });
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return {
    formData,
    signupData,
    handleFormChange,
    handleSignupChange,
    handleSignIn,
    handleSignUp,
    handleLogout,
    verifyToken,
    getUsername,
    isLoading,
    error,
  };
};

export default useAuth;
