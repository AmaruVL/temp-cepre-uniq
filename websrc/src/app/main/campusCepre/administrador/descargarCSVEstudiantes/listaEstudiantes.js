import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MenuItem, TextField } from '@mui/material';
import useMessages from 'app/hooks/useMessages';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';

const ListaAsignacionEstudiante = (props) => {
  // const { editar, data } = props;
  const { idAula, idCiclo, idGrupo, loading, detallesAula } = props;
  const [dataLoad, setDataLoad] = useState(false);
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
    defaultValues: {
      ciclos: '',
      fechaInicio: '',
      fechaFin: '',
    },
    // resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios.get(`${RutaGeneral}/ciclos-activo`).then((resp) => {
      setDataCiclo(resp.data);
      setDataLoad(true);
    });
  }, [dataLoad]);

  function onSubmitEstudiantes(dataForm) {
    // let entriesData = [];
    // console.log('DATAFORM', dataForm);
    window.open(
      `${RutaGeneral}/administrador/exportar-datos/${dataForm.ciclos}/${dataForm.fechaInicio}/${dataForm.fechaFin}`
    );
    // axios
    //   .get(
    //     `${RutaGeneral}/administrador/exportar-datos/${dataForm.ciclos}/${dataForm.fechaInicio}/${dataForm.fechaFin}`
    //   )
    //   .catch((err) => {
    //     showError('No se pudo descargar el listado de alumnos');
    //   });
    // entriesData = Object.entries(dataForm);
    // console.log('Entries', entriesData);
    // await axios
    //   .patch(`${RutaGeneral}/asignar-estudiantes/${idAula}`, {
    //     estudiantes: entriesData,
    //   })
    //   .then(async (resp) => {
    //     showSuccess('Actualizado correctamente');
    //   })
    //   .catch((err) => showError('No se pudo actualizar'));
  }

  return (
    // <Card>
    //   <CardContent>
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmitEstudiantes)}>
            <div className="p-10">
              <Controller
                name="ciclos"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    select
                    label="Ciclos"
                    id="ciclos"
                    error={!!errors.ciclos}
                    helperText={errors.ciclos && errors.ciclos?.message}
                    variant="outlined"
                    fullWidth
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  >
                    {dataCiclo.map((value, index) => (
                      <MenuItem key={index} value={value.ciclo.id}>
                        {value.ciclo.denominacion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>
            <div className="p-10">
              <Controller
                name="fechaInicio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    label="Fecha Inicio"
                    id="fechaInicio"
                    error={!!errors.denominacion}
                    helperText={errors.denominacion && errors.denominacion?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="p-10">
              <Controller
                name="fechaFin"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...field}
                    type="date"
                    label="Fecha Fin"
                    id="fechaFin"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            <Button className="my-12" variant="contained" color="primary" type="submit">
              Descargar
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
