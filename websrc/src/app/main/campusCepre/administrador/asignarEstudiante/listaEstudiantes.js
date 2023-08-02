import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from '@mui/material';
import useMessages from 'app/hooks/useMessages';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';

// const Root = styled(FusePageCarded)(({ theme }) => ({
//   '& .FusePageCarded-header': {
//     minHeight: 72,
//     height: 72,
//     alignItems: 'center',
//     [theme.breakpoints.up('sm')]: {
//       minHeight: 136,
//       height: 136,
//     },
//   },
//   '& .FusePageCarded-content': {
//     display: 'flex',
//   },
//   '& .FusePageCarded-contentCard': {
//     overflow: 'hidden',
//   },
// }));
const ListaAsignacionEstudiante = (props) => {
  // const { editar, data } = props;
  const { idAula, idCiclo, idGrupo, loading, detallesAula } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(true);
  const [dataCiclo, setDataCiclo] = useState([]);
  const [grupoAcademico, setGrupoAcademico] = useState([]);
  const [aula, setAula] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  const { dataEstudiantes } = props;
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  // console.log('Aula', detallesAula);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  useEffect(() => {
    let objetoPrincipal = {};
    let contador = 0;
    dataEstudiantes.forEach((value, index) => {
      const { id } = value.estudiante;
      const valor = value.estudiante.id_aula !== null;
      const obj = {};
      obj[id] = valor;
      if (value.estudiante.id_aula !== null) contador += 1;
      objetoPrincipal = { ...objetoPrincipal, ...obj };
    });
    // console.log('OBJETO', objetoPrincipal);
    setCantidadSeleccionada(contador);
    reset({ ...objetoPrincipal });
  }, [loading]);

  function seleccionarTodo(estado, numero) {
    // console.log('estado', estado);
    let objetoPrincipal = {};
    let contador = 0;
    dataEstudiantes.forEach((value, index) => {
      const { id } = value.estudiante;
      const valor = value.estudiante.id_aula !== null;
      const obj = {};
      if (estado === false) {
        obj[id] = false;
        contador = 0;
      } else if (estado === true && index < numero) {
        obj[id] = true;
        contador += 1;
      } else if (estado === true && index >= numero) obj[id] = false;
      objetoPrincipal = { ...objetoPrincipal, ...obj };
      setCantidadSeleccionada(contador);
    });
    // console.log('OBJETO', objetoPrincipal);
    reset({ ...objetoPrincipal });
  }

  async function onSubmitEstudiantes(dataForm) {
    let entriesData = [];
    // console.log('DATAFORM', dataForm);
    entriesData = Object.entries(dataForm);
    // console.log('Entries', entriesData);
    await axios
      .patch(`${RutaGeneral}/asignar-estudiantes/${idAula}`, {
        estudiantes: entriesData,
      })
      .then(async (resp) => {
        showSuccess('Actualizado correctamente');
      })
      .catch((err) => showError('No se pudo actualizar'));
  }

  return (
    // <Card>
    //   <CardContent>
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className="grid grid-cols-2">
            <div>
              <Typography className="flex-auto" variant="body1" color="inherit">
                <b>Aula: </b> {detallesAula.codigo_aula}
              </Typography>
              <Typography className="flex-auto" variant="body1" color="inherit">
                <b>Capacidad: </b>
                {detallesAula.capacidad}
              </Typography>
            </div>
            <Typography className="flex-auto" variant="body1" color="inherit">
              <b>Cantidad Seleccionados: </b>
              {cantidadSeleccionada}
            </Typography>
          </div>
          <div className="flex">
            <Controller
              type="checkbox"
              control={control}
              defaultValue={false}
              // defaultValue={value.estudiante.id_aula !== null}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    seleccionarTodo(e.target.checked, detallesAula.capacidad);
                  }}
                />
              )}
            />
            <Typography className="flex pt-10">
              <b>Seleccionar todo</b>
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmitEstudiantes)}>
            {dataEstudiantes.map((value, index) => (
              <div key={index} className="flex">
                <Controller
                  name={`${value.estudiante.id}`}
                  label={`${value.estudiante.id}`}
                  type="checkbox"
                  control={control}
                  defaultValue={false}
                  // defaultValue={value.estudiante.id_aula !== null}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        if (e.target.checked === true)
                          setCantidadSeleccionada(cantidadSeleccionada + 1);
                        else if (e.target.checked === false)
                          setCantidadSeleccionada(cantidadSeleccionada - 1);
                      }}
                    />
                  )}
                />
                <Typography className="flex pt-10">
                  {/* {value.id} */}
                  {value.estudiante.user_type.first_name} {value.estudiante.user_type.last_name}{' '}
                  {value.estudiante.user_type.sur_name}{' '}
                </Typography>
              </div>
            ))}

            <Button
              className="my-12"
              variant="contained"
              color="primary"
              type="submit"
              disabled={dataEstudiantes.length === 0}
            >
              Guardar
            </Button>
          </form>
        </div>
      )}
    </>
    //   </CardContent>
    // </Card>
  );
};
export default ListaAsignacionEstudiante;
