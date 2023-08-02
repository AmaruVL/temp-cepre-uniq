import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, MenuItem, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import calcularEdad from '../../../../shared-components/calcularEdad';
import AlertComponent from '../../../../shared-components/alert';

const schema = yup.object().shape({
  dni: yup.string().required('Campo Requerido'),
  nombres: yup
    .string()
    .required('Campo Requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
      'Solo letras '
    ),
  // nombresApoderado: yup.string().matches(/^[aA-zZ\s]+$/, 'Solo letras '),
  apellidoPaterno: yup
    .string()
    .required('Campo Requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
      'Solo letras'
    ),
  apellidoMaterno: yup
    .string()
    .required('Campo Requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
      'solo letras '
    ),
  fechaNacimiento: yup.string().required('Campo Requerido'),
  edad: yup.string().required('Campo Requerido'),
  sexo: yup.string().required('Campo Requerido'),
  email: yup.string().required('Campo Requerido').email('Ingresar formato correcto de email'),
  idioma: yup.string().required('Campo Requerido'),
  telefono: yup
    .string()
    .required('Campo Requerido')
    .matches(/^[0-9]+$/, 'Solo numeros')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  // telefonoApoderado: yup
  //   .string()
  //   .matches(/^[0-9]+$/, 'Solo numeros')
  //   .min(9, 'Must be exactly 9 digits')
  //   .max(9, 'Must be exactly 9 digits'),
});

const FormularioDatosGenerales = (props) => {
  const { ciclo } = props;
  const [edadEstado, setEdad] = useState(0);

  const [estadoData, setEstadoData] = useState(false);
  const [estadoDiscapacidad, setEstadoDiscapacidad] = useState(false);
  const { editar, dataPersona, alertValidacionDNI, datosGeneralesPreInscripcion, detalleCiclo } =
    props;
  const [idioma, setIdioma] = useState('ES');
  const [sexo, setSexo] = useState('M');
  const { dni_persona: idPersona = '' } = datosGeneralesPreInscripcion.preinscripcion_data || {};
  const cambiarEdad = (value) => {
    const fechaNacimientoData = value.target.value.split('-');
    const diaNacimiento = fechaNacimientoData[2];
    const mesNacimiento = fechaNacimientoData[1];
    const anioNacimiento = fechaNacimientoData[0];
    const edadActual = calcularEdad(diaNacimiento, mesNacimiento, anioNacimiento);
    setEdad(edadActual);
  };
  const cambiarEdad2 = (value) => {
    const fechaNacimientoData = value.split('-');
    const diaNacimiento = fechaNacimientoData[2];
    const mesNacimiento = fechaNacimientoData[1];
    const anioNacimiento = fechaNacimientoData[0];
    const edadActual = calcularEdad(diaNacimiento, mesNacimiento, anioNacimiento);
    setEdad(edadActual);
    return edadActual;
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      dni: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaNacimiento: '',
      edad: edadEstado,
      sexo: '',
      email: '',
      idioma: '',
      telefono: '',
      telefonoApoderado: '',
      nombresApoderado: '',
      condicionDiscapacidad: false,
      detalleDiscapacidad: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (datosGeneralesPreInscripcion.exists_preinscripcion) props.setEditar(true);
    const {
      dni: dniProp = '',
      nombres: nombresProp = '',
      apellido_materno: apellidoMaternoProp = '',
      apellido_paterno: apellidoPaternoProp = '',
      fecha_nacimiento: fechaNacimientoProp = '0001-01-01',
      sexo: sexoProp = '',
    } = datosGeneralesPreInscripcion.persona_data || {};
    const {
      idioma: idiomaProp = '',
      email_respaldo: emailProp = '',
      telefono_personal: telefonoProp = '',
      nombres_apoderado: nombresApoderadoData = '',
      telefono_apoderado: telefonoApoderadoData = '',
      condicion_discapacidad: condicionDiscapacidadData = false,
      detalle_discapacidad: detalleDiscapacidadData = '',
    } = datosGeneralesPreInscripcion.preinscripcion_data || {};

    setEstadoDiscapacidad(condicionDiscapacidadData);
    reset({
      dni: dniProp,
      nombres: nombresProp,
      apellidoPaterno: apellidoPaternoProp,
      apellidoMaterno: apellidoMaternoProp,
      fechaNacimiento: fechaNacimientoProp,
      edad: cambiarEdad2(fechaNacimientoProp).toString(),
      sexo: sexoProp,
      email: emailProp,
      idioma: idiomaProp,
      telefono: telefonoProp,
      telefonoApoderado: telefonoApoderadoData,
      nombresApoderado: nombresApoderadoData,
      condicionDiscapacidad: condicionDiscapacidadData,
      detalleDiscapacidad: detalleDiscapacidadData,
    });
    setEstadoData(true);
  }, [datosGeneralesPreInscripcion]);

  const handleChangeSexo = (event) => {
    setSexo(event.target.value);
  };
  const handleChangeIdioma = (event) => {
    setIdioma(event.target.value);
  };
  const idiomas = [
    {value:1, label:"Achuar"},
    {value:2,	label:"Aimara"},
    {value:3,	label:"Amahuaca"},
    {value:4, label:"Arabela"},
    {value:5, label:	"Ashanika"},
    {value:6, label:	"Asheninka"},
    {value:7, label:	"Awajún"},
    {value:8, label:	"Bora"},
    {value:9, label:	"Cashinahua"},
    {value:10, label:	"Chamicuro"},
    {value:11, label:	"Ese eja"},
    {value:12, label:	"Español"},
    {value:13, label:	"Harakbut"},
    {value:14, label:	"Ikitu"},
    {value:15, label:	"Iñapari"},
    {value:16, label:	"Iskonawa"},
    {value:17, label:	"Jaqaru"},
    {value:18, label:	"Kakataibo"},
    {value:19, label:"Kakinte"},
    {value:20, label:	"Kandozi-chapra"},
    {value:21, label:	"Kapanawa"},
    {value:22, label:	"Kawki"},
    {value:23, label:	"Kukama kukamiria"},
    {value:24, label:	"Madija"},
    {value:25, label:	"Maijiki"},
    {value:26, label:	"Matsés"},
    {value:27, label:	"Matsigenka"},
    {value:28, label:	"Muniche"},
    {value:29, label:	"Murui-muinani"},
    {value:30, label:	"Nahua"},
    {value:31, label:	"Nanti"},
    {value:32, label:	"Nomatsigenga"},
    {value:33, label:	"Ocaina"},
    {value:34, label:	"Omagua"},
    {value:35, label:	"Quechua"},
    {value:36, label:	"Resígaro"},
    {value:37, label:	"Secoya"},
    {value:38, label:	"Sharanahua"},
    {value:39, label:	"Shawi"},
    {value:40, label:	"Shipibo-konibo"},
    {value:41, label:	"Shiwilu"},
    {value:42, label:	"Taushiro"},
    {value:43, label:	"Ticuna"},
    {value:44, label:	"Urarina"},
    {value:45, label:	"Wampis"},
    {value:46, label:	"Yagua"},
    {value:47, label:	"Yaminahua"},
    {value:48, label:"Yanesha"},
    {value:49, label:"Yine"},
  ];
  const sexos = [
    {
      value: 'M',
      label: 'Masculino',
    },
    {
      value: 'F',
      label: 'Femenino',
    },
  ];
  const onSubmit = (data) => {
    if (!editar) {
      axios
        .post(`${RutaGeneral}/inicio-preinscripcion`, {
          dni: data.dni,
          nombres: data.nombres,
          apellido_paterno: data.apellidoPaterno,
          apellido_materno: data.apellidoMaterno,
          fecha_nacimiento: data.fechaNacimiento,
          idioma: data.idioma,
          sexo: data.sexo,
          progreso_preinscripcion: 1,
          telefono_personal: data.telefono,
          email_respaldo: data.email,
          esta_enviado: false,
          id_ciclo: ciclo,
          telefono_apoderado: data.telefonoApoderado,
          nombres_apoderado: data.nombresApoderado,
          condicion_discapacidad: data.condicionDiscapacidad,
          detalle_discapacidad: data.detalleDiscapacidad,
        })
        .then((resp) => {
          props.setDatosGeneralesPreInscripcion(resp.data);
          props.handleNext();
        })
        .catch((err) => alert('error'));
    } else {
      // props.handleNext();
      axios
        .patch(
          `${RutaGeneral}/update-preinscripcion/${datosGeneralesPreInscripcion.preinscripcion_data.id}`,
          {
            dni: data.dni,
            nombres: data.nombres,
            apellido_paterno: data.apellidoPaterno,
            apellido_materno: data.apellidoMaterno,
            fecha_nacimiento: data.fechaNacimiento,
            idioma: data.idioma,
            sexo: data.sexo,
            progreso_preinscripcion: 1,
            telefono_personal: data.telefono,
            email_respaldo: data.email,
            esta_enviado: false,
            id_ciclo: ciclo,
            telefono_apoderado: data.telefonoApoderado,
            nombres_apoderado: data.nombresApoderado,
            condicion_discapacidad: data.condicionDiscapacidad,
            detalle_discapacidad: data.detalleDiscapacidad,
          }
        )
        .then((res) => {
          // console.log('RESSSDATA', res.data);
          props.setDatosGeneralesPreInscripcion(res.data);
          props.handleNext();
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <>
      <h1 className="m-3">
        <b>Datos Generales</b>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-3">
          <div className="m-10">
            <TextField
              fullWidth
              label="DNI"
              name="dni"
              disabled
              id="dni"
              error={!!errors.dni}
              helperText={errors.dni && errors.dni?.message}
              {...register('dni', {
                required: true,
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="m-10">
            <TextField
              fullWidth
              id="nombres"
              label="Nombres"
              error={!!errors.nombres}
              helperText={errors.nombres && errors.nombres?.message}
              {...register('nombres', { required: true })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="m-10">
            <TextField
              fullWidth
              id="apellidoPaterno"
              label="Apellido Paterno"
              error={!!errors.apellidoPaterno}
              helperText={errors.apellidoPaterno && errors.apellidoPaterno?.message}
              {...register('apellidoPaterno', { required: true })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="m-10">
            <TextField
              fullWidth
              id="apellidoMaterno"
              label="Apellido Materno"
              error={!!errors.apellidoMaterno}
              helperText={errors.apellidoMaterno && errors.apellidoMaterno?.message}
              {...register('apellidoMaterno', { required: true })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="m-10">
            <TextField
              fullWidth
              label="Fecha Nacimiento"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.fechaNacimiento}
              helperText={errors.fechaNacimiento && errors.fechaNacimiento?.message}
              {...register('fechaNacimiento')}
              onChange={cambiarEdad}
            />
          </div>
          <div className="m-10">
            <TextField
              fullWidth
              id="edad"
              label="Edad"
              error={!!errors.edad}
              helperText={errors.edad && errors.edad?.message}
              value={edadEstado}
              type="number"
              disabled
              {...register('edad')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="sexo"
                  select
                  variant="outlined"
                  label="Sexo"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.sexo}
                  helperText={errors.sexo && errors.sexo.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {sexos.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="sexo"
              control={control}
            />
          </div>
          <div className="m-10">
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  id="idioma"
                  label="Idioma"
                  variant="outlined"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.idioma}
                  helperText={errors.idioma && errors.idioma.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {idiomas.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="idioma"
              control={control}
            />
          </div>
          <div className="m-10">
            <TextField
              name="telefono"
              fullWidth
              id="telefono"
              label="Telefono"
              error={!!errors.telefono}
              helperText={errors.telefono && errors.telefono?.message}
              {...register('telefono')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div className="m-10">
          <TextField
            name="email"
            id="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email && errors.email?.message}
            label="Correo Electronico"
            {...register('email')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="grid md:grid-cols-2">
          <div className="flex">
            <Controller
              name="condicionDiscapacidad"
              label="Condición de Discapacidad"
              type="checkbox"
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    setEstadoDiscapacidad(e.target.checked);
                    reset({ ...getValues(), detalleDiscapacidad: '' });
                  }}
                />
              )}
            />
            <Typography className="flex m-10">Discapacidad</Typography>
          </div>
          <div className="m-10 flex-auto">
            <TextField
              fullWidth
              disabled={!estadoDiscapacidad}
              name="detalleDiscapacidad"
              id="detalleDiscapacidad"
              label="Detalle de Discapacidad"
              // error={!!errors.telefonoApoderado}
              // helperText={errors.telefonoApoderado && errors.telefonoApoderado?.message}
              {...register('detalleDiscapacidad')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <h1 className="m-3">
          <b>Datos Apoderado</b>
        </h1>
        <div className="grid md:grid-cols-2">
          <div className="m-10">
            <TextField
              fullWidth
              name="nombresApoderado"
              id="nombresApoderado"
              label="Nombre Apoderado"
              error={!!errors.nombresApoderado}
              helperText={errors.nombresApoderado && errors.nombresApoderado?.message}
              {...register('nombresApoderado')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="m-10">
            <TextField
              fullWidth
              name="telefonoApoderado"
              id="telefonoApoderado"
              label="Telefono Apoderado"
              type="number"
              error={!!errors.telefonoApoderado}
              helperText={errors.telefonoApoderado && errors.telefonoApoderado?.message}
              {...register('telefonoApoderado')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            disabled={props.activeStep === 0}
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
      {alertValidacionDNI.estado && (
        <AlertComponent
          type={alertValidacionDNI.type}
          message={alertValidacionDNI.message}
          vertical={alertValidacionDNI.vertical}
          horizontal={alertValidacionDNI.horizontal}
        />
      )}
    </>
  );
};

export default FormularioDatosGenerales;
