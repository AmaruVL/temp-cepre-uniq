import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ImageThumb = ({ image }) => {
  return <img className="w-1/4 h-1/4" src={URL.createObjectURL(image)} alt={image.name} />;
};
function Requisitos(props) {
  const { detallesGenerales } = props;
  const [file, setFile] = React.useState('');
  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <>
      <h1 className="m-3">
        <b>Requisitos</b>
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
      <p className="pb-10 text-center text-red">SUBE TU CERTIFICADO DE ESTUDIOS</p>
      <div id="upload-box">
        <input type="file" onChange={handleUpload} />
        <p>Filename: {file.name}</p>
        <p>File type: {file.type}</p>
        <p>File size: {file.size} bytes</p>
        {file && <ImageThumb image={file} />}
      </div>
      <h1 className="m-10 text-blue-300 text-center">
        <b>
          {detallesGenerales?.is_valid
            ? detallesGenerales.preinscripcion_data.id_escuela_profesional
                .nombre_escuela_profesional
            : ''}
        </b>
      </h1>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={props.handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={props.handleNext}>
          {props.activeStep === props.steps.length - 2 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </>
  );
}

export default Requisitos;
