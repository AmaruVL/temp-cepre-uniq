import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';

function AsistenciaEstudianteContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataPagos, term } = props;
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
              <TableCell align="center">Denominacion Examen</TableCell>
              <TableCell align="center">Nota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPagos.map((value, index) => (
              <TableRow key={index} hover tabIndex={-1}>
                <TableCell align="center">{value.id_examen.denominacion_examen}</TableCell>
                <TableCell align="center">{value?.nota_promedio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
}

export default AsistenciaEstudianteContent;
