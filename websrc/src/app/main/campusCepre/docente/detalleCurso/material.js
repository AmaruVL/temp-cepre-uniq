import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import useMessages from '../../../../hooks/useMessages';

const schema = yup.object().shape({
  descripcion: yup.string().required('Campo Requerido'),
});

function MaterialCurso(props) {
  const { idHorario, value, editar } = props;
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
      descripcion: '',
      enlace: '',
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
    if (editar) {
      reset({
        descripcion: value.descripcion_material,
        enlace: value.enlace_recurso,
      });
    }
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    setLoadingButton(true);
    const formData = new FormData();
    formData.append('archivo_adjunto', dataArchivo);
    formData.append('descripcion_material', data.descripcion);
    formData.append('enlace_recurso', data.enlace);
    formData.append('tipo_recurso', 'RECURSO');
    formData.append('id_horario', idHorario);
    if (editar) {
      axios
        .put(`${RutaGeneral}/docente/material-curso/${idHorario}/${value.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((val) => {
          setLoadingButton(false);
          showSuccess('Material actualizado.');
          axios.get(`${RutaGeneral}/docente/material-curso/${idHorario}`).then((resp) => {
            props.setDatosMaterialesCursos(resp.data);
          });
          handleCloseDialog();
        })
        .catch((err) => {
          setLoadingButton(false);
          showError('No se pudo actualizar el material.');
          handleCloseDialog();
        });
    } else {
      axios
        .post(`${RutaGeneral}/docente/material-curso`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((val) => {
          setLoadingButton(false);
          showSuccess('Material agregado.');
          handleCloseDialog();
        })
        .catch((err) => {
          setLoadingButton(false);
          showError('No se pudo agregar el material.');
          handleCloseDialog();
        });
    }
  }

  return (
    <>
      <Tooltip title={editar ? 'Editar material' : 'Agregar Material'}>
        <IconButton color="secondary" onClick={handleOpenDialog}>
          {/* <EditIcon /> */}
          {editar ? <EditIcon /> : <AddCircleOutlineIcon />}
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
              <b>Agregar Material</b>
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
            <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  fullWidth
                  label="Descripcion de Material"
                  error={!!errors.descripcion}
                  helperText={errors.descripcion && errors.descripcion?.message}
                />
              )}
              name="descripcion"
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField className="mb-12" {...field} fullWidth label="Enlace Recurso" />
              )}
              name="enlace"
              control={control}
            />
            {/* <Controller
              render={({ field }) => (
                <TextField
                  className="mb-12"
                  {...field}
                  label="Tipo de Recurso"
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  select
                  error={!!errors.tipoRecurso}
                  helperText={errors.tipoRecurso && errors.tipoRecurso?.message}
                >
                  {tipoRecursoData.map((value, index) => (
                    <MenuItem key={index} value={value.tipo}>
                      {value.tipo}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="tipoRecurso"
              control={control}
            /> */}
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

export default MaterialCurso;
