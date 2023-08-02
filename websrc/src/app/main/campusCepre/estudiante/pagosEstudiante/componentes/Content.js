import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import OrdersStatus from 'app/shared-components/OrdersStatus';

function AsistenciaEstudianteContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataPagos, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  // React.useEffect(() => {
  //   axios.get(`${RutaGeneral}/requisitos_documento/`).then((res) => {
  //     props.setDataRequisitos(res.data);
  //     setEstadoData(true);
  //   });
  // }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // function searchingTerm(value) {
  //   return function (x) {
  //     return x.denominacion.toLowerCase().includes(value.toLowerCase()) || !value;
  //   };
  // }
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">N° de Cuota</TableCell>
              <TableCell align="center">Monto</TableCell>
              <TableCell align="center">Monto mora</TableCell>
              <TableCell align="center">Codigo Compromiso Pago</TableCell>
              <TableCell align="center">Fecha Vencimiento</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPagos &&
              dataPagos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="center">{value.numero_cuota}</TableCell>
                    <TableCell align="center">{value.monto}</TableCell>
                    <TableCell align="center">{value.monto_mora}</TableCell>
                    <TableCell align="center">{value.codigo_compromiso_pago}</TableCell>
                    <TableCell align="center">{value.fecha_fin}</TableCell>
                    <TableCell align="center">
                      <OrdersStatus name={value.esta_pagado ? 'Pagado' : 'Pendiente'} />
                    </TableCell>
                    {/* <TableCell align="center">{value.id}</TableCell>
                    <TableCell align="center">{value.codigo_emision}</TableCell>
                    <TableCell align="center">
                      <OrdersStatus name="Entregado" />
                    </TableCell>
                    <TableCell align="center">{value.fecha_emision.split('T')[0]}</TableCell>
                    <TableCell align="center">
                      {value.fecha_emision.split('T')[1].split('.')[0]}
                    </TableCell> */}
                    {/* <TableCell align="center">
                      <ModalAgregarRequisito
                        editar
                        data={value}
                        setDataRequisitos={props.setDataRequisitos}
                      />
                      <PopperActivarDesactivar
                        value={value}
                        setDataRequisitos={props.setDataRequisitos}
                      />
                      <ModalEliminar value={value} setDataRequisitos={props.setDataRequisitos} />
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
        count={dataPagos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default AsistenciaEstudianteContent;
