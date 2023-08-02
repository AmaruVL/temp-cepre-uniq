import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import PopperEliminarExamen from './popperEliminarExamen';
import PopperLanzarExamen from './popperLanzarExamen';
import PopperCerrarExamen from './popperCerrarExamen';

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

function ExamenesContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosExamenes, estadoCiclos, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios.get(`${RutaGeneral}/examenes`).then((res) => {
      props.setDatosExamenes(res.data);
      setEstadoData(true);
    });
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function searchingTerm(value) {
    return function (x) {
      return (
        x.denominacion_examen.toLowerCase().includes(value) ||
        x.tipo_examen.toLowerCase().includes(value) ||
        // x.id_ciclo.denominacion.toLowerCase().includes(value) ||
        !value
      );
    };
  }

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
              {/* <TableCell align="center">Ciclo</TableCell> */}
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {datosExamenes &&
              datosExamenes
                .filter(searchingTerm(term))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{value.id}</TableCell>
                    <TableCell className="p-0 m-0" align="center">
                      {value.denominacion_examen}
                    </TableCell>
                    <TableCell align="center">{value.tipo_examen}</TableCell>
                    {/* <TableCell align="center">{value.id_ciclo.denominacion}</TableCell> */}
                    <TableCell align="center">{value.fecha_examen}</TableCell>
                    <TableCell align="center">
                      {value.tipo_examen === 'SIMULACRO' &&
                        (value.lanzar_examen ? 'Examen lanzando' : 'Examen no lanzado')}
                    </TableCell>
                    <TableCell align="center">
                      {/* <ModalExamenes
                        editar
                        data={value}
                        setDatosExamenes={props.setDatosExamenes}
                        estadoCiclos={estadoCiclos}
                      /> */}
                      {value.tipo_examen === 'SIMULACRO' && (
                        <Tooltip title="Ver examenes por grupo academico.">
                          <IconButton
                            color="secondary"
                            to={`/examenessimulacro/${value.id}`}
                            component={Link}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <PopperEliminarExamen
                        value={value}
                        setDatosExamenes={props.setDatosExamenes}
                      />
                      <PopperLanzarExamen value={value} setDatosExamenes={props.setDatosExamenes} />
                      {value.lanzar_examen && (
                        <PopperCerrarExamen
                          value={value}
                          setDatosExamenes={props.setDatosExamenes}
                        />
                      )}
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
        count={datosExamenes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ExamenesContent;
