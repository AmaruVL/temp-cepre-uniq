import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { IconButton, Tooltip } from '@mui/material';

const schema = yup.object().shape({
  dni: yup
    .string()
    .required('Campo Requerido')
    .matches(/^[0-9]+$/, 'Solo numeros')
    .min(8, 'Solo 8 digitos')
    .max(8, 'Solo 8 digitos'),
});

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
  const [open, setOpen] = React.useState(props.estado);
  const [loading, setLoading] = React.useState(false);
  const { ciclo } = props;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm({
    defaultValues: {
      dni: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    axios
      .post(`${RutaGeneral}/procesovalidaciondni`, {
        dni: data.dni,
        id_ciclo: ciclo,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.dni) {
          const nuevoObjeto = { exists: res.data.exists, persona_data: { dni: res.data.dni } };
          props.setDatosGeneralesPreInscripcion(nuevoObjeto);
          props.setAlertValidacionDNI({
            estado: true,
            type: 'info',
            message:
              'Los datos del DNI consultado no fueron encontrados, completalos manualmente y recuerda revisar bien la informacion.',
            vertical: 'top',
            horizontal: 'center',
          });
        } else props.setDatosGeneralesPreInscripcion(res.data);
        // props.setDataPersona({ ...res.data.data, estado: true });
        props.cambiarEstado();
      })
      .catch((err) => {
        setLoading(false);
        // props.setDataPersona({ dni: data.dni, estado: false });
        // props.cambiarEstado();
        // props.setAlertValidacionDNI({
        //   estado: true,
        //   type: 'info',
        //   message:
        //     'Los datos del DNI consultado no fueron encontrados, completalos manualmente y recuerda revisar bien la informacion.',
        //   vertical: 'top',
        //   horizontal: 'center',
        // });
      });
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
            <b>Validacion de Datos</b>
          </Typography>
          <Typography className="text-center m-14 " variant="body2">
            Ingresa tu Documento Nacional de Identidad
            <br />y selecciona Buscar.
          </Typography>
          <form
            className="justify-items-center grid grid-rows-2 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.dni}
                  helperText={errors.dni && errors.dni?.message}
                  label="DNI"
                />
              )}
              name="dni"
              control={control}
            />
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
        </Box>
      </Modal>
    </div>
  );
};

export default ValidacionEstudiante;
