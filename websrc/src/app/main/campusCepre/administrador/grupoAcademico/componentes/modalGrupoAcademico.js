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
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import AlertComponent from 'app/shared-components/alertCuerpo';

const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
  abreviacion: yup.string().required('Campo Requerido'),
  descripcion: yup.string(),
});

function ModalGrupoAcademico(props) {
  const { editar, data } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
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
      denominacion: '',
      abreviacion: '',
      descripcion: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        denominacion: data.denominacion,
        abreviacion: data.abreviacion,
        descripcion: data.descripcion,
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

  function onSubmit(dataForm) {
    if (editar) {
      axios
        .put(`${RutaGeneral}/grupos-academicos/${props.data.id}`, {
          denominacion: dataForm.denominacion,
          abreviacion: dataForm.abreviacion,
          descripcion: dataForm.descripcion,
        })
        .then((res) => {
          handleCloseDialog();
          axios.get(`${RutaGeneral}/grupos-academicos`).then((res2) => {
            reset({});
            setVisibleAlerta(true);
            setEstadoAlerta(true);
            props.setDatosGrupoAcademico(res2.data);
          });
        })
        .catch((err) => {
          setVisibleAlerta(true);
          setEstadoAlerta(false);
        });
    } else {
      axios
        .post(`${RutaGeneral}/grupos-academicos`, {
          denominacion: dataForm.denominacion,
          abreviacion: dataForm.abreviacion,
          descripcion: dataForm.descripcion,
        })
        .then((res) => {
          handleCloseDialog();
          reset({});
          axios.get(`${RutaGeneral}/grupos-academicos`).then((res2) => {
            setVisibleAlerta(true);
            setEstadoAlerta(true);
            props.setDatosGrupoAcademico(res2.data);
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
        {editar ? 'Editar' : 'Crear Grupo Academico'}
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
              <b>{editar ? 'Actualizar Ciclo' : 'Crear Ciclo'}</b>
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
                  {...field}
                  className="mb-12"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Denominacion"
                  error={!!errors.denominacion}
                  helperText={errors.denominacion && errors.denominacion?.message}
                />
              )}
              name="denominacion"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-12"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Abreviacion"
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
                  {...field}
                  className="mb-12"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Descripcion"
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

export default ModalGrupoAcademico;
