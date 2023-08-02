import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import LoadingButton from '@mui/lab/LoadingButton';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import useMessages from '../../../../hooks/useMessages';

const schema = yup.object().shape({
  pregunta: yup.string().required('Campo Requerido'),
});

function BalotarioCurso(props) {
  const { idHorario, dataCiclo } = props;
  // console.log('Data Ciclo ', dataCiclo);
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataArchivo, setDataArchivo] = useState('');
  const tipoRecursoData = [{ tipo: 'AVISO' }, { tipo: 'RECURSO' }];
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      pregunta: '',
    },
    resolver: yupResolver(schema),
  });
  //   useEffect(() => {
  //     if (editar) {
  //       reset({
  //         nombre: props.data.nombre_curso,
  //         abreviacion: props.data.abreviacion,
  //         descripcion: props.data.descripcion,
  //       });
  //     }
  //   }, [editar]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    console.log('si estoy');
    setLoadingButton(true);
    const formData = new FormData();
    formData.append('img_pregunta', dataArchivo);
    formData.append('texto_pregunta', data.pregunta);
    formData.append('id_padron_curso_grupo', dataCiclo.id);
    formData.append('id_docente', 1);
    axios
      .post(`${RutaGeneral}/docente/balotario/preguntas/${dataCiclo.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((val) => {
        setLoadingButton(false);
        showSuccess('Pregunta agregado.');
        handleCloseDialog();
      })
      .catch((err) => {
        setLoadingButton(false);
        showError('No se pudo agregar la pregunta.');
        handleCloseDialog();
      });
  }

  return (
    <>
      <Tooltip title="Agregar Nueva Pregunta">
        <IconButton color="secondary" onClick={handleOpenDialog}>
          {/* <EditIcon /> */}
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>Agregar Pregunta al Balotario del Curso</b>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  fullWidth
                  label="Texto de la Pregunta"
                  error={!!errors.pregunta}
                  helperText={errors.pregunta && errors.pregunta?.message}
                />
              )}
              name="pregunta"
              control={control}
            /> */}
            <Controller
              className="mt-8 mb-16"
              render={({ field }) => <WYSIWYGEditor {...field} />}
              name="pregunta"
              control={control}
            />
            <div>
              <p className=" pt-10 text-left">Archivo</p>
              <div className="m-10" id="upload-box">
                <input type="file" onChange={(e) => setDataArchivo(e.target.files[0])} />
              </div>
            </div>

            <LoadingButton
              loading={loadingButton}
              className="mb-12"
              variant="contained"
              color="primary"
              type="submit"
            >
              Guardar
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BalotarioCurso;
