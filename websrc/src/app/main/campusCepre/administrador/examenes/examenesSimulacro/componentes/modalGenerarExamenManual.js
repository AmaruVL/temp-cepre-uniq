import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';
import ModalPreguntaExamen from './modalPreguntasExamenModal';
import FinalizarExamen from './modalFinalizarExamen';

function ModalExamenManual(props) {
  const { editar, data } = props;
  const [numeroPreguntasActualizadas, setNumeroPreguntasActualizadas] = useState(false);
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [dataCursos, setDataCursos] = useState([]);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useForm();

  function handleOpenDialog() {
    setOpenDialog(true);
    axios.get(`${RutaGeneral}/crear-examen-grupo/manual/${data.id}`).then((resp) => {
      setDataCursos(resp.data);
    });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  // function guardarExamenManual() {
  //   axios
  //     .patch(`${RutaGeneral}/examen/actualizar-estado/${data.id}`)
  //     .then((res) => {
  //       showSuccess('Examen Generado Correctamente');
  //       handleCloseDialog();
  //       props.close();
  //     })
  //     .catch((err) => {
  //       showError('El examen no fue generado');
  //       handleCloseDialog();
  //     });
  // }
  // function generarExamenAutomatico() {
  //   axios
  //     .post(`${RutaGeneral}/crear-examen-grupo/${data.id}`)
  //     .then((res) => {
  //       showSuccess('Examen Automatico Generado Correctamente');
  //     })
  //     .catch((err) => {
  //       showError('El examen no fue generado');
  //       console.log('error', err);
  //     });
  // }
  function onSubmit(dataForm) {
    const dataFormEntries = Object.entries(dataForm);
    dataFormEntries.forEach((value, index) => {
      value[0] = parseInt(value[0], 10);
      value[1] = parseInt(value[1], 10);
    });
    // console.log('DF Entries Convert', dataFormEntries);
    axios
      .put(`${RutaGeneral}/curso-grupo/actualizar-nro-preguntas`, {
        lista_cursos: dataFormEntries,
      })
      .then((resp) => {
        showSuccess('Cantidad de preguntas configurado correctamente.');
        setNumeroPreguntasActualizadas(true);
        axios.get(`${RutaGeneral}/crear-examen-grupo/manual/${data.id}`).then((resp2) => {
          setDataCursos(resp2.data);
        });
      })
      .catch((err) => {
        showError('La cantidad de preguntas no fue configurada correctamente.');
        // console.log('error', err);
      });
  }
  return (
    <>
      <Button className="m-10" variant="contained" onClick={handleOpenDialog}>
        Generar Examen Manual
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              Generar Examen Manual
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
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!numeroPreguntasActualizadas &&
              dataCursos.map((value, index) => {
                // console.log('VALue', value);
                const nameInput = `${value.id}`;
                return (
                  <div key={index} className=" m-10">
                    <Typography className="m-5" variant="subtitle1" color="inherit">
                      {value.id_padron_curso.nombre_curso} :
                    </Typography>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label={`Cantidad de preguntas para ${value.id_padron_curso.nombre_curso}`}
                      error={!!errors.nameInput}
                      type="number"
                      helperText={errors.nameInput && errors.nameInput?.message}
                      {...register(nameInput, {
                        required: 'Campo requerido!',
                      })}
                    />
                    {/* <ModalPreguntaExamen dataCurso={value} data={data} /> */}
                  </div>
                );
              })}

            {!numeroPreguntasActualizadas && (
              <Button className="m-10" variant="contained" color="primary" type="submit">
                Guardar
              </Button>
            )}
          </form>

          {numeroPreguntasActualizadas &&
            dataCursos.map((value, index) => (
              <div key={index} className="flex m-10">
                {/* <h1 className="flex-auto">{value.id_padron_curso.nombre_curso}</h1> */}
                <ModalPreguntaExamen dataCurso={value} data={data} />
              </div>
            ))}
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2">
              <div className="flex">
                <Controller
                  name="condicionDiscapacidad"
                  label="condicioDiscapacidad"
                  type="checkbox"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setEstadoDiscapacidad(e.target.checked);
                        reset({ ...getValues(), detalleDiscapacidad: '' });
                      }}
                    />
                  )}
                />
                <Typography className="flex m-10">Discapacidad</Typography>
              </div>
              <div className="m-10 flex-auto">
                <TextField
                  fullWidth
                  disabled={!estadoDiscapacidad}
                  name="detalleDiscapacidad"
                  id="detalleDiscapacidad"
                  label="detalleDiscapacidad"
                  // error={!!errors.telefonoApoderado}
                  // helperText={errors.telefonoApoderado && errors.telefonoApoderado?.message}
                  {...register('detalleDiscapacidad')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          </form> */}
          {numeroPreguntasActualizadas && (
            <center>
              {/* <Button
                className="m-10"
                variant="contained"
                color="primary"
                onClick={() => guardarExamenManual()}
              >
                Finalizar configuración
              </Button> */}
              <FinalizarExamen
                handleCloseDialog={handleCloseDialog}
                id={data.id}
                close={props.close}
              />
            </center>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalExamenManual;
