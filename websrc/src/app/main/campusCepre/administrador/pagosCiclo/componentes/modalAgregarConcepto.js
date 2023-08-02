import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, MenuItem, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  nro_cuotas: yup.string().required(),
  monto_parcial: yup.string().required(),
  fecha_inicio: yup.string().required(),
  fecha_fin: yup.string().required(),
  ide_itm: yup.string().required(),
});

function ModalAgregarConcepto(props) {
  const {
    conceptos,
    value,
    data,
    setdatosDetallesPagos,
    hallarTotal,
    ciclo,
    actualizarListaCuotas,
    setactualizarListaCuotas,
    setMontoTotal,
    setDatosPagosCiclo,
  } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nro_cuotas: value.nro_cuota,
      monto_parcial: 0,
      fecha_inicio: '',
      fecha_fin: '',
      ide_itm: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (value.concepto !== '') {
      reset({
        nro_cuotas: value.nro_cuota,
        monto_parcial: value.monto_parcial,
        fecha_inicio: value.fecha_inicio,
        fecha_fin: value.fecha_fin,
        ide_itm: value.ide_itm,
      });
    }
  }, []);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  function onSubmit(values) {
    const conceptoDetalle = encontrarConcepto(parseInt(values.ide_itm, 10));
    setloading(true);
    const dataEdit = {
      id_pago: data.id,
      nro_cuota: values.nro_cuotas,
      monto_parcial: values.monto_parcial,
      fecha_inicio: values.fecha_inicio,
      fecha_fin: values.fecha_fin,
      ide_itm: values.ide_itm,
      ide_esp: conceptoDetalle.ide_esp,
      concepto: conceptoDetalle.des_itm,
    };
    axios
      .put(`${RutaGeneral}/detalle-pago-test/${value.id}`, dataEdit)
      .then(() => {
        axios
          .get(`${RutaGeneral}/detalle-pago-lista/${data.id}`)
          .then((res) => {
            const monto = hallarTotal(res.data);
            axios
              .put(`${RutaGeneral}/pagos/${props.registro}`, {
                id_ciclo: ciclo,
                tipo_colegio: '---',
                nro_cuotas: value.nro_cuota,
                monto_total: monto,
              })
              .then(() => {
                setMontoTotal(parseFloat(monto));
                axios
                  .get(`${RutaGeneral}/pagos-ciclo/${ciclo}`)
                  .then((res2) => {
                    setDatosPagosCiclo(res2.data);
                  })
                  .catch((err) => {});
              });
            setdatosDetallesPagos(res.data);
            setloading(false);
            setOpenDialog(false);
          })
          .catch((err) => {});
      })
      .catch((e) => {
        showError('No se pudo actualizar la configuracion.');
        setloading(true);
        setOpenDialog(false);
      });
  }
  const encontrarConcepto = (id) => {
    console.log('IDDD', id);
    return conceptos.find((element) => element.ide_itm === id);
  };
  const cambiarMontoParcial = (id) => {
    const conceptoDetalle = encontrarConcepto(id);
    reset({ ...getValues(), monto_parcial: conceptoDetalle.val_unt });
  };
  return (
    <>
      <Tooltip title="Editar cuota">
        <IconButton
          variant="outlined"
          startIcon={<SettingsIcon />}
          color="success"
          onClick={handleOpenDialog}
        >
          <EditIcon />
        </IconButton>
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
              <b>Configurar Cuotas</b>
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
            <div className="grid grid-cols-2">
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
                      type="date"
                      label="Fecha inicio"
                      error={!!errors.fecha_inicio}
                      helperText={errors.fecha_inicio && errors.fecha_inicio?.message}
                    />
                  )}
                  name="fecha_inicio"
                  control={control}
                />
              </div>
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
                      type="date"
                      label="Fecha fin"
                      error={!!errors.fecha_fin}
                      helperText={errors.fecha_fin && errors.fecha_fin?.message}
                    />
                  )}
                  name="fecha_fin"
                  control={control}
                />
              </div>
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
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        cambiarMontoParcial(e.target.value);
                      }}
                      select
                      label="Concepto"
                      error={!!errors.ide_itm}
                      helperText={errors.ide_itm && errors.ide_itm?.message}
                    >
                      {conceptos.map((concepto, index) => (
                        <MenuItem key={index} value={concepto.ide_itm}>
                          {concepto.des_itm}-{concepto.val_unt}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="ide_itm"
                  control={control}
                />
              </div>
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
                      label="Monto parcial"
                      error={!!errors.monto_parcial}
                      helperText={errors.monto_parcial && errors.monto_parcial?.message}
                      disabled
                    />
                  )}
                  name="monto_parcial"
                  control={control}
                />
              </div>
            </div>
            <div className="w-full flex justify-center mb-10">
              <LoadingButton loading={loading} variant="contained" color="secondary" type="submit">
                Guardar configuracion
              </LoadingButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalAgregarConcepto;
