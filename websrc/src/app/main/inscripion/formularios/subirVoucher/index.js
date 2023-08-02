import {
  Alert,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useMessages from '../../../../hooks/useMessages';

const ImageThumb = ({ image }) => {
  return <img className="w-1/4 h-1/4" src={URL.createObjectURL(image)} alt={image.name} />;
};
const Voucher = (props) => {
  const { showSuccess, showError } = useMessages();
  const { detallesGenerales, estadoData } = props;
  const [file, setFile] = React.useState('');
  const [message, setMessage] = React.useState(false);
  const [requisitos, setRequisitos] = React.useState([]);
  const handleUpload = (event, idRegistro) => {
    const formData = new FormData();
    formData.append('documento', event.target.files[0]);
    formData.append('esta_aprobado', 0);
    axios
      .patch(`${RutaGeneral}/inscripcion/subir-docs/${idRegistro}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((val) => {
        showSuccess('Documento subido correctamente.');
        setMessage(false);
        axios
          .get(`${RutaGeneral}/aprobar-documentos/${detallesGenerales.inscripcion.id}`)
          .then((res) => {
            setRequisitos(res.data);
          });
      })
      .catch((err) => {
        showError('No se pudo subir documento.');
        setMessage(false);
      });
  };
  useEffect(() => {
    if (detallesGenerales.preinscripcion_data) {
      axios
        .get(`${RutaGeneral}/aprobar-documentos/${detallesGenerales.inscripcion.id}`)
        .then((res) => {
          setRequisitos(res.data);
        });
    }
  }, [estadoData]);
  return (
    <>
      <h1 className="m-3">
        <b>DOCUMENTOS REQUISITOS</b>
      </h1>
      <p className=" py-10 text-justify">
        Hola{' '}
        <b>
          {detallesGenerales.is_valid &&
            `${detallesGenerales.preinscripcion_data.dni_persona.nombres} ${detallesGenerales.preinscripcion_data.dni_persona.apellido_paterno} ${detallesGenerales.preinscripcion_data.dni_persona.apellido_materno}`}
        </b>
        , continua con tu inscripcion:
      </p>
      <p className=" py-10 text-left">
        <b>DNI: </b>
        {detallesGenerales.is_valid ? detallesGenerales.preinscripcion_data.dni_persona.dni : ''}
      </p>
      <p className=" py-10 text-left">
        <b>CICLO: </b>
        {detallesGenerales.is_valid
          ? detallesGenerales.preinscripcion_data.id_ciclo.denominacion
          : ''}
      </p>
      <p className=" py-10 text-left">
        <b>ESCUELA PROFESIONAL: </b>
        {detallesGenerales?.is_valid
          ? detallesGenerales.preinscripcion_data.id_escuela_profesional.nombre_escuela_profesional
          : ''}
      </p>
      <p className=" py-10 text-left">
        <b>COLEGIO: </b>
        {detallesGenerales.is_valid
          ? detallesGenerales.preinscripcion_data.id_colegio.nombre_colegio
          : ''}
      </p>

      {message ? (
        <Alert severity="info">
          Tus documentos se encuentran en revision, recuerda estar pendiente de tu correo y/o
          revisar la pagina web actual de inscripcion.
          <br />
          <a href="/">Regresar a la ventana de inicio.</a>
        </Alert>
      ) : (
        <>
          <p className=" py-10 text-center text-red">
            <b>SUBE LOS DOCUMENTOS</b>
          </p>
          {requisitos !== null &&
            requisitos.map((data, index) => (
              <div key={index}>
                <div className="flex flex-row">
                  <p className=" flex-auto py-10 text-left">
                    <b>
                      {index + 1}- {data.nombre_documento}
                    </b>
                  </p>
                </div>
                <div className="flex flex-row">
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Estado</TableCell>
                        <TableCell align="center">Documento Subido</TableCell>
                        <TableCell align="center">Observaciones</TableCell>
                        <TableCell align="center" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={index} hover tabIndex={-1}>
                        <TableCell align="center">
                          <div>
                            {data.esta_aprobado === 0 && <OrdersStatus name="PENDIENTE" />}
                            {data.esta_aprobado === 1 && <OrdersStatus name="APROBADO" />}
                            {data.esta_aprobado === 2 && <OrdersStatus name="OBSERVADO" />}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {data.documento !== null && (
                            <Tooltip title="Ver documento">
                              <IconButton
                                onClick={() => window.open(`${RutaGeneral}${data.documento}`)}
                                color="secondary"
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {data.esta_aprobado === 2 && data.observaciones}
                        </TableCell>
                        <TableCell align="center">
                          {data.esta_aprobado !== 1 && (
                            <div id="upload-box">
                              <input type="file" onChange={(e) => handleUpload(e, data.id)} />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* <p className=" py-10 text-left">
            <b>Estado:</b>
          </p>
           */}

                {/* {data.esta_aprobado === '2' && <h1>{data.observaciones}</h1>} */}
                {/* {!data.esta_aprobado === 1 && (
            <div id="upload-box">
              <input type="file" onChange={(e) => handleUpload(e, data.id)} />
            </div>
          )} */}
              </div>
            ))}
          <h1 className="m-10 text-blue-300 text-center">
            <b>
              {detallesGenerales?.is_valid
                ? detallesGenerales.preinscripcion_data.id_escuela_profesional
                    .nombre_escuela_profesional
                : ''}
            </b>
          </h1>
        </>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 3 }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={props.handleBack}
          sx={{ mr: 1 }}
        >
          Atras
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={() => setMessage(true)} disabled={message}>
          Finalizar
        </Button>
      </Box>
    </>
  );
};

export default Voucher;
