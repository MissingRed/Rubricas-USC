import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthContext from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const { register, errors } = useAuthContext();

  const handleRegister = async (event) => {
    event.preventDefault();
    const emailRegex = /^[A-Za-z0-9._%+-]+@usc\.edu\.co$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, ingresa un correo electrónico válido de la organización",
      });
      return;
    }

    register({ name, email, password, password_confirmation });
  };

  return (
    <section className="bg-gray-50 py-20 lg:py-[120px]">
      <div className="container mx-auto drop-shadow-md">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="
            relative
            mx-auto
            max-w-[525px]
            overflow-hidden
            rounded-lg
            bg-white
            py-16
            px-10
            text-center
            sm:px-12
            md:px-[60px]
          "
            >
              <div className="mb-10 flex justify-center md:mb-16">
                <img
                  src="https://genvirtual.usc.edu.co/posv/logo_acreditacion_Institucional.png"
                  alt=""
                  className="img"
                />
              </div>
              <div className="mb-10 text-center">
                Obten un cuenta para comenzar a procesar rubricas
              </div>
              <form onSubmit={handleRegister}>
                <div className="mb-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    className="
                  bordder-[#E9EDF4]
                  w-full
                  rounded-md
                  border
                  bg-[#FCFDFE]
                  py-3
                  px-5
                  text-base text-body-color
                  placeholder-[#ACB6BE]
                  outline-none
                  focus:border-primary
                  focus-visible:shadow-none
                "
                  />
                  {errors.name && (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errors.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                  bordder-[#E9EDF4]
                  w-full
                  rounded-md
                  border
                  bg-[#FCFDFE]
                  py-3
                  px-5
                  text-base text-body-color
                  placeholder-[#ACB6BE]
                  outline-none
                  focus:border-primary
                  focus-visible:shadow-none
                "
                  />
                  {errors.email && (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errors.email[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="
                  bordder-[#E9EDF4]
                  w-full
                  rounded-md
                  border
                  bg-[#FCFDFE]
                  py-3
                  px-5
                  text-base text-body-color
                  placeholder-[#ACB6BE]
                  outline-none
                  focus:border-primary
                  focus-visible:shadow-none
                "
                  />
                  {errors.password && (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errors.password[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    placeholder="Confirma Contraseña"
                    className="
                  bordder-[#E9EDF4]
                  w-full
                  rounded-md
                  border
                  bg-[#FCFDFE]
                  py-3
                  px-5
                  text-base text-body-color
                  placeholder-[#ACB6BE]
                  outline-none
                  focus:border-primary
                  focus-visible:shadow-none
                "
                  />
                  {errors.password_confirmation && (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errors.password_confirmation[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-10">
                  <button
                    type="submit"
                    className="
                    w-full
                    px-4
                    py-3
                    bg-[#166DC0]
                    hover:bg-[#424242] 
                    rounded-md
                    text-white
                "
                  >
                    Registrarse
                  </button>
                </div>
              </form>
              <p className="text-base text-[#adadad]">
                ¿Ya eres miembro?&nbsp;
                <Link to="/login" className="text-primary hover:underline">
                  Inicia Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
