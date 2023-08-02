import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PaymentsIcon from '@mui/icons-material/Payments';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import OrdersStatus from '../../../../shared-components/OrdersStatus';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
  comentario: yup.string().required('Campo Requerido'),
});

function ModalPagarCuota(props) {
  const [detallesCompromisosPago, setDetalleCompromisosPago] = useState([]);
  const { data } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [openDialog, setOpenDialog] = useState(false);
  const { watch, handleSubmit, formState, errors, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      denominacion: '',
      comentario: '',
    },
    resolver: yupResolver(schema),
  });

  function handleOpenDialog() {
    setOpenDialog(true);
    axios
      .get(`${RutaGeneral}/detalle-compromiso/${data.data.id}`)
      .then((res) => {
        setDetalleCompromisosPago(res.data);
      })
      .catch();
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onPay(dataToPay) {
    axios
      .patch(`${RutaGeneral}/actualizar-pagos`, {
        id_compromiso_pago: dataToPay.id_compromiso_pago,
        numero_cuota: dataToPay.numero_cuota,
        id_administrador: idUsuario,
      })
      .then(() => {
        axios.get(`${RutaGeneral}/detalle-compromiso/${data.data.id}`).then((res) => {
          setDetalleCompromisosPago(res.data);
        });
      })
      .catch();
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        VER DETALLE
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
              <b>DETALLES COMPROMISOS DE PAGO</b>
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
          <h2>
            <b>NOMBRE: </b>
            {`${data.data.id_preinscripcion.dni_persona.nombres} ${data.data.id_preinscripcion.dni_persona.apellido_paterno} ${data.data.id_preinscripcion.dni_persona.apellido_materno}`}
          </h2>
          <h2>
            <b>DNI: </b>
            {data.data.id_preinscripcion.dni_persona.dni}
          </h2>
          <h2>
            <b>CICLO: </b>
            {data.data.id_preinscripcion.id_ciclo.denominacion}
          </h2>
          <h2>
            <b>ESCUELA PROFESIONAL: </b>
            {data.data.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional}
          </h2>
          <Table className="p-10" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">N° CUOTA</TableCell>
                <TableCell align="center">CODIGO</TableCell>
                <TableCell align="center">MONTO</TableCell>
                <TableCell align="center">FECHA INICIO</TableCell>
                <TableCell align="center">FECHA FIN</TableCell>
                <TableCell align="center">MORA</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {detallesCompromisosPago &&
                detallesCompromisosPago.map((row, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{row.numero_cuota}</TableCell>
                    <TableCell align="center">{row.codigo_compromiso_pago}</TableCell>
                    <TableCell align="center">{row.monto}</TableCell>
                    <TableCell align="center">{row.fecha_inicio}</TableCell>
                    <TableCell align="center">{row.fecha_fin}</TableCell>
                    <TableCell align="center">{row.ModalPagarCuota}</TableCell>
                    <TableCell align="center" className="p-4 md:p-16" component="th" scope="row">
                      <OrdersStatus name={row.esta_pagado ? 'Pagado' : 'Pendiente'} />
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<PaymentsIcon />}
                        // disabled
                        variant="contained"
                        onClick={() => {
                          onPay(row);
                        }}
                      >
                        Pagar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalPagarCuota;
