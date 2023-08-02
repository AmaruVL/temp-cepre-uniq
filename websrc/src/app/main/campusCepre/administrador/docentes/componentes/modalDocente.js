import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select,
  Tooltip,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import useMessages from 'app/hooks/useMessages';
import { LoadingButton } from '@mui/lab';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import ConsultaDocenteDNI from './consultaDocenteDNI';

const schema = yup.object().shape({
  email: yup.string().required('Campo Requerido'),
  codigo_docente: yup.string().required('Campo Requerido'),
  regimen_docente: yup.string().required('Campo Requerido'),
  // curso: yup.string().required('Campo Requerido'),
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

function ModalCreacionDocente(props) {
  const { editar, data, cursos } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const { showError, showSuccess } = useMessages();
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [personName, setPersonName] = useState([]);
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
      email: '',
      codigo_docente: '',
      regimen_docente: '',
      // curso: '',
    },
    resolver: yupResolver(schema),
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  useEffect(() => {
    if (openDialog) {
      axios
        .get(`${RutaGeneral}/padron-curso/activo`)
        .then((resp) => {
          setDataCursos(resp.data);
        })
        .catch((err) => {});

      if (editar) {
        axios.get(`${RutaGeneral}/agregar-cursos-docente/${data.id}`).then((res) => {
          const arrayId = res.data.map((elem) => {
            return elem.id_curso.id;
          });
          setPersonName(arrayId);
        });
        reset({
          email: data.user_type.email,
          codigo_docente: data.codigo_docente,
          regimen_docente: data.regimen_docente,
        });
      } else {
        reset({});
      }
    }
  }, [openDialog]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  async function onSubmit(dataForm) {
    setLoading(true);
    // console.log('dataForm', dataForm);
    if (editar) {
      await axios
        .put(`${RutaGeneral}/registro/docentes/${props.data.id}`, {
          email: dataForm.email,
          codigo_docente: dataForm.codigo_docente,
          regimen_docente: dataForm.regimen_docente,
          // id_curso: parseInt(dataForm.curso, 10),
        })
        .then((res) => {
          // setLoading(false);
          // showSuccess('Actualizado correctamente');
          axios
            .put(`${RutaGeneral}/agregar-cursos-docente`, {
              id_docente: data.id,
              id_cursos: personName,
            })
            .then(() => {
              setLoading(false);
              showSuccess('Actualizado correctamente');
              axios.get(`${RutaGeneral}/registro/docentes`).then((res2) => {
                props.setDatosPadronCurso(res2.data);
              });
            });

          handleCloseDialog();
        })
        .catch((err) => {
          setLoading(false);
          showError('No se pudo registrar el docente');
          handleCloseDialog();
        });
    } else {
      await axios
        .post(`${RutaGeneral}/registro/docentes`, {
          dni: dataPersona.dni,
          email: dataForm.email,
          codigo_docente: dataForm.codigo_docente,
          regimen_docente: dataForm.regimen_docente,
          // id_curso: parseInt(dataForm.curso, 10),
          nombres: dataPersona.nombres,
          apellido_paterno: dataPersona.apellido_paterno,
          apellido_materno: dataPersona.apellido_materno,
        })
        .then((res) => {
          axios
            .post(`${RutaGeneral}/agregar-cursos-docente`, {
              id_docente: res.data.data.id,
              id_cursos: personName,
            })
            .then(() => {
              setLoading(false);
              showSuccess('Creado correctamente');
              axios.get(`${RutaGeneral}/registro/docentes`).then((res2) => {
                props.setDatosPadronCurso(res2.data);
              });
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
      {editar ? (
        <Tooltip title="Editar docente">
          <IconButton variant="contained" color="secondary" onClick={handleOpenDialog}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
          Crear Docente
        </Button>
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
              <b>{editar ? 'Editar Docente' : 'Crear Nuevo Docente'}</b>
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
          {!editar && <ConsultaDocenteDNI setDataPersona={setDataPersona} />}
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
                  name="codigo_docente"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Codigo Docente"
                      error={!!errors.codigo_docente}
                      helperText={errors.codigo_docente && errors.codigo_docente?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="regimen_docente"
                  render={({ field }) => (
                    <TextField
                      className="mb-12 md:mr-5"
                      select
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      label="Regimen Docente"
                      error={!!errors.regimen_docente}
                      helperText={errors.regimen_docente && errors.regimen_docente?.message}
                    >
                      {tiposExamen.map((option, index) => (
                        <MenuItem key={index} value={option.denominacion2}>
                          {option.denominacion}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                {/* <Controller
                  render={({ field }) => ( */}
                <FormControl sx={{ width: 280 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Cursos</InputLabel>
                  <Select
                    className="mb-12 md:mr-5"
                    // select
                    // {...field}
                    fullWidth
                    multiple
                    label="Curso"
                    value={personName}
                    onChange={handleChange}
                    // error={!!errors.curso}
                    // helperText={errors.curso && errors.curso?.message}
                    input={<OutlinedInput label="Cursos" />}
                    renderValue={(selected) => {
                      // selected.join(', ')
                      const nuevoArreglo = selected.map((curso) => {
                        const elemento = dataCursos.find(
                          (elementoCurso) => elementoCurso.id === curso
                        );
                        return elemento.nombre_curso;
                      });
                      console.log('Arre', selected);
                      return nuevoArreglo.join(', ');
                    }}
                    MenuProps={MenuProps}
                  >
                    {dataCursos.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        <Checkbox checked={personName.indexOf(option.id) > -1} />
                        <ListItemText primary={option.nombre_curso} />
                        {/* {option.nombre_curso} */}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* )}
                  name="curso"
                  control={control}
                /> */}
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

export default ModalCreacionDocente;
