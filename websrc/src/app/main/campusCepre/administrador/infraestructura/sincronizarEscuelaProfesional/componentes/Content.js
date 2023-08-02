import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import ModalEscuelaProfesional from './modalPadronCurso';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

function CicloContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosCiclo, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/escuelas-profesionales`)
      .then((res) => {
        props.setDatosCiclo(res.data);
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
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Codigo Escuela</TableCell>
              <TableCell align="center">Nombre de Escuela Profesional</TableCell>
              <TableCell align="center">Grupo Academico</TableCell>
              <TableCell />
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log('DC', datosCiclo)}
            {datosCiclo &&
              datosCiclo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.codigo_escuela}</TableCell>
                    <TableCell align="center">{value.nombre_escuela_profesional}</TableCell>
                    <TableCell align="center">{value.id_grupo_academico?.denominacion}</TableCell>
                    <TableCell align="center">
                      <ModalEscuelaProfesional
                        editar
                        data={value}
                        setDatosCiclo={props.setDatosCiclo}
                      />
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
