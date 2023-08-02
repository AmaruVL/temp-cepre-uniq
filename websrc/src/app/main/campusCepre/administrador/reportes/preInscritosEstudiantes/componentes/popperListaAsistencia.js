import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import ModalActualizarAsistencia from './modalActualizarAsistencia';
// import Ruta from '../../../../../shared-components/rutaGeneral';
// import useMessages from '../../../../hooks/useMessages';

const PopperListaAsistencia = (props) => {
  // const { showSuccess, showError } = useMessages();
  const { asistencias } = props;
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
      <Tooltip title="Ver asistencia">
        <IconButton
          onClick={handleClickPopper('bottom-end')}
          color="secondary"
          aria-label="add to shopping cart"
        >
          <PlaylistAddCheckIcon />
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
            <b>Lista de Asistencia</b>
          </Typography>
          {asistencias.length === 0 && (
            <Typography className="p-10">No tiene asistencias registradas</Typography>
          )}
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Dia</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Observacion</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {asistencias.map((value, index) => (
                <TableRow key={index} hover>
                  <TableCell align="center">{value.fecha_sesion.split('T')[0]}</TableCell>
                  <TableCell align="center">
                    <OrdersStatus name={value.estado_asistencia ? 'Presente' : 'Ausente'} />
                  </TableCell>
                  <TableCell align="center">{value.observacion}</TableCell>
                  <TableCell align="center">
                    <ModalActualizarAsistencia
                      value={value}
                      fechaIn={props.fechaIn}
                      fechaFin={props.fechaFin}
                      curso={props.curso}
                      setDataEstudiante={props.setDataEstudiante}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
};
export default PopperListaAsistencia;
