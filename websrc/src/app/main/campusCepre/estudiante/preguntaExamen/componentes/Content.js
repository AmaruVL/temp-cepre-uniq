import { Button } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';

function ConfirmarExamenContent(props) {
  const [page, setPage] = React.useState(0);
  const { register, handleSubmit } = useForm();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataPreguntas, numeroPregunta } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  // React.useEffect(() => {
  //   axios.get(`${RutaGeneral}/requisitos_documento/`).then((res) => {
  //     props.setDataRequisitos(res.data);
  //     setEstadoData(true);
  //   });
  // }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // function searchingTerm(value) {
  //   return function (x) {
  //     return x.denominacion.toLowerCase().includes(value.toLowerCase()) || !value;
  //   };
  // }
  return (
    <div className="p-10 m-10 w-full">
      <h2 className="border-b-2 border-blue-900">
        <b>{dataPreguntas.name}</b>
      </h2>
      {dataPreguntas.imagen !== '' ? (
        <div className="grid grid-cols-2 justify-center items-center">
          <img
            className="max-w-sm max-h-sm"
            src={dataPreguntas.imagen}
            alt="imagen de la pregunta"
          />

          <form onSubmit={handleSubmit((data) => console.log('data', data))}>
            <div className="m-10 border border-blue-900 gap-4 grid grid-cols-2">
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">2</h3>
              </div>
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">3</h3>
              </div>
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">4</h3>
              </div>
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">5</h3>
              </div>
            </div>
            <center>
              <Button
                href={`/estudiante/examen/pregunta/${parseInt(numeroPregunta, 10) + 1}`}
                variant="contained"
                color="secondary"
                size="medium"
                type="submit"
              >
                Enviar respuesta
              </Button>
            </center>
          </form>
        </div>
      ) : (
        <center>
          <form onSubmit={handleSubmit((data) => console.log('data', data))}>
            <div className="m-10 border border-blue-900 gap-4 grid grid-cols-2">
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">2</h3>
              </div>
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">3</h3>
              </div>
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">4</h3>
              </div>
              <div className="flex justify-center items-center">
                <input {...register('radio')} type="radio" value="A" label="hjol" />
                <h3 className="mx-5">5</h3>
              </div>
            </div>
            <Button
              href={`/estudiante/examen/pregunta/${parseInt(numeroPregunta, 10) + 1}`}
              variant="contained"
              color="secondary"
              size="medium"
              type="submit"
            >
              Enviar respuesta
            </Button>
          </form>
        </center>
      )}
    </div>
  );
}

export default ConfirmarExamenContent;
