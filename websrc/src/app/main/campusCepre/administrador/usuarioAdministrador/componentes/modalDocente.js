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
import Grid from '@mui/material/Grid';
import useMessages from 'app/hooks/useMessages';
import { LoadingButton } from '@mui/lab';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import ConsultaAdminDNI from './consultaAdminDNI';

const schema = yup.object().shape({
  dni: yup.string(),
  email: yup.string().required('Campo Requerido'),
  codigo_administrador: yup.string().required('Campo Requerido'),
});
const tiposExamen = [
  {
    denominacion: 'PARCIAL',
    denominacion2: 'P',
  },
  {
    denominacion: 'LOCADOR',
    denominacion2: 'L',
  },
  {
    denominacion: 'AUXILIAR',
    denominacion2: 'A',
  },
  {
    denominacion: 'CONTRATADO',
    denominacion2: 'C',
  },
];

function ModalCreacionAdmin(props) {
  const { editar, data, cursos } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const { showError, showSuccess } = useMessages();
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [dataCursos, setDataCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataPersona, setDataPersona] = useState(null);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      dni: '',
      email: '',
      codigo_administrador: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios
      .get(`${RutaGeneral}/padron-curso/activo`)
      .then((resp) => {
        setDataCursos(resp.data);
      })
      .catch((err) => {});
    if (editar) {
      reset({
        dni: data.dni,
        email: data.user_type.email,
        codigo_administrador: data.codigo_administrador,
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
    setLoading(true);
    // console.log('dataForm', dataForm);
    if (editar) {
      axios
        .put(`${RutaGeneral}/registro/administradores/${props.data.id}`, {
          email: dataForm.email,
          codigo_administrador: dataForm.codigo_administrador,
        })
        .then((res) => {
          setLoading(false);
          showSuccess('Actualizado correctamente');
          axios.get(`${RutaGeneral}/registro/administradores`).then((res2) => {
            props.setDatosPadronCurso(res2.data);
          });
          handleCloseDialog();
        })
        .catch((err) => {
          setLoading(false);
          showError('No se pudo registrar el docente');
          handleCloseDialog();
        });
    } else {
      axios
        .post(`${RutaGeneral}/registro/administradores`, {
          dni: dataPersona.dni,
          email: dataForm.email,
          codigo_administrador: dataForm.codigo_administrador,
          nombres: dataPersona.nombres,
          apellido_paterno: dataPersona.apellido_paterno,
          apellido_materno: dataPersona.apellido_materno,
        })
        .then((res) => {
          setLoading(false);
          showSuccess('Creado correctamente');
          axios.get(`${RutaGeneral}/registro/administradores`).then((res2) => {
            props.setDatosPadronCurso(res2.data);
          });
          handleCloseDialog();
        })
        .catch((err) => {
          setLoading(false);
          showError('No se pudo registrar el docente');
          handleCloseDialog();
        });
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        {editar ? 'Actualizar Administrador' : 'Crear Administrador'}
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
              <b>{editar ? 'Editar Administrador' : 'Crear Nuevo Administrador'}</b>
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
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-16 sm:pb-0' }}>
          {!editar && <ConsultaAdminDNI setDataPersona={setDataPersona} />}
          <Typography className="flex-auto m-10" variant="subtitle1" color="inherit">
            NOMBRE:{' '}
            {!editar &&
              dataPersona !== null &&
              `${dataPersona.nombres} ${dataPersona.apellido_paterno} ${dataPersona.apellido_materno}`}
            {editar &&
              `${data.user_type.first_name} ${data.user_type.last_name} ${data.user_type.sur_name}`}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="codigo_administrador"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Codigo Administrador"
                      error={!!errors.codigo_administrador}
                      helperText={
                        errors.codigo_administrador && errors.codigo_administrador?.message
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Correo"
                      error={!!errors.email}
                      helperText={errors.email && errors.email?.message}
                      // disabled
                    />
                  )}
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              className="mb-12"
              variant="contained"
              color="primary"
              type="submit"
              disabled={!editar && dataPersona === null}
            >
              {editar ? 'Actualizar' : 'Guardar'}
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCreacionAdmin;
