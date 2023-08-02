import { IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useMessages from '../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

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
    // console.log('DATA', dataForm);
    const formData = new FormData();
    // formData.append('nombre_documento', values.nombre_documento);
    // formData.append('descripcion', values.descripcion);
    // formData.append('documento', value.documento);
    formData.append('estado', !values.estado);
    axios
      .put(`${RutaGeneral}/documentos-requisito/${values.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      .then((res) => {
        setIsLoading(false);
        showSuccess('Se actualizo estado correctamente.');
        axios
          .get(`${RutaGeneral}/documentos-requisito`)
          .then((res2) => {
            props.setDatosCiclo(res2.data);
            setOpen(false);
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setIsLoading(false);
        setOpen(false);
        showError('No se pudo actualizar el estado del requisito.');
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
      <Tooltip title={value.estado ? 'Desactivar requisito' : 'Activar requisito'}>
        <IconButton
          onClick={handleClickPopper('bottom-end')}
          color="secondary"
          aria-label="add to shopping cart"
        >
          {value.estado ? <RemoveIcon /> : <AddIcon />}
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
            Esta seguro de {value.estado ? 'desactivar' : 'activar'} el requisito{' '}
            <b>{value.nombre_documento}</b> ?
          </Typography>
          <div className="grid grid-cols-2">
            <LoadingButton
              className="m-5"
              onClick={() => actualizarEstado(value)}
              loading={isLoading}
              variant="contained"
              color="error"
            >
              {value.estado ? 'Desactivar' : 'Activar'}
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
