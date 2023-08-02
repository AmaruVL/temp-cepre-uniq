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
import ModalPadronCurso from './modalPadronCurso';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import PopperEliminar from './popperEliminar';

function PadronCursoContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosPadronCurso, setDatosPadronCurso, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/padron-cursos`)
      .then((res) => {
        setDatosPadronCurso(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      return x.nombre_curso.toLowerCase().includes(value) || !value;
    };
  }
  const actualizarEstado = (values) => {
    axios
      .put(`${RutaGeneral}/padron-cursos/${values.id}`, {
        nombre_curso: values.nombre_curso,
        abreviacion: values.abreviacion,
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
  };
  const eliminarEstado = (values) => {
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
              <TableCell align="center">Nombre de Curso</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">ACCIONES</TableCell>
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
                    <TableCell align="center">{value.nombre_curso}</TableCell>
                    <TableCell align="center">
                      <OrdersStatus name={value.estado ? 'Activo' : 'Inactivo'} />
                    </TableCell>
                    <TableCell align="center">
                      <ModalPadronCurso
                        editar
                        data={value}
                        setDatosPadronCurso={setDatosPadronCurso}
                      />
                      <Tooltip title={value.estado ? 'Desactivar curso' : 'Activar curso'}>
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
                      <PopperEliminar value={value} setDatosPadronCurso={setDatosPadronCurso} />
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

export default PadronCursoContent;
