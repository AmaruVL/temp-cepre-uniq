import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, MenuItem } from '@mui/material';
import axios from 'axios';
import useMessages from 'app/hooks/useMessages';
import RutaGeneral from 'app/shared-components/rutaGeneral';

const schema = yup.object().shape({
  grupoAcademico: yup.string().required('Campo Requerido'),
});

function ModalEscuelaProfesional(props) {
  const { editar, data } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [listaPadronCursos, setListaPadronCursos] = useState([]);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      grupoAcademico: '',
    },
    resolver: yupResolver(schema),
  });
  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/asignar-estudiantes/ver-grupos`)
      .then((res) => {
        setListaPadronCursos(res.data);
      })
      .catch((err) => {});
    reset({
      grupoAcademico: data?.id_grupo_academico?.id,
      codigo_escuela: data?.codigo_escuela,
      nombre_escuela_profesional: data?.nombre_escuela_profesional,
      abreviacion: data?.abreviacion,
    });
  }, [editar]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(dataForm) {
    console.log('DATA', dataForm);
    axios
      .patch(`${RutaGeneral}/escuelas-profesionales/${props.data.id}`, {
        id_grupo_academico: dataForm.grupoAcademico,
      })
      .then((res) => {
        axios.get(`${RutaGeneral}/escuelas-profesionales`).then((res2) => {
          props.setDatosCiclo(res2.data);
        });
        handleCloseDialog();
        showSuccess('Actualizado correctamente.');
      })
      .catch((err) => {
        showError('Actualizado correctamente.');
      });
    // if (editar) {
    //   axios
    //     .put(`${RutaGeneral}/escuelas-profesionales/${props.data.id_grupo_academico}`, {
    //       id_grupo_academico: dataForm.id_grupo_academico,
    //       codigo_escuela: dataForm.codigo_escuela,
    //       nombre_escuela_profesional: dataForm.nombre_escuela_profesional,
    //       abreviacion: dataForm.abreviacion,
    //     })
    //     .then((res) => {
    //       handleCloseDialog();
    //       axios.get(`${RutaGeneral}/escuelas-profesionales`).then((res2) => {
    //         props.setDatosCiclo(res2.data);
    //       });
    //     })
    //     .catch();
    // } else {
    //   axios
    //     .post(`${RutaGeneral}/sincronizar/escuelas-profesionales`, {
    //       id_grupo_academico: dataForm.id_grupo_academico,
    //       codigo_escuela: dataForm.codigo_escuela,
    //       nombre_escuela_profesional: dataForm.nombre_escuela_profesional,
    //       abreviacion: dataForm.abreviacion,
    //     })
    //     .then((res) => {
    //       handleCloseDialog();
    //       axios.get(`${RutaGeneral}/escuelas-profesionales`).then((res2) => {
    //         props.setDatosCiclo(res2.data);
    //       });
    //     })
    //     .catch();
    // }
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        Grupo Academico
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>Actualizar grupo academico</b>
            </Typography>
            <IconButton
              className="flex-none justify-items-end"
              onClick={handleCloseDialog}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Codigo Escuela"
                    error={!!errors.codigo_escuela}
                    helperText={errors.codigo_escuela && errors.codigo_escuela?.message}
                    disabled
                  />
                )}
                name="codigo_escuela"
                control={control}
              />
            </div>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Nombre Escuela Profesional"
                    error={!!errors.nombre_escuela_profesional}
                    helperText={
                      errors.nombre_escuela_profesional &&
                      errors.nombre_escuela_profesional?.message
                    }
                    disabled
                  />
                )}
                name="nombre_escuela_profesional"
                control={control}
              />
            </div>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12 md:mr-5"
                    select
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    fullWidth
                    label="Grupo Academico"
                    error={!!errors.grupoAcademico}
                    helperText={errors.grupoAcademico && errors.grupoAcademico?.message}
                  >
                    {listaPadronCursos.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.denominacion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="grupoAcademico"
                control={control}
              />
            </div>

            <Button className="my-12" variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalEscuelaProfesional;
