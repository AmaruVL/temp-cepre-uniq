import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
// import ListaDocumentosInscritosCiclo from './listaDocumentosEstudiante';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import useMessages from '../../../../../../hooks/useMessages';
import ListaDocumentosInscritosCiclo from '../componentes/listaDocumentosEstudiante';

const schema = yup.object().shape({
  descripcion: yup.string().required('Campo Requerido'),
  tipoRecurso: yup.string().required('Campo Requerido'),
});
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

function ListaDocumentosInscritosCicloContent(props) {
  const { idHorario, idCiclo } = props;
  const [page, setPage] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataArchivo, setDataArchivo] = useState(null);
  const [dataLoad, setDataLoad] = useState(false);
  const [estudiantesCiclo, setEstudiantesCiclo] = useState([]);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      descripcion: '',
      tipoRecurso: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios.get(`${RutaGeneral}/consultas/inscripciones/${idCiclo}`).then((resp) => {
      setEstudiantesCiclo(resp.data);
      // console.log(resp.data);
      setDataLoad(true);
    });
  }, [dataLoad]);

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    setLoadingButton(true);
    const formData = new FormData();
    formData.append('archivo_adjunto', dataArchivo);
    formData.append('descripcion_material', data.descripcion);
    formData.append('tipo_recurso', data.tipoRecurso);
    formData.append('id_horario', idHorario);
    axios
      .post(`${RutaGeneral}/docente/material-curso`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((val) => {
        setLoadingButton(false);
        showSuccess('Material agregado.');
        handleCloseDialog();
      })
      .catch((err) => {
        setLoadingButton(false);
        showError('No se pudo agregar el material.');
        handleCloseDialog();
      });
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">DNI</TableCell>
                <TableCell align="center">NOMBRE</TableCell>
                <TableCell align="center">CARRERA PROFESIONAL</TableCell>
                <TableCell align="center">CICLO</TableCell>
                <TableCell className="p-0" align="center">
                  DOCUMENTOS APROBADOS
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {estudiantesCiclo &&
                estudiantesCiclo
                  // .filter(searchingTerm(term))
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
                        {value.data.id_compromiso_pago.id_preinscripcion.id_ciclo.denominacion}
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
                      <TableCell align="center">
                        <OrdersStatus
                          name={
                            value.aprobados === value.total_docs
                              ? 'COMPLETADO'
                              : value.desaprobados >= 1
                              ? 'OBSERVADO'
                              : 'PENDIENTE'
                          }
                        />
                      </TableCell>
                      {/* </HtmlTooltip> */}
                      {/* <TableCell align="center">{value.total_docs}</TableCell> */}
                      {/* </TableCell> */}
                      <TableCell align="center">
                        <ListaDocumentosInscritosCiclo
                          dataLoad={dataLoad}
                          setDataLoad={setDataLoad}
                          idEstudiante={value.data.id}
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
          count={estudiantesCiclo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default ListaDocumentosInscritosCicloContent;
