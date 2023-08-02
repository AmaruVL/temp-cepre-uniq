import { Button, Link, Typography } from '@mui/material';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

function ConfirmarExamenContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataExamen, setDataExamen, dataCargada } = props;
  const [estadoData, setEstadoData] = React.useState(false);
  const [estadoConfirmacion, setEstadoConfirmacion] = React.useState(false);
  const [dataPreguntas, setDataPreguntas] = React.useState();
  const { register, handleSubmit } = useForm();

  const startExam = async () => {
    await axios
      .post(
        `${RutaGeneral}/estudiante/examen/iniciar-examen/${idUsuario}/${dataExamen.id_examen_grupo}`
      )
      .then((res) => console.log(res));
    await axios
      .get(
        `${RutaGeneral}/estudiante/examen/resolver-examen/${idUsuario}/${dataExamen.id_examen_grupo}`
      )
      .then((res) => {
        setDataPreguntas(res.data);
        setEstadoConfirmacion(true);
      });
  };
  const reStartExam = async () => {
    await axios
      .get(
        `${RutaGeneral}/estudiante/examen/resolver-examen/${idUsuario}/${dataExamen.id_examen_grupo}`
      )
      .then((res) => {
        setDataPreguntas(res.data);
        setEstadoConfirmacion(true);
      });
  };
  const ConfirmarExamen = () => {
    return (
      <div className="m-10 p-10 w-full">
        <h1 className="p-10 text-center w-full">
          Confirme el inicio del <b>{dataExamen.denominacion}</b>
        </h1>
        <h3 className="pb-10">
          <b>{dataExamen.mensaje}</b>
        </h3>
        <p className="pb-10">Total de preguntas: {dataExamen.total_preguntas}</p>
        <p className="pb-10">
          <b>Puntajes: </b>
        </p>
        <p className="pb-10">Pregunta correcta: {dataExamen.puntaje_ok}</p>
        <p className="pb-10">Pregunta incorrecta: {dataExamen.puntaje_no_ok}</p>
        <p className="pb-10">Pregunta en blanco: {dataExamen.puntaje_blanco}</p>
        <center>
          <Button
            className="my-10"
            variant="contained"
            color="secondary"
            size="medium"
            disabled={!dataCargada}
            onClick={dataExamen.esta_iniciado ? () => reStartExam() : () => startExam()}
          >
            {dataExamen.esta_iniciado ? 'Reaunudar Examen' : 'Iniciar examen'}
          </Button>
        </center>
      </div>
    );
  };
  const enviarRespuesta = (dataValues) => {
    axios
      .put(`${RutaGeneral}/estudiante/examen/proceso-examen-curso/${dataExamen.id_examen_grupo}`, {
        id_examen_resultado: dataPreguntas.id_examen_resultado,
        letra_respuesta: 'A',
        nro_pregunta: dataPreguntas.nro_pregunta,
        id_alternativa_marcada: parseInt(dataValues.alternativa, 10),
        id_estudiante: idUsuario,
      })
      .then((nuevaPregunta) => {
        console.log('nueva Pregunta', nuevaPregunta);
        setDataPreguntas(nuevaPregunta.data);
      });
  };
  const Preguntas = () => {
    return (
      <div className="p-10 m-10 w-full">
        <h2 className="border-b-2 border-blue-900">
          {/* <b>{dataPreguntas.pregunta.texto_pregunta}</b> */}
          <Typography
            className="text-14 my-24 leading-normal"
            variant="body2"
            dangerouslySetInnerHTML={{ __html: dataPreguntas.pregunta.texto_pregunta }}
          />
        </h2>
        {dataPreguntas.pregunta.img_pregunta !== null ? (
          <div className="grid grid-cols-2 justify-center items-center">
            <img
              className="max-w-sm max-h-sm"
              src={`${RutaGeneral}${dataPreguntas.pregunta.img_pregunta}`}
              alt="imagen de la pregunta"
            />

            <form onSubmit={handleSubmit(enviarRespuesta)}>
              <div className="m-10 border border-blue-900 gap-4 grid grid-cols-2">
                {dataPreguntas.alternativas.map((alternativa, index) => (
                  <div className="flex justify-center items-center">
                    <input
                      {...register('alternativa')}
                      type="radio"
                      value={alternativa.id}
                      label="hjol"
                    />
                    {/* <h3 className="mx-5">pregunta.id_balota.texto_pregunta</h3> */}
                    <Typography
                      className="text-14 my-24 leading-normal"
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: alternativa.id_balota.texto_pregunta }}
                    />
                  </div>
                ))}
              </div>
              <center>
                <Button variant="contained" color="secondary" size="medium" type="submit">
                  Enviar respuesta
                </Button>
              </center>
            </form>
          </div>
        ) : (
          <center>
            <form onSubmit={handleSubmit(enviarRespuesta)}>
              <div className="m-10 border border-blue-900 gap-4 grid grid-cols-2">
                {dataPreguntas.alternativas.map((alternativa, index) => (
                  <div className="flex justify-center items-center">
                    <input
                      {...register('alternativa')}
                      type="radio"
                      value={alternativa.id}
                      label="hjol"
                    />
                    {/* <h3 className="mx-5">pregunta.id_balota.texto_pregunta</h3> */}
                    <Typography
                      className="text-14 my-24 leading-normal"
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: alternativa.texto_alternativa }}
                    />
                  </div>
                ))}
              </div>
              <Button variant="contained" color="secondary" size="medium" type="submit">
                Enviar respuesta
              </Button>
            </form>
          </center>
        )}
      </div>
    );
  };
  const ExamenFinalizado = () => {
    const history = useHistory();
    return (
      <div className="p-10 m-10 w-full">
        <h2 className="border-b-2 border-blue-900">Examen Finalizado</h2>
        <p className="my-10">
          Nota:{' '}
          <Link
            href="/estudiante/notas"
            onClick={() => {
              history.push('/estudiante/notas');
            }}
          >
            Ver notas
          </Link>
        </p>
      </div>
    );
  };

  const DarExamen = () => {
    return dataPreguntas.on_time === false ||
      (dataPreguntas.on_time === true && dataPreguntas.exist_questions === false) ? (
      <ExamenFinalizado />
    ) : (
      <Preguntas />
    );
  };

  return <>{estadoConfirmacion ? <DarExamen /> : <ConfirmarExamen />}</>;
}

export default ConfirmarExamenContent;
