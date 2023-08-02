import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import logoUNIQ from '../../../../assets/images/logoUNIQ.png';

const CompromisoPago = (props) => {
  const { datosGeneralesPreInscripcion, detalles } = props;
  const { persona_data: personaData } = datosGeneralesPreInscripcion;
  const carrera = 'INGENIERIA DE ALIMENTOS';
  const cicloCepru = 'CEPRE 2023-1';
  const tipoPago = 1;
  const numeroCuotas = 1;
  function createData(numeroCuota, fechaVencimiento, monto, codigoPago) {
    return { numeroCuota, fechaVencimiento, monto, codigoPago };
  }
  const rows = [
    createData(1, '12/12/2021', 300, 'FR78645393-1'),
    createData(2, '12/01/2022', 200, ''),
    createData(3, '12/02/2022', 200, ''),
  ];
  return (
    <>
      <h1 className="text-center my-20">CENTRO PRE UNIVERSITARIO</h1>
      <img className="text-center w-200 h-200" src={logoUNIQ} alt="Logo UNIQ" />
      <h1 className="text-center my-20">COMPROMISO DE PAGO</h1>
      <p className="text-justify">
        Yo{' '}
        <b>{`${personaData && personaData.nombres} ${personaData && personaData.apellido_paterno} ${
          personaData && personaData.apellido_materno
        }`}</b>{' '}
        identificado con DNI: <b>{personaData.dni}</b>, postulante a la Carrera Profesional de{' '}
        <b>{detalles && detalles.escuela_profesional}</b> me comprometo a realizar el pago
        correspondiente por el concepto de inscripcion al ciclo <b>{detalles && detalles.ciclo}</b>.
      </p>
      <p className="text-justify my-10">
        Tipo de Pago:
        {detalles && detalles.data.length === 1 ? 'PAGO AL CONTANDO' : 'PAGO POR CUOTAS'}
      </p>
      <p className="text-justify my-10">Numero de Cuotas: {detalles && detalles.data.length}</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nro. de Cuota</TableCell>
              {/* <TableCell align="center">Concepto</TableCell> */}
              <TableCell align="center">Fecha Vencimiento</TableCell>
              <TableCell align="center">Monto(S/.)</TableCell>
              <TableCell align="center">Codigo de Pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detalles &&
              detalles.data.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.numero_cuota}</TableCell>
                  {/* <TableCell align="center">{row?.concepto}</TableCell> */}
                  <TableCell align="center">{row.fecha_fin}</TableCell>
                  <TableCell align="center">{row.monto}</TableCell>
                  <TableCell align="center">{row.codigo_compromiso_pago}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p className="text-justify my-10" align="left">
        RECUERDA: Debes estar al corriente de tus pagos para evitar inconvenientes.
      </p>
      <p className="text-justify my-10" align="left">
        LUGAR DE PAGO: Acercate a la caja de la UNIQ.
      </p>
      {/* <p align="right">Quillabamba,11 de octubre del 2021</p> */}
      <Button href="/" variant="contained" color="secondary" size="medium">
        SALIR
      </Button>
    </>
  );
};

export default CompromisoPago;
