import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton, TextField } from '@mui/material';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

function ModalExamenAutomatico(props) {
  const { editar, data } = props;
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [dataCursos, setDataCursos] = useState([]);
  const [blanco, setBlanco] = useState(0);
  const [errado, setErrado] = useState(0);
  const [loading, setloading] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useForm({
    defaultValues: {
      blanco,
      errado,
    },
  });

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
    console.log(dataFormEntries);
    dataFormEntries.pop();
    dataFormEntries.pop();
    dataFormEntries.pop();
    dataFormEntries.pop();
    console.log(dataFormEntries);
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
        axios
          .post(`${RutaGeneral}/crear-examen-grupo/${data.id}`, {
            max_blancos: dataForm.blanco,
            max_errado: dataForm.errado,
          })
          .then((res) => {
            showSuccess('Examen Automatico Generado Correctamente');
            props.close();
            handleCloseDialog();
          })
          .catch((err) => {
            showError('El examen no fue generado');
            handleCloseDialog();
            // console.log('error', err);
          });
      })
      .catch((err) => {
        showError('El examen no fue generado');
      });
  }
  return (
    <>
      <Button className="m-10" variant="contained" onClick={handleOpenDialog}>
        Generar Examen Automatico
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
              Generar Examen Automatico
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
            {dataCursos.map((value, index) => {
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
            <div className="grid md:grid-cols-2">
              <div className="flex">
                <Controller
                  name="preguntasBlanco"
                  type="checkbox"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setBlanco(e.target.checked);
                        // reset({ ...getValues(), detalleDiscapacidad: '' });
                      }}
                    />
                  )}
                />
                <Typography className="flex m-10">Preguntas en blanco</Typography>
              </div>
              <div className="flex">
                <Controller
                  name="preguntasErradas"
                  type="checkbox"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setErrado(e.target.checked);
                        // reset({ ...getValues(), detalleDiscapacidad: '' });
                      }}
                    />
                  )}
                />
                <Typography className="flex m-10">Preguntas erradas</Typography>
              </div>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="m-10 flex-auto">
                <TextField
                  fullWidth
                  disabled={!blanco}
                  name="blanco"
                  type="number"
                  id="blanco"
                  label="Nota maxima para preguntas en blanco"
                  {...register('blanco')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="m-10 flex-auto">
                <TextField
                  fullWidth
                  disabled={!errado}
                  name="errado"
                  type="number"
                  id="errado"
                  label="Nota maxima para preguntas erradas"
                  {...register('errado')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>

            <Button className="m-10" variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalExamenAutomatico;
