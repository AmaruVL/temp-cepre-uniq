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
import { IconButton } from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import useMessages from 'app/hooks/useMessages';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from 'react-oidc-context';
import ListaAsignacionEstudiante from './listaEstudiantes';

const schema = yup.object().shape({
  ciclo: yup.string().required('Campo Requerido'),
  aula: yup.string().required('Campo Requerido'),
  grupoAcademico: yup.string().required('Campo Requerido'),
});

const ListaCSVEstudiantes = () => {
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
  const history = useHistory();
  const [detallesAula, setDetallesAula] = useState({});
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
  const auth = useAuth();
  const [term, setTerm] = useState('');
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
              Exportar Estudiantes
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
  }
  return <Redirect to={{ pathname: '/paginaespera' }} />;
};
export default ListaCSVEstudiantes;
