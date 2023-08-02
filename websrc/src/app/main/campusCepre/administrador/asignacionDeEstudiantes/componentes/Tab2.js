import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import useMessages from 'app/hooks/useMessages';
import { useHistory } from 'react-router-dom';
import TablaEstudiantes from './TablaEstudiantes';

const schema = yup.object().shape({
  ciclo: yup.string().required('Campo Requerido'),
  aula: yup.string().required('Campo Requerido'),
});

const ConsultaEstudiantesAula = () => {
  const { showSuccess, showError } = useMessages();
  const [dataCiclo, setDataCiclo] = useState([]);
  const [aula, setAula] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  const [dataEstudiantes, setDataEstudiante] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ciclo: '',
      aula: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios.get(`${RutaGeneral}/asignar-estudiantes/ver-aulas`).then((resp) => setAula(resp.data));
    axios.get(`${RutaGeneral}/ciclos`).then((resp) => {
      setDataCiclo(resp.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
  async function onSubmit(dataForm) {
    await axios
      .get(
        `${RutaGeneral}/administrador/consultas/ver-estudiantes-aula/${dataForm.ciclo}/${dataForm.aula}`
      )
      .then((resp) => {
        showSuccess('Encontrado');
        setDataEstudiante(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        showError(`No se pudo realizar la consulta`);
        setDataEstudiante([]);
        setLoading(false);
      });
  }
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3">
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  select
                  label="Ciclo"
                  error={!!errors.ciclo}
                  helperText={errors.ciclo && errors.ciclo?.message}
                >
                  {dataCiclo.map((value, index) => (
                    <MenuItem key={index} value={value.id}>
                      {value.denominacion}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="ciclo"
              control={control}
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  select
                  label="Aula"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    // setIdAula(e.target.value);
                  }}
                  error={!!errors.aula}
                  helperText={errors.aula && errors.aula?.message}
                >
                  {aula.map((value, index) => (
                    <MenuItem key={index} value={value.id}>
                      {value.codigo_aula}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="aula"
              control={control}
            />
          </div>
          <div className="m-10">
            <Button className="my-12" variant="contained" color="primary" type="submit">
              Consultar
            </Button>
          </div>
        </div>
      </form>
      <TablaEstudiantes dataEstudiantes={dataEstudiantes} />
    </>
  );
};
export default ConsultaEstudiantesAula;
