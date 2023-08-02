import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Ruta from '../../../../../shared-components/rutaGeneral';
import useMessages from '../../../../../hooks/useMessages';

const PopperEliminarExamen = (props) => {
  const { showSuccess, showError } = useMessages();
  const { value, idExamen } = props;
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
  const eliminarEstado = (values) => {
    setIsLoading(true);
    axios
      .delete(`${Ruta}/examen/eliminar-registro/${value.id}`)
      .then((res) => {
        setIsLoading(false);
        showSuccess('Se eliminó el examen.');
        axios.get(`${Ruta}/examenes`).then((res2) => {
          props.setDatosExamenes(res2.data);
        });
        handleClose();
      })
      .catch((err) => {
        setIsLoading(false);
        setOpen(false);
        showError('No se pudo eliminar el examen.');
        handleClose();
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
      <Tooltip title="Eliminar examen.">
        <IconButton
          onClick={handleClickPopper('bottom-end')}
          color="secondary"
          aria-label="add to shopping cart"
        >
          <DeleteOutlinedIcon />
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
            Esta seguro de eliminar la configuracion del examen <b>{value.denominacion_examen}</b> ?
          </Typography>
          <div className="grid grid-cols-2">
            <LoadingButton
              className="m-5"
              onClick={() => eliminarEstado(value)}
              loading={isLoading}
              variant="contained"
              color="error"
            >
              Eliminar
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
export default PopperEliminarExamen;
