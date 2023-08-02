import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const NotasEstudiante = () => {
  const mainTheme = useSelector(selectMainTheme);
  const [dataNotas, setDataNotas] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  useEffect(() => {
    axios.get(`${RutaGeneral}/estudiante/ver-notas/${idUsuario}`).then((res) => {
      setDataNotas(res.data);
      console.log(res.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Typography variant="h4" className="text-left font-medium px-16 pt-10">
          Mis Notas
        </Typography>
        {/* <div className="text-left font-medium px-16 pt-10">
          <LoadingButton
            onClick={() => {
              window.open(
                `${RutaGeneral}/inscripcion/descargar-resumen/${dataCursos[0].id_inscripcion}`
              );
            }}
            startIcon={<DownloadIcon />}
            variant="outlined"
          >
            Descargar Constancia de Inscripcion
          </LoadingButton>
        </div> */}
        <motion.div className="flex flex-wrap pb-24" initial="hidden" animate="show">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Denominacion Examen</TableCell>
                <TableCell align="center">Nota</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataNotas.map((value, index) => (
                <TableRow key={index} hover tabIndex={-1}>
                  <TableCell align="center">{value.id_examen.denominacion_examen}</TableCell>
                  <TableCell align="center">{value?.nota_promedio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* {dataCursos.map((course, index) => {
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
                        <b>{course.curso}</b>
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <CardContent className="flex flex-col flex-auto items-center justify-center">
                    <Typography className="textleft " variant="subtitle1" color="textSecondary">
                      <AccountBalanceIcon />
                      <b>{'         Aula:'}</b>
                      {course.aula}
                    </Typography>
                    {/* <Typography className="text-left text-16 font-medium">
                      <AccountCircleIcon />
                      {'         Ciclo:'}
                      {course.ciclo}
                    </Typography> 
                    <Typography className="text-left " variant="subtitle1" color="textSecondary">
                      <AccountCircleIcon />
                      <b>Docente:</b>
                      {course.nombre_docente}
                    </Typography>
                    <Typography className="text-left " variant="subtitle1" color="textSecondary">
                      <b>Horario:</b>
                    </Typography>
                    {course.datos.map((val) => (
                      <Typography
                        className="text-center text-13 mt-8 font-normal"
                        color="textSecondary"
                      >
                        <b>- {val.dia_dictado} </b>
                        {`${val.hora_inicio} - ${val.hora_fin} `}
                      </Typography>
                    ))}
                  </CardContent>
                  <CardActions className="justify-center ">
                    <Button
                      to={`/estudiante/cursos/${course.datos[0].id_horario.id}/${idUsuario}`}
                      component={Link}
                      color="secondary"
                      variant="contained"
                    >
                      Ver Curso
                    </Button>
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
          })} */}
        </motion.div>
      </ThemeProvider>
    </>
  );
};
export default NotasEstudiante;
