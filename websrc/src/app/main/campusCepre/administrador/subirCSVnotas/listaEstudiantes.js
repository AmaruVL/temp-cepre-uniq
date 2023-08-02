import Button from '@mui/material/Button';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MenuItem, TextField, Typography } from '@mui/material';
import useMessages from 'app/hooks/useMessages';
import CircularProgress from '@mui/material/CircularProgress';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';

const FormSubirCSV = (props) => {
  // const { editar, data } = props;
  const { dataCiclos, loading } = props;
  const [dataExamenes, setDataExamenes] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [openDialog, setOpenDialog] = useState(true);
  const [grupoAcademico, setGrupoAcademico] = useState([]);
  const [aula, setAula] = useState([]);
  const [dataCargada, setDataCargada] = useState(false);
  const { dataEstudiantes } = props;
  const [documentoCSV, setDocumentoCSV] = useState(null);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  // console.log('Aula', detallesAula);
  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ciclos: '',
      numeroExamen: '',
    },
    // resolver: yupResolver(schema),
  });
  // useEffect(() => {
  //   axios.get(`${RutaGeneral}/ciclos-activo`).then((resp) => {
  //     setDataCiclo(resp.data);
  //     setDataLoad(true);
  //   });
  // }, [dataLoad]);

  function onSubmitEstudiantes(dataForm) {
    // let entriesData = [];
    console.log('DATAFORM', dataForm);
    const formData = new FormData();
    formData.append('notas_examen', documentoCSV);
    const cicloActivo = dataCiclos.find((value) => value.id === dataForm.ciclos);
    // console.log('Examen', cicloActivo);
    // window.open(
    //   `${RutaGeneral}/administrador/exportar-datos/${dataForm.ciclos}/${dataForm.fechaInicio}/${dataForm.fechaFin}`
    // );
    axios
      .post(
        `${RutaGeneral}/examen/parcial/subir-notas/${cicloActivo.anio}/${cicloActivo.nro_ciclo_de_anio}/${dataForm.numeroExamen}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((resp) => {
        showSuccess('Subido correcatamente');
        props.setRespConsulta(resp.data);
        if (resp.data.estado_correcto === false) {
          const Alumnos = Object.entries(resp.data.data);
          props.setDataEstudiantesError(Alumnos);
        }
      })
      .catch((err) => {
        showError(`${err.response.data.message}`);
      });
    // entriesData = Object.entries(dataForm);
    // console.log('Entries', entriesData);
    // await axios
    //   .patch(`${RutaGeneral}/asignar-estudiantes/${idAula}`, {
    //     estudiantes: entriesData,
    //   })
    //   .then(async (resp) => {
    //     showSuccess('Actualizado correctamente');
    //   })
    //   .catch((err) => showError('No se pudo actualizar'));
  }
  function changeDataExamenes(ciclo) {
    axios
      .get(`${RutaGeneral}/examen/parcial/consulta-examen-ciclo/${ciclo}`)
      .then((resp) => setDataExamenes(resp.data));
  }
  return (
    // <Card>
    //   <CardContent>
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmitEstudiantes)}>
            <div className="p-10">
              <Controller
                name="ciclos"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    select
                    label="Ciclos"
                    id="ciclos"
                    error={!!errors.ciclos}
                    helperText={errors.ciclos && errors.ciclos?.message}
                    variant="outlined"
                    fullWidth
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      changeDataExamenes(e.target.value);
                    }}
                  >
                    {dataCiclos.map((value, index) => (
                      <MenuItem key={index} value={value.id}>
                        {value.denominacion.split('-')[0]}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>
            <div className="p-10">
              <Controller
                name="numeroExamen"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...field}
                    select
                    label="Examenes"
                    variant="outlined"
                    fullWidth
                  >
                    {dataExamenes.map((value, index) => (
                      <MenuItem key={index} value={value.id_examen.nro_examen}>
                        {value.id_examen.denominacion_examen}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>
            <Typography className="my-16" variant="body1" color="inherit">
              DOCUMENTO CSV:
            </Typography>
            <div id="upload-box">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setDocumentoCSV(e.target.files[0])}
              />
            </div>
            <Button className="my-12" variant="contained" color="primary" type="submit">
              Subir
            </Button>
          </form>
        </div>
      )}
    </>
    //   </CardContent>
    // </Card>
  );
};
export default FormSubirCSV;
