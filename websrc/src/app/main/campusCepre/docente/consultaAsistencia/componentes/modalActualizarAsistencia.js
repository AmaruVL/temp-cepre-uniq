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
  observacion: yup.string().required('Campo Requerido'),
});

function ModalActualizarAsistencia(props) {
  const { value ,fechaIn,fechaFin,curso} = props;
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataRequisitos, setDataRequisitos] = useState({ asignados: [], no_asignados: [] });
  const [dataLoad, setDataLoad] = useState(false);
  const [imagenPortadaCiclo, setImagenPortadaCiclo] = useState('');
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      observacion: '',
    },
    resolver: yupResolver(schema),
  });

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
    axios
      .patch(
        `${RutaGeneral}/docente/asistencia/lista-asistencia/modificar-asistencia/${value.id}`,
        {
          estado_asistencia: !value.estado_asistencia,
          observacion: dataForm.observacion,
        }
      )
      .then((res) => {
        handleCloseDialog();
        showSuccess('Ciclo creado correctamente');
        reset({});
        axios
          .post(`${RutaGeneral}/docente/asistencia/lista-estudiantes/${curso}`, {
            f_inicio: fechaIn,
            f_fin: fechaFin,
          })
          .then((res2) => {
            // console.log('Asistencia', res2.data);
            props.setDataEstudiante(res2.data);
          })
          .catch((err) => {
            showError('No se realizo correctamente la consulta.');
          });
      })
      .catch((err) => {
        handleCloseDialog();
        showError('El ciclo no fue creado correctamente');
      });
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()}>
        Cambiar Asistencia
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
              <b>Editar Asistencia</b>
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
                    label="Ingresar motivo para el cambio de asistencias."
                    error={!!errors.observacion}
                    helperText={errors.observacion && errors.observacion?.message}
                  />
                )}
                name="observacion"
                control={control}
              />
            </div>
            <Button className="my-12" variant="contained" color="primary" type="submit">
              Cambiar asistencia
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalActualizarAsistencia;
