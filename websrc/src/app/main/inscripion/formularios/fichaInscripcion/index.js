import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import DownloadIcon from '@mui/icons-material/Download';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import calcularEdad from '../../../../shared-components/calcularEdad';

const FichaInscripcion = (props) => {
  const { detallesGenerales } = props;
  const history = useHistory();
  let tipoColegioCompleto = '';
  if (detallesGenerales?.is_valid) {
    if (detallesGenerales.preinscripcion_data.id_colegio.tipo_colegio === 'PU')
      tipoColegioCompleto = 'PUBLICO';
    else if (detallesGenerales.preinscripcion_data.id_colegio.tipo_colegio === 'PR')
      tipoColegioCompleto = 'PRIVADO';
  } else {
    tipoColegioCompleto = '';
  }
  let edad = '';
  if (detallesGenerales.preinscripcion_data) {
    const fechaNacimientoData =
      detallesGenerales.preinscripcion_data.dni_persona.fecha_nacimiento.split('-');
    const diaNacimiento = fechaNacimientoData[2];
    const mesNacimiento = fechaNacimientoData[1];
    const anioNacimiento = fechaNacimientoData[0];
    edad = calcularEdad(diaNacimiento, mesNacimiento, anioNacimiento);
  }
  return (
    <>
      <h1 className="m-3">
        <b>FICHA DE INSCRIPCION</b>
      </h1>
      <p className=" py-10 text-justify">
        Hola{' '}
        <b>
          {detallesGenerales.is_valid &&
            `${detallesGenerales.preinscripcion_data.dni_persona.nombres} ${detallesGenerales.preinscripcion_data.dni_persona.apellido_paterno} ${detallesGenerales.preinscripcion_data.dni_persona.apellido_materno}`}
        </b>
        , esta es tu ficha de inscripcion, recuerda guardar bien esta informacion.
      </p>
      <TableContainer className="m-10" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-blue-50">
            <TableCell align="center">CICLO CEPRU</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                {detallesGenerales.is_valid &&
                  detallesGenerales.preinscripcion_data.id_ciclo.denominacion}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className="m-10" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-blue-50">
            <TableRow>
              <TableCell align="center">DATOS GENERALES</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <b>DNI</b>
              </TableCell>
              <TableCell align="center">
                <b>NOMBRES</b>
              </TableCell>
              <TableCell align="center">
                <b>APELLIDO PATERNO</b>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {detallesGenerales.is_valid &&
                  detallesGenerales.preinscripcion_data.dni_persona.dni}
              </TableCell>
              <TableCell align="center">
                {detallesGenerales.is_valid &&
                  detallesGenerales.preinscripcion_data.dni_persona.nombres}
              </TableCell>
              <TableCell align="center">
                {detallesGenerales.is_valid &&
                  detallesGenerales.preinscripcion_data.dni_persona.apellido_paterno}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <b>APELLIDO MATERNO</b>
              </TableCell>
              <TableCell align="center">
                <b>ESCUELA PROFESIONAL</b>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {detallesGenerales.is_valid &&
                  detallesGenerales.preinscripcion_data.dni_persona.apellido_materno}
              </TableCell>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? detallesGenerales.preinscripcion_data.id_escuela_profesional
                      .nombre_escuela_profesional
                  : ''}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer className="m-10" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-blue-50">
            <TableRow>
              <TableCell align="center">DATOS SECUNDARIOS</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <b>INSTITUCION EDUCATIVA</b>
              </TableCell>
              <TableCell align="center">
                <b>TIPO</b>
              </TableCell>
              <TableCell align="center">
                <b>UBIGEO IE</b>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? detallesGenerales.preinscripcion_data.id_colegio.nombre_colegio
                  : ''}
              </TableCell>
              <TableCell align="center">{tipoColegioCompleto}</TableCell>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? detallesGenerales.preinscripcion_data.id_colegio.id_ubigeo
                  : ''}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <b>LUGAR PROCEDENICA</b>
              </TableCell>
              <TableCell align="center">
                <b>LUGAR NACIMIENTO</b>
              </TableCell>
              <TableCell align="center">
                <b>DIRECCION</b>
              </TableCell>
              <TableCell align="center">
                <b>IDIOMA</b>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? `${detallesGenerales.preinscripcion_data.id_ubigeo.codigo_ubigeo}-${detallesGenerales.preinscripcion_data.id_ubigeo.nombre}`
                  : ''}
              </TableCell>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? detallesGenerales.preinscripcion_data.dni_persona.lugar_nacimiento
                  : ''}
              </TableCell>
              <TableCell align="center">
                {detallesGenerales?.is_valid ? detallesGenerales.preinscripcion_data.direccion : ''}
              </TableCell>
              <TableCell align="center">
                {detallesGenerales?.is_valid ? detallesGenerales.preinscripcion_data.idioma : ''}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <b>FECHA NACIMIENTO</b>
              </TableCell>
              <TableCell align="center">
                <b>EDAD</b>
              </TableCell>
              <TableCell align="center">
                <b>SEXO</b>
              </TableCell>
              <TableCell align="center">
                <b>TELEFONO</b>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? detallesGenerales.preinscripcion_data.dni_persona.fecha_nacimiento
                  : ''}
              </TableCell>
              <TableCell align="center">{detallesGenerales?.is_valid ? edad : ''}</TableCell>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? detallesGenerales.preinscripcion_data.dni_persona.sexo
                  : ''}
              </TableCell>
              <TableCell align="center">
                {detallesGenerales?.is_valid
                  ? detallesGenerales.preinscripcion_data.telefono_apoderado
                  : ''}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <LoadingButton
        onClick={() => {
          window.open(
            `${RutaGeneral}/inscripcion/descargar-resumen/${detallesGenerales.inscripcion.id}`
          );
        }}
        startIcon={<DownloadIcon />}
        variant="outlined"
      >
        Descargar Constancia de Inscripcion
      </LoadingButton>
      <Button
        onClick={() => {
          history.push('/preinscripcion/');
        }}
        variant="contained"
        color="secondary"
      >
        Salir
      </Button>
    </>
  );
};

export default FichaInscripcion;
