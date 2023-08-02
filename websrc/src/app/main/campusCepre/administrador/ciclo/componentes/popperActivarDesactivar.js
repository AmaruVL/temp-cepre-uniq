import { IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Ruta from '../../../../../shared-components/rutaGeneral';
import useMessages from '../../../../../hooks/useMessages';

const PopperActivarDesactivar = (props) => {
  const { showSuccess, showError } = useMessages();
  const { value, idHorario } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickPopper = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const actualizarEstado = (values) => {
    setIsLoading(true);
    axios
      .patch(`${Ruta}/ciclos/${value.id}`, {
        activo: !value.activo,
      })
      .then((res) => {
        setIsLoading(false);
        showSuccess('Se actualizo el estado del ciclo.');
        axios
          .get(`${Ruta}/ciclos`)
          .then((res2) => {
            props.setDatosCiclo(res2.data);
            setOpen(false);
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setIsLoading(false);
        setOpen(false);
        showError('No se pudo publicar el estado del ciclo.');
      });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Tooltip title={value.activo ? 'Desactivar Ciclo' : 'Activar Ciclo'}>
        <IconButton
          onClick={handleClickPopper('bottom-end')}
          color="secondary"
          aria-label="add to shopping cart"
        >
          {value.activo ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="p-10">
            Esta seguro de {value.estado_publicar ? 'desactivar' : 'activar'} el ciclo{' '}
            <b>{value.denominacion}</b> ?
          </Typography>
          <div className="grid grid-cols-2">
            <LoadingButton
              className="m-5"
              onClick={() => actualizarEstado(value)}
              loading={isLoading}
              variant="contained"
              color="error"
            >
              {value.estado_publicar ? 'Desactivar' : 'Activar'}
            </LoadingButton>
            <LoadingButton
              className="m-5"
              onClick={handleClose}
              loading={isLoading}
              variant="contained"
              color="info"
            >
              Cancelar
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default PopperActivarDesactivar;
