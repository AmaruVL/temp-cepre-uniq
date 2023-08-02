import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AlternativasPreguntasBalotarioCurso from './alternativasPregunta';
import useMessages from '../../../../hooks/useMessages';

const schema = yup.object().shape({
  descripcion: yup.string().required('Campo Requerido'),
  tipoRecurso: yup.string().required('Campo Requerido'),
});

function ListaBalotarioCurso(props) {
  const { idHorario, dataCiclo } = props;
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataArchivo, setDataArchivo] = useState(null);
  const [datosBalotarioCurso, setDatosBalotarioCursos] = useState([]);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      descripcion: '',
      tipoRecurso: '',
    },
    resolver: yupResolver(schema),
  });

  function handleOpenDialog() {
    setOpenDialog(true);
    axios.get(`${RutaGeneral}/docente/balotario/preguntas/${dataCiclo.id}`).then((resp) => {
      setDatosBalotarioCursos(resp.data);
    });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    setLoadingButton(true);
    const formData = new FormData();
    formData.append('archivo_adjunto', dataArchivo);
    formData.append('descripcion_material', data.descripcion);
    formData.append('tipo_recurso', data.tipoRecurso);
    formData.append('id_horario', idHorario);
    axios
      .post(`${RutaGeneral}/docente/material-curso`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((val) => {
        setLoadingButton(false);
        showSuccess('Material agregado.');
        handleCloseDialog();
      })
      .catch((err) => {
        setLoadingButton(false);
        showError('No se pudo agregar el material.');
        handleCloseDialog();
      });
  }

  return (
    <>
      <Tooltip title="Balotario del Curso">
        <IconButton color="secondary" onClick={handleOpenDialog}>
          <ListAltIcon />
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
              <b>Balotario del Curso</b>
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
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Texto Pregunta</TableCell>
                <TableCell align="center">Imagen Adjunta</TableCell>
                <TableCell align="center">Alternativas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosBalotarioCurso.map((value, index) => (
                <TableRow key={index} hover tabIndex={-1}>
                  <TableCell align="center">{value.texto_pregunta}</TableCell>
                  <TableCell align="center">
                    {value.img_pregunta !== null && (
                      <Tooltip title="Archivo Adjunto">
                        <IconButton
                          onClick={() => window.open(`${RutaGeneral}${value.img_pregunta}`)}
                          color="secondary"
                        >
                          <FindInPageIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <AlternativasPreguntasBalotarioCurso value={value} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ListaBalotarioCurso;
