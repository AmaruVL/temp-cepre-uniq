import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { AppBar, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CursosDocente = () => {
  const mainTheme = useSelector(selectMainTheme);
  const [dataCursos, setDataCursos] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  useEffect(() => {
    axios.get(`${RutaGeneral}/docente/inicio/${idUsuario}`).then((res) => {
      setDataCursos(res.data);
      console.log(res.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        {console.log(dataCursos)}
        <motion.div className="flex flex-wrap py-24" initial="hidden" animate="show">
          {dataCursos.length === 0 ? (
            <motion.div className="w-full h-full mx-10 flex justify-center items-center">
              <h1 className="text-gray-500">No tienes cursos asignados.</h1>
            </motion.div>
          ) : (
            dataCursos.map((course, index) => {
              return (
                <motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={index}>
                  <Card className="flex flex-col h-320 shadow" color="secondary">
                    <AppBar position="static" elevation={0}>
                      <Toolbar className="flex w-full">
                        <Typography
                          className="flex-auto text-center"
                          variant="subtitle1"
                          color="inherit"
                        >
                          <b>
                            {course.curso} - {course.grupo_ac_ab}
                          </b>
                        </Typography>
                        {/* <Typography
                        className="flex-auto text-center"
                        variant="subtitle1"
                        color="inherit"
                      >
                        {course.grupo_ac_ab}
                      </Typography> */}
                      </Toolbar>
                    </AppBar>
                    <CardContent className="flex flex-col flex-auto items-center justify-center">
                      <Typography
                        className="flex-auto text-center"
                        variant="subtitle1"
                        color="inherit"
                      >
                        <b>Ciclo: </b>
                        {course.ciclo}
                      </Typography>

                      <Typography className="text-left text-16 font-medium">
                        <AccessTimeIcon />
                        {'         Horario:'}
                      </Typography>
                      {course?.datos?.map((val) => (
                        <Typography
                          className="text-center text-13 mt-8 font-normal"
                          color="textSecondary"
                        >
                          <b>- {val.dia_dictado} </b>
                          {`${val.hora_inicio} - ${val.hora_fin} `}
                        </Typography>
                      ))}
                    </CardContent>
                    <CardActions className="justify-center pb-24">
                      {course?.datos[0] ? (
                        <Button
                          to={`/docente/cursos/${course.datos[0].id_horario.id}/${idUsuario}`}
                          component={Link}
                          color="secondary"
                          variant="contained"
                        >
                          Ver Curso
                        </Button>
                      ) : (
                        <p className="text-red">Horario no configurado para este curso.</p>
                      )}
                    </CardActions>
                    <LinearProgress
                      className="w-full"
                      variant="determinate"
                      value={(course.activeStep * 100) / course.totalSteps}
                      color="secondary"
                    />
                  </Card>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </ThemeProvider>
    </>
  );
};
export default CursosDocente;
