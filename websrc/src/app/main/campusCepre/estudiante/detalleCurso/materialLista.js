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
import LinkIcon from '@mui/icons-material/Link';
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
import useMessages from '../../../../hooks/useMessages';

const schema = yup.object().shape({
  descripcion: yup.string().required('Campo Requerido'),
  tipoRecurso: yup.string().required('Campo Requerido'),
});

function ListaMaterialCurso(props) {
  const { idHorario } = props;
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataArchivo, setDataArchivo] = useState(null);
  const [datosMaterialesCurso, setDatosMaterialesCursos] = useState([]);
  const tipoRecursoData = [{ tipo: 'AVISO' }, { tipo: 'RECURSO' }];
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
    axios.get(`${RutaGeneral}/estudiante/material-curso/${idHorario}`).then((resp) => {
      setDatosMaterialesCursos(resp.data);
    });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <>
      <Tooltip title="Lista de Material del Curso">
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
              <b>Lista de Materiales del Curso</b>
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
                <TableCell align="center">Descripcion Material</TableCell>
                <TableCell align="center">Enlace Recurso</TableCell>
                <TableCell align="center">Archivo Adjunto</TableCell>
                <TableCell align="center">Tipo Recurso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosMaterialesCurso.map((value, index) => (
                <TableRow key={index} hover tabIndex={-1}>
                  <TableCell align="center">{value.descripcion_material}</TableCell>
                  <TableCell align="center">
                    {value.enlace_recurso !== null && value.enlace_recurso.length !== 0 && (
                      <Tooltip title="Link">
                        <IconButton
                          onClick={() => window.open(`${value.enlace_recurso}`)}
                          color="secondary"
                        >
                          <LinkIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {value.archivo_adjunto !== null && (
                      <Tooltip title="Ver Material Adjunto">
                        <IconButton
                          onClick={() => window.open(`${RutaGeneral}${value.archivo_adjunto}`)}
                          color="secondary"
                        >
                          <FindInPageIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="center">{value.tipo_recurso}</TableCell>
                  {/* <TableCell align="center">
                    <PopperEliminarMaterialLista
                      value={value}
                      idHorario={idHorario}
                      setDatosMaterialesCursos={setDatosMaterialesCursos}
                    />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ListaMaterialCurso;
