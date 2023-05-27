import { Button, TextField } from "@mui/material";
import styled, { createGlobalStyle } from "styled-components";

export const ToolbarContainer = styled.div`
  background-color: ${({ theme }) => theme.bgc};
  transition: all 0.3s ease-in;
  margin: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 80px;
  align-items: center;
  @media (max-width: 2560px) {
    max-width: 1550px;
  }
`;

export const Typography = styled.p`
  color: ${({ theme }) => theme.text};
  text-transform: none;
  text-align: center;
  transition: all 0.3s ease-in;
  font-size: 0.875rem;
  font-family: "InteLight";
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  text-transform: none;
  font-family: "InterBold";
  transition: all 0.3s ease-in;
  font-size: 4.5em;
  background: #0f6cbf;
  background: linear-gradient(to right, #0f6cbf 0%, white 99%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Logo = styled.h3`
  color: ${({ theme }) => theme.text};
  font-family: "InterBold";
  padding: 5px;
  border-radius: 0.5em;
  border: 1px solid ${({ theme }) => theme.text};
  transition: all 0.3s ease-in;
  &:hover {
    border: 3px solid black;
    transition: all 0.3s ease-in;
    background-color: ${({ theme }) => theme.bgcLogoHover};
    color: ${({ theme }) => theme.colorLogoHover};
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  min-width: 368px;
  overflow: hidden;
`;

export const Section = styled.div`
  height: 100%;
  max-width: 1660px;
  overflow: hidden;
  padding-top: 1em;
  padding-bottom: 1em;
  margin: auto;
  @media (max-width: 2560px) {
    max-width: 1400px;
  }
  @media (max-width: 1440px) {
    max-width: 1320px;
  }
  @media (max-width: 1240px) {
    max-width: 1180px;
    min-width: 1080px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const InputField = styled(TextField)(({ theme }) => ({
  "&.MuiTextField-root": {
    height: "100%",
  },
  "& .MuiInputBase-formControl": {
    height: "100%",
    color: theme.text,
  },
  "& .MuiInputBase-input": {
    height: "100% !important",
    overflow: "visible !important",
  },
}));

export const Item = styled.div`
  background-color: ${({ theme }) => theme.item};
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 0.3s ease-in;
  border-radius: 0.4em;
  border: 0.5px solid ${({ theme }) => theme.border};
  /* box-shadow: 0px 0px 5px -2px rgba(0, 0, 0,0.2); */
`;

export const Row = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const Col = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const NotAllowed = styled.div`
  overflow: hidden;
  display: none;
  height: 50vh;
  @media (max-width: 1024px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Gridd = styled.div`
  display: grid;
  grid-template-columns: 24.5% 22% 9% 24% 1fr;
  grid-template-rows: 80px 80px;
  gap: 10px;
`;

export const GlobalStyle = createGlobalStyle`
    body,
    html,
    * {
        margin: 0;
        padding: 0;
        font-family: 'InterRegular';
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
        min-height: 100vh;
        background-color: ${({ theme }) => theme.bgc};
        transition: all 0.3s ease-in ;
    }
`;

export const ButtonStyled = styled(Button)(({ theme }) => ({
  color: `white !important`,
  width: "30%",
  backgroundColor: `${theme.bgcHeroBtn} !important`,
  "&:hover": {
    backgroundColor: `${theme.bgcHover} !important`,
  },
  textTransform: "none !important",
}));

export const ButtonStyledSec = styled(Button)(({ theme }) => ({
  color: `white !important`,
  width: "30%",
  backgroundColor: `#166DC0 !important`,
  "&:hover": {
    backgroundColor: `${theme.bgcHover} !important`,
  },
  textTransform: "none !important",
}));
