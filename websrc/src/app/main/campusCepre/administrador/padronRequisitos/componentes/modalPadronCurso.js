import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import useMessages from 'app/hooks/useMessages';

const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
  // descripcion: yup.string().required('Campo Requerido'),
});

function ModalCiclo(props) {
  const { editar, data } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDocumento, setDataDocumento] = useState('');
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
      descripcion: '',
    },
    resolver: yupResolver(schema),
  });

  function handleOpenDialog() {
    if (editar) {
      reset({
        denominacion: data.nombre_documento,
        descripcion: data.descripcion,
      });
      setDataDocumento(data.documento);
    }

    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(dataForm) {
    const formData = new FormData();
    formData.append('nombre_documento', dataForm.denominacion);
    formData.append('descripcion', dataForm.descripcion);
    formData.append('documento', dataDocumento);

    if (editar) {
      axios
        .put(`${RutaGeneral}/documentos-requisito/${data.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((val) => {
          showSuccess('Requisito actualizado correctamente.');
          reset({});
          axios
            .get(`${RutaGeneral}/documentos-requisito`)
            .then((res) => {
              props.setDatosCiclo(res.data);
            })
            .catch((err) => {});
          handleCloseDialog();
        })
        .catch((err) => {
          showError('No se pudo actualizar el requisito.');
          handleCloseDialog();
        });
    } else {
      axios
        .post(`${RutaGeneral}/documentos-requisito`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((val) => {
          showSuccess('Requisito agregado correctamente.');
          reset({});
          axios
            .get(`${RutaGeneral}/documentos-requisito`)
            .then((res) => {
              props.setDatosCiclo(res.data);
            })
            .catch((err) => {});
          handleCloseDialog();
        })
        .catch((err) => {
          showError('No se pudo agregar el requisito.');
          handleCloseDialog();
        });
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        {editar ? 'Editar requisito' : 'Agregar Requisito'}
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
              <b>{editar ? 'Editar Requisito' : 'Nuevo Requisito'}</b>
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
                    label="Descripcion"
                    error={!!errors.descripcion}
                    helperText={errors.descripcion && errors.descripcion?.message}
                  />
                )}
                name="descripcion"
                control={control}
              />
            </div>
            <Typography className="my-16" variant="body1" color="inherit">
              Archivo Adjunto
            </Typography>
            <div id="upload-box">
              <input type="file" onChange={(e) => setDataDocumento(e.target.files[0])} />
            </div>

            <Button
              // disabled={editar}
              className="my-12"
              variant="contained"
              color="primary"
              type="submit"
            >
              {editar ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCiclo;
