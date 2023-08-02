import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import useMessages from 'app/hooks/useMessages';
import { LoadingButton } from '@mui/lab';
import QuizIcon from '@mui/icons-material/Quiz';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import FuseScrollbars from '@fuse/core/FuseScrollbars';

function ModalDetallesExamenes({ value }) {
  const [fullWidth, setFullWidth] = useState(true);
  const [notas, setNotas] = useState([]);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [openDialog, setOpenDialog] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      detalle: '',
    },
    // resolver: yupResolver(schema),
  });

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onSubmit(dataForm) {
    if (dataForm.detalle === 1) {
      setIsLoading(true);
      axios
        .get(
          `${RutaGeneral}/consulta/resultados-examen/${value.id_ciclo.anio}/${value.id_ciclo.nro_ciclo_de_anio}/${value.id_examen.id}`
        )
        .then((res) => {
          showSuccess('Consulta realizada');
          setNotas(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          showError('No se realizo correctamente la consulta.');
          setIsLoading(false);
        });
    }
    if (dataForm.detalle === 2) {
      setIsLoading(true);
      axios
        .get(
          `${RutaGeneral}/consulta/resultados-examen/${value.id_ciclo.anio}/${value.id_ciclo.nro_ciclo_de_anio}/${value.id_examen.id}/aprobados`
        )
        .then((res) => {
          showSuccess('Consulta correcta');
          setNotas(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          showError('No se realizo correctamente la consulta.');
          setIsLoading(false);
        });
    }
    if (dataForm.detalle === 3) {
      setIsLoading(true);
      axios
        .get(
          `${RutaGeneral}/consulta/resultados-examen/${value.id_ciclo.anio}/${value.id_ciclo.nro_ciclo_de_anio}/${value.id_examen.id}/desaprobados`
        )
        .then((res) => {
          showSuccess('Consulta correcta');
          setNotas(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          showError('No se realizo correctamente la consulta.');
          setIsLoading(false);
        });
    }
    if (dataForm.detalle === 4) {
      setIsLoading(true);
      axios
        .get(
          `${RutaGeneral}/consulta/resultados-examen/${value.id_ciclo.anio}/${value.id_ciclo.nro_ciclo_de_anio}/${value.id_examen.id}/NSP`
        )
        .then((res) => {
          showSuccess('Consulta correcta');
          setNotas(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          showError('No se realizo correctamente la consulta.');
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      <Tooltip title="Ver detalles de examen">
        <IconButton variant="contained" color="secondary" onClick={handleOpenDialog}>
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
              Ver notas por examen
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
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="grid grid-cols-3">
              <div className="p-10 ">
                <Controller
                  name="detalle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      select
                      label="Tipo"
                      error={!!errors.ciclos}
                      helperText={errors.ciclos && errors.ciclos?.message}
                      variant="outlined"
                      fullWidth
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    >
                      {[
                        { id: 1, denominacion: 'Todo' },
                        { id: 2, denominacion: 'Aprobados' },
                        { id: 3, denominacion: 'Desaprobados' },
                        { id: 4, denominacion: 'NSP' },
                      ].map((valueSelect, index) => (
                        <MenuItem key={index} value={valueSelect.id}>
                          {valueSelect.denominacion}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>

              <div className="p-10">
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Buscar
                </LoadingButton>
              </div>
            </div>
          </form>
          <div>
            <FuseScrollbars className="flex-grow overflow-x-auto">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">N°</TableCell>
                    <TableCell align="center">NOMBRES </TableCell>
                    <TableCell align="center">NOTA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notas.length === 0 ? (
                    <TableRow hover>
                      <TableCell align="center">...</TableCell>
                      <TableCell align="center">...</TableCell>
                      <TableCell align="center">...</TableCell>
                    </TableRow>
                  ) : (
                    notas
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((nota, index) => (
                        <TableRow key={index} hover>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {nota.id_estudiante.user_type.first_name}{' '}
                            {nota.id_estudiante.user_type.last_name}{' '}
                            {nota.id_estudiante.user_type.sur_name}
                          </TableCell>
                          <TableCell align="center">{nota.nota_promedio}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </FuseScrollbars>
            <TablePagination
              className="flex-shrink-0 border-t-1"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={notas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalDetallesExamenes;
