import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Button } from '@mui/material';

function ListaExamenesContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataCursos, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  // React.useEffect(() => {
  //   axios.get(`${RutaGeneral}/requisitos_documento/`).then((res) => {
  //     props.setDataRequisitos(res.data);
  //     setEstadoData(true);
  //   });
  // }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // function searchingTerm(value) {
  //   return function (x) {
  //     return x.denominacion.toLowerCase().includes(value.toLowerCase()) || !value;
  //   };
  // }
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">N°</TableCell> */}
              <TableCell align="center">Denominacion de Examen</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCursos &&
              dataCursos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover>
                    {/* <TableCell align="center">{index + 1}</TableCell> */}
                    <TableCell align="center">{value.denominacion}</TableCell>
                    <TableCell align="center">
                      <Button
                        href={`/estudiante/dar/examen/${value.id_examen}`}
                        variant="contained"
                        color="secondary"
                        size="medium"
                        disabled={!value.habilitado}
                      >
                        {value.habilitado ? 'Dar examen' : 'No habilitado'}
                      </Button>
                    </TableCell>
                    {/* <TableCell align="center">{value.id}</TableCell>
                    <TableCell align="center">{value.codigo_emision}</TableCell>
                    <TableCell align="center">{value.persona_nombres}</TableCell>
                    <TableCell align="center">{value.persona_dni} </TableCell>
                    <TableCell align="center">{value.fecha_emision.split('T')[0]}</TableCell>
                    <TableCell align="center">
                      {value.fecha_emision.split('T')[1].split('.')[0]}
                    </TableCell> */}
                    {/* <TableCell align="center">
                      <ModalAgregarRequisito
                        editar
                        data={value}
                        setDataRequisitos={props.setDataRequisitos}
                      />
                      <PopperActivarDesactivar
                        value={value}
                        setDataRequisitos={props.setDataRequisitos}
                      />
                      <ModalEliminar value={value} setDataRequisitos={props.setDataRequisitos} />
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
        count={dataCursos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ListaExamenesContent;
