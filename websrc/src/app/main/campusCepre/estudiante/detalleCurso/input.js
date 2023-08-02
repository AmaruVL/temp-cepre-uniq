import { Box, Modal, Tooltip } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import useMessages from '../../../../hooks/useMessages';

const schema = yup.object().shape({
  mensaje: yup.string().required('Campo Requerido'),
});
const InputComentario = (props) => {
  const { showSuccess, showError } = useMessages();
  const { idHorario, idEstudiante, value } = props;
  const [dataCiclo, setDataCiclo] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataComentarios, setDataComentarios] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });
  const handleClickPopper = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function onSubmit(dataForm) {
    axios
      .put(`${RutaGeneral}/docente/comentarios/${idHorario}/${value.id}`, {
        texto_comentario: dataForm.mensaje,
        id_horario: idHorario,
        id_docente: idEstudiante,
      })
      .then(() => {
        showSuccess('Mensaje enviado correctamente.');
        axios
          .get(`${RutaGeneral}/docente/comentarios/${idHorario}`)
          .then((res) => {
            props.setDataComentarios(res.data);
            reset({ mensaje: '' });
            handleClose();
          })
          .catch(() => {
            showError('No se pudo enviar el mensaje.');
            handleClose();
            reset({ mensaje: '' });
          });
      });
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Tooltip title="Editar Comentario">
        <IconButton onClick={handleClickPopper('bottom-end')} color="secondary" type="submit">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row">
              <div>
                <Controller
                  render={({ field }) => <WYSIWYGEditor {...field} />}
                  name="mensaje"
                  control={control}
                />
              </div>
              <Tooltip title="Enviar Mensaje">
                <IconButton color="secondary" type="submit">
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default InputComentario;
