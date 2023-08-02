import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import ModalPadronCurso from './modalPadronCurso';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import PopperEliminar from './popperEliminar';

function ConfiguracionContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { term,datosConfiguracion, setDatosConfiguracion } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    console.log('data', datosConfiguracion);
    axios
      .get(`${RutaGeneral}/config-list`)
      .then((res) => {
        setDatosConfiguracion(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function searchingTerm(value) {
    return function (x) {
      return x?.clave?.toLowerCase().includes(value.toLowerCase()) || !value;
    };
  }

  const eliminarEstado = (values) => {
    axios
      .delete(`${RutaGeneral}/config-list/${values.id}`)
      .then((res) => {
        axios
          .get(`${RutaGeneral}/config-list`)
          .then((res2) => {
            setDatosConfiguracion(res2.data);
            setEstadoData(true);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
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
              <TableCell align="center">Clave</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosConfiguracion &&
              datosConfiguracion
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.clave}</TableCell>
                    <TableCell align="center">{value.valor}</TableCell>
                    <TableCell align="center">
                      <ModalPadronCurso
                        editar
                        data={value}
                        setDatosConfiguracion={setDatosConfiguracion}
                      />
                      <PopperEliminar value={value} setDatosConfiguracion={setDatosConfiguracion} />
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
        count={datosConfiguracion.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ConfiguracionContent;
