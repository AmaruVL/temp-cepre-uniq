import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';

function ModalCiclo(props) {
  const { editar, data } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      codigo_aula: '',
      sillas_fijas: '',
      sillas_moviles: '',
      nro_salon: '',
      tipo_aula: '',
      capacidad: '',
      piso: '',
      id_pabellon: '',
    },
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

  function onSubmit(dataForm) {
    axios
      .post(`${RutaGeneral}/sincronizar/aulas`, {})
      .then((res) => {
        handleCloseDialog();
        axios.get(`${RutaGeneral}/aulas`).then((res2) => {
          props.setDatosCiclo(res2.data);
        });
      })
      .catch();
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        Sincronizar
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button className="my-12" variant="contained" color="primary" type="submit">
            actualizar
          </Button>
        </form>
      </Dialog>
    </>
  );
}

export default ModalCiclo;
