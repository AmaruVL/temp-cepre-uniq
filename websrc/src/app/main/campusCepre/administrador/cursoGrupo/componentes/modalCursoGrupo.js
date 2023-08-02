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
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import AlertComponent from 'app/shared-components/alertCuerpo';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

const schema = yup.object().shape({
  curso: yup.string().required('Campo Requerido'),
  grupoAcademico: yup.string().required('Campo Requerido'),
  horas: yup.string().required('Campo Requerido'),
  // nroPreguntas: yup.string().required('Campo Requerido'),
});

function ModalCursoGrupo(props) {
  const { editar, estadoCursos, estadoGrupos } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      curso: '',
      grupoAcademico: '',
      horas: '',
      // nroPreguntas: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        curso: props.data.id_padron_curso.id,
        grupoAcademico: props.data.id_grupo_academico.id,
        horas: props.data.hora_semana,
        // nroPreguntas: props.data.nro_preguntas_examen,
      });
    }
  }, [editar]);

  function handleOpenDialog() {
    setOpenDialog(true);
    if (!editar) {
      reset({});
    }
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    console.log('DATA', data);
    if (editar) {
      axios
        .put(`${RutaGeneral}/padron-cursos-grupo/${props.data.id}`, {
          id_padron_curso: parseInt(data.curso, 10),
          hora_semana: parseInt(data.horas, 10),
          id_grupo_academico: parseInt(data.grupoAcademico, 10),
          // nro_preguntas_examen: parseInt(data.nroPreguntas, 10),
          estado: true,
        })
        .then((res) => {
          handleCloseDialog();
          setVisibleAlerta(true);
          setEstadoAlerta(true);
          axios.get(`${RutaGeneral}/padron-curso-grupo`).then((res2) => {
            props.setDatosPadronCursoGrupo(res2.data);
          });
        })
        .catch((err) => {
          setVisibleAlerta(true);
          setEstadoAlerta(false);
        });
    } else {
      axios
        .post(`${RutaGeneral}/padron-cursos-grupo`, {
          id_padron_curso: parseInt(data.curso, 10),
          hora_semana: parseInt(data.horas, 10),
          id_grupo_academico: parseInt(data.grupoAcademico, 10),
          // nro_preguntas_examen: parseInt(data.nroPreguntas, 10),
          estado: true,
        })
        .then((res) => {
          handleCloseDialog();
          setVisibleAlerta(true);
          setEstadoAlerta(true);
          axios.get(`${RutaGeneral}/padron-curso-grupo`).then((res2) => {
            props.setDatosPadronCursoGrupo(res2.data);
          });
        })
        .catch((err) => {
          setVisibleAlerta(true);
          setEstadoAlerta(false);
          console.log('Error', err.response);
        });
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        {editar ? 'Editar' : 'Crear Curso por Grupo'}
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
              <b>{editar ? 'Editar' : 'Crear Curso por Grupo'}</b>
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
            <div className="">
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:mr-5"
                    select
                    {...field}
                    fullWidth
                    label="Curso"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.curso}
                    helperText={errors.curso && errors.curso?.message}
                  >
                    {estadoCursos.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.nombre_curso}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="curso"
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
                    label="Grupo Academico"
                    error={!!errors.grupoAcademico}
                    helperText={errors.grupoAcademico && errors.grupoAcademico?.message}
                  >
                    {estadoGrupos.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.denominacion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="grupoAcademico"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:mr-5"
                    {...field}
                    type="number"
                    label="Horas por Semana"
                    fullWidth
                    error={!!errors.horas}
                    helperText={errors.horas && errors.horas?.message}
                  />
                )}
                name="horas"
                control={control}
              />
              {/* <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12"
                    {...field}
                    type="number"
                    label="Numero de Preguntas para el Examen"
                    fullWidth
                    error={!!errors.nroPreguntas}
                    helperText={errors.nroPreguntas && errors.nroPreguntas?.message}
                  />
                )}
                name="nroPreguntas"
                control={control}
              /> */}
            </div>
            <Button className="mb-12" variant="contained" color="primary" type="submit">
              {editar ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {visibleAlerta && (
        <AlertComponent
          type={estadoAlerta ? 'success' : 'error'}
          message={estadoAlerta ? 'Guardado correctamente' : 'Error al cargar'}
          vertical="bottom"
          horizontal="center"
        />
      )}
    </>
  );
}

export default ModalCursoGrupo;
