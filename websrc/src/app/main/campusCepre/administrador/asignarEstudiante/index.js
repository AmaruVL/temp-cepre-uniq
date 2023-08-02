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
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, MenuItem } from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import useMessages from 'app/hooks/useMessages';
import { useHistory } from 'react-router-dom';
import ListaAsignacionEstudiante from './listaEstudiantes';

const schema = yup.object().shape({
  ciclo: yup.string().required('Campo Requerido'),
  aula: yup.string().required('Campo Requerido'),
  grupoAcademico: yup.string().required('Campo Requerido'),
});

// const Root = styled(FusePageCarded)(({ theme }) => ({
//   '& .FusePageCarded-header': {
//     minHeight: 72,
//     height: 72,
//     alignItems: 'center',
//     [theme.breakpoints.up('sm')]: {
//       minHeight: 136,
//       height: 136,
//     },
//   },
//   '& .FusePageCarded-content': {
//     display: 'flex',
//   },
//   '& .FusePageCarded-contentCard': {
//     overflow: 'hidden',
//   },
// }));
const AsignacionEstudiante = () => {
  // const { editar, data } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const { showSuccess, showError } = useMessages();
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(true);
  const [dataCiclo, setDataCiclo] = useState([]);
  const [grupoAcademico, setGrupoAcademico] = useState([]);
  const [aula, setAula] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  const [dataEstudiantes, setDataEstudiante] = useState([]);
  const [salonOcupado, setSalonOcupado] = useState(false);
  const [idAula, setIdAula] = useState();
  const [idCiclo, setIdCiclo] = useState();
  const [idGrupo, setIdGrupo] = useState();
  const [loading, setLoading] = useState(false);
  const [detallesAula, setDetallesAula] = useState({});
  const history = useHistory();
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ciclo: '',
      grupoAcademico: '',
      aula: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios
      .get(`${RutaGeneral}/asignar-estudiantes/ver-grupos`)
      .then((resp) => setGrupoAcademico(resp.data));
    axios.get(`${RutaGeneral}/asignar-estudiantes/ver-aulas`).then((resp) => setAula(resp.data));
    axios.get(`${RutaGeneral}/ciclos`).then((resp) => {
      setDataCiclo(resp.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    history.push('/ciclo');
  }
  async function onSubmit(dataForm) {
    setLoading(true);
    setIdAula(dataForm.aula);
    setIdCiclo(dataForm.ciclo);
    // eslint-disable-next-line eqeqeq
    const aulaSeleccionado = aula.find((element) => element.id == dataForm.aula);
    // console.log('SII', aulaSeleccionado);
    setDetallesAula(aulaSeleccionado);
    setIdGrupo(dataForm.grupoAcademico);
    await axios
      .get(
        `${RutaGeneral}/asignar-estudiantes/consulta-estudiantes-aula/${dataForm.ciclo}/${dataForm.grupoAcademico}/${dataForm.aula}`
      )
      .then(async (resp) => {
        await setDataEstudiante(resp.data.data);
        setLoading(false);
      })
      .catch((err) => {
        showError(`Este salon ya cuenta con estudiantes de otro grupo`);
        setDataEstudiante([]);
        setLoading(false);
      });
  }
  function onSubmitEstudiantes(dataForm) {
    console.log(dataForm);
    // axios
    //   .get(
    //     `${RutaGeneral}/asignar-estudiantes/consulta-estudiantes-aula/${dataForm.ciclo}/${dataForm.grupoAcademico}/${dataForm.aula}`
    //   )
    //   .then((resp) => {
    //     setDataEstudiante(resp.data.data);
    //     console.log(resp.data);
    //   });
    //     .then((res) => {
    //       setIsLoading(false);
    //       console.log('Asistencia', res.data);
    //       props.setDataEstudiante(res.data);
    //     })
    //     .catch((err) => {
    //       showError('No se realizo correctamente la consulta.');
    //       setIsLoading(false);
    //     });
  }
  const [datosCiclo, setDatosCiclo] = useState([]);
  const [term, setTerm] = useState('');
  return (
    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={openDialog} onClose={handleCloseDialog}>
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography className="flex-auto" variant="subtitle1" color="inherit">
            Asignar Estudiantes
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
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2">
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    select
                    label="Ciclo"
                    error={!!errors.ciclo}
                    helperText={errors.ciclo && errors.ciclo?.message}
                  >
                    {dataCiclo.map((value, index) => (
                      <MenuItem key={index} value={value.id}>
                        {value.denominacion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="ciclo"
                control={control}
              />
            </div>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    select
                    label="Grupo Academico"
                    error={!!errors.grupoAcademico}
                    helperText={errors.grupoAcademico && errors.grupoAcademico?.message}
                  >
                    {grupoAcademico.map((value, index) => (
                      <MenuItem key={index} value={value.id}>
                        {value.denominacion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="grupoAcademico"
                control={control}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    select
                    label="Aula"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      // setIdAula(e.target.value);
                    }}
                    error={!!errors.aula}
                    helperText={errors.aula && errors.aula?.message}
                  >
                    {aula.map((value, index) => (
                      <MenuItem key={index} value={value.id}>
                        {value.codigo_aula}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="aula"
                control={control}
              />
            </div>
            <div className="m-10">
              <Button className="my-12" variant="contained" color="primary" type="submit">
                Consultar
              </Button>
            </div>
          </div>
        </form>
        <ListaAsignacionEstudiante
          dataEstudiantes={dataEstudiantes}
          idAula={idAula}
          idCiclo={idCiclo}
          idGrupo={idGrupo}
          setDataEstudiante={setDataEstudiante}
          loading={loading}
          setLoading={setLoading}
          detallesAula={detallesAula}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AsignacionEstudiante;
