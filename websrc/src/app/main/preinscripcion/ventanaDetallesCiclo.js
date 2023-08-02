import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicCardCiclo from './componentes/basicCardCiclo';
import logoUNIQ from '../../assets/images/logoUNIQ.png';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
const PreInscripcionPorCiclo = (props) => {
  const { datosCiclo } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [openDialog, setOpenDialog] = useState(false);
  const fechaGeneral = new Date();
  const fechaHoy = fechaGeneral.toISOString().split('T')[0];
  // const { detalleCiclo, setDetalleCiclo } = useContext(cicloSeleccionado);
  // useEffect(() => {
  //   const promesa = axios.get('https://cepru-dev.herokuapp.com/ciclos');
  //   promesa
  //     .then((res) => {
  //       return res;
  //     })
  //     .then(({ data }) => {
  //       const [prim] = data;
  //       setDatosCiclo(prim);
  //     });
  //   promesa.catch((err) => console.log(err));
  // });
  function handleOpenDialog() {
    setOpenDialog(true);
    // axios
    //   .get(`${RutaGeneral}/detalle-compromiso/${data.id}`)
    //   .then((res) => {
    //     setDetalleCompromisosPago(res.data);
    //   })
    //   .catch();
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }
  return (
    <>
      <Button variant="contained" className="bg-teal-600 text-white" onClick={handleOpenDialog}>
        VER CICLO
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <div className="sticky top-0 z-20 flex h-80 w-full justify-center bg-teal-600 text-white p-4 shadow-md">
          <h1 className="text-center my-20">
            <b>UNIVERSIDAD NACIONAL INTERCULTURAL DE QUILLABAMBA</b>
          </h1>
        </div>
        <center className="mt-4">
          {datosCiclo.ciclo.portada_ciclo !== null ? (
            <img
              className="text-center w-auto h-auto"
              src={`${RutaGeneral}${datosCiclo.ciclo.portada_ciclo}`}
              alt="Logo UNIQ"
            />
          ) : (
            <img className="text-center w-200 h-200" src={logoUNIQ} alt="Logo UNIQ" />
          )}
        </center>
        <h1 className="text-center text-teal-600 my-20">
          <b>{datosCiclo.ciclo.denominacion}</b>
        </h1>
        <div className="px-48">
          <Typography
            className="text-14 my-24 leading-normal"
            variant="body2"
            dangerouslySetInnerHTML={{ __html: datosCiclo.ciclo.requisitos }}
          />
        </div>
        <div className="mx-20 mb-20 mt-10">
          <p className="ml-8 mb-3">
            <b>REQUISITOS PARA INSCRIPCION</b>
          </p>
          {datosCiclo.requisitos.map((value, index) => (
            <div key={index} className="flex flex-row">
              <Typography className="text-14 ml-8" variant="body2">
                {index + 1}.- {value.id_padron_documento_requisito.nombre_documento}
              </Typography>
              {value.id_padron_documento_requisito.documento !== null && (
                <Tooltip title="Ver documento adjunto">
                  <IconButton
                    className="my-0 mx-5 p-0"
                    onClick={() =>
                      window.open(`${RutaGeneral}${value.id_padron_documento_requisito.documento}`)
                    }
                    color="secondary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          ))}
        </div>
        <div className="grid sm:grid-rows-2 md:grid-cols-2 md:grid-rows-none ">
          <div className="mx-20 mb-20 mt-10">
            <p className="ml-8 mb-3">
              <b>PREINSCRIPCION</b>
            </p>
            <p className="ml-8 mb-3">
              Fecha inicio: {datosCiclo.ciclo.fecha_inicio_preinscripcion}
            </p>
            <p className="ml-8 mb-10">Fecha fin: {datosCiclo.ciclo.fecha_fin_preinscripcion}</p>
            {datosCiclo.ciclo.fecha_inicio_preinscripcion <= fechaHoy &&
            datosCiclo.ciclo.fecha_fin_preinscripcion >= fechaHoy ? (
              <BasicCardCiclo
                title="PREINSCRIBETE AHORA"
                textButton="PREINSCRIBIRSE"
                ruta={`/prinscripcion/${datosCiclo.ciclo.id}`}
                estado
              />
            ) : (
              <BasicCardCiclo
                title="PREINSCRIBETE AHORA"
                textButton="PREINSCRIBIRSE"
                ruta={`/prinscripcion/${datosCiclo.ciclo.id}`}
                estado={false}
              />
            )}
          </div>
          <div className="mx-20 mb-20 mt-10">
            <p className="ml-8 mb-3">
              <b>INSCRIPCION</b>
            </p>
            <p className="ml-8 mb-3">Fecha inicio: {datosCiclo.ciclo.fecha_inicio_inscripcion}</p>
            <p className="ml-8 mb-10">Fecha fin: {datosCiclo.ciclo.fecha_fin_inscripcion}</p>
            {datosCiclo.ciclo.fecha_inicio_inscripcion <= fechaHoy &&
            datosCiclo.ciclo.fecha_fin_inscripcion >= fechaHoy ? (
              <BasicCardCiclo
                title="¿YA TIENES TU PREINSCRIPCION?"
                textButton="INSCRIBIRSE"
                ruta={`/inscripcion/${datosCiclo.ciclo.id}`}
                estado
              />
            ) : (
              <BasicCardCiclo
                title="PREINSCRIBETE AHORA"
                textButton="PREINSCRIBIRSE"
                ruta={`/prinscripcion/${datosCiclo.ciclo.id}`}
                estado={false}
              />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PreInscripcionPorCiclo;
