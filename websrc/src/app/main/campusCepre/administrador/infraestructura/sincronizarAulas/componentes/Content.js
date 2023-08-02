import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import ModalCiclo from './modalAulas';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

function CicloContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosCiclo, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/aulas`)
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
              <TableCell align="center">Codigo Aula</TableCell>
              <TableCell align="center">Sillas Fijas</TableCell>
              <TableCell align="center">Sillas Moviles</TableCell>
              {/* <TableCell align="center">Nro Salon</TableCell>
              <TableCell align="center">Tipo Aula</TableCell> */}
              <TableCell align="center">Capacidad</TableCell>
              {/* <TableCell align="center">Piso</TableCell> */}
              <TableCell align="center">Nombre Pabellon</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log('DC', datosCiclo)}
            {datosCiclo &&
              datosCiclo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.codigo_aula}</TableCell>
                    <TableCell align="center">{value.sillas_fijas}</TableCell>
                    <TableCell align="center">{value.sillas_moviles}</TableCell>
                    {/* <TableCell align="center">{value.nro_salon}</TableCell>
                    <TableCell align="center">{value.tipo_aula}</TableCell> */}
                    <TableCell align="center">{value.capacidad}</TableCell>
                    {/* <TableCell align="center">{value.piso}</TableCell> */}
                    <TableCell align="center">{value.id_pabellon.nombre_pabellon}</TableCell>
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
