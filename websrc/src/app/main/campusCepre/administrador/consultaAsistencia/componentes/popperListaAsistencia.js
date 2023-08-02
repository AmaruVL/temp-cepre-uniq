import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import useMessages from 'app/hooks/useMessages';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
// import Ruta from '../../../../../shared-components/rutaGeneral';
// import useMessages from '../../../../hooks/useMessages';

const PopperListaAsistencia = (props) => {
  const { showSuccess, showError } = useMessages();
  const { value, idHorario } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataAsistencia, setdataAsistencia] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${RutaGeneral}/administrador/consultas/ver-asistencia-docente/${idHorario}`)
      .then((res) => {
        setdataAsistencia(res.data);
      })
      .catch((e) => {
        showError('No se pudo recuperar la asistencia del docente.');
      });
  }, []);

  const handleClickPopper = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    p: 1,
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
          {dataAsistencia.length === 0 && (
            <Typography className="p-10">No tiene asistencias registradas</Typography>
          )}
          <FuseScrollbars className="flex-grow overflow-x-auto">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Día</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {dataAsistencia
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((valueAsistencia, index) => (
                    <TableRow key={index} hover>
                      <TableCell align="center">
                        {valueAsistencia.fecha_sesion.split('T')[0]}
                      </TableCell>
                      <TableCell align="center">
                        <OrdersStatus
                          name={valueAsistencia.estado_asistencia ? 'Presente' : 'Ausente'}
                        />
                      </TableCell>
                      {/* <TableCell align="center">{valueAsistencia.observacion}</TableCell> */}
                      {/* <TableCell align="center">
                    <ModalActualizarAsistencia
                      value={value}
                      fechaIn={props.fechaIn}
                      fechaFin={props.fechaFin}
                      curso={props.curso}
                      setDataEstudiante={props.setDataEstudiante}
                    />
                  </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </FuseScrollbars>
          <TablePagination
            className="flex-shrink-0 border-t-1"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dataAsistencia.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Modal>
    </>
  );
};
export default PopperListaAsistencia;
