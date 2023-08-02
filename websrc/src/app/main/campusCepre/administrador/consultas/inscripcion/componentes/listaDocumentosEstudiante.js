import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import ListAltIcon from '@mui/icons-material/ListAlt';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import { LoadingButton } from '@mui/lab';
import AprobarDocumento from './aprobarDocumento';
import useMessages from '../../../../../../hooks/useMessages';

const schema = yup.object().shape({
  descripcion: yup.string().required('Campo Requerido'),
  tipoRecurso: yup.string().required('Campo Requerido'),
});

function ListaDocumentosInscritosCiclo(props) {
  const { idEstudiante, dataLoad, setDataLoad } = props;
  const [page, setPage] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataArchivo, setDataArchivo] = useState(null);
  const [documentosEstudiante, setDocumentosEstudiante] = useState([]);
  // const [loadingButton, setloadingButton] = useState(false)
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

  function handleOpenDialog() {
    setOpenDialog(true);
    axios.get(`${RutaGeneral}/aprobar-documentos/${idEstudiante}`).then((resp) => {
      setDocumentosEstudiante(resp.data);
    });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    // setLoadingButton(true);
    // const formData = new FormData();
    // formData.append('archivo_adjunto', dataArchivo);
    // formData.append('descripcion_material', data.descripcion);
    // formData.append('tipo_recurso', data.tipoRecurso);
    // formData.append('id_horario', idHorario);
    // axios
    //   .post(`${RutaGeneral}/docente/material-curso`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((val) => {
    //     setLoadingButton(false);
    //     showSuccess('Material agregado.');
    //     handleCloseDialog();
    //   })
    //   .catch((err) => {
    //     setLoadingButton(false);
    //     showError('No se pudo agregar el material.');
    //     handleCloseDialog();
    //   });
  }
  function enviarReporte() {
    setLoadingButton(true);
    axios
      .post(`${RutaGeneral}/enviar-info-correo/${idEstudiante}`)
      .then((resp) => {
        showSuccess('Guardado y enviado correctamente.');
        setDataLoad(!dataLoad);
        setLoadingButton(false);
        handleCloseDialog();
      })
      .catch((err) => {
        showError('No se puso guardar.');
        setLoadingButton(false);
        setDataLoad(!dataLoad);
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
      <Tooltip title="Ver documentos subidos.">
        <IconButton color="secondary" onClick={handleOpenDialog}>
          <ListAltIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>Documentos del Estudiante</b>
            </Typography>
            <IconButton
              className="flex-none justify-items-end"
              onClick={handleCloseDialog}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">DOCUMENTO</TableCell>
                <TableCell align="center">ADJUNTO</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentosEstudiante &&
                documentosEstudiante
                  // .filter(searchingTerm(term))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <TableRow key={index} hover>
                      <TableCell align="left">{value.nombre_documento}</TableCell>
                      <TableCell align="center">
                        {value.documento !== null && (
                          <Tooltip title="Ver documento">
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
                        {value.esta_aprobado === 0 && <OrdersStatus name="PENDIENTE" />}
                        {value.esta_aprobado === 1 && <OrdersStatus name="APROBADO" />}
                        {value.esta_aprobado === 2 && <OrdersStatus name="OBSERVADO" />}
                      </TableCell>
                      <TableCell align="center">
                        <AprobarDocumento
                          idRegistro={value.id}
                          value={value}
                          idEstudiante={idEstudiante}
                          setDocumentosEstudiante={setDocumentosEstudiante}
                        />
                      </TableCell>
                      {/* <TableCell align="center">{value.id}</TableCell>
                      <TableCell align="center">
                        {value.id_compromiso_pago.id_preinscripcion.dni_persona.dni}
                      </TableCell>
                      <TableCell align="center">{`${value.id_compromiso_pago.id_preinscripcion.dni_persona.nombres} ${value.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_paterno} ${value.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_materno}`}</TableCell>
                      <TableCell align="center">
                        {value.id_compromiso_pago.id_preinscripcion.id_escuela_profesional !=
                          null &&
                          value.id_compromiso_pago.id_preinscripcion.id_escuela_profesional
                            .nombre_escuela_profesional}
                      </TableCell>
                      <TableCell align="center">
                        {value.id_compromiso_pago.id_preinscripcion.id_ciclo.denominacion}
                      </TableCell> */}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
            className="flex-shrink-0 border-t-1"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={documentosEstudiante.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
        <center className="m-10">
          <LoadingButton
            loading={loadingButton}
            variant="contained"
            color="secondary"
            onClick={enviarReporte}
          >
            Guardar y Enviar Reporte
          </LoadingButton>
        </center>
      </Dialog>
    </>
  );
}

export default ListaDocumentosInscritosCiclo;
