import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Tooltip, Typography } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

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

function ReporteAsistenciaEstudiantesHeader(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataCursos, dataEstudiante, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

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
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">DNI</TableCell>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">CARRERA PROFESIONAL</TableCell>
              <TableCell align="center">COLEGIO</TableCell>
              <TableCell className="p-0" align="center">
                DOCUMENTOS APROBADOS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEstudiante &&
              dataEstudiante
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="center">{value.data.id}</TableCell>
                    <TableCell align="center">
                      {value.data.id_compromiso_pago.id_preinscripcion.dni_persona.dni}
                    </TableCell>
                    <TableCell align="center">{`${value.data.id_compromiso_pago.id_preinscripcion.dni_persona.nombres} ${value.data.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_paterno} ${value.data.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_materno}`}</TableCell>
                    <TableCell align="center">
                      {value.data.id_compromiso_pago.id_preinscripcion.id_escuela_profesional !=
                        null &&
                        value.data.id_compromiso_pago.id_preinscripcion.id_escuela_profesional
                          .nombre_escuela_profesional}
                    </TableCell>
                    <TableCell align="center">
                      {`${
                        value.data.id_compromiso_pago.id_preinscripcion.id_colegio.nombre_colegio
                      } - ${
                        value.data.id_compromiso_pago.id_preinscripcion.id_colegio.tipo_colegio ===
                        'PU'
                          ? 'Publico'
                          : 'Privado'
                      } `}
                    </TableCell>

                    <TableCell className="p-0 m-0" align="center">
                      <HtmlTooltip
                        title={
                          <>
                            <Typography color="inherit">Resumen de Revisión</Typography>
                            <p>
                              <em>Tiene</em> <b>{value.aprobados}</b> documentos aprobados.
                            </p>
                            <p>
                              <em>Tiene</em> <b>{value.pendientes}</b> documentos pendientes de
                              revision.
                            </p>
                            <p>
                              <em>Tiene</em> <b>{value.desaprobados}</b> documentos observados.
                            </p>
                            <p>
                              <b>Total de Documentos: </b> <b>{value.total_docs}</b>.
                            </p>
                          </>
                        }
                      >
                        <div>
                          {value.aprobados}/{value.total_docs}
                        </div>
                      </HtmlTooltip>
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
        count={dataEstudiante.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ReporteAsistenciaEstudiantesHeader;
