import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import { motion } from 'framer-motion';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import ModalPagarCuota from './modalPagarCuota';

function TesoreriaContent(props) {
  const { idCiclo } = props;
  const [page, setPage] = React.useState(0);
  const [dataDocumentos, setDataDocumentos] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datosCompromisosPago, setDatosCompromisosPago] = React.useState([]);
  const [estadoData, setEstadoData] = React.useState(false);
  const { term } = props;

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/ver-compromisos-detalle/${idCiclo}`)
      .then((res) => {
        setDatosCompromisosPago(res.data);
        setEstadoData(true);
      })
      .catch();
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      const nombres = `${x.data.id_preinscripcion.dni_persona.nombres} ${x.data.id_preinscripcion.dni_persona.apellido_paterno} ${x.data.id_preinscripcion.dni_persona.apellido_materno}`;
      return (
        x.data.id_preinscripcion.id_ciclo.denominacion.toLowerCase().includes(value) ||
        x.data.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional
          .toLowerCase()
          .includes(value) ||
        nombres.toLowerCase().includes(value) ||
        x.data.id_preinscripcion.dni_persona.dni.includes(value) ||
        !value
      );
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
              <TableCell align="center">NOMBRES</TableCell>
              <TableCell align="center">DNI</TableCell>
              <TableCell align="center">CICLO</TableCell>
              <TableCell align="center">ESCUELA PROFESIONAL</TableCell>
              <TableCell align="center">CUOTAS PAGADAS</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {datosCompromisosPago &&
              datosCompromisosPago
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{row.data.id}</TableCell>
                    <TableCell align="center">
                      {`${row.data.id_preinscripcion.dni_persona.nombres} ${row.data.id_preinscripcion.dni_persona.apellido_paterno} ${row.data.id_preinscripcion.dni_persona.apellido_materno}`}
                    </TableCell>
                    <TableCell align="center">
                      {row.data.id_preinscripcion.dni_persona.dni}
                    </TableCell>
                    <TableCell align="center">
                      {row.data.id_preinscripcion.id_ciclo.denominacion}
                    </TableCell>
                    <TableCell align="center">
                      {row.data.id_preinscripcion.id_escuela_profesional === null
                        ? ' '
                        : row.data.id_preinscripcion.id_escuela_profesional
                            .nombre_escuela_profesional}
                    </TableCell>
                    <TableCell align="center">
                      {row.nro_cuotas_pagadas}/{row.nro_total_cuotas}
                      {/* <OrdersStatus name="PAGOS PENDIENTES" /> */}
                    </TableCell>
                    <TableCell align="center">
                      {row.nro_cuotas_pagadas === row.nro_total_cuotas ? (
                        <OrdersStatus name="PAGOS COMPLETOS" />
                      ) : (
                        <OrdersStatus name="PAGOS PENDIENTES" />
                      )}
                    </TableCell>
                    <TableCell>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                      >
                        <ModalPagarCuota data={row} />
                      </motion.div>
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
        count={datosCompromisosPago.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default TesoreriaContent;
