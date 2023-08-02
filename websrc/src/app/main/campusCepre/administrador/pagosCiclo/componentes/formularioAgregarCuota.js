import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  nro_cuotas: yup.string().required('Campo Requerido'),
});

function FormularioAgregarCuota(props) {
  const { ciclo, setDatosPagosCiclo } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [estadoData, setEstadoData] = React.useState(false);
  const [loading, setloading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nro_cuotas: '',
    },
    resolver: yupResolver(schema),
  });

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }

  function onSubmit(form) {
    setloading(true);
    axios
      .post(`${RutaGeneral}/pagos`, {
        nro_cuotas: form.nro_cuotas,
        tipo_colegio: '---',
        monto_total: '0.00',
        id_ciclo: ciclo,
      })
      .then((res) => {
        // console.log('agregar cuota', res.data);
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        for (let k = 0; k < res.data.nro_cuotas; k += 1) {
          axios.post(`${RutaGeneral}/detalle-pago-test`, {
            id_pago: res.data.id,
            nro_cuota: k + 1,
            fecha_inicio: `${year}-${month}-${day}`,
            fecha_fin: `${year}-${month}-${day}`,
            monto_parcial: 0,
          });
        }

        axios.get(`${RutaGeneral}/pagos-ciclo/${ciclo}`).then((res2) => {
          setloading(false);
          showSuccess('Guardado correctamente.');
          reset();
          setDatosPagosCiclo(res2.data);
        });
      })
      .catch((err) => {
        setloading(false);
        showError('No se pudo guardar.');
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row">
        <div className="flex-auto mr-10">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-12"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                type="number"
                label="Número de cuotas"
                error={!!errors.nro_cuotas}
                helperText={errors.nro_cuotas && errors.nro_cuotas?.message}
              />
            )}
            name="nro_cuotas"
            control={control}
          />
        </div>
        <div>
          <LoadingButton loading={loading} variant="contained" color="primary" type="submit">
            Agregar
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}

export default FormularioAgregarCuota;
