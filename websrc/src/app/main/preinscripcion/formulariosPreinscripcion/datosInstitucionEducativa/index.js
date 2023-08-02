import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RutaGeneral from 'app/shared-components/rutaGeneral';

const schema = yup.object().shape({
  departamentoUbigeo: yup.string().required('Campo Requerido'),
  provinciaUbigeo: yup.string().required('Campo Requerido'),
  distritoUbigeo: yup.string().required('Campo Requerido'),
  tipoInstitucion: yup.string().required('Campo Requerido'),
  institucionEducativa: yup.string().required('Campo Requerido'),
  anioEgreso: yup
    .string()
    .required('Campo Requerido')
    .matches(/^([0-9])*$/, 'Solo numeros '),
});

const FormularioDatosInstitucionEducativa = (props) => {
  const { detalleColegios, datosDepartamentos, datosGeneralesPreInscripcion } = props;
  const [idioma, setIdioma] = React.useState(1);
  const [sexo, setSexo] = React.useState(1);
  const { colegio, setColegio } = React.useState();
  const { tipoColegio, setTipoColegio } = React.useState();
  const [provincia, setProvincia] = React.useState([]);
  const [distrito, setDistrito] = React.useState([]);
  const [codigoDistrito, setCodigoDistrito] = React.useState();
  const [provinciaColegio, setprovinciaColegio] = useState('');
  const [distritoColegio, setdistritoColegio] = useState('');
  const [estadoData, setEstadoData] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      departamentoUbigeo: '',
      provinciaUbigeo: '',
      distritoUbigeo: '',
      tipoInstitucion: '',
      institucionEducativa: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    // console.log('DAta', datosGeneralesPreInscripcion);
    if (
      datosGeneralesPreInscripcion.preinscripcion_data.progreso_preinscripcion > 1 &&
      datosGeneralesPreInscripcion.colegio_datos.id_ubigeo_colegio !== null &&
      datosGeneralesPreInscripcion.preinscripcion_data.id_colegio !== null
    ) {
      console.log('Entreee');
      const { id_ubigeo_colegio: idUbigeColegio = '000000', tipo_colegio: tipoColegioData = '' } =
        datosGeneralesPreInscripcion.colegio_datos || {};
      const { id_colegio: idColegio = '0', anio_egreso: anioEgreso = '0' } =
        datosGeneralesPreInscripcion.preinscripcion_data || {};
      axios
        .get(
          `${RutaGeneral}/ubigeoProv/${idUbigeColegio[0]}${idUbigeColegio[1]}0000`
        )
        .then((res) => setProvincia(res.data));
      axios
        .get(
          `${RutaGeneral}/ubigeoDist/${idUbigeColegio[0]}${idUbigeColegio[1]}${idUbigeColegio[2]}${idUbigeColegio[3]}00}`
        )
        .then((res) => setDistrito(res.data));
      props.cargarColegios(idUbigeColegio, tipoColegioData);
      reset({
        departamentoUbigeo: `${idUbigeColegio[0]}${idUbigeColegio[1]}0000`,
        provinciaUbigeo: `${idUbigeColegio[0]}${idUbigeColegio[1]}${idUbigeColegio[2]}${idUbigeColegio[3]}00`,
        distritoUbigeo: idUbigeColegio,
        tipoInstitucion: tipoColegioData,
        institucionEducativa: idColegio,
        anioEgreso,
      });

      setEstadoData(true);
    }
  }, [datosGeneralesPreInscripcion]);
  const handleChangeDepartamento = (event) => {
    axios
      .get(
        `${RutaGeneral}/ubigeoProv/${event.target.value}`
        // , {
        //   departamento: event.target.value,
        // }
      )
      .then((resp) => setProvincia(resp.data));
  };
  const handleChangeProvincia = (event) => {
    axios
      .get(
        `${RutaGeneral}/ubigeoDist/${event.target.value}`
        // , { provincia: event.target.value }
      )
      .then((resp) => setDistrito(resp.data));
  };
  const handleChangeTipoColegio = (event) => {
    props.setTipoColegioGlobal(event.target.value);
    props.cargarColegios(codigoDistrito, event.target.value);
  };
  const handleChangeDistrito = (event) => {
    setCodigoDistrito(event.target.value);
  };
  const onSubmit = (data) => {
    axios
      .patch(
        `${RutaGeneral}/update-preinscripcion/${datosGeneralesPreInscripcion.preinscripcion_data.id}`,
        {
          id_colegio: data.institucionEducativa,
          anio_egreso: data.anioEgreso,
          progreso_preinscripcion: 3,
        }
      )
      .then((res) => {
        props.setDatosGeneralesPreInscripcion(res.data);
        props.handleNext();
      })
      .catch((err) => alert(err));
  };

  const tiposColegio = [
    {
      value: 'PU',
      label: 'PUBLICO',
    },
    {
      value: 'PR',
      label: 'PRIVADO',
    },
  ];
  return (
    <>
      <h1 className="m-3">
        <b>DATOS DE INSTITUCION EDUCATIVA</b>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" text-left">Ubigeo</div>
        <div className="grid md:grid-cols-3">
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="departamentoUbigeo"
                  select
                  label="Departamento"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeDepartamento(e);
                  }}
                  error={!!errors.departamentoUbigeo}
                  helperText={errors.departamentoUbigeo && errors.departamentoUbigeo.message}
                >
                  {datosDepartamentos.map((option, index) => (
                    <MenuItem key={index} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="departamentoUbigeo"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="provinciaUbigeo"
                  select
                  label="Provincia"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeProvincia(e);
                  }}
                  error={!!errors.provinciaUbigeo}
                  helperText={errors.provinciaUbigeo && errors.provinciaUbigeo?.message}
                >
                  {provincia.map((option, index) => (
                    <MenuItem key={index} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="provinciaUbigeo"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="distritoUbigeo"
                  select
                  label="Distrito"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeDistrito(e);
                    reset({ ...getValues(), tipoInstitucion: '', institucionEducativa: '' });
                  }}
                  error={!!errors.distritoUbigeo}
                  helperText={errors.distritoUbigeo && errors.distritoUbigeo?.message}
                >
                  {distrito.map((option, index) => (
                    <MenuItem key={index} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="distritoUbigeo"
            />
          </div>
        </div>
        <div className=" text-left">Detalles Colegio</div>
        <div className="grid md:grid-cols-3">
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  id="tipoInstitucion"
                  select
                  fullWidth
                  label="Tipo de Institucion"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeTipoColegio(e);
                  }}
                  error={!!errors.tipoInstitucion}
                  helperText={errors.tipoInstitucion && errors.tipoInstitucion?.message}
                >
                  {tiposColegio.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="tipoInstitucion"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  id="institucionEducativa"
                  select
                  fullWidth
                  label="Institucion Educativa"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.institucionEducativa}
                  helperText={errors.institucionEducativa && errors.institucionEducativa?.message}
                >
                  {detalleColegios.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                      {option.nombre_colegio}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="institucionEducativa"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  // type="number"
                  {...field}
                  fullWidth
                  label="Año de Egreso"
                  error={!!errors.anioEgreso}
                  helperText={errors.anioEgreso && errors.anioEgreso?.message}
                />
              )}
              control={control}
              name="anioEgreso"
            />
          </div>
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            // disabled
            // ={props.activeStep === 0}
            onClick={props.handleBack}
            sx={{ mr: 1 }}
            variant="contained"
            color="secondary"
          >
            Atras
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button type="submit" variant="contained" color="secondary">
            Siguiente
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FormularioDatosInstitucionEducativa;
