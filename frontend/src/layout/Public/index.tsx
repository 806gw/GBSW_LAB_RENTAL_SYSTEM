import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const PublicRoute = () => {
    const navigate = useNavigate();
    const isLogin = !!localStorage.getItem("accessToken");

    useEffect(() => {
        if (isLogin) {
            const userRole = localStorage.getItem("userRole");

            if (userRole === "ROLE_ADMIN") {
                navigate("/admin");
            } else if (userRole === "ROLE_USER") {
                navigate("/student");
            } else {
                navigate("/");
            }
        }
    }, [isLogin, navigate]);

    if (!isLogin) {
        return <Outlet />;
    }

    return null;
};

export default PublicRoute;
