import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { AppBar, TextField, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral ,{idUsuario} from 'app/shared-components/rutaGeneral';
import { Controller, useForm } from 'react-hook-form';
import useMessages from 'app/hooks/useMessages';

const LinkMeetCursosDocente = () => {  
  const { showSuccess, showError } = useMessages();
  const mainTheme = useSelector(selectMainTheme);
  const [dataCursos, setDataCursos] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios.get(`${RutaGeneral}/docente/inicio/${idUsuario}`).then((res) => {
      setDataCursos(res.data);
      console.log(res.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
  function onSubmit(dataForm) {
    console.log('DataConsulta', dataForm);
    axios
      .patch(`${RutaGeneral}/docente/actualizar-horario/${dataCursos[0].datos[0].id_horario.id}`, {
        enlace_meet: dataForm.enlace,
      })
      .then((resp) => {
        showSuccess('Se actualizó correctamente');
      })
      .catch((err) => showError('No se pudo actualizar.'));
  }
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <motion.div className="flex flex-wrap py-24" initial="hidden" animate="show">
          {dataCursos.map((course, index) => {
            return (
              <motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={index}>
                <Card className="flex flex-col h-100 shadow" color="secondary">
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

                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-col flex-auto items-center justify-center">
                      <Controller
                        name="enlace"
                        control={control}
                        defaultValue={course.enlace}
                        render={({ field }) => (
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            {...field}
                            // intialValue={course.enlace}
                            label="Enlace meet"
                            id="enlace"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </CardContent>
                    <CardActions className="justify-center pb-24">
                      <Button type="submit" color="secondary" variant="contained">
                        Actualizar Enlace
                      </Button>
                    </CardActions>
                  </form>
                  {/* <LinearProgress
                    className="w-full"
                    variant="determinate"
                    value={(course.activeStep * 100) / course.totalSteps}
                    color="secondary"
                  /> */}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </ThemeProvider>
    </>
  );
};
export default LinkMeetCursosDocente;
