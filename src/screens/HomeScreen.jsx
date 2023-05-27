import {
  ButtonStyled,
  ButtonStyledSec,
  Section,
  Title,
  Typography,
} from "../components/Navbar.style";
import { Box } from "@mui/material";
import imgHero from "../assets/imgs/headerImg.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import AdminRubrics from "../models/AdminRubrics";

const AdminRubric = new AdminRubrics();

const HomeScreen = () => {
  const { setDataRubric } = useContext(DataContext);
  const navigate = useNavigate();

  const handleCreateRubric = () => {
    const rubric = AdminRubric.createRubric();
    setDataRubric(rubric);
    navigate(`create/${rubric.id}`);
  };

  const handleSelectRubric = () => {
    navigate(`select`);
  };

  const handleGenerateRubric = () => {
    const rubric = AdminRubric.createRubric();
    setDataRubric(rubric);
    navigate(`/rubric/generate`);
  };

  return (
    <>
      <Section style={{ padding: 0 }}>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            maxWidth: "1320px",
            width: "85%",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <div
            style={{
              flex: 1,
              alignItems: "left",
              justifyContent: "space-evenly",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                textAlign: "left",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Universidad Santiago de Cali
            </Typography>
            <Title>
              Rúbricas <br /> Analíticas
            </Title>
            {/* <h4 style={{ color: "black", marginBottom: 10 }}>Prototype</h4> */}
            {/* <Typography
              style={{
                fontSize: "1em",
                textAlign: "left",
                width: "90%",
              }}
            >
              Instrumento de evaluación y aprendizaje que permite determinar el
              nivel de logro en la resolución de problemas, evaluar el grado de
              dominio de las competencias y comprender aspectos complejos,
              imprecisos y subjetivos.
            </Typography> */}
            <div style={{ width: "100%" }}>
              <ButtonStyled
                style={{
                  marginTop: 15,
                  marginRight: 15,
                  textTransform: "none",
                  backgroundColor: "",
                }}
                onClick={handleCreateRubric}
              >
                Diseñar
              </ButtonStyled>
              <ButtonStyledSec
                style={{
                  marginTop: 15,
                  marginRight: 15,
                  textTransform: "none",
                  backgroundColor: "",
                }}
                onClick={handleSelectRubric}
              >
                Rúbricas UML
              </ButtonStyledSec>
              {/* <Link style={{ textDecoration: "none" }} to="/rubric/generate">
                <ButtonStyledSec
                  style={{
                    marginTop: 15,
                    textTransform: "none",
                    backgroundColor: "",
                  }}
                  onClick={handleGenerateRubric}
                >
                  Rúbricas UML
                </ButtonStyledSec>
              </Link> */}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
            }}
          >
            <img src={imgHero} alt="ImgHero" style={{ height: 270 }} />
          </div>
        </Box>
      </Section>
      <Outlet />
    </>
  );
};

export default HomeScreen;
