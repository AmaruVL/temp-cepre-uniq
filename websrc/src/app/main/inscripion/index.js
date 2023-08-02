import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fab, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import logoUNIQ from '../../assets/images/logoUNIQ.png';
import Voucher from './formularios/subirVoucher/index';
import FichaInscripcion from './formularios/fichaInscripcion/index';
import ValidacionEstudiante from './validacion/index';

const steps = ['', ''];

function Inscripcion(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeModal, setActiveModal] = React.useState(true);
  const [skipped, setSkipped] = React.useState(new Set());
  const [detallesGenerales, setDetallesGenerales] = useState({});
  const [estadoData, setEstadoData] = useState(false);
  const { ciclo } = props.match.params;
  const handleNext = () => {
    const newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const cambiarEstadoModal = () => {
    setActiveModal(false);
  };

  return (
    <>
      {activeModal && (
        <ValidacionEstudiante
          estado={activeModal}
          cambiarEstado={cambiarEstadoModal}
          setDetallesGenerales={setDetallesGenerales}
          estadoData={estadoData}
          setEstadoData={setEstadoData}
          ciclo={ciclo}
          setActiveStep={setActiveStep}
        />
      )}
      <center>
        <h1 className="text-center my-20">
          <b>CENTRO PRE UNIVERSITARIO-INSCRIPCION</b>
        </h1>
        <img className="text-center w-200 h-200" src={logoUNIQ} alt="Logo UNIQ" />
        <Stepper className="m-10 w-8/12" activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Tooltip title="Regresar a ventana de inicio">
          <Fab
            style={{ position: 'fixed', top: '90%', right: 0 }}
            color="primary"
            href="/"
            aria-label="add"
          >
            <HomeIcon />
          </Fab>
        </Tooltip>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Card className="m-20 p-20 w-8/12" sx={{ minWidth: 275 }}>
              <CardContent>
                <center className="m-8">
                  {(activeStep === 0 && (
                    <Voucher
                      activeStep={activeStep}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      steps={steps}
                      estadoData={estadoData}
                      detallesGenerales={detallesGenerales}
                    />
                  )) ||
                    (activeStep === 1 && (
                      <FichaInscripcion detallesGenerales={detallesGenerales} />
                    ))}
                </center>
              </CardContent>
            </Card>
          </>
        )}
      </center>
      {/* <div className="w-full flex justify-end">
        <Tooltip title="Regresar a ventana de inicio">
          <IconButton color="primary" size="large" href="/">
            <HomeIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </div> */}
    </>
  );
}

export default Inscripcion;
