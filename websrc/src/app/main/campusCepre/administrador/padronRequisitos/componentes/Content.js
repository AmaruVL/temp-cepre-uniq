import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalCiclo from './modalPadronCurso';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import PopperEliminar from './popperEliminar';
import PopperActivarDesactivar from './popperActivarDesactivar';

function PadronRequisitosContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosCiclo, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/documentos-requisito`)
      .then((res) => {
        props.setDatosCiclo(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      return x.nombre_documento.toLowerCase().includes(value) || !value;
    };
  }
  const actualizarEstado = (values) => {
    // axios
    //   .put(`${RutaGeneral}/padron-cursos/${values.id}`, {
    //     nombre_curso: values.nombre_curso,
    //     abreviacion: values.abreviacion,
    //     estado: !values.estado,
    //   })
    //   .then((res) => {
    //     axios
    //       .get(`${RutaGeneral}/padron-cursos`)
    //       .then((res2) => {
    //         props.setDatosCiclo(res2.data);
    //         setEstadoData(true);
    //       })
    //       .catch((err) => {});
    //   })
    //   .catch((err) => {});
  };
  // const eliminarEstado = (values) => {
  //   axios
  //     .delete(`${RutaGeneral}/padron-cursos/${values.id}`)
  //     .then((res) => {
  //       axios
  //         .get(`${RutaGeneral}/padron-cursos`)
  //         .then((res2) => {
  //           props.setDatosCiclo(res2.data);
  //           setEstadoData(true);
  //         })
  //         .catch((err) => {});
  //     })
  //     .catch((err) => {});
  // };

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
              <TableCell align="center">Nombre Documento</TableCell>
              <TableCell align="center">Documento Adjunto</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log('DC', datosCiclo)}
            {datosCiclo &&
              datosCiclo
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.id}</TableCell>
                    <TableCell align="center">{value.nombre_documento}</TableCell>
                    <TableCell align="center">
                      {value.documento === null ? (
                        ''
                      ) : (
                        <Tooltip title="Ver documento adjunto">
                          <IconButton
                            onClick={() => window.open(`${RutaGeneral}${value.documento}`)}
                            color="secondary"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {value.estado ? (
                        <OrdersStatus name="Activo" />
                      ) : (
                        <OrdersStatus name="Inactivo" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <ModalCiclo editar data={value} setDatosCiclo={props.setDatosCiclo} />
                      <PopperEliminar value={value} setDatosCiclo={props.setDatosCiclo} />
                      <PopperActivarDesactivar value={value} setDatosCiclo={props.setDatosCiclo} />
                      {/* <IconButton
                        onClick={() => {
                          actualizarEstado(value);
                        }}
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        {value.estado ? <RemoveIcon /> : <AddIcon />}
                      </IconButton> */}
                      {/* <IconButton
                        onClick={() => {
                          eliminarEstado(value);
                        }}
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        <DeleteIcon />
                      </IconButton> */}
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

export default PadronRequisitosContent;
