import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

function ConsultaInscripcionContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosPadronCurso, setDatosPadronCurso, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/examen/parcial/subir-notas/ver-ciclos`)
      .then((res) => {
        setDatosPadronCurso(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, [estadoData]);
  function searchingTerm(value) {
    return function (x) {
      // const nombres = `${x.id_compromiso_pago.id_preinscripcion.dni_persona.nombres} ${x.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_paterno} ${x.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_materno}`;
      return x.denominacion.toLowerCase().includes(value) || !value;
    };
  }
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
              <TableCell align="center">N°</TableCell>
              <TableCell align="center">CICLO</TableCell>
              <TableCell align="center">ESTADO</TableCell>
              <TableCell align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosPadronCurso &&
              datosPadronCurso
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{value.denominacion}</TableCell>
                    <TableCell align="center">
                      <OrdersStatus name={value.activo ? 'Activo' : 'Inactivo'} />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver compromisos de pago para el ciclo.">
                        <IconButton
                          color="secondary"
                          to={`/preinscritos/${value.id}`}
                          component={Link}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {/* <TableCell align="center">
                      <OrdersStatus name={value.estado ? 'Activo' : 'Inactivo'} />
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
        count={datosPadronCurso.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ConsultaInscripcionContent;
