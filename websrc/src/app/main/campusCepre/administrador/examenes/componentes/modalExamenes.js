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
import useMessages from 'app/hooks/useMessages';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import ConsultaCicloExamen from './cicloExamen';

const schema = yup.object().shape({
  anio: yup.string().required('Campo Requerido'),
  numeroExamen: yup.string().required('Campo Requerido'),
  // tipoExamen: yup.string().required('Campo Requerido'),
  fechaExamen: yup.string().required('Campo Requerido'),
  horaInicioExamen: yup.string().required('Campo Requerido'),
  horaFinExamen: yup.string().required('Campo Requerido'),
  denominacion: yup.string().required('Campo Requerido'),
});
const tiposExamen = [
  {
    denominacion: 'PARCIAL',
  },
  {
    denominacion: 'SIMULACRO',
  },
];

function ModalExamenes(props) {
  const { showSuccess, showError } = useMessages();
  const { editar, estadoCiclos } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [ciclos, setCiclos] = useState([]);
  const [anioActual, setAnioActual] = useState(0);
  const [ciclosActivos, setCiclosActivos] = useState([]);
  const [numeroExamenCiclo, setNumeroExamenCiclo] = useState(0);
  const [estadoData, setEstadoData] = useState(false);
  const [tipoExamenConsulta, setTipoExamenConsulta] = useState(null);
  const [numeroCiclo, setNumeroCiclo] = useState(null);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      anio: '',
      numeroExamen: '',
      tipoExamen: '',
      fechaExamen: '',
      horaInicioExamen: '',
      horaFinExamen: '',
      denominacion: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        anio: props.data.anio,
        tipoExamen: props.data.tipo_examen,
        numeroExamen: props.data.nro_examen,
        fechaExamen: props.data.fecha_examen,
        horaInicioExamen: props.data.hora_inicio,
        horaFinExamen: props.data.hora_fin,
        denominacion: props.data.denominacion_examen,
      });
    }
  }, [editar]);

  async function handleOpenDialog() {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    setAnioActual(year);
    reset({ anio: year, numeroExamen: numeroExamenCiclo });
    setOpenDialog(true);
    await axios
      .get(`${RutaGeneral}/examen/parcial/subir-notas/ver-ciclos/unit`)
      .then((resp) => {
        setCiclos(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function cambiarCiclosAnio(anio) {
    axios
      .get(`${RutaGeneral}/examen/ver-ciclos/${anio}`)
      .then((resp) => {
        setCiclosActivos(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function cambiarNumeroExamen(numero) {
    reset({ ...getValues(), numeroExamen: numero });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    // console.log('Data Form', data);

    // console.log('CiAR', arregloCiclos);
    axios
      .post(`${RutaGeneral}/examen/crear-nuevo/${data.anio}/${numeroCiclo}/${tipoExamenConsulta}`, {
        fecha_examen: data.fechaExamen,
        denominacion_examen: data.denominacion,
        tipo_examen: tipoExamenConsulta,
        nro_examen: data.numeroExamen,
        hora_inicio: data.horaInicioExamen,
        hora_fin: data.horaFinExamen,
      })
      .then((resp) => {
        showSuccess('Examen creado correctamente');
        axios.get(`${RutaGeneral}/examenes`).then((res2) => {
          props.setDatosExamenes(res2.data);
        });
        handleCloseDialog();
      })
      .catch((err) => {
        handleCloseDialog();
        showError('No se pudo crear el examen');
      });
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        {editar ? 'Editar' : 'Crear Nuevo Examen'}
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
              <b>{editar ? 'Editar Examen' : 'Crear Nuevo Examen'}</b>
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
          <ConsultaCicloExamen
            ciclos={ciclos}
            tiposExamen={tiposExamen}
            setNumeroExamenCiclo={setNumeroExamenCiclo}
            cambiarNumeroExamen={cambiarNumeroExamen}
            setEstadoData={setEstadoData}
            setTipoExamenConsulta={setTipoExamenConsulta}
            setNumeroCiclo={setNumeroCiclo}
          />
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="md:flex">
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:mr-5"
                    select
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    fullWidth
                    label="Tipo Examen"
                    error={!!errors.tipoExamen}
                    helperText={errors.tipoExamen && errors.tipoExamen?.message}
                  >
                    {tiposExamen.map((option, index) => (
                      <MenuItem key={index} value={option.denominacion}>
                        {option.denominacion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="tipoExamen"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:mr-5"
                    select
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    fullWidth
                    label="Ciclo"
                    error={!!errors.ciclo}
                    helperText={errors.ciclo && errors.ciclo?.message}
                  >
                    {tiposExamen.map((option, index) => (
                      <MenuItem key={index} value={option.denominacion}>
                        {option.denominacion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="ciclo"
                control={control}
              />
            </div> */}
            <div className="md:flex">
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:mr-5"
                    {...field}
                    label="Denominacion"
                    disabled={!estadoData}
                    fullWidth
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
                    className="mb-12 md:mr-5"
                    {...field}
                    type="number"
                    disabled
                    label="Numero Examen"
                    fullWidth
                    error={!!errors.numeroExamen}
                    helperText={errors.numeroExamen && errors.numeroExamen?.message}
                  />
                )}
                name="numeroExamen"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 "
                    {...field}
                    fullWidth
                    disabled
                    type="number"
                    label="Año"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      cambiarCiclosAnio(e.target.value);
                    }}
                    error={!!errors.anio}
                    helperText={errors.anio && errors.anio?.message}
                  />
                )}
                name="anio"
                control={control}
              />
            </div>
            <div className="md:flex">
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:mr-5"
                    {...field}
                    fullWidth
                    disabled={!estadoData}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    label="Fecha Examen"
                    error={!!errors.fechaExamen}
                    helperText={errors.fechaExamen && errors.fechaExamen?.message}
                  />
                )}
                name="fechaExamen"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:mr-5"
                    {...field}
                    fullWidth
                    disabled={!estadoData}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="time"
                    label="Hora Inicio Examen"
                    error={!!errors.horaInicioExamen}
                    helperText={errors.horaInicioExamen && errors.horaInicioExamen?.message}
                  />
                )}
                name="horaInicioExamen"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12"
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="time"
                    disabled={!estadoData}
                    label="Hora Fin Examen"
                    fullWidth
                    error={!!errors.horaFinExamen}
                    helperText={errors.horaFinExamen && errors.horaFinExamen?.message}
                  />
                )}
                name="horaFinExamen"
                control={control}
              />
            </div>
            {/* {ciclosActivos.map((value, index) => (
              <div key={index} className="flex">
                <Controller
                  name={`${value.id}`}
                  label={`${value.id}`}
                  type="checkbox"
                  control={control}
                  defaultValue={false}
                  // defaultValue={value.estudiante.id_aula !== null}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        // if (e.target.checked === true)
                        //   setCantidadSeleccionada(cantidadSeleccionada + 1);
                        // else if (e.target.checked === false)
                        //   setCantidadSeleccionada(cantidadSeleccionada - 1);
                      }}
                    />
                  )}
                />
                <Typography className="flex pt-10">{value.denominacion}</Typography>
              </div>
            ))} */}
            <Button className="mb-12" variant="contained" color="primary" type="submit">
              {editar ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalExamenes;
