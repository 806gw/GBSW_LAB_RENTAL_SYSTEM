import LoginContainer from "./components/LoginContainer";
import NotLoginSide from "./components/Sidebar/NotLogin";
import StudentSide from "./components/Sidebar/student";
import TeacherSide from "./components/Sidebar/admin";
import Loading from "./components/Loading";
import LabModal from "./components/Modal/Rab";
import LogOutModal from "./components/Modal/LogOut";
import TeacherModal from "./components/Modal/Teacher";
import Landing from "./pages/Landing";
import LabRentalForm from "./pages/Main/Home/StudentScreen/LabRentalForm";
import StudentScreen from "./pages/Main/Home/StudentScreen/Home";
import TeacherScreen from "./pages/Main/Home/TeacherScreen/Home";
import RentApproval from "./pages/Main/Home/TeacherScreen/RentApproval";
import RentDeletion from "./pages/Main/Home/TeacherScreen/RentDeletion";
import RentManagement from "./pages/Main/Home/TeacherScreen/RentManagement";
import SignIn from "./pages/User/SignUp";
import NotFound from "./pages/Error";
import CommonRouter from "./layout/Common";
import PrivateRoute from "./layout/Private";

export {
  LoginContainer,
  NotLoginSide,
  StudentSide,
  TeacherSide,
  Loading,
  LabModal,
  LogOutModal,
  TeacherModal,
  Landing,
  LabRentalForm,
  StudentScreen,
  TeacherScreen,
  RentApproval,
  RentDeletion,
  RentManagement,
  SignIn,
  NotFound,
  CommonRouter,
  PrivateRoute,
};
