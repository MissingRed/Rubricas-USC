import { MenuItem, TextField, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import axios from "axios";

const DataGeneral = () => {
  const { control } = useFormContext();
  const [signatures, setSignatures] = useState([]);
  const [signature, setSignature] = useState("");
  const [objetosEstudio, setObjetosEstudio] = useState([]);
  const [objetoEstudio, setObjetoEstudio] = useState("");

  useEffect(() => {
    fetchSignatures();
    fetchObjetosEstudio();
  }, []);

  const fetchSignatures = () => {
    axios
      .get("http://localhost:8000/api/asignaturas")
      .then((response) => {
        setSignatures(response.data);
        console.log(response.data);
        if (response.data.length > 0) {
          setSignature(response.data[0].nombre);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchObjetosEstudio = () => {
    axios
      .get("http://localhost:8000/api/objetos")
      .then((response) => {
        setObjetosEstudio(response.data);
        console.log(response.data);
        if (response.data.length > 0) {
          setObjetoEstudio(response.data[0].nombre);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignatureChange = (event) => {
    const { value } = event.target;
    setSignature(value);
  };

  const handleObjetoEstudioChange = (event) => {
    const { value } = event.target;
    setObjetoEstudio(value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <TextField
                required
                id="name"
                label="Nombre"
                variant="outlined"
                placeholder="Enter rubric name"
                margin="normal"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="object"
            defaultValue=""
            render={({ field }) => (
              <TextField
                required
                id="object"
                label="Objeto de estudio"
                variant="outlined"
                placeholder="Seleccione el objeto de estudio"
                margin="normal"
                select
                fullWidth
                value={objetoEstudio}
                onChange={handleObjetoEstudioChange}
                {...field}
              >
                {objetosEstudio.map((option) => (
                  <MenuItem key={option.id} value={option.nombre}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="signature"
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                required
                id="signature"
                label="Asignatura"
                variant="outlined"
                placeholder="Curso"
                margin="normal"
                value={signature}
                onChange={handleSignatureChange}
                fullWidth
                {...field}
              >
                {signatures.map((option) => (
                  <MenuItem key={option.id} value={option.nombre}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="date"
            defaultValue=""
            render={({ field }) => (
              <TextField
                required
                id="date"
                label=""
                variant="outlined"
                placeholder="Fecha de creacion"
                margin="normal"
                type="date"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="competency"
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="competency"
                label="Competencia"
                variant="outlined"
                placeholder="Competencia"
                margin="normal"
                multiline
                rows={4}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="learnResult"
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="learnResult"
                label="Resultado de aprendizaje"
                variant="outlined"
                placeholder="Resultado esperado"
                margin="normal"
                multiline
                rows={4}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DataGeneral;
