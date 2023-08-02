import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import RutaGeneral from 'app/shared-components/rutaGeneral';

const schema = yup.object().shape({
  departamentoNacimiento: yup.string().required('Campo Requerido'),
  provinciaNacimiento: yup.string().required('Campo Requerido'),
  distritoNacimiento: yup.string().required('Campo Requerido'),
  departamentoProcedencia: yup.string().required('Campo Requerido'),
  provinciaProcedencia: yup.string().required('Campo Requerido'),
  distritoProcedencia: yup.string().required('Campo Requerido'),
  direccion: yup.string().required('Campo Requerido'),
});

const FormularioDatosSecundarios = (props) => {
  const [estadoData, setEstadoData] = useState(false);
  const {
    datosGeneralesPreInscripcion,
    datosDepartamentos: departamentos,
    provinciaNacimiento,
    distritoNacimiento,
    provinciaActual,
    distritoActual,
  } = props;
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
  } = useForm({
    defaultValues: {
      departamentoNacimiento: '',
      provinciaNacimiento: '',
      distritoNacimiento: '',
      departamentoProcedencia: '',
      provinciaProcedencia: '',
      distritoProcedencia: '',
      direccion: '',
      esExtranjero: false,
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (
      datosGeneralesPreInscripcion.preinscripcion_data.progreso_preinscripcion >= 1 &&
      datosGeneralesPreInscripcion.persona_data.lugar_nacimiento !== null &&
      datosGeneralesPreInscripcion.preinscripcion_data.id_ubigeo !== null
    ) {
      const { lugar_nacimiento: lugarNacimiento = '000000' } =
        datosGeneralesPreInscripcion.persona_data || {};
      const {
        id_ubigeo: idUbigeo = '000000',
        direccion: direccionData = '',
        es_extranjero: esExtranjeroData = false,
      } = datosGeneralesPreInscripcion.preinscripcion_data || {};
      axios
        .get(
          `${RutaGeneral}/ubigeoProv/${lugarNacimiento[0]}${lugarNacimiento[1]}0000`
          // ,
          // {
          //   departamento: `${lugarNacimiento[0]}${lugarNacimiento[1]}0000`,
          // }
        )
        .then((res) => props.setProvinciaNacimiento(res.data));
      axios
        .get(
          `${RutaGeneral}/ubigeoDist/${lugarNacimiento[0]}${lugarNacimiento[1]}${lugarNacimiento[2]}${lugarNacimiento[3]}00}`
          // ,
          // {
          //   // provincia: `${lugarNacimiento[0]}${lugarNacimiento[1]}${lugarNacimiento[2]}${lugarNacimiento[3]}00`,
          // }
        )
        .then((res) => props.setDistritoNacimiento(res.data));
      axios
        .get(
          `${RutaGeneral}/ubigeoProv/${idUbigeo[0]}${idUbigeo[1]}0000`
          // , {
          //   departamento: `${idUbigeo[0]}${idUbigeo[1]}0000`,
        )
        .then((res) => props.setProvinciaActual(res.data));
      axios
        .get(
          `${RutaGeneral}/ubigeoDist/${idUbigeo[0]}${idUbigeo[1]}${idUbigeo[2]}${idUbigeo[3]}00`
          // , {
          //   provincia: `${idUbigeo[0]}${idUbigeo[1]}${idUbigeo[2]}${idUbigeo[3]}00`,
          // }
        )
        .then((res) => props.setDistritoActual(res.data));
      reset({
        departamentoNacimiento: `${lugarNacimiento[0]}${lugarNacimiento[1]}0000`,
        provinciaNacimiento: `${lugarNacimiento[0]}${lugarNacimiento[1]}${lugarNacimiento[2]}${lugarNacimiento[3]}00`,
        distritoNacimiento: lugarNacimiento,
        departamentoProcedencia: `${idUbigeo[0]}${idUbigeo[1]}0000`,
        provinciaProcedencia: `${idUbigeo[0]}${idUbigeo[1]}${idUbigeo[2]}${idUbigeo[3]}00`,
        distritoProcedencia: idUbigeo,
        direccion: direccionData,
        esExtranjero: esExtranjeroData,
      });
      setEstadoData(true);
    }
  }, [estadoData]);
  const handleChangeDepartamentoNacimiento = (event) => {
    axios
      .get(`${RutaGeneral}/ubigeoProv/${event.target.value}`) // , { departamento: event.target.value })
      .then((res) => props.setProvinciaNacimiento(res.data));
  };
  const handleChangeProvinciaNacimiento = (event) => {
    axios
      .get(`${RutaGeneral}/ubigeoDist/${event.target.value}`)
      .then((res) => props.setDistritoNacimiento(res.data));
  };
  const handleChangeDepartamentoActual = (event) => {
    axios
      .get(
        `${RutaGeneral}/ubigeoProv/${event.target.value}`
        // , {
        //   departamento: event.target.value,
        // }
      )
      .then((res) => props.setProvinciaActual(res.data));
  };
  const handleChangeProvinciaActual = (event) => {
    axios
      .get(
        `${RutaGeneral}/ubigeoDist/${event.target.value}`
        // , {
        //   provincia: event.target.value,
        // }
      )
      .then((res) => props.setDistritoActual(res.data));
  };
  const idiomas = [
    {
      value: 1,
      label: 'Español',
    },
    {
      value: 2,
      label: 'Ingles',
    },
    {
      value: 3,
      label: 'Asháninca',
    },
  ];
  const sexos = [
    {
      value: 1,
      label: 'Masculino',
    },
    {
      value: 2,
      label: 'Femenino',
    },
    {
      value: 3,
      label: 'Otros',
    },
  ];
  const onSubmit = (data) => {
    axios
      .patch(
        `${RutaGeneral}/update-preinscripcion/${datosGeneralesPreInscripcion.preinscripcion_data.id}`,
        {
          id_ubigeo: data.distritoProcedencia,
          lugar_nacimiento: data.distritoNacimiento,
          progreso_preinscripcion: 2,
          direccion: data.direccion,
          es_extranjero: data.esExtranjero,
        }
      )
      .then((res) => {
        // console.log('RESSSDATA', res.data);
        props.setDatosGeneralesPreInscripcion(res.data);
        props.handleNext();
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <h1>
        <b>Datos Secundarios</b>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="flex">
          <Controller
            name="esExtranjero"
            label="esExtranjero"
            type="checkbox"
            control={control}
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
          <Typography className="flex m-10">Es extranjero(a)</Typography>
        </div> */}
        <div className="text-left">Lugar de Nacimiento</div>
        <div className="grid md:grid-cols-3">
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  id="departamentoNacimiento"
                  select
                  fullWidth
                  label="Departamento"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeDepartamentoNacimiento(e);
                  }} // field.onChange && handleChangeDepartamentoNacimiento}
                  error={!!errors.departamentoNacimiento}
                  helperText={
                    errors.departamentoNacimiento && errors.departamentoNacimiento?.message
                  }
                >
                  {departamentos.map((option, index) => (
                    <MenuItem key={index} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="departamentoNacimiento"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  id="provinciaNacimiento"
                  select
                  fullWidth
                  label="Provincia"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeProvinciaNacimiento(e);
                  }}
                  error={!!errors.provinciaNacimiento}
                  helperText={errors.provinciaNacimiento && errors.provinciaNacimiento?.message}
                >
                  {provinciaNacimiento.map((option, index) => (
                    <MenuItem key={index} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="provinciaNacimiento"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  id="distritoNacimiento"
                  select
                  fullWidth
                  label="Distrito"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.distritoNacimiento}
                  helperText={errors.distritoNacimiento && errors.distritoNacimiento?.message}
                >
                  {distritoNacimiento.map((option, index) => (
                    <MenuItem key={index} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="distritoNacimiento"
            />
          </div>
        </div>
        <div className="text-left">Lugar de Residencia (Actual)</div>
        <div className="grid md:grid-cols-3">
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  id="departamentoProcedencia"
                  select
                  fullWidth
                  label="Departamento"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeDepartamentoActual(e);
                  }}
                  error={!!errors.departamentoProcedencia}
                  helperText={
                    errors.departamentoProcedencia && errors.departamentoProcedencia?.message
                  }
                >
                  {departamentos.map((option, index) => (
                    <MenuItem key={index} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="departamentoProcedencia"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  id="provinciaProcedencia"
                  select
                  fullWidth
                  label="Provincia"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeProvinciaActual(e);
                  }}
                  error={!!errors.provinciaProcedencia}
                  helperText={errors.provinciaProcedencia && errors.provinciaProcedencia?.message}
                >
                  {provinciaActual.map((option) => (
                    <MenuItem key={option.value} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="provinciaProcedencia"
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  id="distritoProcedencia"
                  select
                  fullWidth
                  label="Distrito"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.distritoProcedencia}
                  helperText={errors.distritoProcedencia && errors.distritoProcedencia?.message}
                >
                  {distritoActual.map((option) => (
                    <MenuItem key={option.value} value={option.codigo_ubigeo}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              control={control}
              name="distritoProcedencia"
            />
          </div>
        </div>
        <div className="text-left">Direccion Actual</div>

        <div className="m-10">
          <TextField
            fullWidth
            name="direccion"
            id="direccion"
            label="Direccion"
            error={!!errors.direccion}
            helperText={errors.direccion && errors.direccion?.message}
            {...register('direccion', { required: true })}
          />
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            // disabled //= {props.activeStep === 0}
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

export default FormularioDatosSecundarios;
