import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import axios from 'axios';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';
import ModalExamenManual from './modalGenerarExamenManual';
import ModalExamenAutomatico from './modalGenerarExamenAutomatico';

const schema = yup.object().shape({
  ciclo: yup.string().required('Campo Requerido'),
  numeroExamen: yup.string().required('Campo Requerido'),
  tipoExamen: yup.string().required('Campo Requerido'),
  fechaExamen: yup.string().required('Campo Requerido'),
  horaInicioExamen: yup.string().required('Campo Requerido'),
  horaFinExamen: yup.string().required('Campo Requerido'),
  denominacion: yup.string().required('Campo Requerido'),
});
const tiposExamen = [
  {
    denominacion: 'PARCIAL',
  },
  {
    denominacion: 'SIMULACRO',
  },
];

function ModalExamenes(props) {
  const { editar, data } = props;
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataCursos, setDataCursos] = useState([]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  function generarExamenAutomatico() {
    axios
      .post(`${RutaGeneral}/crear-examen-grupo/${data.id}`)
      .then((res) => {
        showSuccess('Examen Automatico Generado Correctamente');
      })
      .catch((err) => {
        showError('El examen no fue generado');
        console.log('error', err);
      });
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenDialog}
        disabled={data.finalizado}
      >
        Generar Examen
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
              Generar Examen
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
        <DialogContent className="grid grid-cols-2">
          <ModalExamenAutomatico data={data} close={handleCloseDialog} />
          <ModalExamenManual data={data} close={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalExamenes;
