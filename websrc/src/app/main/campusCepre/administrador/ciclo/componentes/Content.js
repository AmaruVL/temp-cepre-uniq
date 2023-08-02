import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import ModalCiclo from './modalPadronCurso';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import PopperEliminar from './popperEliminar';
import PopperPublicarDespublicar from './popperPublicarDespublicar';
import PopperActivarDesactivar from './popperActivarDesactivar';

function CicloContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosCiclo, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/ciclos`)
      .then((res) => {
        props.setDatosCiclo(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      return x.denominacion.toLowerCase().includes(value) || !value;
    };
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">N°</TableCell>
              <TableCell align="center">Nombre de Ciclo</TableCell>
              <TableCell align="center">Fecha Inicio</TableCell>
              <TableCell align="center">Fecha Fin</TableCell>
              <TableCell align="center" colSpan={2}>
                Estado
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log('DC', datosCiclo)} */}
            {datosCiclo &&
              datosCiclo
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.id}</TableCell>
                    <TableCell align="center">{value.denominacion}</TableCell>
                    <TableCell align="center">{value.fecha_inicio_ciclo}</TableCell>
                    <TableCell align="center">{value.fecha_fin_ciclo}</TableCell>
                    <TableCell align="center">
                      {value.estado_publicar ? (
                        <OrdersStatus name="PUBLICADO" />
                      ) : (
                        <OrdersStatus name="PENDIENTE" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {value.activo ? (
                        <OrdersStatus name="ACTIVO" />
                      ) : (
                        <OrdersStatus name="INACTIVO" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <ModalCiclo editar data={value} setDatosCiclo={props.setDatosCiclo} />
                      <PopperEliminar value={value} setDatosCiclo={props.setDatosCiclo} />
                      <PopperPublicarDespublicar
                        value={value}
                        setDatosCiclo={props.setDatosCiclo}
                      />
                      <PopperActivarDesactivar value={value} setDatosCiclo={props.setDatosCiclo} />
                      {/* <IconButton
                        onClick={() => {
                          actualizarEstado(value);
                        }}
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        {value.estado ? <RemoveIcon /> : <AddIcon />}
                      </IconButton> */}
                      {/* <IconButton
                        onClick={() => {
                          eliminarEstado(value);
                        }}
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        <DeleteIcon />
                      </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <TablePagination
        className="flex-shrink-0 border-t-1"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={datosCiclo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default CicloContent;
