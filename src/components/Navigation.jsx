import { Route, Routes, useLocation } from "react-router-dom";
import {
  RubricScreen,
  HomeScreen,
  PageNotFound,
  GenerateRubric,
  ModalCreate,
  ModalSelect,
  CreatedRubric,
} from "../screens";
import Navbar from "./Navbar";
import Login from "../pages/Login";
import Register from "../Pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import { NotAllowed, Typography } from "./Navbar.style";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useTheme } from "styled-components";

import AuthLayout from "../layouts/AuthLayout";
import GuestLayout from "../layouts/GuestLayout";
import useAuthContext from "../context/AuthContext";

const Navigation = () => {
  const theme = useTheme();
  const location = useLocation();
  const background = location.state && location.state.background;
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <NotAllowed>
            <PhoneAndroidIcon
              style={{
                transition: "all 0.3s ease-in",
                textAlign: "center",
                width: "100%",
                color: theme.text,
                fontSize: 70,
              }}
            />
            <Typography style={{ color: theme.text }}>
              Devices frames <br /> not allowed.
            </Typography>
          </NotAllowed>
        </>
      ) : (
        ""
      )}

      <Routes location={background || location}>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomeScreen />}>
            <Route path="create/:id" element={<ModalCreate />} />
            <Route path="select" element={<ModalSelect />} />
          </Route>
        </Route>
        <Route path="/rubric" element={<RubricScreen />}>
          <Route path="generate/:id" element={<GenerateRubric />} />
          <Route path=":id" element={<CreatedRubric />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Navigation;
