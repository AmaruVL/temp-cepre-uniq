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
import ModalCreacionDocente from './modalDocente';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

function PadronCursoContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosPadronCurso, setDatosPadronCurso, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);
  const [cursosList, setCursosList] = React.useState('');

  React.useEffect(() => {
    axios.get(`${RutaGeneral}/registro/docentes`).then((res) => {
      setDatosPadronCurso(res.data);
      setEstadoData(true);
    });
  }, []);
  function cursosLista(datos) {
    const cursosFiltrados = datos.map((elemento) => elemento.id_curso.nombre_curso);
    const cursosString = cursosFiltrados.join(', ');
    return cursosString;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      const cursosFiltrados = x.cursos.map((elemento) => elemento.id_curso.nombre_curso);
      const cursosString = cursosFiltrados.join(',');
      return (
        x.docente.user_type.first_name.toLowerCase().includes(value.toLowerCase()) ||
        x.docente.codigo_docente.toLowerCase().includes(value.toLowerCase()) ||
        cursosString.toLowerCase().includes(value.toLowerCase()) ||
        !value
      );
    };
  }
  const actualizarEstado = (values) => {
    axios
      .patch(`${RutaGeneral}/registro/docentes/${values.docente.id}`, {
        estado_Activo: !values.docente.estado_Activo,
      })
      .then((res) => {
        axios
          .get(`${RutaGeneral}/registro/docentes`)
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
              <TableCell align="center">Nombres</TableCell>
              {/* <TableCell align="center">Categoria</TableCell> */}
              <TableCell align="center">Cursos</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {datosPadronCurso !== null &&
              datosPadronCurso
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">
                      {`${value.docente.user_type.first_name} ${value.docente.user_type.last_name} ${value.docente.user_type.sur_name}`}
                    </TableCell>
                    {/* <TableCell align="center"> {value.regimen_docente}</TableCell> */}
                    <TableCell align="left"> {cursosLista(value.cursos)}</TableCell>
                    <TableCell align="left">
                      <OrdersStatus name={value.docente.estado_Activo ? 'Activo' : 'Inactivo'} />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip
                        title={
                          value.docente.estado_Activo ? 'Desactivar docente' : 'Activar docente'
                        }
                      >
                        <IconButton
                          onClick={() => {
                            actualizarEstado(value);
                          }}
                          variant="contained" color="secondary"
                          aria-label="add to shopping cart"
                        >
                          {value.docente.estado_Activo ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                      </Tooltip>
                      <ModalCreacionDocente
                        editar
                        data={value.docente}
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
        count={datosPadronCurso !== null ? datosPadronCurso.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default PadronCursoContent;
