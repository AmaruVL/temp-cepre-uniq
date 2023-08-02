import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import useMessages from 'app/hooks/useMessages';
import { Button, MenuItem } from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';

const schema = yup.object().shape({
  ciclo: yup.string().required('Campo Requerido'),
  tipoExamen: yup.string().required('Campo Requerido'),
});
const tiposExamen = [
  {
    denominacion: 'PARCIAL',
  },
  {
    denominacion: 'SIMULACRO',
  },
];
const ConsultaCicloExamen = (props) => {
  const { showSuccess, showError } = useMessages();
  const { ciclos, tiposExamen: examenes } = props;
  console.log('Ciclos', ciclos);
  // console.log('Examenes', examenes);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ciclo: '',
      tipoExamen: '',
    },
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    // console.log('Data', data);
    axios
      .get(`${RutaGeneral}/examen/consulta/examenes-registrado/${data.ciclo}/${data.tipoExamen}`)
      .then((resp) => {
        showSuccess('Busqueda correcta.');
        props.setNumeroCiclo(data.ciclo);
        props.setNumeroExamenCiclo(resp.data.nro_actual);
        props.cambiarNumeroExamen(resp.data.nro_actual);
        props.setEstadoData(true);
        props.setTipoExamenConsulta(data.tipoExamen);
      })
      .catch((err) => {
        showError('Error en la busqueda.');
      });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex">
        <Controller
          render={({ field }) => (
            <TextField
              className="mb-12 md:mr-5"
              select
              {...field}
              value={field.value}
              onChange={field.onChange}
              fullWidth
              label="Tipo Examen"
              error={!!errors.tipoExamen}
              helperText={errors.tipoExamen && errors.tipoExamen?.message}
            >
              {examenes.map((option, index) => (
                <MenuItem key={index} value={option.denominacion}>
                  {option.denominacion}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="tipoExamen"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <TextField
              className="mb-12 md:mr-5"
              select
              {...field}
              value={field.value}
              onChange={field.onChange}
              fullWidth
              label="Ciclo"
              error={!!errors.ciclo}
              helperText={errors.ciclo && errors.ciclo?.message}
            >
              {ciclos.map((option, index) => (
                <MenuItem key={index} value={option.nro_ciclo_de_anio}>
                  {option.denominacion.split('-')[0]}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="ciclo"
          control={control}
        />
        <Button variant="contained" color="secondary" type="submit">
          Buscar
        </Button>
      </div>
    </form>
  );
};
export default ConsultaCicloExamen;
