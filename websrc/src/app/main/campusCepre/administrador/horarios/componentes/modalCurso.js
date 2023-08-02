import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, MenuItem } from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import useMessages from '../../../../../hooks/useMessages';
import ModalHorarioDia from './modalHorarioDia';

const schema = yup.object().shape({
  id_aula: yup.string().required('Campo Requerido'),
  id_docente: yup.string().required('Campo Requerido'),
  id_padron_cursos_grupo: yup.string().required('Campo Requerido'),
  // enlace_meet: yup.string(),
});

function ModalCurso(props) {
  const { editar, data, idCiclo, setDatosHorariosCiclo } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [listaAulas, setListaAulas] = useState([]);
  const [listaDocentes, setListaDocentes] = useState([]);
  const [listaPadronCursos, setListaPadronCursos] = useState([]);
  const [datosGruposAcademicos, setGruposAcademicos] = useState([]);
  const [dataRespuesta, setDataRespuesta] = useState();
  const [loadData, setLoadData] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id_grupo: 0,
      id_aula: '',
      id_docente: '',
      id_padron_cursos_grupo: '',
      // enlace_meet: '',
    },
    resolver: yupResolver(schema),
  });
  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/grupos-academicos`)
      .then((res) => {
        setGruposAcademicos(res.data);
      })
      .catch((err) => {});
    if (editar) {
      axios
        .get(
          `${RutaGeneral}/horario/grupo-academico/ver-cursos/${data.id_padron_cursos_grupo.id_grupo_academico.id}`
        )
        .then((res) =>
          res.data.message ? setListaPadronCursos([]) : setListaPadronCursos(res.data)
        );
      axios
        .get(
          `${RutaGeneral}/horario/ciclo/consulta-aula/${data.id_padron_cursos_grupo.id}/${data.id_ciclo.id}`
        )
        .then((resp) => (resp.data.message ? setListaAulas([]) : setListaAulas(resp.data)));
      axios
        .get(`${RutaGeneral}/horario/ciclo/docentes-curso/${data.id_padron_cursos_grupo.id}`)
        .then((resp) => (resp.data.message ? setListaDocentes([]) : setListaDocentes(resp.data)));
      reset({
        id_grupo: parseInt(data.id_padron_cursos_grupo.id_grupo_academico.id, 10),
        id_aula: parseInt(data.id_aula.id, 10),
        id_docente: parseInt(data.id_docente.id, 10),
        id_padron_cursos_grupo: parseInt(data.id_padron_cursos_grupo.id, 10),
        // enlace_meet: data.enlace_meet,
      });
    }
  }, [data, editar, reset]);

  const handleChangeGrupoAcademico = (event) => {
    axios
      .get(`${RutaGeneral}/horario/grupo-academico/ver-cursos/${event.target.value}`)
      .then((res) => (res.data.message ? setListaPadronCursos([]) : setListaPadronCursos(res.data)))
      .catch((err) => {});
  };

  const handleChangeCursoPadron = (event) => {
    axios
      .get(`${RutaGeneral}/horario/ciclo/consulta-aula/${event.target.value}/${idCiclo}`)
      .then((resp) => (resp.data.message ? setListaAulas([]) : setListaAulas(resp.data)));
    axios
      .get(`${RutaGeneral}/horario/ciclo/docentes-curso/${event.target.value}`)
      .then((resp) => (resp.data.message ? setListaDocentes([]) : setListaDocentes(resp.data)));
  };

  function handleOpenDialog() {
    setLoadData(false);
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
        .put(`${RutaGeneral}/horario/ciclo/${props.data.id_ciclo.id}/${props.data.id}`, {
          id_ciclo: parseInt(props.data.id_ciclo.id, 10),
          id_aula: parseInt(dataForm.id_aula, 10),
          id_docente: parseInt(dataForm.id_docente, 10),
          id_padron_cursos_grupo: parseInt(dataForm.id_padron_cursos_grupo, 10),
          // enlace_meet: dataForm.enlace_meet,
        })
        .then((res) => {
          handleCloseDialog();
          axios
            .get(
              `${RutaGeneral}/horario/ciclo/grupo-academico/${props.data.id_ciclo.id}/${dataForm.id_grupo}`
            )
            .then((resp) => {
              showSuccess('Editado correctamente.');
              setDatosHorariosCiclo(resp.data);
            })
            .catch((err) => {
              showError('No se pudo guardar.');
            });
        })
        .catch((err) => {
          showError('No se pudo guardar.');
        });
    } else {
      axios
        .post(`${RutaGeneral}/horario/ciclo`, {
          id_ciclo: parseInt(idCiclo, 10),
          id_aula: parseInt(dataForm.id_aula, 10),
          id_docente: parseInt(dataForm.id_docente, 10),
          id_padron_cursos_grupo: parseInt(dataForm.id_padron_cursos_grupo, 10),
          // enlace_meet: dataForm.enlace_meet,
        })
        .then((res) => {
          setDataRespuesta(res.data);
          axios
            .get(`${RutaGeneral}/horario/ciclo/grupo-academico/${idCiclo}/${dataForm.id_grupo}`)
            .then((res2) => {
              setDatosHorariosCiclo(res2.data);
              setLoadData(true);
              // handleCloseDialog();
              showSuccess('Guardado correctamente.');
              reset({
                id_grupo: '',
                id_aula: '',
                id_docente: '',
                id_padron_cursos_grupo: '',
                // enlace_meet: '',
              });
              console.log('aqui');
            })
            .catch((err) => {
              showError('No se pudo guardar.');
            });
        })
        .catch((err) => {
          showError('No se pudo guardar.');
        });
    }
  }

  return (
    <>
      {!editar ? (
        <Button
          variant="outlined"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Crear Nuevo Horario
        </Button>
      ) : (
        <IconButton
          color="success"
          aria-label="Editar horario"
          component="span"
          onClick={handleOpenDialog}
        >
          <CreateIcon />
        </IconButton>
      )}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>{editar ? 'Editar' : 'Crear datos del horario'}</b>
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
            {!loadData && (
              <>
                <div className="grid grid-cols-3">
                  <div className="col-span-3">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-12 md:mr-5"
                          select
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleChangeGrupoAcademico(e);
                          }}
                          fullWidth
                          label="Grupo académico"
                          error={!!errors.id}
                          helperText={errors.id && errors.id?.message}
                        >
                          {datosGruposAcademicos.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                              {`${option.denominacion}`}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      name="id_grupo"
                      control={control}
                    />
                  </div>
                  <div className="col-span-3">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-12 md:mr-5"
                          select
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleChangeCursoPadron(e);
                          }}
                          fullWidth
                          label="Curso"
                          error={!!errors.id_padron_cursos_grupo}
                          helperText={
                            errors.id_padron_cursos_grupo && errors.id_padron_cursos_grupo?.message
                          }
                        >
                          {listaPadronCursos.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                              {`${option.id_padron_curso.nombre_curso} - ${option.id_grupo_academico.abreviacion} `}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      name="id_padron_cursos_grupo"
                      control={control}
                    />
                  </div>
                  <div className="col-span-1 mx-3">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          className="mb-12 md:mr-5"
                          select
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          fullWidth
                          label="Aula"
                          error={!!errors.id_aula}
                          helperText={errors.id_aula && errors.id_aula?.message}
                        >
                          {listaAulas.length !== 0 ? (
                            listaAulas.map((option, index) => (
                              <MenuItem key={index} value={option.aula.id}>
                                {option.aula.codigo_aula}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0} />
                          )}
                        </TextField>
                      )}
                      name="id_aula"
                      control={control}
                    />
                  </div>
                  <div className="col-span-2 mx-3">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          className="mb-12 md:mr-5"
                          select
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          fullWidth
                          label="Docente"
                          error={!!errors.id_docente}
                          helperText={errors.id_docente && errors.id_docente?.message}
                        >
                          {listaDocentes.length !== 0 ? (
                            listaDocentes.map((option, index) => (
                              <MenuItem key={index} value={option.id_docente.id}>
                                {`${option.id_docente.user_type.first_name} ${option.id_docente.user_type.last_name} ${option.id_docente.user_type.sur_name}`}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0} />
                          )}
                        </TextField>
                      )}
                      name="id_docente"
                      control={control}
                    />
                  </div>
                  {/* <div className="col-span-3">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-12"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                          label="Enlace Meet"
                          error={!!errors.enlace_meet}
                          helperText={errors.enlace_meet && errors.enlace_meet?.message}
                        />
                      )}
                      name="enlace_meet"
                      control={control}
                    />
                  </div> */}
                </div>
                <Button className="mb-12" variant="contained" color="primary" type="submit">
                  {editar ? 'Actualizar' : 'Guardar'}
                </Button>
              </>
            )}
            {loadData && !editar && (
              <>
                <Typography className="flex-auto" variant="subtitle1" color="inherit">
                  <b>Curso: </b>
                  {dataRespuesta.id_padron_cursos_grupo.id_padron_curso.nombre_curso}
                </Typography>
                <Typography className="flex-auto" variant="subtitle1" color="inherit">
                  <b>Docente: </b>
                  {`${dataRespuesta.id_docente.user_type.first_name} ${dataRespuesta.id_docente.user_type.last_name} ${dataRespuesta.id_docente.user_type.sur_name}`}
                </Typography>
                <Typography className="flex-auto" variant="subtitle1" color="inherit">
                  <b>Aula: </b>
                  {dataRespuesta.id_aula.codigo_aula}
                </Typography>
                <center className="my-10">
                  <ModalHorarioDia nuevo={false} editar data={dataRespuesta} />
                </center>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCurso;
