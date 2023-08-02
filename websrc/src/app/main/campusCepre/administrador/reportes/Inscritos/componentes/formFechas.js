import { LoadingButton } from '@mui/lab';
import { MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

const { useState, useEffect } = require('react');
const { useForm, Controller } = require('react-hook-form');

const FormularioFechas = (props) => {
  const { showSuccess, showError } = useMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [fechaIn, setFechaIn] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [listaEstudiantes, setListaEstudiantes] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [provinciaNacimiento, setProvinciaNacimiento] = useState([]);
  const [distritoNacimiento, setDistritoNacimiento] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
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
      departamentoNacimiento: '',
      provinciaNacimiento: '',
      distritoNacimiento: '',
    },
    // resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios.get(`${RutaGeneral}/ubigeoDep`).then((values) => {
      setDepartamentos(values.data);
      setDataLoad(true);
    });
  }, [dataLoad]);

  function onSubmit(dataForm) {
    let texto = dataForm.ciclos;
    if (dataForm.escuelaProfesional !== '') {
      texto = `${dataForm.ciclos}/${dataForm.escuelaProfesional}`;
    }
    setIsLoading(true);
    axios
      .post(`${RutaGeneral}/consultas/ver-inscripciones/${dataForm.ciclos}`, {
        id_procedencia: dataForm.distritoNacimiento,
        id_colegio: null,
      })
      .then((res) => {
        setIsLoading(false);
        showSuccess('Consulta realizada correctamente');
        props.setDataEstudiante(res.data);
      })
      .catch((err) => {
        showError('No se realizo correctamente la consulta.');
        setIsLoading(false);
      });
  }
  const handleChangeDepartamentoNacimiento = (event) => {
    axios
      .get(`${RutaGeneral}/ubigeoProv/${event.target.value}`) // , { departamento: event.target.value })
      .then((res) => setProvinciaNacimiento(res.data));
  };
  const handleChangeProvinciaNacimiento = (event) => {
    axios
      .get(`${RutaGeneral}/ubigeoDist/${event.target.value}`)
      .then((res) => setDistritoNacimiento(res.data));
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-5">
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
        <div className="m-10">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="departamentoNacimiento"
                select
                fullWidth
                label="Departamento"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleChangeDepartamentoNacimiento(e);
                }} // field.onChange && handleChangeDepartamentoNacimiento}
                error={!!errors.departamentoNacimiento}
                helperText={errors.departamentoNacimiento && errors.departamentoNacimiento?.message}
              >
                {departamentos.map((option, index) => (
                  <MenuItem key={index} value={option.codigo_ubigeo}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
            control={control}
            name="departamentoNacimiento"
          />
        </div>
        <div className="m-10">
          <Controller
            render={({ field }) => (
              <TextField
                id="provinciaNacimiento"
                select
                fullWidth
                label="Provincia"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleChangeProvinciaNacimiento(e);
                }}
                error={!!errors.provinciaNacimiento}
                helperText={errors.provinciaNacimiento && errors.provinciaNacimiento?.message}
              >
                {provinciaNacimiento.map((option, index) => (
                  <MenuItem key={index} value={option.codigo_ubigeo}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
            control={control}
            name="provinciaNacimiento"
          />
        </div>
        <div className="m-10">
          <Controller
            render={({ field }) => (
              <TextField
                id="distritoNacimiento"
                select
                fullWidth
                label="Distrito"
                value={field.value}
                onChange={field.onChange}
                error={!!errors.distritoNacimiento}
                helperText={errors.distritoNacimiento && errors.distritoNacimiento?.message}
              >
                {distritoNacimiento.map((option, index) => (
                  <MenuItem key={index} value={option.codigo_ubigeo}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
            control={control}
            name="distritoNacimiento"
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
