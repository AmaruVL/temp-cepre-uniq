import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import ModalCursoGrupo from './modalCursoGrupo';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

function CursoGrupoContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosPadronCursoGrupo, setDatosPadronCursoGrupo, estadoCursos, estadoGrupos, term } =
    props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios.get(`${RutaGeneral}/padron-curso-grupo`).then((res) => {
      setDatosPadronCursoGrupo(res.data);
      setEstadoData(true);
    });
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      return (
        x.id_padron_curso.nombre_curso.toLowerCase().includes(value) ||
        x.id_grupo_academico.denominacion.toLowerCase().includes(value) ||
        !value
      );
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
          .get(`${RutaGeneral}/curso-grupo/activos`)
          .then((res2) => {
            setDatosPadronCursoGrupo(res2.data);
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
          .get(`${RutaGeneral}/curso-grupo/activos`)
          .then((res2) => {
            setDatosPadronCursoGrupo(res2.data);
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
              <TableCell align="center">Curso</TableCell>
              <TableCell align="center">Grupo Academico</TableCell>
              <TableCell align="center">Horas por Semana</TableCell>
              {/* <TableCell align="center">Numero de Preguntas Examen</TableCell> */}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {datosPadronCursoGrupo &&
              datosPadronCursoGrupo
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.id}</TableCell>
                    <TableCell align="center">{value.id_padron_curso.nombre_curso}</TableCell>
                    <TableCell align="center">{value.id_grupo_academico.denominacion}</TableCell>
                    <TableCell align="center">{value.hora_semana}</TableCell>
                    {/* <TableCell align="center">{value.nro_preguntas_examen}</TableCell> */}
                    <TableCell align="center">
                      <ModalCursoGrupo
                        editar
                        data={value}
                        setDatosPadronCursoGrupo={setDatosPadronCursoGrupo}
                        estadoCursos={estadoCursos}
                        estadoGrupos={estadoGrupos}
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
        count={datosPadronCursoGrupo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default CursoGrupoContent;
