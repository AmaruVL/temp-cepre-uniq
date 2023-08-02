import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import useMessages from 'app/hooks/useMessages';
import { LoadingButton } from '@mui/lab';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';

const schema = yup.object().shape({
  dni: yup
    .string()
    .required('Dni es requerido')
    .max(8, 'Minimo 8 caracteres')
    .min(8, 'Maximo 8 caracteres'),
});

function ConsultaDocenteDNI(props) {
  const { editar, data, cursos } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const { showError, showSuccess } = useMessages();
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [dataCursos, setDataCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      dni: '',
    },
    resolver: yupResolver(schema),
  });
  // useEffect(() => {
  //   axios
  //     .get(`${RutaGeneral}/padron-curso/activo`)
  //     .then((resp) => {
  //       setDataCursos(resp.data);
  //     })
  //     .catch((err) => {});
  //   if (editar) {
  //     reset({
  //       dni: data.dni,
  //       email: data.user_type.email,
  //       codigo_administrador: data.codigo_administrador,
  //     });
  //   }
  // }, [editar]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(dataForm) {
    setLoading(true);
    axios
      .get(`${RutaGeneral}/consulta/personas/${dataForm.dni}`)
      .then((res) => {
        setLoading(false);
        props.setDataPersona(res.data);
        showSuccess('DNI encontrado.');
      })
      .catch((err) => {
        setLoading(false);
        showError('No se encontro informacion para el dni');
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <Grid className="flex-auto" item xs={4}>
          <Controller
            control={control}
            name="dni"
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-12"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label="DNI"
                error={!!errors.dni}
                helperText={errors.dni && errors.dni?.message}
              />
            )}
          />
        </Grid>
        <div className="m-5">
          <LoadingButton
            loading={loading}
            className="mb-12"
            variant="contained"
            color="primary"
            type="submit"
          >
            Consultar
          </LoadingButton>
        </div>
      </form>
    </>
  );
}

export default ConsultaDocenteDNI;
