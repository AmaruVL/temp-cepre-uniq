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
import ModalModificarCuotas from './modalModificarCuotas';
import useMessages from '../../../../../hooks/useMessages';
import FormularioAgregarCuota from './formularioAgregarCuota';
import ModalEliminarRegistro from './modalEliminarRegisstro';

const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
  nro_cuotas: yup.string().required('Campo Requerido'),
});

function ModalPagosCiclo(props) {
  const { editar, data } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datosPagosCiclo, setDatosPagosCiclo] = useState([]);
  const [estadoData, setEstadoData] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/pagos-ciclo/${data.id}`)
      .then((res) => {
        setDatosPagosCiclo(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, [data.id, estadoData]);

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
      nro_cuotas: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        denominacion: data.denominacion,
      });
    }
  }, [data.denominacion, editar, reset]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function agregarCuotas() {
    axios
      .post(`${RutaGeneral}/add-rows/${props.data.id}`, {
        id_ciclo: props.data.id,
      })
      .then((res) => {
        // console.log('agregar cuota', res.data);
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        for (let k = 0; k < res.data.privado.nro_cuotas; k += 1) {
          axios.post(`${RutaGeneral}/detalle-pago-test`, {
            id_pago: res.data.privado.id,
            nro_cuota: k + 1,
            fecha_inicio: `${year}-${month}-${day}`,
            fecha_fin: `${year}-${month}-${day}`,
            monto_parcial: 0,
          });
        }
        for (let k = 0; k < res.data.publico.nro_cuotas; k += 1) {
          axios.post(`${RutaGeneral}/detalle-pago-test`, {
            id_pago: res.data.publico.id,
            nro_cuota: k + 1,
            fecha_inicio: `${year}-${month}-${day}`,
            fecha_fin: `${year}-${month}-${day}`,
            monto_parcial: 0,
          });
        }
        axios.get(`${RutaGeneral}/pagos-ciclo/${props.data.id}`).then((res2) => {
          showSuccess('Guardado correctamente.');
          setDatosPagosCiclo(res2.data);
        });
      })
      .catch((err) => {
        showError('No se pudo guardar.');
      });
  }
  function eliminarCuotas() {
    axios
      .delete(`${RutaGeneral}/delete-rows/${props.data.id}`, {
        id_ciclo: props.data.id,
      })
      .then((res) => {
        axios.get(`${RutaGeneral}/pagos-ciclo/${props.data.id}`).then((res2) => {
          showSuccess('Eliminado correctamente.');
          setDatosPagosCiclo(res2.data);
        });
      })
      .catch((err) => {
        showError('No se pudo guardar.');
      });
  }
  function onSubmit(dataForm) {}

  return (
    <>
      <Button
        startIcon={<AssignmentIcon />}
        variant="outlined"
        color="primary"
        onClick={handleOpenDialog}
      >
        Detalle de Pagos
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
              <b>Detalle de Pagos</b>
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
          </form>
          <FormularioAgregarCuota ciclo={props.data.id} setDatosPagosCiclo={setDatosPagosCiclo} />
          <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">N°</TableCell>
                    <TableCell align="center">N° Cuotas</TableCell>
                    {/* <TableCell align="center">Colegio</TableCell> */}
                    <TableCell align="center">Monto total</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosPagosCiclo &&
                    datosPagosCiclo
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((value, index) => (
                        <TableRow key={index} hover tabIndex={-1}>
                          <TableCell align="center">{value.id}</TableCell>
                          <TableCell align="center">{value.nro_cuotas}</TableCell>
                          {/* <TableCell align="center">
                            {value.tipo_colegio === 'PU' ? 'Colegio Publico' : 'Colegio Privado'}
                          </TableCell> */}
                          <TableCell align="center">{value.monto_total}</TableCell>
                          <TableCell align="center">
                            <ModalEliminarRegistro
                              editar
                              ciclo={props.data.id}
                              data={value}
                              setDatosPagosCiclo={setDatosPagosCiclo}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <ModalModificarCuotas
                              editar
                              data={value}
                              ciclo={props.data.id}
                              setDatosPagosCiclo={setDatosPagosCiclo}
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
              count={datosPagosCiclo.length}
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalPagosCiclo;
