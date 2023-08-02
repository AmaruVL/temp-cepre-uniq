import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useMessages from '../../../../../../hooks/useMessages';
import RutaGeneral from '../../../../../../shared-components/rutaGeneral';

function ModalDetalleExamen(props) {
  const { editar, data } = props;
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [dataExamen, setDataExamen] = useState([]);
  // const [nombreCurso, setNombreCurso] = useState('');
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
  } = useForm();

  function handleOpenDialog() {
    setOpenDialog(true);
    axios.get(`${RutaGeneral}/examen/ver-preguntas/${data.id}`).then((resp) => {
      setDataExamen(resp.data);
    });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  // function generarExamenAutomatico() {
  //   axios
  //     .post(`${RutaGeneral}/crear-examen-grupo/${data.id}`)
  //     .then((res) => {
  //       showSuccess('Examen Automatico Generado Correctamente');
  //     })
  //     .catch((err) => {
  //       showError('El examen no fue generado');
  //       console.log('error', err);
  //     });
  // }
  function onSubmit(dataForm) {
    console.log('DF', dataForm);
    console.log('DF Entries', Object.entries(dataForm));
    const dataFormEntries = Object.entries(dataForm);
    dataFormEntries.forEach((value, index) => {
      value[0] = parseInt(value[0], 10);
      value[1] = parseInt(value[1], 10);
    });
    console.log('DF Entries Convert', dataFormEntries);
    axios
      .put(`${RutaGeneral}/curso-grupo/actualizar-nro-preguntas`, {
        lista_cursos: dataFormEntries,
      })
      .then((resp) => {
        axios
          .post(`${RutaGeneral}/crear-examen-grupo/${data.id}`)
          .then((res) => {
            showSuccess('Examen Automatico Generado Correctamente');
          })
          .catch((err) => {
            showError('El examen no fue generado');
          });
      })
      .catch((err) => {
        showError('El examen no fue generado');
      });
  }
  return (
    <>
      <Tooltip title="Ver examen">
        <IconButton
          color="secondary"
          disabled={!data.finalizado}
          onClick={() => handleOpenDialog()}
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              Examen
            </Typography>
            <IconButton
              className="flex-none justify-items-end"
              onClick={handleCloseDialog}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {dataExamen.map((value, index) => {
            return (
              <>
                {/* {nombreCurso !==
                  `${value.id_balota_curso.id_padron_curso_grupo.id_padron_curso.nombre_curso}` && (
                  <p>{value.id_balota_curso.id_padron_curso_grupo.id_padron_curso.nombre_curso}</p>
                )} */}
                <Typography className="m-5" variant="subtitle2" color="inherit">
                  <b>
                    Pregunta {index + 1} de{' '}
                    {value.id_balota_curso.id_padron_curso_grupo.id_padron_curso.nombre_curso}
                  </b>{' '}
                  :
                </Typography>
                <Typography
                  className="text-14 my-24 leading-normal"
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: value.id_balota_curso.texto_pregunta }}
                />
              </>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalDetalleExamen;
