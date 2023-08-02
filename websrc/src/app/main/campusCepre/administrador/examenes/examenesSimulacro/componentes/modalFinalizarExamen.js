import { useState } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

function FinalizarExamen(props) {
  const { editar, data, handleCloseDialog, id, close } = props;
  const [numeroPreguntasActualizadas, setNumeroPreguntasActualizadas] = useState(false);
  const { showError, showSuccess } = useMessages();
  const [blanco, setBlanco] = useState(0);
  const [errado, setErrado] = useState(0);
  const [loading, setloading] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [dataCursos, setDataCursos] = useState([]);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useForm({
    defaultValues: {
      blanco,
      errado,
    },
  });

  function onSubmit(dataForm) {
    setloading(true);
    axios
      .patch(`${RutaGeneral}/examen/actualizar-estado/${id}`, {
        max_blancos: dataForm.blanco,
        max_errado: dataForm.errado,
      })
      .then((res) => {
        setloading(false);
        showSuccess('Examen Generado Correctamente');
        handleCloseDialog();
        close();
      })
      .catch((err) => {
        setloading(false);
        showError('El examen no fue generado');
        handleCloseDialog();
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2">
        <div className="flex">
          <Controller
            name="preguntasBlanco"
            type="checkbox"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  setBlanco(e.target.checked);
                  // reset({ ...getValues(), detalleDiscapacidad: '' });
                }}
              />
            )}
          />
          <Typography className="flex m-10">Preguntas en blanco</Typography>
        </div>
        <div className="flex">
          <Controller
            name="preguntasErradas"
            type="checkbox"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  setErrado(e.target.checked);
                  // reset({ ...getValues(), detalleDiscapacidad: '' });
                }}
              />
            )}
          />
          <Typography className="flex m-10">Preguntas erradas</Typography>
        </div>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="m-10 flex-auto">
          <TextField
            fullWidth
            disabled={!blanco}
            name="blanco"
            type="number"
            id="blanco"
            label="Nota maxima para preguntas en blanco"
            {...register('blanco')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="m-10 flex-auto">
          <TextField
            fullWidth
            disabled={!errado}
            name="errado"
            type="number"
            id="errado"
            label="Nota maxima para preguntas erradas"
            {...register('errado')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <LoadingButton
        loading={loading}
        className="m-10"
        variant="contained"
        color="primary"
        type="submit"
      >
        Guardar
      </LoadingButton>
    </form>
  );
}

export default FinalizarExamen;
