import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import { FormProvider, useForm } from "react-hook-form";
import {
  DataGeneral,
  AddCriterion,
  AddDescripter,
  AdjustCriterion,
  AdjustDescripter,
} from "./index";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { saveDB } from "../helpers/filesHandler";
import { useEffect } from "react";

const steps = [
  "Datos generales",
  "Definir criterios",
  "Ajustar porcentajes Criterios",
  "Agregar descriptores",
  "Ajustar porcentajes Descriptores",
];

const stepContent = (step) => {
  switch (step) {
    case 0:
      return <DataGeneral />;
    case 1:
      return <AddCriterion />;
    case 2:
      return <AdjustCriterion />;
    case 3:
      return <AddDescripter />;
    case 4:
      return <AdjustDescripter />;
  }
};

const StepperMui = () => {
  const { user, getUser } = useAuthContext();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [csrfToken, setCsrfToken] = useState("");
  const { dataRubric, stepCompleted, setDataRubric } = useContext(DataContext);
  const criterions = dataRubric.listCriterionsArr;
  const navigate = useNavigate();
  const methods = useForm(dataRubric);

  const isStepOptional = (step) => {
    return step === 6;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (data) => {
    let newSkipped = skipped;

    const newdataRubric = Object.assign(dataRubric, data);
    setDataRubric(newdataRubric);

    if (activeStep === 1 && dataRubric.listCriterionsArr.length === 0)
      return alert("Debe agregar almenos un criterio");

    const initialValue = 0;

    const sum = dataRubric.listCriterionsArr.reduce(
      (acc, ctro) => acc + ctro.value,
      initialValue
    );

    if (activeStep === 2 && sum !== 100)
      return alert("Los porcentajes deben sumar 100%");

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleCreateRubric = async () => {
    //console.log(typeof dataRubric);
    dataRubric.email = user?.email;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/rubricasCrear",
        dataRubric,
        {
          headers: {
            "X-XSRF-TOKEN": csrfToken, // Incluye el token CSRF en el encabezado personalizado
          },
        }
      );

      console.log(response.data); // Manejar la respuesta de la API
    } catch (error) {
      console.error(error); // Manejar errores
    }
    navigate(`/rubric/${dataRubric.id}`);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
    if (!criterions) navigate("/");
    // Obtener el token CSRF de la cookie
    const csrfCookie = document.cookie.match(/XSRF-TOKEN=(.*?)(;|$)/);
    if (csrfCookie) {
      setCsrfToken(csrfCookie[1]);
    }
  }, [criterions]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Todos los campos han sido completados
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleCreateRubric}>Crear rúbrica</Button>
          </Box>
        </>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {stepContent(activeStep)}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  width: "100%",
                }}
              >
                <Button
                  color="inherit"
                  disabled={
                    activeStep === 0 || activeStep === 3 || activeStep === 4
                  }
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  style={{ textTransform: "none" }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button
                  disabled={activeStep === 3 && stepCompleted}
                  style={{ textTransform: "none" }}
                  type="submit"
                >
                  {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                </Button>
              </Box>
            </form>
          </FormProvider>
        </>
      )}
    </Box>
  );
};

export default StepperMui;
