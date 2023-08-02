import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useHistory } from 'react-router';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
// import { UserManager } from 'oidc-client';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { useAuth } from 'react-oidc-context';
import { Redirect } from 'react-router-dom';
import logoUNIQ from '../../../assets/images/logoUNIQ.png';
import authService from '../../../auth/auth-constants';

// const oidcSettings = {
//   authority: 'https://pichaantsi.uniq.edu.pe',
//   client_id: 'gyt',
//   redirect_uri: `http://localhost:3000/paginaespera`,
//   post_logout_redirect_uri: '',
//   response_type: 'code',
// };
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color="secondary" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

let timeout;
const PaginaEsperaDocente = () => {
  const [loading, setLoading] = useState(true);
  // const v = GytContext;
  const history = useHistory();
  const [estadoPeticion, setestadoPeticion] = useState(true);
  const [progress, setProgress] = useState(10);
  const [usuarioNoValido, setUsuarioNoValido] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const auth = useAuth();

  const cargarDatos = () => {
    // {{{
    console.log(auth.user);
    axios
      .post(
        `${RutaGeneral}/credenciales-admin`,
        {},
        {
          headers: {
            Authorization: `bearer ${auth.user.access_token}`,
          },
        }
      )
      .then((resp) => {
        // console.log('resp.data', resp.data);
        sessionStorage.setItem('dataUsuario', JSON.stringify(resp.data));
        sessionStorage.setItem('imagenUsuario', 'assets/images/avatars/avatar.jpeg');
        sessionStorage.setItem('usuario', resp.data.user_type);
        window.location.replace('/ciclo');
        setLoading(false);
      })
      .catch((err) => {
        // sessionStorage.setItem('dataUsuario', JSON.stringify(resp.data));
        // sessionStorage.setItem('imagenUsuario', 'assets/images/avatars/avatar.jpeg');
        // sessionStorage.setItem('usuario', resp.data.user_type);
        // window.location.replace('/ciclo');
        setLoading(false);
        setUsuarioNoValido(true);
      });
  }; // }}}

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
    cargarDatos();

    return (
      <div className="bg-fondoUNIQ bg-cover flex w-full h-full justify-center items-center">
        {/* {Redirec()} */}
        <center>
          <Card className="m-10 shadow-md bg-opacity-50 bg-black">
            <Typography
              color="secondary"
              className="text-center m-10"
              gutterBottom
              variant="h5"
              component="div"
            >
              <b>UNIVERSIDAD NACIONAL INTERCULTURAL DE QUILLABAMBA</b>
            </Typography>
            <img className="text-center w-200 h-200" src={logoUNIQ} alt="Logo UNIQ" />
            <CardContent>
              <Typography
                className="text-center"
                gutterBottom
                variant="h5"
                component="div"
                color="secondary"
              >
                <b>CEPRE - ADMINISTRADOR</b>
              </Typography>

              {loading && (
                <div className="mt-10">
                  <Typography variant="body2" color="white">
                    Estamos validando tus datos.
                  </Typography>
                  <CircularProgress color="secondary" />
                  <LinearProgressWithLabel value={progress} />
                </div>
              )}
              {usuarioNoValido && (
                <>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    El usuario que intenta ingresar —{' '}
                    <strong>no tiene acceso a este sistema !</strong>
                  </Alert>
                  <Button
                    color="secondary"
                    variante="contained"
                    onClick={() => {
                      authService.logout();
                    }}
                  >
                    Salir
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </center>
      </div>
    );
  }

  return <Redirect to={{ pathname: '/' }} />;
};
export default PaginaEsperaDocente;
