import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { LoadingButton } from '@mui/lab';
import useMessages from '../../../../hooks/useMessages';

const schema = yup.object().shape({
  descripcion: yup.string().required('Campo Requerido'),
  tipoRecurso: yup.string().required('Campo Requerido'),
});

function AsistenciaCurso(props) {
  const { idHorario } = props;
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataEstudiantes, setDataEstudiantes] = useState({ data: [], fecha: '' });
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      descripcion: '',
      tipoRecurso: '',
    },
    resolver: yupResolver(schema),
  });
  //   useEffect(() => {
  //     if (editar) {
  //       reset({
  //         nombre: props.data.nombre_curso,
  //         abreviacion: props.data.abreviacion,
  //         descripcion: props.data.descripcion,
  //       });
  //     }
  //   }, [editar]);

  function handleOpenDialog() {
    setOpenDialog(true);
    axios.post(`${RutaGeneral}/docente/asistencia/generar-asistencia/${idHorario}`).then((resp) => {
      setDataEstudiantes(resp.data);
    });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    setLoadingButton(true);
    const formData = new FormData();
    formData.append('archivo_adjunto', dataEstudiantes);
    formData.append('descripcion_material', data.descripcion);
    formData.append('enlace_recurso', data.enlace);
    formData.append('tipo_recurso', data.tipoRecurso);
    formData.append('id_horario', idHorario);
    axios
      .post(`${RutaGeneral}/docente/material-curso`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((val) => {
        setLoadingButton(false);
        showSuccess('Material agregado.');
        handleCloseDialog();
      })
      .catch((err) => {
        setLoadingButton(false);
        showError('No se pudo agregar el material.');
        handleCloseDialog();
      });
  }
  const actualizarEstado = (dataEstudiante) => {
    axios
      .patch(`${RutaGeneral}/docente/asistencia/tomar-asistencia/${idHorario}`, {
        id_estudiante: dataEstudiante.id_estudiante_horario.id_estudiante.id,
      })
      .then((resp) =>
        axios
          .post(`${RutaGeneral}/docente/asistencia/generar-asistencia/${idHorario}`)
          .then((res) => {
            setDataEstudiantes(res.data);
          })
      );
  };

  return (
    <>
      <Tooltip title="Llamar Asistencia">
        <IconButton color="secondary" onClick={handleOpenDialog}>
          {/* <EditIcon /> */}
          <PlaylistAddCheckIcon />
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
              <b>Asistencia</b>
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
          <Typography className="flex-auto" variant="subtitle1" color="inherit">
            <b>Fecha de Asistencia: </b>
            {dataEstudiantes.fecha}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {dataEstudiantes.data.map((value, index) => (
              <div key={index} className="flex">
                <Controller
                  name="crearExpedienteFp"
                  label="crearExpedienteFp"
                  type="checkbox"
                  control={control}
                  // defaultChecked={value.estado_asistencia}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={value.estado_asistencia}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        console.log('target checked', e.target.checked);
                        actualizarEstado(value);
                      }}
                    />
                  )}
                />
                <Typography className="flex pt-10">
                  {`${value.id_estudiante_horario.id_estudiante.user_type.first_name} ${value.id_estudiante_horario.id_estudiante.user_type.last_name} ${value.id_estudiante_horario.id_estudiante.user_type.sur_name}`}
                </Typography>
              </div>
            ))}
            {/* <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  fullWidth
                  label="Descripcion de Material"
                  error={!!errors.descripcion}
                  helperText={errors.descripcion && errors.descripcion?.message}
                />
              )}
              name="descripcion"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField className="mb-12" {...field} fullWidth label="Enlace Recurso" />
              )}
              name="enlace"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  label="Tipo de Recurso"
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  select
                  error={!!errors.tipoRecurso}
                  helperText={errors.tipoRecurso && errors.tipoRecurso?.message}
                >
                  {tipoRecursoData.map((value, index) => (
                    <MenuItem key={index} value={value.tipo}>
                      {value.tipo}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="tipoRecurso"
              control={control}
            />
            <div>
              <p className=" pt-10 text-left">Archivo</p>
              <div className="m-10" id="upload-box">
                <input type="file" onChange={(e) => setDataEstudiantes(e.target.files[0])} />
              </div>
            </div> */}

            <LoadingButton
              // loading={loadingButton}
              className="mb-12"
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleCloseDialog}
            >
              Guardar
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AsistenciaCurso;
