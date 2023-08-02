import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';

function ModalCiclo(props) {
  const { editar, data } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
     
    },
    
  });
  

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(dataForm) {
    
      axios
        .post(`${RutaGeneral}/sincronizar/escuelas-profesionales`, {
        })
        .then((res) => {
          handleCloseDialog();
          axios.get(`${RutaGeneral}/escuelas-profesionales`).then((res2) => {
            props.setDatosCiclo(res2.data);
          });
        })
        .catch();
    
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        {'Sincronizar'}
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        
          <form onSubmit={handleSubmit(onSubmit)}>        
            <Button className="my-12" variant="contained" color="primary" type="submit">
              {'actualizar'}
            </Button>
          </form>
        
      </Dialog>
    </>
  );
}

export default ModalCiclo;
