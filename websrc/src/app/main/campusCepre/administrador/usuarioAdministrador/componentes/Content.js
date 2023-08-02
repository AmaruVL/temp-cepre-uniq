import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import { Tooltip } from '@mui/material';
import ModalCreacionAdmin from './modalDocente';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

function AdministradorContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosPadronCurso, setDatosPadronCurso, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios.get(`${RutaGeneral}/registro/administradores`).then((res) => {
      setDatosPadronCurso(res.data);
      setEstadoData(true);
    });
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      return (
        x.user_type.email.toLowerCase().includes(value) ||
        `${x.user_type.first_name} ${x.user_type.last_name} ${x.user_type.sur_name}`
          .toLowerCase()
          .includes(value) ||
        !value
      );
    };
  }
  const actualizarEstado = (values) => {
    axios
      .patch(`${RutaGeneral}/registro/administradores/${values.id}`, {
        // id: values.id,
        // user_type: values.user_type,
        estado: !values.estado,
      })
      .then((res) => {
        axios
          .get(`${RutaGeneral}/registro/administradores`)
          .then((res2) => {
            setDatosPadronCurso(res2.data);
            setEstadoData(true);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };
  /* {const actualizarEstado = (values) => {
    axios
      .put(`${RutaGeneral}/padron-cursos/${values.id}`, {
        id: values.id,
        user_type: values.user_type,
        estado: !values.estado,
      })
      .then((res) => {
        axios
          .get(`${RutaGeneral}/padron-cursos`)
          .then((res2) => {
            setDatosPadronCurso(res2.data);
            setEstadoData(true);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };} */
  /* { const eliminarEstado = (values) => {
    axios
      .delete(`${RutaGeneral}/padron-cursos/${values.id}`)
      .then((res) => {
        axios
          .get(`${RutaGeneral}/padron-cursos`)
          .then((res2) => {
            setDatosPadronCurso(res2.data);
            setEstadoData(true);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };} */

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
              {/* <TableCell align="center">Codigo Docente</TableCell> */}
              <TableCell align="center">Nombres</TableCell>
              {/* <TableCell align="center">Categoria</TableCell> */}
              <TableCell align="center">Corre</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {datosPadronCurso &&
              datosPadronCurso
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    {/* <TableCell align="center">{value.codigo_docente}</TableCell> */}
                    <TableCell align="center">
                      {`${value.user_type.first_name} ${value.user_type.last_name} ${value.user_type.sur_name}`}
                    </TableCell>
                    {/* <TableCell align="center"> {value.regimen_docente}</TableCell> */}
                    <TableCell align="center"> {value.user_type.email}</TableCell>
                    <TableCell align="center">
                      <OrdersStatus name={value.estado ? 'Activo' : 'Inactivo'} />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={value.estado ? 'Desactivar Ciclo' : 'Activar Ciclo'}>
                        <IconButton
                          onClick={() => {
                            actualizarEstado(value);
                          }}
                          color="secondary"
                          aria-label="add to shopping cart"
                        >
                          {value.estado ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                      </Tooltip>
                      <ModalCreacionAdmin
                        editar
                        data={value}
                        setDatosPadronCurso={setDatosPadronCurso}
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
        count={datosPadronCurso.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default AdministradorContent;
