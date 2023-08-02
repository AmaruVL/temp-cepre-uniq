import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Delete from '@mui/icons-material/Delete';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import ModalDia from './modalDia';
import useMessages from '../../../../../hooks/useMessages';
import ModalConfirmacion from './modalConfirmarActualizacion';

const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
});

function ModalHorarioDia(props) {
  const { editar, data, nuevo, proceso } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datosHorariosCicloDia, setDatosHorariosCicloDia] = useState([]);
  const [estadoData, setEstadoData] = React.useState(false);
  const [estadoModalConfirmacion, setEstadoModalConfirmacion] = useState(false);

  React.useEffect(() => {
    if (openDialog) {
      axios
        .get(`${RutaGeneral}/horario-curso/${data.id}`)
        .then((res) => {
          setDatosHorariosCicloDia(res.data);
          setEstadoData(true);
        })
        .catch((err) => {});
    }
  }, [openDialog]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      curso: '',
      docente: '',
      aula: '',
      meet: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        curso: data.id_padron_cursos_grupo.id_padron_curso.nombre_curso,
        docente: `${data.id_docente.user_type.first_name} ${data.id_docente.user_type.last_name} ${data.id_docente.user_type.sur_name}`,
        aula: data.id_aula.codigo_aula,
        meet: data.enlace_meet,
      });
    }
  }, [nuevo, data, editar, reset]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    // setOpenDialog(false);
    setEstadoModalConfirmacion(true);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  const eliminarDia = (values) => {
    axios
      .delete(`${RutaGeneral}/horario-curso/${values.id}`)
      .then((res) => {
        axios
          .get(`${RutaGeneral}/horario-curso/${data.id}`)
          .then((res2) => {
            showSuccess('Eliminado correctamente.');
            setDatosHorariosCicloDia(res2.data);
          })
          .catch((err) => {
            showError('No se pudo eliminar.');
          });
      })
      .catch((err) => {
        showError('No se pudo eliminar.');
      });
  };
  function onSubmit(dataForm) {}

  return (
    <>
      <Button
        startIcon={<AssignmentIcon />}
        variant="outlined"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Horarios
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>Horarios por ciclo</b>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4">
              <div className="col-span-2 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Curso"
                      error={!!errors.curso}
                      helperText={errors.curso && errors.curso?.message}
                      disabled
                    />
                  )}
                  name="curso"
                  control={control}
                />
              </div>
              <div className="col-span-2 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Aula"
                      error={!!errors.aula}
                      helperText={errors.aula && errors.aula?.message}
                      disabled
                    />
                  )}
                  name="aula"
                  control={control}
                />
              </div>
              <div className="col-span-2 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Docente"
                      error={!!errors.docente}
                      helperText={errors.docente && errors.docente?.message}
                      disabled
                    />
                  )}
                  name="docente"
                  control={control}
                />
              </div>
              {/* <div className="col-span-2 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Meet"
                      error={!!errors.meet}
                      helperText={errors.meet && errors.meet?.message}
                      disabled
                    />
                  )}
                  name="meet"
                  control={control}
                />
              </div> */}
            </div>
            <div className="text-center mb-7">
              <ModalDia
                editar={false}
                idHorario={props.data.id}
                setDatosHorariosCicloDia={setDatosHorariosCicloDia}
              />
            </div>
            <div className="w-full flex flex-col">
              <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">N°</TableCell>
                      <TableCell align="center">Dia</TableCell>
                      <TableCell align="center">Hora inicio</TableCell>
                      <TableCell align="center">Hora fin</TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datosHorariosCicloDia &&
                      datosHorariosCicloDia
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((value, index) => (
                          <TableRow key={index} hover tabIndex={-1}>
                            <TableCell align="center">{value.id}</TableCell>
                            <TableCell align="center">{value.dia_dictado}</TableCell>
                            <TableCell align="center">{value.hora_inicio}</TableCell>
                            <TableCell align="center">{value.hora_fin}</TableCell>
                            <TableCell className="w-0.5" align="center">
                              <ModalDia
                                editar
                                data={value}
                                setDatosHorariosCicloDia={setDatosHorariosCicloDia}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                color="success"
                                aria-label="Eliminar dia"
                                component="span"
                                onClick={() => {
                                  eliminarDia(value);
                                }}
                              >
                                <Delete />
                              </IconButton>
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
                count={datosHorariosCicloDia.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
            <div className="text-right">
              {/* <Button
                className="mb-12"
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                  handleCloseDialog();
                }}
              >
                Salir
              </Button> */}
              <Button
                onClick={() => {
                  setEstadoModalConfirmacion(true);
                }}
                startIcon={<NextWeekIcon />}
                className="m-4"
                variant="outlined"
              >
                Siguiente
              </Button>
              {estadoModalConfirmacion && (
                <ModalConfirmacion
                  setOpenDialogPadre={setOpenDialog}
                  setEstadoModalConfirmacion={setEstadoModalConfirmacion}
                  idHorario={data.id}
                />
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalHorarioDia;
