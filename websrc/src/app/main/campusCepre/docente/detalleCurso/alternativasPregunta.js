import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import {
  Checkbox,
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
import LoadingButton from '@mui/lab/LoadingButton';
import QuizIcon from '@mui/icons-material/Quiz';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import HandleClickPopperEliminarAlternativa from './popperEliminarAlternativaPregunta';
import useMessages from '../../../../hooks/useMessages';

const schema = yup.object().shape({
  texto: yup.string().required('Campo Requerido'),
  esCorrecto: yup.string().required('Campo Requerido'),
});

function AlternativasPreguntasBalotarioCurso(props) {
  const { idHorario, value } = props;
  const [loadingButton, setLoadingButton] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataArchivo, setDataArchivo] = useState(null);
  const [alternativasPregunta, setAlternativasPregunta] = useState([]);
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
  //   useEffect(() => {
  //     if (editar) {
  //       reset({
  //         nombre: props.data.nombre_curso,
  //         abreviacion: props.data.abreviacion,
  //         descripcion: props.data.descripcion,
  //       });
  //     }
  //   }, [editar]);

  function handleOpenDialog() {
    setOpenDialog(true);
    axios.get(`${RutaGeneral}/docente/alternativas/${value.id}`).then((resp) => {
      setAlternativasPregunta(resp.data);
    });
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(data) {
    console.log('DATA', data);
    setLoadingButton(true);
    let estadoPregunta = false;
    if (data.esCorrecto === 'true') estadoPregunta = true;
    else if (data.esCorrecto === 'false') estadoPregunta = false;
    axios
      .post(`${RutaGeneral}/docente/alternativas/${value.id}`, {
        texto_alternativa: data.texto,
        es_respuesta: estadoPregunta,
        id_balota: value.id,
      })
      .then((val) => {
        setLoadingButton(false);
        showSuccess('Alternativa agregado.');
        axios.get(`${RutaGeneral}/docente/alternativas/${value.id}`).then((resp) => {
          setAlternativasPregunta(resp.data);
        });
        reset({});
        // handleCloseDialog();
      })
      .catch((err) => {
        setLoadingButton(false);
        console.log('Error', err.response);
        showError(err.response.data.message);
        // handleCloseDialog();
      });
  }

  return (
    <>
      <Tooltip title="Lista de Alternativas">
        <IconButton color="secondary" onClick={handleOpenDialog}>
          {/* <EditIcon /> */}
          <QuizIcon />
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
              <b>Alternativas de la pregunta</b>
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
          <Typography className="flex-auto" variant="subtitle1" color="inherit">
            <b>Pregunta: </b>
            {value.texto_pregunta}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid ">
              <div className="m-10">
                {/* <Controller
                  render={({ field }) => (
                    <TextField
                      className="mb-12"
                      {...field}
                      fullWidth
                      label="Descripcion de la Alternativa"
                      error={!!errors.texto}
                      helperText={errors.texto && errors.texto?.message}
                    />
                  )}
                  name="texto"
                  control={control}
                /> */}
                <Controller
                  className="mt-8 mb-16"
                  render={({ field }) => (
                    <WYSIWYGEditor
                      error={!!errors.texto}
                      helperText={errors.texto && errors.texto?.message}
                      {...field}
                    />
                  )}
                  name="texto"
                  control={control}
                />
              </div>
              <div className="flex">
                <div className="m-10 flex-auto flex flex-row">
                  <Controller
                    name="esCorrecto"
                    label="Es correcto"
                    type="checkbox"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(ev) => {
                          field.onChange(ev.target.checked);
                        }}
                      />
                    )}
                  />
                  <Typography className="flex md:pt-20">Es correcto</Typography>
                </div>
                <div className="m-10">
                  <LoadingButton
                    loading={loadingButton}
                    className="mb-12"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Agregar Pregunta
                  </LoadingButton>
                </div>
              </div>
            </div>
          </form>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Alternativas</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alternativasPregunta.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Typography
                      className="text-14 my-24 leading-normal"
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: data.texto_alternativa }}
                    />
                    {/* {data.texto_alternativa} */}
                  </TableCell>
                  <TableCell align="center">
                    <OrdersStatus name={data.es_respuesta ? 'Correcta' : 'Incorrecta'} />
                  </TableCell>
                  <TableCell align="center">
                    <HandleClickPopperEliminarAlternativa
                      dataRegistro={data}
                      idBalota={value.id}
                      setAlternativasPregunta={setAlternativasPregunta}
                    />{' '}
                  </TableCell>
                  {/* <TableCell align="center">
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

export default AlternativasPreguntasBalotarioCurso;
