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
import CreateIcon from '@mui/icons-material/Create';
import Tooltip from '@mui/material/Tooltip';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  nro_cuotas: yup.string(),
  tipo_colegio: yup.string(),
  monto_total: yup.string().required('Campo Requerido'),
});

function ModalEditarMonto(props) {
  const { editar, data } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
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
      nro_cuotas: '',
      tipo_colegio: '',
      monto_total: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        nro_cuotas: data.nro_cuotas,
        tipo_colegio: data.tipo_colegio === 'PU' ? 'Colegio Publico' : 'Colegio Privado',
        monto_total: data.monto_total,
      });
    }
  }, [data.monto_total, data.nro_cuotas, data.tipo_colegio, editar, reset]);

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
        .put(`${RutaGeneral}/pagos/${props.data.id}`, {
          id_ciclo: props.data.id_ciclo,
          nro_cuotas: parseInt(dataForm.nro_cuotas, 10),
          tipo_colegio: dataForm.tipo_colegio === 'Colegio Publico' ? 'PU' : 'PR',
          monto_total: dataForm.monto_total,
        })
        .then((res) => {
          handleCloseDialog();
          axios.get(`${RutaGeneral}/pagos-ciclo/${props.data.id_ciclo}`).then((res2) => {
            showSuccess('Guardado correctamente.');
            props.setDatosPagosCiclo(res2.data);
          });
        })
        .catch((err) => {
          showError('No se pudo guardar.');
        });
    }
  }

  return (
    <>
      <Tooltip title="Editar monto">
        <Button
          variant="outlined"
          startIcon={<CreateIcon />}
          color="success"
          onClick={handleOpenDialog}
        >
          Monto
        </Button>
      </Tooltip>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>Editar monto total</b>
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
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Nro cuotas"
                      error={!!errors.nro_cuotas}
                      helperText={errors.nro_cuotas && errors.nro_cuotas?.message}
                      disabled
                    />
                  )}
                  name="nro_cuotas"
                  control={control}
                />
              </div>
              <div className="col-span-2">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Tipo de colegio"
                      error={!!errors.tipo_colegio}
                      helperText={errors.tipo_colegio && errors.tipo_colegio?.message}
                      disabled
                    />
                  )}
                  name="tipo_colegio"
                  control={control}
                />
              </div>
            </div>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-12"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Monto total"
                  error={!!errors.monto_total}
                  helperText={errors.monto_total && errors.monto_total?.message}
                />
              )}
              name="monto_total"
              control={control}
            />
            <Button className="mb-12" variant="contained" color="primary" type="submit">
              Editar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalEditarMonto;
