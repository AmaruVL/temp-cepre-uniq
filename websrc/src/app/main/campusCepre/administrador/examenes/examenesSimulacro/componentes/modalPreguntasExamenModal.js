import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton } from '@mui/material';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

function ModalPreguntaExamen(props) {
  const { editar, dataCurso, data } = props;
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataCursos, setDataCursos] = useState({ sin_asignar: [], asignados: [] });
  const [dataPreguntas, setDataPreguntas] = useState({ sin_asignar: [], asignados: [] });
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  async function handleOpenDialog() {
    await axios
      .get(`${RutaGeneral}/examen-grupo-lista/preguntas/${data.id}/${dataCurso.id}`)
      .then((resp) => {
        setDataPreguntas(resp.data);
      })
      .catch();

    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    reset({});
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(dataForm) {
    let entriesData = [];
    // console.log('DATAFORM', dataForm);
    entriesData = Object.entries(dataForm);
    console.log('Entries', entriesData);
    axios
      .post(`${RutaGeneral}/crear-examen-grupo/manual`, {
        id_examen_grupo: data.id,
        preguntas: entriesData,
      })
      .then((resp) => {
        showSuccess('Guardado Correctamente');
        handleCloseDialog();
      })
      .catch((err) => {
        showError('No se pudo guardar.');
        handleCloseDialog();
      });
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()}>
        Seleccione las preguntas para {dataCurso.id_padron_curso.nombre_curso}
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
              Seleccionar Preguntas del Examen
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
          <Typography className="flex pt-10">
            <b>Curso:</b>
            {dataCurso.id_padron_curso.nombre_curso}
          </Typography>
          <Typography className="flex pt-10">
            <b>Cantidad de Preguntas Permitidas para el Curso:</b>
            {dataCurso.nro_preguntas_examen}
          </Typography>
          <Typography className="flex pt-10">
            <b>Preguntas Asignadas:</b>
          </Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {dataPreguntas.asignados.map((value, index) => (
              <div key={index} className="flex">
                <Controller
                  name={`${value.data.id}`}
                  label={`${value.data.id}`}
                  type="checkbox"
                  control={control}
                  defaultValue
                  // defaultValue={value.estudiante.id_aula !== null}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        if (e.target.checked === true)
                          setCantidadSeleccionada(cantidadSeleccionada + 1);
                        else if (e.target.checked === false)
                          setCantidadSeleccionada(cantidadSeleccionada - 1);
                      }}
                    />
                  )}
                />
                <Typography
                  className="text-14 my-2 leading-normal"
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: value.data.texto_pregunta }}
                />
                {/* <Typography className="flex pt-10">{value.data.texto_pregunta}</Typography> */}
              </div>
            ))}
            <Typography className="flex pt-10">
              <b>Preguntas No Asignadas:</b>
            </Typography>
            {dataPreguntas.sin_asignar.map((value, index) => (
              <div key={index} className="flex">
                <Controller
                  name={`${value.data.id}`}
                  label={`${value.data.id}`}
                  type="checkbox"
                  control={control}
                  defaultValue={false}
                  // defaultValue={value.estudiante.id_aula !== null}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        if (e.target.checked === true)
                          setCantidadSeleccionada(cantidadSeleccionada + 1);
                        else if (e.target.checked === false)
                          setCantidadSeleccionada(cantidadSeleccionada - 1);
                      }}
                    />
                  )}
                />
                <Typography
                  className="text-14 my-2 leading-normal"
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: value.data.texto_pregunta }}
                />
                {/* <Typography className="flex pt-10">{value.data.texto_pregunta}</Typography> */}
              </div>
            ))}
            {cantidadSeleccionada > dataCurso.nro_preguntas_examen && (
              <Alert severity="warning">{`Solo puedes seleccionar ${dataCurso.nro_preguntas_examen} preguntas como maximo.`}</Alert>
            )}

            <Button
              disabled={cantidadSeleccionada > dataCurso.nro_preguntas_examen}
              className="my-12"
              variant="contained"
              color="primary"
              type="submit"
            >
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalPreguntaExamen;
