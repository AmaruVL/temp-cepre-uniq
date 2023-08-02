import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { Fab, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import logoUNIQ from '../../../assets/images/logoUNIQ.png';
import FormularioDatosCarreraProfesional from './datosCarreraProfesional/index';
import FormularioDatosGenerales from './datosGenerales/index';
import FormularioDatosIntitucionEducativa from './datosInstitucionEducativa/index';
import FormularioDatosSecundarios from './datosSecundarios';
import CompromisoPago from './compromisoPago/index';
import ValidacionEstudiante from './validacion/index';

const steps = ['', '', '', ''];

const FormulariosPreInscripcion = (props) => {
  const [estadoConsultas, setEstadoConsultas] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeModal, setActiveModal] = React.useState(true);
  const [skipped, setSkipped] = React.useState(new Set());
  const [grupoAcademico, setGrupoAcademico] = React.useState({});
  const [escuelaProfesional, setEscuelaProfesional] = React.useState({});
  const [pagos, setPagos] = React.useState({});
  const [detallePagos, setDetallePagos] = React.useState({});
  const [detalleColegios, setDetalleColegios] = React.useState([]);
  const [alertValidacionDNI, setAlertValidacionDNI] = React.useState({ estado: false });
  const [dataPersona, setDataPersona] = React.useState({});
  const [provinciaNacimiento, setProvinciaNacimiento] = React.useState([]);
  const [distritoNacimiento, setDistritoNacimiento] = React.useState([]);
  const [provinciaActual, setProvinciaActual] = React.useState([]);
  const [distritoActual, setDistritoActual] = React.useState([]);
  const [detalleCiclo, setDetalleCiclo] = useState();
  const [editar, setEditar] = useState(false);
  const { ciclo } = props;
  const [detalles, setDetalles] = useState();
  const [datosGeneralesPreInscripcion, setDatosGeneralesPreInscripcion] = React.useState({
    exists_preinscripcion: false,
  });
  const [datosDepartamentos, setDatosDepartamentos] = React.useState([]);
  const [tipoColegioGlobal, setTipoColegioGlobal] = useState('PU');
  const recuperarEstadoCuatro = () => {
    axios
      .get(
        `${RutaGeneral}/detallecompromisopago/${datosGeneralesPreInscripcion.preinscripcion_data.id}`
      )
      .then(async (res) => {
        await setDetalles(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if(props.dni) {
      setActiveModal(false);
      axios.post(`${RutaGeneral}/procesovalidaciondni2`, 
        {dni: props.dni, id_ciclo: props.ciclo}).then(response => {
        console.log(response);
        setDatosGeneralesPreInscripcion(response.data);
      });
    }
  }, []);

  useEffect(() => {
    if (!props.dni && datosGeneralesPreInscripcion.preinscripcion_data) {
      if (datosGeneralesPreInscripcion.preinscripcion_data.progreso_preinscripcion === 4) {
        recuperarEstadoCuatro();
      }
      setActiveStep(datosGeneralesPreInscripcion.preinscripcion_data.progreso_preinscripcion);
    }
    const peticionGruposAcademicos = axios.get(`${RutaGeneral}/grupos-academicos`);
    const peticionEscuelasProfesionales = axios.get(`${RutaGeneral}/escuelas-profesionales`);
    const peticionPagos = axios.get(`${RutaGeneral}/ver-pagos-ciclo/${ciclo}`);
    const peticionDetallesPago = axios.get(`${RutaGeneral}/detalles-pago`);
    // const peticionColegios = axios.get('https://cepru-dev.herokuapp.com/colegios');
    const departamentos = axios.get(`${RutaGeneral}/ubigeoDep`);
    const cicloDetalle = axios.get(`${RutaGeneral}/ciclos/${ciclo}`);
    Promise.all([
      peticionGruposAcademicos,
      peticionEscuelasProfesionales,
      peticionPagos,
      peticionDetallesPago,
      // peticionColegios,
      departamentos,
      cicloDetalle,
    ]).then((values) => {
      setGrupoAcademico(values[0].data);
      setEscuelaProfesional(values[1].data);
      setPagos(values[2].data);
      setDetallePagos(values[3].data);
      // setDetalleColegios(values[4].data);
      setEstadoConsultas(true);
      setDatosDepartamentos(values[4].data);
      setDetalleCiclo(values[5].data);
    });
  }, [datosGeneralesPreInscripcion]);
  const cargarColegios = (distritoCodigo, tipoColegio) => {
    axios
      .get(
        `${RutaGeneral}/ubigeColegio/${distritoCodigo}/${tipoColegio}`
        // , {
        //   distrito: distritoCodigo,
        //   tipo_colegio: tipoColegio,
        // }
      )
      .then((res) => setDetalleColegios(res.data))
      .catch((err) => console.log(err));
  };
  const cambiarEstadoModal = () => {
    setActiveModal(false);
  };
  const handleNext = () => {
    const newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setEditar(true);
  };

  return (
    <>
      {activeModal && (
        <ValidacionEstudiante
          estado={activeModal}
          cambiarEstado={cambiarEstadoModal}
          setAlertValidacionDNI={setAlertValidacionDNI}
          setDataPersona={setDataPersona}
          setDatosGeneralesPreInscripcion={setDatosGeneralesPreInscripcion}
          ciclo={props.ciclo}
        />
      )}
      <center>
        <h1 className="text-center my-20">
          <b>UNIVERSIDAD NACIONAL INTERCULTURAL DE QUILLABAMBA</b>
        </h1>
        <img className="text-center w-200 h-200" src={logoUNIQ} alt="Logo UNIQ" />
        <h1 className="text-center my-20">
          <b>{detalleCiclo && detalleCiclo.denominacion}</b>
        </h1>
        <center className="m-8">
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
        </center>
        <>
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
          <Card className="m-20 p-20 w-8/12" sx={{ minWidth: 275 }}>
            <CardContent>
              <center className="m-8">
                {(activeStep === 0 && (
                  <FormularioDatosGenerales
                    datosGeneralesPreInscripcion={datosGeneralesPreInscripcion}
                    steps={steps}
                    activeStep={activeStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    alertValidacionDNI={alertValidacionDNI}
                    dataPersona={dataPersona}
                    detalleCiclo={detalleCiclo}
                    setDatosGeneralesPreInscripcion={setDatosGeneralesPreInscripcion}
                    editar={editar}
                    setEditar={setEditar}
                    ciclo={ciclo}
                  />
                )) ||
                  (activeStep === 1 && (
                    <FormularioDatosSecundarios
                      steps={steps}
                      activeStep={activeStep}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      datosDepartamentos={datosDepartamentos}
                      provinciaNacimiento={provinciaNacimiento}
                      distritoNacimiento={distritoNacimiento}
                      provinciaActual={provinciaActual}
                      distritoActual={distritoActual}
                      setProvinciaNacimiento={setProvinciaNacimiento}
                      setDistritoNacimiento={setDistritoNacimiento}
                      setProvinciaActual={setProvinciaActual}
                      setDistritoActual={setDistritoActual}
                      datosGeneralesPreInscripcion={datosGeneralesPreInscripcion}
                      setDatosGeneralesPreInscripcion={setDatosGeneralesPreInscripcion}
                    />
                  )) ||
                  (activeStep === 2 && (
                    <FormularioDatosIntitucionEducativa
                      cargarColegios={cargarColegios}
                      steps={steps}
                      activeStep={activeStep}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      detalleColegios={detalleColegios}
                      datosDepartamentos={datosDepartamentos}
                      datosGeneralesPreInscripcion={datosGeneralesPreInscripcion}
                      setDatosGeneralesPreInscripcion={setDatosGeneralesPreInscripcion}
                      setTipoColegioGlobal={setTipoColegioGlobal}
                    />
                  )) ||
                  (activeStep === 3 && (
                    <FormularioDatosCarreraProfesional
                      steps={steps}
                      activeStep={activeStep}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      grupoAcademico={grupoAcademico}
                      escuelaProfesional={escuelaProfesional}
                      pagos={pagos}
                      detallePagos={detallePagos}
                      datosGeneralesPreInscripcion={datosGeneralesPreInscripcion}
                      setDatosGeneralesPreInscripcion={setDatosGeneralesPreInscripcion}
                      tipoColegioGlobal={tipoColegioGlobal}
                      setDetalles={setDetalles}
                    />
                  )) ||
                  (activeStep === 4 && (
                    <CompromisoPago
                      detalles={detalles}
                      datosGeneralesPreInscripcion={datosGeneralesPreInscripcion}
                    />
                  ))}
              </center>
            </CardContent>
          </Card>
        </>
      </center>
    </>
  );
};

export default FormulariosPreInscripcion;
