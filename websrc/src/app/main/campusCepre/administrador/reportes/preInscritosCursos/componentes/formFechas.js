import { LoadingButton } from '@mui/lab';
import { MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

const { useState } = require('react');
const { useForm, Controller } = require('react-hook-form');

const FormularioFechas = (props) => {
  const { showSuccess, showError } = useMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [fechaIn, setFechaIn] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [listaEstudiantes, setListaEstudiantes] = useState([]);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ciclos: '',
    },
    // resolver: yupResolver(schema),
  });

  function onSubmit(dataForm) {
    setIsLoading(true);
    axios
      .get(`${RutaGeneral}/resumen-preinscripcion/${dataForm.ciclos}`)
      .then((res) => {
        showSuccess('Consulta realizada correctamente');
        setIsLoading(false);
        props.setDataEstudiante(res.data);
      })
      .catch((err) => {
        showError('No se realizo correctamente la consulta.');
        setIsLoading(false);
      });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-3">
        <div className="p-10 ">
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
                error={!!errors.ciclos}
                helperText={errors.ciclos && errors.ciclos?.message}
                variant="outlined"
                fullWidth
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              >
                {props.dataCursos.map((value, index) => (
                  <MenuItem key={index} value={value.id}>
                    {value.denominacion}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        
        <div className="p-10">
          <LoadingButton loading={isLoading} variant="contained" color="secondary" type="submit">
            Buscar
          </LoadingButton>
        </div>
        {/* <div className="p-10">
          <LoadingButton
            variant="contained"
            color="secondary"
            href={`${RutaGeneral}/reporte_emision_documento_formacion_profesional/${fechaIn}/${fechaFin}`}
          >
            Descargar en formato CSV
          </LoadingButton>
        </div> */}
      </div>
    </form>
  );
};
export default FormularioFechas;
