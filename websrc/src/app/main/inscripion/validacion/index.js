import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import useMessages from 'app/hooks/useMessages';
import AlertComponent from '../../../shared-components/alert';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ValidacionEstudiante = (props) => {
  const { ciclo, estadoData, setEstadoData } = props;
  const { showError } = useMessages();
  const [estadoAlert, setEstadoAlert] = React.useState(false);
  const [open, setOpen] = React.useState(props.estado);
  const [valueDate, setValueDate] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const onSubmit = (event) => {
    setLoading(true);
    axios
      .post(`${RutaGeneral}/verificar_preinscripcion`, {
        dni: event.dni,
        fecha_nacimiento: event.fechaNacimiento,
        id_ciclo: ciclo,
      })
      .then((res) => {
        setLoading(false);
        // console.log(res);
        props.setDetallesGenerales(res.data);
        setEstadoData(!estadoData);
        if (res.data.is_valid) props.cambiarEstado();
        else {
          // setEstadoAlert(true);
          showError(
            'Aun no realizaste el pago de tu cuota del compromiso de pago o no realizaste tu pre inscripción.'
          );
          setLoading(false);
        }
        if (res.data.inscripcion.estado_finalizado) props.setActiveStep(1);
        else {
          props.setActiveStep(0);
        }
      })
      .catch((err) => setLoading(false));
    // props.cambiarEstado();
  };
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography className="text-center" variant="h5" component="div">
            <b>Validacion de Preinscripcion y Compromiso de Pago</b>
          </Typography>
          <Typography className="text-center m-3 " variant="body2">
            Ingresa tu Documento Nacional de Identidad
            <br />y selecciona Buscar.
          </Typography>
          <form
            className="justify-items-center grid grid-rows-3 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="m-10">
              <TextField
                error={!!errors.dni}
                label="DNI"
                helperText={errors.dni?.type === 'required' && 'DNI requerido'}
                type="number"
                {...register('dni', { required: true })}
              />
            </div>
            <div className="m-10">
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.fechaNacimiento}
                helperText={errors.fechaNacimiento?.type === 'required' && 'Campo Requerido'}
                {...register('fechaNacimiento', { required: true })}
              />
            </div>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              className="my-16"
              type="submit"
              variant="contained"
              color="secondary"
              size="medium"
            >
              Buscar
            </LoadingButton>
          </form>
          <div className="w-full flex justify-end">
            <Tooltip title="Regresar a ventana de inicio">
              <IconButton color="primary" size="large" href="/">
                <HomeIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
          {estadoAlert && (
            <AlertComponent
              type="info"
              message="Aun no realizaste el pago de tu cuota del compromiso de pago o no realizaste tu pre inscripcion"
              vertical="top"
              horizontal="center"
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ValidacionEstudiante;
