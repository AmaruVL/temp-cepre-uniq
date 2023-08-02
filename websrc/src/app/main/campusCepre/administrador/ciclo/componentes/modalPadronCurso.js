import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import axios from 'axios';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import useMessages from 'app/hooks/useMessages';
import PopperDescripcion from './popperDescripcion';

const schema = yup.object().shape({
  denominacion: yup.string().required('Campo Requerido'),
  inicioCiclo: yup.string().required('Campo Requerido'),
  finCiclo: yup.string().required('Campo Requerido'),
  inicioPreInscripcion: yup.string().required('Campo Requerido'),
  finPreInscripcion: yup.string().required('Campo Requerido'),
  inicioInscripcion: yup.string().required('Campo Requerido'),
  finInscripcion: yup.string().required('Campo Requerido'),
  descripcion: yup.string().required('Campo Requerido'),
  numeroCiclo: yup
    .string()
    .required('Campo Requerido')
    .matches(/^[0-9]+$/, 'Solo numeros'),
  anio: yup
    .string()
    .required('Campo Requerido')
    .matches(/^[0-9]+$/, 'Solo numeros')
    .min(4, 'Must be exactly 4 digits')
    .max(4, 'Must be exactly 4 digits'),
});

function ModalCiclo(props) {
  const idAdmin = idUsuario;
  const { editar, data } = props;
  const { showError, showSuccess } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataRequisitos, setDataRequisitos] = useState({ asignados: [], no_asignados: [] });
  const [dataLoad, setDataLoad] = useState(false);
  const [imagenPortadaCiclo, setImagenPortadaCiclo] = useState('');
  const {
    watch,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      denominacion: '',
      inicioCiclo: '',
      finCiclo: '',
      inicioPreInscripcion: '',
      finPreInscripcion: '',
      inicioInscripcion: '',
      finInscripcion: '',
      descripcion: '',
      anio: '',
      turnoManiana: '',
      turnoTarde: '',
      turnoNoche: '',
      orgUnitPath: '',
      numeroCiclo: '',
    },
    resolver: yupResolver(schema),
  });
  // useEffect(() => {
  //   if (editar) {
  //     reset({
  //       denominacion: data.denominacion,
  //       inicioCiclo: data.fecha_inicio_ciclo,
  //       finCiclo: data.fecha_fin_ciclo,
  //       inicioPreInscripcion: data.fecha_inicio_preinscripcion,
  //       finPreInscripcion: data.fecha_fin_preinscripcion,
  //       inicioInscripcion: data.fecha_inicio_inscripcion,
  //       finInscripcion: data.fecha_fin_inscripcion,
  //       descripcion: data.requisitos,
  //       anio: data.anio,
  //       orgUnitPath: data.org_unit_path,
  //       numeroCiclo: data.nro_ciclo_de_anio,
  //     });
  //   }
  // }, [data]);

  function handleOpenDialog() {
    setOpenDialog(true);
    if (editar) {
      reset({
        denominacion: data.denominacion,
        inicioCiclo: data.fecha_inicio_ciclo,
        finCiclo: data.fecha_fin_ciclo,
        inicioPreInscripcion: data.fecha_inicio_preinscripcion,
        finPreInscripcion: data.fecha_fin_preinscripcion,
        inicioInscripcion: data.fecha_inicio_inscripcion,
        finInscripcion: data.fecha_fin_inscripcion,
        descripcion: data.requisitos,
        anio: data.anio,
        orgUnitPath: data.org_unit_path,
        numeroCiclo: data.nro_ciclo_de_anio,
      });
      axios
        .get(`${RutaGeneral}/consulta-requisitos/${props.data.id}`)
        .then((resp) => {
          setDataRequisitos(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!editar) {
      reset({});
      const today = new Date();
      const year = today.getFullYear();
      axios
        .get(`${RutaGeneral}/nrociclo-anio/${year}`)
        .then((resp) =>
          reset({
            anio: resp.data.anio,
            numeroCiclo: resp.data.nro_ciclo,
          })
        )
        .catch((e) => alert(e));
    }
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  function onChangeYear(year) {
    const valoresFormulario = getValues();
    axios.get(`${RutaGeneral}/nrociclo-anio/${year}`).then((resp) =>
      reset({
        ...valoresFormulario,
        anio: resp.data.anio,
        numeroCiclo: resp.data.nro_ciclo,
      })
    );
  }
  // function onChangeYear(year) {
  //   const valoresFormulario = getValues();
  //   axios.get(`${RutaGeneral}/nrociclo-anio/${year}`).then((resp) =>
  //     reset({
  //       ...valoresFormulario,
  //       anio: resp.data.anio,
  //       numeroCiclo: resp.data.nro_ciclo,
  //     })
  //   );
  // }

  function onSubmit(dataForm) {
    if (editar) {
      const entriesData = Object.entries(dataForm);
      // // console.log(entriesData);
      const arregloRequisitos = [];
      entriesData.forEach((value) => {
        if (
          value[0] !== 'anio' &&
          value[0] !== 'denominacion' &&
          value[0] !== 'numeroCiclo' &&
          value[0] !== 'descripcion' &&
          value[0] !== 'inicioCiclo' &&
          value[0] !== 'finCiclo' &&
          value[0] !== 'inicioPreInscripcion' &&
          value[0] !== 'finPreInscripcion' &&
          value[0] !== 'inicioInscripcion' &&
          value[0] !== 'finInscripcion' &&
          value[0] !== 'orgUnitPath' &&
          value[0] !== 'turnoManiana' &&
          value[0] !== 'turnoTarde' &&
          value[0] !== 'turnoNoche'
        ) {
          const valor = value[1] ? 'True' : 'False';
          arregloRequisitos.push([parseInt(value[0], 10), value[1].toString()]);
        }
      });
      const formData = new FormData();
      formData.append('denominacion', dataForm.denominacion);
      formData.append('anio', dataForm.anio);
      formData.append('nro_ciclo_de_anio', dataForm.numeroCiclo);
      formData.append('requisitos', dataForm.descripcion);
      formData.append('fecha_inicio_ciclo', dataForm.inicioCiclo);
      formData.append('fecha_fin_ciclo', dataForm.finCiclo);
      formData.append('fecha_inicio_preinscripcion', dataForm.inicioPreInscripcion);
      formData.append('fecha_fin_preinscripcion', dataForm.finPreInscripcion);
      formData.append('fecha_inicio_inscripcion', dataForm.inicioInscripcion);
      formData.append('fecha_fin_inscripcion', dataForm.finInscripcion);
      formData.append('id_administrador', idAdmin);
      formData.append('org_unit_path', dataForm.orgUnitPath);
      formData.append('portada_ciclo', imagenPortadaCiclo);
      formData.append('docs_requisito', JSON.stringify(arregloRequisitos));
      console.log('CiAR', arregloRequisitos);
      console.log('texto', JSON.stringify(arregloRequisitos));
      axios
        .put(`${RutaGeneral}/crear-ciclos-turno/${props.data.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          handleCloseDialog();
          // reset({});
          showSuccess('Ciclo actualizado correctamente');
          // reset({});
          axios.get(`${RutaGeneral}/ciclos`).then((res2) => {
            props.setDatosCiclo(res2.data);
          });

          handleCloseDialog();
        })
        .catch((err) => {
          showError('No se pudo actualizar el ciclo.');
        });
    } else {
      const formData = new FormData();
      formData.append('denominacion', dataForm.denominacion);
      formData.append('anio', dataForm.anio);
      formData.append('nro_ciclo_de_anio', dataForm.numeroCiclo);
      formData.append('requisitos', dataForm.descripcion);
      formData.append('fecha_inicio_ciclo', dataForm.inicioCiclo);
      formData.append('fecha_fin_ciclo', dataForm.finCiclo);
      formData.append('fecha_inicio_preinscripcion', dataForm.inicioPreInscripcion);
      formData.append('fecha_fin_preinscripcion', dataForm.finPreInscripcion);
      formData.append('fecha_inicio_inscripcion', dataForm.inicioInscripcion);
      formData.append('fecha_fin_inscripcion', dataForm.finInscripcion);
      formData.append('id_administrador', idAdmin);
      formData.append('turno_maniana', dataForm.turnoManiana ? 'True' : 'False');
      formData.append('turno_tarde', dataForm.turnoTarde ? 'True' : 'False');
      formData.append('turno_noche', dataForm.turnoNoche ? 'True' : 'False');
      formData.append('org_unit_path', dataForm.orgUnitPath);
      formData.append('portada_ciclo', imagenPortadaCiclo);
      console.log('FDATA', formData);
      axios
        .post(`${RutaGeneral}/crear-ciclos-turno`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          handleCloseDialog();
          showSuccess('Ciclo creado correctamente');
          reset({});
          axios.get(`${RutaGeneral}/ciclos`).then((res2) => {
            props.setDatosCiclo(res2.data);
          });
        })
        .catch((err) => {
          handleCloseDialog();
          showError('El ciclo no fue creado correctamente');
        });
    }
  }

  return (
    <>
      {editar ? (
        <Tooltip title="Editar Ciclo">
          <IconButton color="secondary" onClick={() => handleOpenDialog()}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()}>
          Crear ciclo
        </Button>
      )}

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography className="flex-auto" variant="subtitle1" color="inherit">
              <b>{editar ? 'Actualizar Ciclo' : 'Crear Ciclo'}</b>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label="Denominacion"
                    error={!!errors.denominacion}
                    helperText={errors.denominacion && errors.denominacion?.message}
                  />
                )}
                name="denominacion"
                control={control}
              />
            </div>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Año"
                    // value={field.value}
                    // onChange={(e) => {
                    //   field.onChange(e.target.value);
                    //   onChangeYear(e.target.value);
                    // }}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      onChangeYear(e.target.value);
                    }}
                    type="number"
                    disabled={editar}
                    error={!!errors.anio}
                    helperText={errors.anio && errors.anio?.message}
                  />
                )}
                name="anio"
                control={control}
              />
            </div>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Numero de Ciclo"
                    type="number"
                    error={!!errors.numeroCiclo}
                    helperText={errors.numeroCiclo && errors.numeroCiclo?.message}
                  />
                )}
                name="numeroCiclo"
                control={control}
              />
            </div>
            <Typography className="mt-10 mb-16" variant="body1" color="inherit">
              DURACION DEL CICLO
            </Typography>
            <div className="md:flex">
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:flex-auto md:mx-5"
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha Inicio Ciclo"
                    type="date"
                    error={!!errors.inicioCiclo}
                    helperText={errors.inicioCiclo && errors.inicioCiclo?.message}
                  />
                )}
                name="inicioCiclo"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:flex-auto md:mx-5"
                    type="date"
                    {...field}
                    label="Fecha Fin Ciclo"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    error={!!errors.finCiclo}
                    helperText={errors.finCiclo && errors.finCiclo?.message}
                  />
                )}
                name="finCiclo"
                control={control}
              />
            </div>
            <Typography className="mb-16" variant="body1" color="inherit">
              DURACION DE LA PRE INSCRIPCION
            </Typography>
            <div className="md:flex">
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:flex-auto md:mx-5"
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha Inicio PreInscripcion"
                    type="date"
                    error={!!errors.inicioPreInscripcion}
                    helperText={errors.inicioPreInscripcion && errors.inicioPreInscripcion?.message}
                  />
                )}
                name="inicioPreInscripcion"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:flex-auto md:mx-5"
                    type="date"
                    {...field}
                    label="Fecha Fin PreInscripcion"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    error={!!errors.finPreInscripcion}
                    helperText={errors.finPreInscripcion && errors.finPreInscripcion?.message}
                  />
                )}
                name="finPreInscripcion"
                control={control}
              />
            </div>
            <Typography className="mb-16" variant="body1" color="inherit">
              DURACION DE LA INSCRIPCION
            </Typography>
            <div className="md:flex">
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:flex-auto md:mx-5"
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha Inicio Inscripcion"
                    type="date"
                    error={!!errors.inicioInscripcion}
                    helperText={errors.inicioInscripcion && errors.inicioInscripcion?.message}
                  />
                )}
                name="inicioInscripcion"
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    className="mb-12 md:flex-auto md:mx-5"
                    type="date"
                    {...field}
                    label="Fecha Fin Inscripcion"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    error={!!errors.finInscripcion}
                    helperText={errors.finInscripcion && errors.finInscripcion?.message}
                  />
                )}
                name="finInscripcion"
                control={control}
              />
            </div>
            <div className="m-10">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label="Unidad Organizativa"
                    error={!!errors.orgUnitPath}
                    helperText={errors.orgUnitPath && errors.orgUnitPath?.message}
                  />
                )}
                name="orgUnitPath"
                control={control}
              />
            </div>
            {!editar && (
              <>
                <Typography className="my-16" variant="body1" color="inherit">
                  TURNOS:
                </Typography>
                <div className="grid grid-cols-3">
                  <div className="flex">
                    <Controller
                      name="turnoManiana"
                      type="checkbox"
                      control={control}
                      defaultValue={false}
                      // defaultValue={value.estudiante.id_aula !== null}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                    <Typography className="flex pt-10">Turno mañana</Typography>
                  </div>
                  <div className="flex">
                    <Controller
                      name="turnoTarde"
                      type="checkbox"
                      control={control}
                      defaultValue={false}
                      // defaultValue={value.estudiante.id_aula !== null}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                    <Typography className="flex pt-10">Turno tarde</Typography>
                  </div>
                  <div className="flex">
                    <Controller
                      name="turnoNoche"
                      type="checkbox"
                      control={control}
                      defaultValue={false}
                      // defaultValue={value.estudiante.id_aula !== null}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                    <Typography className="flex pt-10">Turno noche</Typography>
                  </div>
                </div>
              </>
            )}
            <Typography className="my-16" variant="body1" color="inherit">
              IMAGEN DE PORTADA
            </Typography>
            <div id="upload-box">
              <input type="file" onChange={(e) => setImagenPortadaCiclo(e.target.files[0])} />
            </div>
            {editar && (
              <>
                {data.portada_ciclo !== null && (
                  <Tooltip title="Ver imagen de portada">
                    <IconButton
                      onClick={() => window.open(`${data.portada_ciclo}`)}
                      color="secondary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Typography className="my-16" variant="body1" color="inherit">
                  REQUISITOS DEL CICLO ASIGNADOS:
                </Typography>
                {dataRequisitos.asignados.map((value, index) => (
                  <div key={index} className="flex">
                    <Controller
                      name={`${value.requisito.id}`}
                      type="checkbox"
                      control={control}
                      defaultValue
                      // defaultValue={value.estudiante.id_aula !== null}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                    <Typography className="flex pt-10">
                      {value.requisito.nombre_documento}
                    </Typography>
                  </div>
                ))}
                <Typography className="my-16" variant="body1" color="inherit">
                  REQUISITOS DEL CICLO NO ASIGNADOS:
                </Typography>
                {dataRequisitos.no_asignados.map((value, index) => (
                  <div key={index} className="flex">
                    <Controller
                      name={`${value.requisito.id}`}
                      type="checkbox"
                      control={control}
                      defaultValue={false}
                      // defaultValue={value.estudiante.id_aula !== null}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                        />
                      )}
                    />
                    <Typography className="flex pt-10">
                      {value.requisito.nombre_documento}
                    </Typography>
                  </div>
                ))}
              </>
            )}

            <Typography className="my-16" variant="body1" color="inherit">
              DESCRIPCION CICLO:
            </Typography>
            {editar && <PopperDescripcion descripcion={data?.requisitos} />}
            <Controller
              className="mt-8 mb-16"
              render={({ field }) => <WYSIWYGEditor {...field} />}
              name="descripcion"
              control={control}
            />

            <Button className="my-12" variant="contained" color="primary" type="submit">
              {editar ? 'Actualizar' : 'Guardar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCiclo;
