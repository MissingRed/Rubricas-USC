import { Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Close from "@mui/icons-material/Close";
import useAuthContext from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { ButtonStyledSec } from "../components/Navbar.style";
import AdminRubrics from "../models/AdminRubrics";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
const AdminRubric = new AdminRubrics();

const styleDiv = {
  height: "100vh",
  width: "100%",
  position: "absolute",
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.534)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const styleModal = {
  padding: "2rem",
  width: "820px",
  height: "550px",
  backgroundColor: "white",
  borderRadius: "5px",
  position: "relative",
  overflowY: "auto",
};

const ModalSelect = () => {
  const { setDataRubric } = useContext(DataContext);
  const navigate = useNavigate();
  const { user, getUser } = useAuthContext();
  const [rubricas, setRubricas] = useState([]);

  useEffect(() => {
    if (!user) {
      getUser();
    }
    axios
      .get("http://localhost:8000/api/rubricas/" + user?.email)
      .then((response) => {
        setRubricas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteRubric = (id) => {
    axios
      .delete(`http://localhost:8000/api/rubricas/${id}`)
      .then((response) => {
        Swal.fire("¡Eliminado!", "La rúbrica ha sido eliminada.", "success");
        setRubricas(rubricas.filter((rubrica) => rubrica.id !== id));
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          "Ha ocurrido un error al eliminar la rúbrica.",
          "error"
        );
      });
  };

  const handleRubricaClick = (id) => {
    navigate(`/rubric/${id}`);
  };

  const handleGenerateRubric = () => {
    const rubric = AdminRubric.createRubric();
    setDataRubric(rubric);
    navigate(`/rubric/generate`);
  };

  return (
    <div style={styleDiv}>
      <div style={styleModal}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="bold" fontSize={20}>
            Selecciona Rúbrica
          </Typography>
          <Button onClick={() => navigate(-1)}>
            <Close />
          </Button>
        </div>
        <br />
        <ul className="divide-y divide-gray-200">
          {rubricas.length !== 0 ? (
            rubricas.map((rubrica) => (
              <div key={rubrica.id}>
                <div className="flex items-center">
                  {/* Enlace */}
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/rubric/generate/${rubrica.id}`}
                    className="flex-1"
                  >
                    <li className="py-2 px-4 hover:bg-blue-200 bg-opacity-50 rounded-lg transition duration-300 ease-in-out cursor-pointer">
                      {/* Contenido actual del enlace */}
                      <div className="flex space-x-3">
                        <div className="flex-1 space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {rubrica.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rubrica.subject} - {rubrica.signature}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rubrica.date}
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                  {/* Botón de eliminar */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => handleDeleteRubric(rubrica.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay rubricas para mostrar</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ModalSelect;
