import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

function ConsultaPreInscripcionContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosPadronCurso, setDatosPadronCurso, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/consultas/preinscripciones`)
      .then((res) => {
        setDatosPadronCurso(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function searchingTerm(value) {
    return function (x) {
      const nombres = `${x.dni_persona.nombres} ${x.dni_persona.apellido_paterno} ${x.dni_persona.apellido_materno}`;
      return (
        // x.id_escuela_profesional.nombre_escuela_profesional.toLowerCase().includes(value) ||
        x.id_ciclo.denominacion.toLowerCase().includes(value) ||
        nombres.toLowerCase().includes(value) ||
        x.dni_persona.dni.includes(value) ||
        !value
      );
    };
  }
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">DNI</TableCell>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">CARRERA PROFESIONAL</TableCell>
              <TableCell align="center">CICLO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosPadronCurso &&
              datosPadronCurso
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.id}</TableCell>
                    <TableCell align="center">{value.dni_persona.dni}</TableCell>
                    <TableCell align="center">{`${value.dni_persona.nombres} ${value.dni_persona.apellido_paterno} ${value.dni_persona.apellido_materno}`}</TableCell>
                    <TableCell align="center">
                      {value.id_escuela_profesional != null &&
                        value.id_escuela_profesional.nombre_escuela_profesional}
                    </TableCell>
                    <TableCell align="center">{value.id_ciclo.denominacion}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <TablePagination
        className="flex-shrink-0 border-t-1"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={datosPadronCurso.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ConsultaPreInscripcionContent;
