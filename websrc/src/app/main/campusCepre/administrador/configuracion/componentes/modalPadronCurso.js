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
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  clave: yup.string().required('Campo Requerido'),
  valor: yup.string().required('Campo Requerido'),
});

function ModalPadronCurso(props) {
  const { editar, setDatosConfiguracion } = props;
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      clave: '',
      valor: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        clave: props.data.clave,
        valor: props.data.valor,
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
        .put(`${RutaGeneral}/config-list/${props.data.id}`, {
          clave: data.clave,
          valor: data.valor,
        })
        .then((res) => {
          handleCloseDialog();
          showSuccess('Configuracion editada correctamente');
          axios.get(`${RutaGeneral}/config-list`).then((res2) => {
            setDatosConfiguracion(res2.data);
          });
        })
        .catch((err) => {
          showError('No se pudo editar configuracion');
        });
    } else {
      axios
        .post(`${RutaGeneral}/config-list`, {
          clave: data.clave,
          valor: data.valor,
        })
        .then((res) => {
          handleCloseDialog();
          reset({});
          showSuccess('Configuracion creada correctamente.');
          axios.get(`${RutaGeneral}/config-list`).then((res2) => {
            setDatosConfiguracion(res2.data);
          });
        })
        .catch((err) => {
          showError('No se pudo crear configuracion');
        });
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        {editar ? 'Actualizar configuracion' : 'Crear configuracion'}
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
              <b>{editar ? 'Actualizar configuración' : 'Crear configuración'}</b>
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
                  label="Clave"
                  fullWidth
                  error={!!errors.clave}
                  helperText={errors.clave && errors.clave?.message}
                />
              )}
              name="clave"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  label="Valor"
                  fullWidth
                  error={!!errors.valor}
                  helperText={errors.valor && errors.valor?.message}
                />
              )}
              name="valor"
              control={control}
            />
            <Button className="mb-12" variant="contained" color="primary" type="submit">
              {editar ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalPadronCurso;
