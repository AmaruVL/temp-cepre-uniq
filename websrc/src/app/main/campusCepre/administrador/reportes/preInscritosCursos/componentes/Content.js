import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import ModalPieChart from './modalPieChart';

function ReporteAsistenciaEstudiantesHeader(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataCursos, dataEstudiante, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
              <TableCell align="center" colSpan={3}>
                Escuela Profesional
              </TableCell>
              <TableCell align="center">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEstudiante &&
              dataEstudiante
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="left" colSpan={3}>
                      {value.escuela_prof}
                    </TableCell>
                    <TableCell align="center">{value.cantidad}</TableCell>
                  </TableRow>
                ))}
            {dataEstudiante.length > 0 && (
              <>
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2} align="left">
                    Preinscripciones no concluidas
                  </TableCell>
                  <TableCell align="center">{dataEstudiante[0].no_concluido}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align="left">
                    Total
                  </TableCell>
                  <TableCell align="center">{dataEstudiante[0].total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} align="left">
                    Graficos
                  </TableCell>
                  <TableCell align="center">
                    <ModalPieChart dataEstudiante={dataEstudiante} />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
}

export default ReporteAsistenciaEstudiantesHeader;
