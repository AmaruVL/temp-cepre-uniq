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
      cursos: '',
      estudiante: '',
      fechaInicio: '',
      fechaFin: '',
    },
    // resolver: yupResolver(schema),
  });

  function onSubmit(dataForm) {
    console.log('DataConsulta', props);
    props.setFechaIn(dataForm.fechaInicio);
    props.setFechaFin(dataForm.fechaFin);
    props.setCurso(dataForm.cursos);
    axios
      .post(`${RutaGeneral}/docente/asistencia/lista-estudiantes/${dataForm.cursos}`, {
        f_inicio: dataForm.fechaInicio,
        f_fin: dataForm.fechaFin,
      })
      .then((res) => {
        setIsLoading(false);
        console.log('Asistencia', res.data);
        props.setDataEstudiante(res.data);
      })
      .catch((err) => {
        showError('No se realizo correctamente la consulta.');
        setIsLoading(false);
      });
  }
  const buscarEstudiantes = (val) => {
    axios
      .get(`${RutaGeneral}/docente/asistencia/consulta-estudiantes-curso/${val}`)
      .then((resp) => {
        // console.log('Lista Estudiantes', resp.data);
        setListaEstudiantes(resp.data);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-5">
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
                label="Cursos"
                id="cursos"
                error={!!errors.cursos}
                helperText={errors.cursos && errors.cursos?.message}
                variant="outlined"
                fullWidth
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  buscarEstudiantes(e.target.value);
                }}
              >
                {props.dataCursos.map((value, index) => (
                  <MenuItem key={index} value={value.id_horario}>
                    {value.curso}-{value.grupo_ac_ab}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        {/* <div className="p-10">
          <Controller
            name="estudiante"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                InputLabelProps={{
                  shrink: true,
                }}
                select
                label="Estudiante"
                id="estudiante"
                error={!!errors.estudiante}
                helperText={errors.estudiante && errors.estudiante?.message}
                variant="outlined"
                fullWidth
              >
                {listaEstudiantes.map((value, index) => (
                  <MenuItem key={index} value={value.id_estudiante.id}>
                    {value.id_estudiante.user_type.first_name}{' '}
                    {value.id_estudiante.user_type.last_name}{' '}
                    {value.id_estudiante.user_type.sur_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div> */}
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
