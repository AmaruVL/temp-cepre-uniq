import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import AlertComponent from 'app/shared-components/alertCuerpo';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

const schema = yup.object().shape({
  nombre: yup.string().required('Campo Requerido'),
  abreviacion: yup.string().required('Campo Requerido'),
  descripcion: yup.string(),
});

function ModalPadronCurso(props) {
  const { editar } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      abreviacion: '',
      descripcion: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        nombre: props.data.nombre_curso,
        abreviacion: props.data.abreviacion,
        descripcion: props.data.descripcion,
      });
    }
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

  function onSubmit(data) {
    if (editar) {
      axios
        .put(`${RutaGeneral}/padron-cursos/${props.data.id}`, {
          nombre_curso: data.nombre,
          abreviacion: data.abreviacion,
          descripcion: data.descripcion,
          estado: true,
        })
        .then((res) => {
          handleCloseDialog();
          setVisibleAlerta(true);
          setEstadoAlerta(true);
          axios.get(`${RutaGeneral}/padron-cursos`).then((res2) => {
            props.setDatosPadronCurso(res2.data);
          });
        })
        .catch((err) => {
          setVisibleAlerta(true);
          setEstadoAlerta(false);
        });
    } else {
      axios
        .post(`${RutaGeneral}/padron-cursos`, {
          nombre_curso: data.nombre,
          abreviacion: data.abreviacion,
          descripcion: data.descripcion,
          estado: true,
        })
        .then((res) => {
          handleCloseDialog();
          reset({});
          setVisibleAlerta(true);
          setEstadoAlerta(true);
          axios.get(`${RutaGeneral}/padron-cursos`).then((res2) => {
            props.setDatosPadronCurso(res2.data);
          });
        })
        .catch((err) => {
          setVisibleAlerta(true);
          setEstadoAlerta(false);
        });
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        {editar ? 'Actualizar Curso' : 'Crear Curso'}
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
              <b>{editar ? 'Actualizar Curso' : 'Crear Curso'}</b>
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
            <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  fullWidth
                  label="Nombre"
                  error={!!errors.nombre}
                  helperText={errors.nombre && errors.nombre?.message}
                />
              )}
              name="nombre"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  fullWidth
                  label="Abreviatura"
                  error={!!errors.abreviacion}
                  helperText={errors.abreviacion && errors.abreviacion?.message}
                />
              )}
              name="abreviacion"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  label="Descripcion"
                  fullWidth
                  error={!!errors.descripcion}
                  helperText={errors.descripcion && errors.descripcion?.message}
                />
              )}
              name="descripcion"
              control={control}
            />
            <Button className="mb-12" variant="contained" color="primary" type="submit">
              {editar ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {visibleAlerta && (
        <AlertComponent
          type={estadoAlerta ? 'success' : 'error'}
          message={estadoAlerta ? 'Guardado correctamente' : 'Error al cargar'}
          vertical="bottom"
          horizontal="center"
        />
      )}
    </>
  );
}

export default ModalPadronCurso;
