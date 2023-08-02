import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { LoadingButton } from '@mui/lab';
import useMessages from '../../../../../hooks/useMessages';

function ModalEliminarRegistro(props) {
  const { editar, ciclo, data, setDatosPagosCiclo } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function eliminar() {
    setloading(true);
    axios
      .delete(`${RutaGeneral}/eliminar-pago-con-detalles/${data.id}`)
      .then((res) => {
        axios.get(`${RutaGeneral}/pagos-ciclo/${ciclo}`).then((res2) => {
          setloading(false);
          showSuccess('Eliminado correctamente.');
          setDatosPagosCiclo(res2.data);
          handleCloseDialog();
        });
      })
      .catch((err) => {
        setloading(false);
        showError('No se pudo guardar.');
        handleCloseDialog();
      });
  }

  return (
    <>
      <Tooltip title="Editar monto">
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="success"
          onClick={handleOpenDialog}
        >
          Eliminar forma de pago
        </Button>
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
              <b>Eliminar forma de pago</b>
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
          <p>
            Esta seguro de <b>eliminar</b> la forma de pago que contiene{' '}
            <b> {data.nro_cuotas} cuota(s)</b>?{' '}
          </p>
          <div className="my-10 flex flex-row-reverse gap-4">
            <LoadingButton
              loading={loading}
              startIcon={<DeleteIcon />}
              variant="contained"
              onClick={() => eliminar()}
            >
              Eliminar
            </LoadingButton>
            <Button
              startIcon={<CloseIcon />}
              onClick={() => {
                handleCloseDialog();
              }}
              variant="contained"
            >
              Salir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalEliminarRegistro;
