import { LoadingButton } from '@mui/lab';
import { MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import useMessages from '../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

const { useState } = require('react');
const { useForm, Controller } = require('react-hook-form');

const FormularioFechas = (props) => {
  const { showSuccess, showError } = useMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const { idEstudiante } = props;
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      cursos: '',
    },
    // resolver: yupResolver(schema),
  });

  function onSubmit(dataForm) {
    // console.log(dataForm);
    setIsLoading(true);
    axios
      .post(
        `${RutaGeneral}/estudiante/asistencia/consulta-asistencia-fechas/${idEstudiante}/${dataForm.cursos}`
      )
      .then((res) => {
        setIsLoading(false);
        props.setDataAsistencia(res.data);
        const cursoSeleccionado = props.dataCursos.find(
          (elem) => elem.datos[0].id_horario.id === dataForm.cursos
        );
        props.setCursoElegido(cursoSeleccionado);
      })
      .catch((err) => {
        showError('No se realizo correctamente la consulta.');
        setIsLoading(false);
      });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-3">
        <div className="p-10">
          <Controller
            name="cursos"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                InputLabelProps={{
                  shrink: true,
                }}
                select
                label="Mis cursos"
                id="cursos"
                error={!!errors.cursos}
                helperText={errors.cursos && errors.cursos?.message}
                variant="outlined"
                fullWidth
              >
                {props.dataCursos.map((value, index) => (
                  <MenuItem key={index} value={value.datos[0].id_horario.id}>
                    {value.curso}
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
      </div>
    </form>
  );
};
export default FormularioFechas;
