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
import { Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ModalExamenes from './modalExamenes';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';
import ModalDetalleExamen from './modalDetalleExamen';
import PopperEliminar from './popperEliminar';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

function ExamenesSimulacroContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosExamenes, estadoCiclos, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);
  const { idExamen } = props;

  React.useEffect(() => {
    axios.get(`${RutaGeneral}/examen-grupo/ver-examenes-grupo/${idExamen}`).then((res) => {
      props.setDatosExamenes(res.data);
      setEstadoData(true);
    });
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // function searchingTerm(value) {
  //   return function (x) {
  //     return (
  //       x.denominacion_examen.toLowerCase().includes(value) ||
  //       x.tipo_examen.toLowerCase().includes(value) ||
  //       !value
  //     );
  //   };
  // }
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
            props.setDatosExamenes(res2.data);
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
            props.setDatosExamenes(res2.data);
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
              <TableCell align="center">Denominacion</TableCell>
              <TableCell align="center">Tipo Examen</TableCell>
              <TableCell align="center">Grupo</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {datosExamenes &&
              datosExamenes.examenes
                // .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.id}</TableCell>
                    <TableCell align="center">
                      <HtmlTooltip
                        title={
                          <>
                            <Typography color="inherit">
                              <b>Ciclos Enlazados al Examen</b>
                            </Typography>
                            {datosExamenes.ciclos.map((valueCiclo, indexCiclo) => (
                              <Typography key={indexCiclo} color="inherit">
                                <b>{indexCiclo + 1}.-</b> {valueCiclo.nombre_ciclo}
                              </Typography>
                            ))}
                          </>
                        }
                      >
                        <div>{value.id_examen.denominacion_examen}</div>
                      </HtmlTooltip>
                    </TableCell>
                    <TableCell align="center">{value.id_examen.tipo_examen}</TableCell>
                    <TableCell align="center">{value.id_grupo_academico.denominacion}</TableCell>
                    <TableCell align="center">
                      <OrdersStatus name={value.finalizado ? 'FINALIZADO' : 'EN PROCESO'} />
                    </TableCell>
                    <TableCell align="center">
                      <ModalExamenes
                        editar
                        data={value}
                        setDatosExamenes={props.setDatosExamenes}
                        estadoCiclos={estadoCiclos}
                      />
                      <ModalDetalleExamen data={value} />
                      <PopperEliminar
                        value={value}
                        idExamen={idExamen}
                        setDatosExamenes={props.setDatosExamenes}
                      />
                      {/* <IconButton
                        onClick={() => {
                          actualizarEstado(value);
                        }}
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        {value.estado ? <RemoveIcon /> : <AddIcon />}
                      </IconButton>
                      <IconButton
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
        count={datosExamenes.examenes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ExamenesSimulacroContent;
