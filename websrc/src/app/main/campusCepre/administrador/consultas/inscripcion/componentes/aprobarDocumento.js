import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel, IconButton, Radio, RadioGroup, TextField, Tooltip } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import useMessages from '../../../../../../hooks/useMessages';

function AprobarDocumento(props) {
  const { idRegistro, idEstudiante, value } = props;
  const [page, setPage] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataArchivo, setDataArchivo] = useState(null);
  const [documentosEstudiante, setDocumentosEstudiante] = useState([]);
  const [estadoObservacion, setEstadoObservacion] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      RadioGroup: '',
      observacion: '',
    },
  });

  function handleOpenDialog() {
    setOpenDialog(true);
    // axios.get(`${RutaGeneral}/aprobar-documentos/${idEstudiante}`).then((resp) => {
    //   setDocumentosEstudiante(resp.data);
    // });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    setLoadingButton(true);
    console.log('DATa', data);
    // const formData = new FormData();
    // formData.append('archivo_adjunto', dataArchivo);
    // formData.append('descripcion_material', data.descripcion);
    // formData.append('tipo_recurso', data.tipoRecurso);
    // formData.append('id_horario', idHorario);
    axios
      .patch(`${RutaGeneral}/aprobar-documentos-insc/${idRegistro}`, {
        id_administrador: idUsuario,
        esta_aprobado: data.RadioGroup,
        observaciones: data.observacion,
      })
      .then(async (val) => {
        setLoadingButton(false);
        showSuccess('Estado actualizado.');
        await axios.get(`${RutaGeneral}/aprobar-documentos/${idEstudiante}`).then((resp) => {
          props.setDocumentosEstudiante(resp.data);
        });
        handleCloseDialog();
      })
      .catch((err) => {
        setLoadingButton(false);
        showError('No se pudo guardar el estado.');
        handleCloseDialog();
      });
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const cambiarEstado = (id) => {
    if (id === '1') {
      setEstadoObservacion(false);
    } else if (id === '2') {
      setEstadoObservacion(true);
    }
  };

  return (
    <>
      <Tooltip title="Ver documentos subidos.">
        <IconButton color="secondary" onClick={handleOpenDialog}>
          <ListAltIcon />
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
              <b>Revision Documento</b>
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <DialogContent classes={{ root: 'p-16' }}>
            <div>
              <Controller
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      cambiarEstado(e.target.value);
                    }}
                    aria-label="estado"
                    name="estado"
                    className="flex flex-row"
                    defaultValue={value.esta_aprobado}
                  >
                    <FormControlLabel disabled value={0} control={<Radio />} label="Pendiente" />
                    <FormControlLabel value={1} control={<Radio />} label="Aprobar" />
                    <FormControlLabel value={2} control={<Radio />} label="Observar" />
                  </RadioGroup>
                )}
                name="RadioGroup"
                control={control}
              />
            </div>
            {estadoObservacion && (
              <div className="m-5">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Observacion"
                      id="observacion"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  defaultValue={value.observaciones}
                  name="observacion"
                  control={control}
                />
              </div>
            )}
            <div className="p-10">
              <LoadingButton
                loading={loadingButton}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Guardar
              </LoadingButton>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default AprobarDocumento;
