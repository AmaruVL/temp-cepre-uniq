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
import RutaGeneral from 'app/shared-components/rutaGeneral';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  dia_dictado: yup.string().required('Campo Requerido'),
  hora_inicio: yup.string().required('Campo Requerido'),
  hora_fin: yup.string().required('Campo Requerido'),
});

function ModalDia(props) {
  const { editar, data, idCiclo, setDatosHorariosCicloDia } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [creadoCorrectamente, setCreadoCorrectamente] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      dia_dictado: '',
      hora_inicio: '',
      hora_fin: '',
    },
    resolver: yupResolver(schema),
  });
  const listaDias = [
    { dia: 'LUN', nombre: 'LUNES' },
    { dia: 'MAR', nombre: 'MARTES' },
    { dia: 'MIE', nombre: 'MIERCOLES' },
    { dia: 'JUE', nombre: 'JUEVES' },
    { dia: 'VIE', nombre: 'VIERNES' },
    { dia: 'SAB', nombre: 'SABADO' },
  ];
  React.useEffect(() => {
    if (editar) {
      reset({
        dia_dictado: data.dia_dictado,
        hora_inicio: data.hora_inicio,
        hora_fin: data.hora_fin,
      });
    }
  }, [data, editar, reset]);

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
    if (editar) {
      axios
        .put(`${RutaGeneral}/horario-curso/${props.data.id}`, {
          id_horario: parseInt(props.data.id_horario.id, 10),
          dia_dictado: dataForm.dia_dictado,
          hora_inicio: dataForm.hora_inicio,
          hora_fin: dataForm.hora_fin,
        })
        .then((res) => {
          handleCloseDialog();
          axios
            .get(`${RutaGeneral}/horario-curso/${props.data.id_horario.id}`)
            .then((res2) => {
              showSuccess('Guardado correctamente.');
              setDatosHorariosCicloDia(res2.data);
            })
            .catch((err) => {
              showError('No se pudo guardar.');
            });
        })
        .catch((err) => {
          showError('No se pudo guardar.');
        });
    } else {
      axios
        .post(`${RutaGeneral}/horario-curso`, {
          id_horario: parseInt(props.idHorario, 10),
          dia_dictado: dataForm.dia_dictado,
          hora_inicio: dataForm.hora_inicio,
          hora_fin: dataForm.hora_fin,
        })
        .then((res) => {
          handleCloseDialog();
          showSuccess('Guardado correctamente.');
          reset({
            dia_dictado: '',
            hora_inicio: '',
            hora_fin: '',
          });
          axios
            .get(`${RutaGeneral}/horario-curso/${props.idHorario}`)
            .then((res2) => {
              setDatosHorariosCicloDia(res2.data);
            })
            .catch((err) => {
              showError('No se pudo guardar.');
            });
        })
        .catch((err) => {
          showError('No se pudo guardar.');
        });
    }
  }

  return (
    <>
      {!editar ? (
        <Button
          variant="outlined"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Crear Nuevo Horario
        </Button>
      ) : (
        <IconButton
          color="success"
          aria-label="Editar horario"
          component="span"
          onClick={handleOpenDialog}
        >
          <CreateIcon />
        </IconButton>
      )}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>{editar ? 'Editar' : 'Crear datos del curso'}</b>
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
            <div className="grid grid-cols-3">
              <div className="col-span-1 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      className="mb-12 md:mr-5"
                      select
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      label="Dia dictado"
                      error={!!errors.dia_dictado}
                      helperText={errors.dia_dictado && errors.dia_dictado?.message}
                    >
                      {listaDias.map((option, index) => (
                        <MenuItem key={index} value={option.dia}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="dia_dictado"
                  control={control}
                />
              </div>
              <div className="col-span-1 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      className="mb-12 md:mr-5"
                      {...field}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="time"
                      label="Hora Inicio"
                      error={!!errors.hora_inicio}
                      helperText={errors.hora_inicio && errors.hora_inicio?.message}
                    />
                  )}
                  name="hora_inicio"
                  control={control}
                />
              </div>
              <div className="col-span-1 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      className="mb-12 md:mr-5"
                      {...field}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="time"
                      label="Hora Fin"
                      error={!!errors.hora_fin}
                      helperText={errors.hora_fin && errors.hora_fin?.message}
                    />
                  )}
                  name="hora_fin"
                  control={control}
                />
              </div>
            </div>
            <Button className="mb-12" variant="contained" color="primary" type="submit">
              {editar ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* {visibleAlerta && (
        estadoAlerta ? showSuccess('Mensaje enviado correctamente.') : showError('No se pudo enviar el mensaje.');
        // <AlertComponent
        //   type={estadoAlerta ? 'success' : 'error'}
        //   message={estadoAlerta ? 'Guardado correctamente' : 'Error al cargar'}
        //   vertical="bottom"
        //   horizontal="center"
        // />
      )} */}
    </>
  );
}

export default ModalDia;
