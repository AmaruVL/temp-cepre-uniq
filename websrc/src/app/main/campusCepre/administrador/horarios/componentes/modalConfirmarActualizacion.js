import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
});

function ModalConfirmacion(props) {
  const { editar, data, nuevo, setOpenDialogPadre, setEstadoModalConfirmacion, idHorario } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datosHorariosCicloDia, setDatosHorariosCicloDia] = useState([]);
  const [estadoData, setEstadoData] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
      curso: '',
      docente: '',
      aula: '',
      meet: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (editar) {
      reset({
        curso: data.id_padron_cursos_grupo.id_padron_curso.nombre_curso,
        docente: `${data.id_docente.user_type.first_name} ${data.id_docente.user_type.last_name} ${data.id_docente.user_type.sur_name}`,
        aula: data.id_aula.codigo_aula,
        meet: data.enlace_meet,
      });
    }
  }, [nuevo, data, editar, reset]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setEstadoModalConfirmacion(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  const eliminarDia = (values) => {
    axios
      .delete(`${RutaGeneral}/horario-curso/${values.id}`)
      .then((res) => {
        axios
          .get(`${RutaGeneral}/horario-curso/${data.id}`)
          .then((res2) => {
            showSuccess('Eliminado correctamente.');
            setDatosHorariosCicloDia(res2.data);
          })
          .catch((err) => {
            showError('No se pudo eliminar.');
          });
      })
      .catch((err) => {
        showError('No se pudo eliminar.');
      });
  };
  function onSubmit(dataForm) {}
  function cerrarFormularios() {
    setEstadoModalConfirmacion(false);
    setOpenDialogPadre(false);
  }
  function ActualizarRegistroAsistencia() {
    setIsLoading(true);
    axios
      .post(`${RutaGeneral}/generar-asistencia-docente/${idHorario}`)
      .then((resp) => {
        showSuccess('Registros de asistencia actualizados correctamente.');
        setEstadoModalConfirmacion(false);
        setOpenDialogPadre(false);
        setIsLoading(false);
      })
      .catch((e) => {
        showError('No se pudieron actualizar los registros de asistencia.');
        setEstadoModalConfirmacion(false);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open onClose={handleCloseDialog}>
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>Confirmar actualizacion de registro de asistencias.</b>
            </Typography>
            {/* <IconButton
              className="flex-none justify-items-end"
              onClick={handleCloseDialog}
              color="inherit"
            >
              <CloseIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
          <h3>
            <b>Confirmación</b>
          </h3>
          <p>
            1.- Si es la primera vez que registras la configuracion de este horario recuerda guardar
            para generar el registra de asistencias.
          </p>
          <p>
            2.- Si realizaste alguna modificacion recuerda guardar los cambios para actualizar el
            registro de asistencias.
          </p>
          <p>3.- Si no realizaste ninguna modificacion puedes salir sin necesidad de guardar.</p>
          <div className="flex justify-center items-center m-10">
            <LoadingButton
              onClick={() => {
                ActualizarRegistroAsistencia();
              }}
              loading={isLoading}
              className="m-4"
              startIcon={<SaveIcon />}
              color="success"
              variant="outlined"
            >
              Guardar y Salir
            </LoadingButton>
            <LoadingButton
              loading={isLoading}
              onClick={() => {
                cerrarFormularios();
              }}
              startIcon={<CloseIcon />}
              className="m-4"
              variant="outlined"
            >
              Salir
            </LoadingButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalConfirmacion;
