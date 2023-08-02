import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import OAuth2Login from 'react-simple-oauth2-login';
import { useHistory } from 'react-router';
import useMessages from 'app/hooks/useMessages';
import { useAuth } from 'react-oidc-context';
import BasicCard from './componentes/basicCard';
import CEPRE from '../../assets/images/CEPRE.jpg';
import RutaGeneral from '../../shared-components/rutaGeneral';
import Header from './componentes/header';
import Footer from './componentes/Footer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

const PreInscripcion = () => {
  const history = useHistory();
  const { showError, showSuccess } = useMessages();
  const [datosCiclo, setDatosCiclo] = useState([]);
  const [estado, setEstado] = useState(true);
  const [detalleCiclo, setDetalleCiclo] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenModal, setImagenModal] = useState('');

  // nuevos cambios
  const setDetalleCicloActivo = (data) => {
    setDetalleCiclo(data);
  };
  const auth = useAuth();

  const onSuccess = (e) => {
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token="${e.access_token}`)
      .then((response) => response.json())
      .then(async (data) => {
        console.log('DATA ENVIAR', data);
        axios
          .post(`${RutaGeneral}/credenciales-docente`, {
            email: data.email,
          })
          .then((resp) => {
            console.log('Docente', resp.data);
            sessionStorage.setItem('imagenUsuario', data.picture);
            sessionStorage.setItem('dataUsuario', JSON.stringify(resp.data));
            sessionStorage.setItem('usuario', resp.data.user_type);
            window.location.replace('/docente/cursos');
          })
          .catch((err) => {
            showError('No tienes acceso al campus docente');
            // window.location.replace('/preinscripcion');
          });
        // await sessionStorage.setItem('usuario', '2');
        // await window.location.replace('/docente/cursos');
      });
  };
  const onSuccessEstudiante = (e) => {
    // console.log(e);
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token="${e.access_token}`)
      .then((response) => response.json())
      .then(async (data) => {
        axios
          .post(`${RutaGeneral}/credenciales-estudiante`, {
            email: data.email,
          })
          .then((resp) => {
            // console.log('RESP', resp);
            sessionStorage.setItem('imagenUsuario', data.picture);
            sessionStorage.setItem('dataUsuario', JSON.stringify(resp.data));
            sessionStorage.setItem('usuario', resp.data.user_type);
            window.location.replace('/estudiante/cursos');
          })
          .catch((err) => {
            showError('No tienes acceso al campus estudiante');
          });
        // console.log('DATA ENVIAR', data.email);
        // await sessionStorage.setItem('usuario', '3');
        // await window.location.replace('/estudiante/cursos');
      });
  };

  const onFailure = (e) => {};
  const onFailureEstudiante = (e) => {};

  const handleLoginAlumno = e => {
        //console.log(e);
        const access_token = e.credential;
        fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${access_token}`)
          .then((response) => response.json())
          .then(async (data) => {
            axios
              .post(`${RutaGeneral}/credenciales-estudiante`, {
                email: data.email,
              })
              .then((resp) => {
                // console.log('RESP', resp);
                sessionStorage.setItem('imagenUsuario', data.picture);
                sessionStorage.setItem('dataUsuario', JSON.stringify(resp.data));
                sessionStorage.setItem('usuario', resp.data.user_type);
                window.location.replace('/estudiante/cursos');
              })
              .catch((err) => {
                showError('No tienes acceso al campus estudiante');
              });
            // console.log('DATA ENVIAR', data.email);
            // await sessionStorage.setItem('usuario', '3');
            // await window.location.replace('/estudiante/cursos');
          });
    }

  useEffect( () => {
    fetch(`${RutaGeneral}/modal`).then(response => response.json())
        .then(data => {
            if(data?.length) {
                setImagenModal(data[0].imagen_url);
                setModalAbierto(true);
            }
        });
    }, []);

  useEffect(() => {
    const promesa = axios.get(`${RutaGeneral}/ciclos-activo`);
    promesa.then((res) => {
      setDatosCiclo(res.data);
      setEstado(false);
    });
    promesa.catch((err) => console.log(err));
  }, [estado]);
  return (
    <div>
      <Dialog open={modalAbierto} fullWidth maxWidth="xs"
        height="600" onClose={e => setModalAbierto(false) }>
        <DialogContent>
            <div style={{display: 'block', margin: 'auto'}}>
                <img src={imagenModal} style={{height: 600}} />
            </div>
        </DialogContent>
      </Dialog>
      <Header />
      <center className="mx-10 mt-16">
        <img className="text-center" src={CEPRE} alt="Logo UNIQ" />
      </center>
      <h1 className="text-center my-20 text-teal-600">
        <b>CICLOS ACTIVOS</b>
      </h1>

      <div className="grid md:grid-cols-3">
        {datosCiclo.map((element, index) => (
          <div key={index} className="m-10">
            <BasicCard
              title={element.ciclo.denominacion}
              datosCiclo={element}
              detalleCiclo={detalleCiclo}
              setDetalleCiclo={setDetalleCiclo}
            />
          </div>
        ))}
      </div>
      <h1 className="text-center my-20 text-teal-600">
        <b>ACCESO CAMPUS VIRTUAL</b>
      </h1>
      <div className="grid md:grid-cols-3">
        <center>
          <Card sx={{ maxWidth: 345, minHeight: 365 }} className="my-10">
            <CardMedia
              component="img"
              height="140"
              image="/material-ui-static/images/cards/admin.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Administrador
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Acceso para usuarios administradores.
              </Typography>
            </CardContent>
            <center>
              <Button
                variant="contained"
                size="medium"
                className="bg-teal-600 text-white"
                onClick={() => {
                  // sessionStorage.setItem('usuario', '1');
                  auth.signinRedirect();
                  // window.location.replace('/ciclo');
                }}
              >
                Ingresar
              </Button>
            </center>
          </Card>
        </center>
        <center>
          <Card sx={{ maxWidth: 345, minHeight: 365 }} className="my-10">
            <CardMedia
              component="img"
              height="140"
              image="/material-ui-static/images/cards/docente.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Docentes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Acceso para usuarios docentes.
              </Typography>
            </CardContent>
            <center>
              <OAuth2Login
                authorizationUrl="https://accounts.google.com/o/oauth2/v2/auth"
                responseType="token"
                scope="profile email openid"
                clientId="989173886708-lqupsd2eunlmhpsvumtl3uoijkk0mqai.apps.googleusercontent.com"
                redirectUri={process.env.REACT_APP_DOCENTE_REDIRECT}
                onSuccess={onSuccess}
                onFailure={onFailure}
              >
                <Button variant="contained" className="bg-teal-600 text-white" size="medium">
                  Ingresar
                </Button>
              </OAuth2Login>
            </center>
          </Card>
        </center>
        <center>
          <Card sx={{ maxWidth: 345, minHeight: 365 }} className="my-10">
            <CardMedia
              component="img"
              height="140"
              image="/material-ui-static/images/cards/alumno.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Estudiante
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Acceso para usuarios estudiantes.
              </Typography>
            </CardContent>
            <center>
              <GoogleOAuthProvider
                  clientId="795966107890-u441oo5r928d5hjmnbpisoobcakvtgrd.apps.googleusercontent.com">
                <GoogleLogin 
                  clientId="795966107890-u441oo5r928d5hjmnbpisoobcakvtgrd.apps.googleusercontent.com"
                    onSuccess={handleLoginAlumno}
                />
              </GoogleOAuthProvider>
            </center>
          </Card>
        </center>
      </div>
      <Footer />
    </div>
  );
};

export default PreInscripcion;
