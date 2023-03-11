import { AppBar, Button, Toolbar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Logo, ToolbarContainer, Typography } from "./Navbar.style";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "styled-components";
import MenuDesign from "./MenuDesign";
import { DataContext } from "../context/DataContext";
import { useContext, useEffect } from "react";
import useAuthContext from "../context/AuthContext";

const Navbar = () => {
  const theme = useTheme();
  const { setTheme } = useContext(DataContext);
  const { user, getUser, logout } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const toggleTheme = () => {
    setTheme((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  return (
    <AppBar
      style={{
        boxShadow: "none",
        backgroundColor: theme.bgc,
        transition: "all 0.3s ease-in",
      }}
      position="relative"
    >
      <ToolbarContainer>
        <Link style={{ textDecoration: "none" }} to="/">
          <Logo>
            <span style={{ fontWeight: "normal", fontSize: 14 }}>USC</span>
            Rubrics
          </Logo>
        </Link>
        <p>Bienvenido {user?.name}</p>
        <button onClick={logout}>Cerrar Sesión</button>
        <Button
          onClick={toggleTheme}
          style={{ boxShadow: "none", textTransform: "none" }}
        >
          <Typography style={{ marginRight: 8 }}>
            {theme.text === "#bfbfbf" ? "Ligth" : "Dark"}
          </Typography>
          {theme.text === "#bfbfbf" ? (
            <LightModeIcon style={{ color: theme.text }} />
          ) : (
            <DarkModeIcon style={{ color: theme.text }} />
          )}
        </Button>
      </ToolbarContainer>
    </AppBar>
  );
};

export default Navbar;
