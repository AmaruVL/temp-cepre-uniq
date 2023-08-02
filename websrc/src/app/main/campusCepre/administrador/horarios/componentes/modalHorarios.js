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
import { IconButton, MenuItem } from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Delete from '@mui/icons-material/Delete';
import ModalHorarioDia from './modalHorarioDia';
import ModalCurso from './modalCurso';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
});

function ModalHorarios(props) {
  const { editar, data } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datosHorariosCiclo, setDatosHorariosCiclo] = useState([]);
  const [datosGruposAcademicos, setGruposAcademicos] = useState([]);
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/horario/ciclo/${data.id}`)
      .then((res) => {
        setDatosHorariosCiclo(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
    axios
      .get(`${RutaGeneral}/grupos-academicos`)
      .then((res) => {
        setGruposAcademicos(res.data);
      })
      .catch((err) => {});
  }, [data, estadoData]);

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
      denominacion: '',
      id_grupo: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        denominacion: data.denominacion,
        id_grupo: '',
      });
    }
  }, [data, editar, reset]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  const handleChangeGrupoAcademico = (event) => {
    axios
      .get(`${RutaGeneral}/horario/ciclo/grupo-academico/${data.id}/${event.target.value}`)
      .then((resp) =>
        resp.data.message ? setDatosHorariosCiclo([]) : setDatosHorariosCiclo(resp.data)
      );
  };

  const eliminarCurso = (values) => {
    axios
      .delete(`${RutaGeneral}/horario/ciclo/${values.id_ciclo.id}/${values.id}`)
      .then((res) => {
        axios
          .get(`${RutaGeneral}/horario/ciclo/${values.id_ciclo.id}`)
          .then((res2) => {
            showSuccess('Eliminado correctamente.');
            setDatosHorariosCiclo(res2.data);
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
        onClick={() => {
          handleOpenDialog();
        }}
      >
        Cursos
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
                      label="Ciclo"
                      error={!!errors.denominacion}
                      helperText={errors.denominacion && errors.denominacion?.message}
                      disabled
                    />
                  )}
                  name="denominacion"
                  control={control}
                />
              </div>
              <div className="col-span-2 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12 md:mr-5"
                      select
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChangeGrupoAcademico(e);
                      }}
                      fullWidth
                      label="Grupo académico"
                      error={!!errors.id}
                      helperText={errors.id && errors.id?.message}
                    >
                      {datosGruposAcademicos.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                          {`${option.denominacion}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="id_grupo"
                  control={control}
                />
              </div>
            </div>
            <div className="text-center mb-7">
              <ModalCurso
                editar={false}
                idCiclo={props.data.id}
                setDatosHorariosCiclo={setDatosHorariosCiclo}
              />
            </div>
            <div className="w-full flex flex-col">
              <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">N°</TableCell>
                      <TableCell align="center">Curso</TableCell>
                      <TableCell align="center">Grupo Academico</TableCell>
                      <TableCell align="center">Docente</TableCell>
                      <TableCell align="center">Aula</TableCell>
                      <TableCell className="w-0.5" />
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datosHorariosCiclo &&
                      datosHorariosCiclo
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((value, index) => (
                          <TableRow key={index} hover tabIndex={-1}>
                            <TableCell align="center">{value.id}</TableCell>
                            <TableCell align="center">
                              {value.id_padron_cursos_grupo.id_padron_curso.nombre_curso}
                            </TableCell>
                            <TableCell align="center">
                              {value.id_padron_cursos_grupo.id_grupo_academico.denominacion}
                            </TableCell>
                            <TableCell align="center">
                              {`${value.id_docente.user_type.first_name} ${value.id_docente.user_type.last_name} ${value.id_docente.user_type.sur_name}`}
                            </TableCell>
                            <TableCell align="center">{value.id_aula.codigo_aula}</TableCell>
                            <TableCell className="w-0.5" align="center">
                              <ModalCurso
                                editar
                                data={value}
                                setDatosHorariosCiclo={setDatosHorariosCiclo}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                color="success"
                                aria-label="Eliminar curso"
                                component="span"
                                onClick={() => {
                                  eliminarCurso(value);
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <ModalHorarioDia
                                nuevo={false}
                                editar
                                data={value}
                                setDatosHorariosCiclo={setDatosHorariosCiclo}
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
                count={datosHorariosCiclo.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
            <div className="text-right">
              <Button
                className="mb-12"
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                  handleCloseDialog();
                }}
              >
                Salir
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalHorarios;
