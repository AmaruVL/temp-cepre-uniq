import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { AppBar, Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import useMessages from '../../../../hooks/useMessages';
import ListaMaterialCurso from './materialLista';

const schema = yup.object().shape({
  mensaje: yup.string().required('Campo Requerido'),
});

const DetalleCurso = (props) => {
  const mainTheme = useSelector(selectMainTheme);
  const { showSuccess, showError } = useMessages();
  const { idHorario, idEstudiante } = props.match.params;
  const [dataCiclo, setDataCiclo] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataComentarios, setDataComentarios] = useState([]);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    axios.get(`${RutaGeneral}/estudiante/curso/${idHorario}`).then((res) => {
      setDataCiclo(res.data);
      console.log('Cursos', res.data);
      setDataLoaded(true);
    });
    axios.get(`${RutaGeneral}/estudiante/comentarios/${idHorario}`).then((res) => {
      setDataComentarios(res.data);
    });
  }, [dataLoaded]);
  function onSubmit(dataForm) {
    axios
      .post(`${RutaGeneral}/estudiante/comentarios/${idHorario}`, {
        texto_comentario: dataForm.mensaje,
        id_horario: idHorario,
        id_estudiante: idEstudiante,
      })
      .then(() => {
        showSuccess('Mensaje enviado correctamente.');
        axios
          .get(`${RutaGeneral}/estudiante/comentarios/${idHorario}`)
          .then((res) => {
            setDataComentarios(res.data);
            reset({ mensaje: '' });
          })
          .catch(() => {
            showError('No se pudo enviar el mensaje.');
            reset({ mensaje: '' });
          });
      });
  }
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Card className="m-10 h-2/4" sx={{ minWidth: 275 }}>
          <AppBar className="h-full" position="static" elevation={0}>
            <div className="flex flex-col md:flex-row">
              <div className="my-10 mx-20 flex-auto">
                <Typography className="flex-auto" variant="h4" color="inherit">
                  <b>{dataCiclo.nombre_curso}</b>
                </Typography>
                <Typography className="flex-auto" variant="subtitle1" color="inherit">
                  Docente: {dataCiclo.nombre_docente}
                </Typography>
                <Typography className="flex-auto" variant="subtitle1" color="inherit">
                  Aula: {dataCiclo.aula}
                </Typography>
                <Typography className="flex-auto" variant="subtitle1" color="inherit">
                  Grupo Academico: {dataCiclo.grupo_acad}
                </Typography>
                <Typography className="flex-auto" variant="subtitle1" color="inherit">
                  Codigo de Curso: {dataCiclo.abreviacion}
                </Typography>
                <div className="flex flex-row">
                  <Typography className="py-10" variant="subtitle1" color="inherit">
                    Material del Curso:
                  </Typography>
                  <ListaMaterialCurso idHorario={idHorario} />
                </div>
              </div>
              <div className="md:py-64 md:px-10">
                <Button
                  onClick={() => window.open(`${dataCiclo.enlace_meet}`)}
                  color="secondary"
                  variant="contained"
                >
                  IR A SESION DE CLASES
                </Button>
              </div>
            </div>
          </AppBar>
        </Card>
        <div className="flex m-10 ">
          {/* <div className="md:w-1/4">
            <div className="grid grid-rows-3">
              <Card className="m-5 shadow h-96">
                <Typography className="text-center my-10" variant="subtitle1" color="inherit">
                  <b>MATERIAL CURSO</b>
                </Typography>
                <div className="grid grid-cols-2">
                  <MaterialCurso idHorario={idHorario} />
                  <ListaMaterialCurso idHorario={idHorario} />
                </div>
              </Card>
              <Card className="m-5 shadow h-96">
                <Typography className="text-center my-10" variant="subtitle1" color="inherit">
                  <b>BALOTARIO</b>
                </Typography>
                <div className="grid grid-cols-2">
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <ListAltIcon />
                  </IconButton>
                </div>
              </Card>
              {/* <Card className="m-5 shadow h-96">
                <Typography className="text-center my-10" variant="subtitle1" color="inherit">
                  <b>ASISTENCIA ALUMNOS</b>
                </Typography>
                <div className="grid grid-cols-1">
                  <AsistenciaCurso idHorario={idHorario} />
                </div>
              </Card> 
            </div>
          </div> */}
          <div className="flex-auto">
            <Card className="m-5 shadow">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row">
                  <div>
                    <Controller
                      render={({ field }) => <WYSIWYGEditor {...field} />}
                      name="mensaje"
                      control={control}
                    />
                  </div>
                  <Tooltip title="Enviar Mensaje">
                    <IconButton color="secondary" type="submit">
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </form>
            </Card>
            {dataComentarios.map((value, index) => (
              <Card key={index} className="my-10 mx-5 shadow bg-grey-200">
                <div className="m-10 flex flex-row ">
                  <Typography className="text-center text-black flex-auto" variant="body3">
                    {value.id_docente !== null &&
                      `${value.id_docente.user_type.first_name} ${value.id_docente.user_type.last_name}
                  ${value.id_docente.user_type.sur_name}`}
                    {value.id_estudiante !== null &&
                      `${value.id_estudiante.user_type.first_name} ${value.id_estudiante.user_type.last_name}
                  ${value.id_estudiante.user_type.sur_name}`}
                  </Typography>
                  <div className="">
                    {value.id_docente !== null && <OrdersStatus name="Docente" />}
                    {value.id_estudiante !== null && <OrdersStatus name="Estudiante" />}
                  </div>
                </div>

                <div className="flex flex-row bg-white">
                  <div className="m-10 flex-auto">
                    <Typography
                      className="text-14 my-24 text-black leading-normal"
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: value.texto_comentario }}
                    />
                  </div>
                  {/* <PopperEliminar
                    value={value}
                    idHorario={idHorario}
                    setDataComentarios={setDataComentarios}
                  />
                  <InputComentario
                    value={value}
                    idHorario={idHorario}
                    setDataComentarios={setDataComentarios}
                    idEstudiante={idEstudiante}
                  /> */}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};
export default DetalleCurso;
