import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton } from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import useMessages from 'app/hooks/useMessages';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from 'react-oidc-context';
import FormSubirCSV from './listaEstudiantes';

const schema = yup.object().shape({
  ciclo: yup.string().required('Campo Requerido'),
  aula: yup.string().required('Campo Requerido'),
  grupoAcademico: yup.string().required('Campo Requerido'),
});

const SubirCSVNotas = () => {
  // const { editar, data } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const { showSuccess, showError } = useMessages();
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(true);
  const [dataCiclos, setDataCiclos] = useState([]);
  const [aula, setAula] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  const [dataEstudiantes, setDataEstudiante] = useState([]);
  const [salonOcupado, setSalonOcupado] = useState(false);
  const [idAula, setIdAula] = useState();
  const [idCiclo, setIdCiclo] = useState();
  const [idGrupo, setIdGrupo] = useState();
  const [loading, setLoading] = useState(false);
  const [detallesAula, setDetallesAula] = useState({});
  const [dataEstudiantesError, setDataEstudiantesError] = useState([]);
  const [respConsulta, setRespConsulta] = useState(null);
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
      .get(`${RutaGeneral}/examen/parcial/subir-notas/ver-ciclos/unit`)
      .then((resp) => setDataCiclos(resp.data));
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
    console.log('SII', aulaSeleccionado);
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
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Iniciando sesión...</div>;
    case 'signoutRedirect':
      return <div>Cerrando sesión...</div>;
  }

  if (auth.isLoading) {
    return <div>Cargando...</div>;
  }

  if (auth.error) {
    return <div>Error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              Subir notas en CSV
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
          <FormSubirCSV
            dataCiclos={dataCiclos}
            setDataCiclos={setDataCiclos}
            setDataEstudiantesError={setDataEstudiantesError}
            setRespConsulta={setRespConsulta}
            // setLoading={setLoading}
          />
          {respConsulta !== null && respConsulta.estado_correcto === false && (
            <Alert severity="warning">{respConsulta.message}</Alert>
          )}
          <ul>
            {dataEstudiantesError.map((value, index) => (
              <li>{value[0]}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    );
  }
  return <Redirect to={{ pathname: '/paginaespera' }} />;
};
export default SubirCSVNotas;
