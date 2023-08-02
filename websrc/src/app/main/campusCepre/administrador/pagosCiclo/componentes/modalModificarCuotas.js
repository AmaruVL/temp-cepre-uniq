import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import useMessages from '../../../../../hooks/useMessages';
import ModalAgregarConcepto from './modalAgregarConcepto';

const schema = yup.object().shape({
  nro_cuotas: yup.string(),
  tipo_colegio: yup.string(),
  monto_total: yup.string(),
});

function ModalModificarCuotas(props) {
  const { data, setDatosPagosCiclo, ciclo } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [nroCuotas, setNroCuotas] = useState(0);
  const [conceptos, setConceptos] = useState([]);
  const [montosParciales, setMontosParciales] = useState([]);
  const [montosParcialesIniciales, setMontosParcialesIniciales] = useState([]);
  const [conDatosEstado, setConDatosEstado] = React.useState(false);
  const [editCellsModel, setEditCellsModel] = React.useState({}); // modifi
  const [modelTabla, setModelTabla] = React.useState({});
  const [montoTotal, setMontoTotal] = React.useState(0.0);
  const [datosDetallesPagos, setdatosDetallesPagos] = useState([]);
  const [actualizarListaCuotas, setactualizarListaCuotas] = useState(false);

  React.useEffect(() => {
    setMontoTotal(data.monto_total);
    const body = /* JSON.stringify */ /* encodeURIComponent */ {
      username: process.env.REACT_APP_CAJA_USUARIO,
      password: process.env.REACT_APP_CAJA_PASSWORD,
      ide_eje: process.env.REACT_APP_CAJA_EJECUTORA,
      ano_eje: process.env.REACT_APP_CAJA_ID_ANO,
      ide_apl: process.env.REACT_APP_CAJA_ID_APL,
    };
    axios
      .post(`${process.env.REACT_APP_CAJA_ENDPOINT}/usuarios/auth/login`, body)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        return axios.get(
          `${process.env.REACT_APP_CAJA_ENDPOINT}/concep-deu/plantillas?` +
            `ano_eje=${process.env.REACT_APP_CAJA_ID_ANO}&des_itm=CEPRE`,
          { headers: { Authorization: `Bearer ${response.access_token}` } }
        );
      })
      .then((response) => {
        console.log(response.data);
        let preConceptos = [];
        response.data.forEach((x) => {
          preConceptos = preConceptos.concat(...x.conceptos.map((z, k) => ({ ...z })));
        });

        console.log('presConceptos', preConceptos);
        setConceptos(preConceptos);
      })
      .catch((err) => {
        console.log(err);
        setConceptos([]);
      });
    axios
      .get(`${RutaGeneral}/detalle-pago-lista/${data.id}`)
      .then((res) => {
        // hallarTotal(res.data);
        setdatosDetallesPagos(res.data);
      })
      .catch((err) => {});
  }, []);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  function hallarTotal(arreglo) {
    let suma = 0;
    arreglo.forEach((elemento) => {
      suma += parseFloat(elemento.monto_parcial);
    });
    // setMontoTotal(suma);
    return suma;
  }

  return (
    <>
      <Tooltip title="Configurar cuotas">
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          color="success"
          onClick={handleOpenDialog}
        >
          Cuotas
        </Button>
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
              <b>Configurar Cuotas</b>
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
          <div className="grid grid-cols-2">
            <div className="col-span-1 mx-3">
              <TextField
                className="mb-12"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={data.nro_cuotas}
                label="Nro cuotas"
                disabled
              />
            </div>

            <div className="col-span-1 mx-3">
              <TextField
                className="mb-12"
                InputLabelProps={{
                  shrink: true,
                }}
                value={montoTotal}
                fullWidth
                label="Monto total"
                disabled
              />
            </div>
          </div>
          <FuseScrollbars className="flex-grow overflow-x-auto">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">N°</TableCell>
                  <TableCell align="center">Concepto</TableCell>
                  <TableCell align="center">Monto</TableCell>
                  <TableCell align="center">Fecha Inicio</TableCell>
                  <TableCell align="center">Fecha Fin</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {datosDetallesPagos &&
                  datosDetallesPagos.map((value, index) => (
                    <TableRow key={index} hover tabIndex={-1}>
                      <TableCell align="center">{value?.nro_cuota}</TableCell>
                      <TableCell align="center">{value?.concepto}</TableCell>
                      <TableCell align="center">{value?.monto_parcial}</TableCell>
                      <TableCell align="center">{value?.fecha_inicio}</TableCell>
                      <TableCell align="center">{value?.fecha_fin}</TableCell>
                      <TableCell align="center">
                        <ModalAgregarConcepto
                          conceptos={conceptos}
                          value={value}
                          data={data}
                          setDatosPagosCiclo={setDatosPagosCiclo}
                          ciclo={ciclo}
                          setdatosDetallesPagos={setdatosDetallesPagos}
                          actualizarListaCuotas={actualizarListaCuotas}
                          setactualizarListaCuotas={setactualizarListaCuotas}
                          hallarTotal={hallarTotal}
                          registro={data.id}
                          setMontoTotal={setMontoTotal}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </FuseScrollbars>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalModificarCuotas;
