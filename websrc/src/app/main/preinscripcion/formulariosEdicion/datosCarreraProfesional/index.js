import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { LoadingButton } from '@mui/lab';

const schema = yup.object().shape({
  escuelaProfesional: yup.string().required('Campo Requerido'),
  cantidadCuotasAPagar: yup.string().required('Campo Requerido'),
});

const FormularioDatosCarreraProfesional = (props) => {
  const { datosGeneralesPreInscripcion, tipoColegioGlobal } = props;
  const [detallesCuota, setDetallesCuota] = React.useState([]);
  const [escuelaProfesionalLocal, setEscuelaProfesionalLocal] = React.useState(1);
  const [pagosLocal, setPagosLocal] = React.useState(1);
  const [estadoJuramento, setEstadoJuramento] = React.useState(false);
  const [estadoJuramentoPago, setEstadoJuramentoPago] = React.useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [verTabla, setVerTabla] = React.useState(false);
  const [cuotasPagos, setCuotas] = React.useState();
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm({
    defaultValues: {
      escuelaProfesional: '',
      cantidadCuotasAPagar: '',
    },
    resolver: yupResolver(schema),
  });
  const changeStateTable = () => {
    setVerTabla(!verTabla);
  };
  const handleChangePago = (event) => {
    setCuotas(event.target.value);
    setPagosLocal(event.target.value);
    const cuotas = [];
    detallePagos.forEach((option) => {
      if (option.id_pago.id === event.target.value)
        cuotas.push({
          numeroCuota: option.nro_cuota,
          fechaInicio: option.fecha_inicio,
          fechaFin: option.fecha_fin,
          monto: option.monto_parcial,
          concepto: option.concepto,
        });
    });
    setDetallesCuota(cuotas);
  };
  const { escuelaProfesional, pagos, detallePagos } = props;
  const onSubmit = async (data) => {
    setisLoading(true);
    // props.handleNext();
    const datosFinales = { ...datosGeneralesPreInscripcion.preinscripcion_data };
    datosFinales.progreso_preinscripcion = 4;
    datosFinales.esta_enviado = true;
    datosFinales.id_pago = cuotasPagos;
    datosFinales.id_escuela_profesional = data.escuelaProfesional;
    // .then((res) => {
    //   props.setDatosGeneralesPreInscripcion(res.data);
    //   props.handleNext();
    // })
    // .catch((err) => alert(err));
    // const promesaPut = axios.post(
    //   `https://cepru-dev.herokuapp.com/update-preinscripcion/${datosGeneralesPreInscripcion.preinscripcion_data.id}`,
    //   datosFinales
    // );
    // .then((res) => {
    //   props.setDatosGeneralesPreInscripcion(res.data);
    //   props.handleNext();
    // })
    // .catch((err) => alert(err));
    await axios
      .patch(
        `${RutaGeneral}/update-preinscripcion/${datosGeneralesPreInscripcion.preinscripcion_data.id}`,
        {
          id_escuela_profesional: data.escuelaProfesional,
          id_pago: cuotasPagos,
          progreso_preinscripcion: 4,
          esta_enviado: true,
        }
      )
      .then((values) => {
        axios
          .post(
            `${RutaGeneral}/update-preinscripcion/${datosGeneralesPreInscripcion.preinscripcion_data.id}`,
            datosFinales
          )
          .then(async () => {
            await axios
              .get(
                `${RutaGeneral}/detallecompromisopago/${datosGeneralesPreInscripcion.preinscripcion_data.id}`
              )
              .then(async (res) => {
                await props.setDetalles(res.data);
                await props.handleNext();
                await props.setDatosGeneralesPreInscripcion(values.data);
              })
              .catch((err) => {
                alert(err);
                setisLoading(false);
              });
            await axios
              .post(
                `${RutaGeneral}/preinscripcion/enviar-resumen/${datosGeneralesPreInscripcion.preinscripcion_data.id}`
                // {
                //   email_destino: datosGeneralesPreInscripcion.preinscripcion_data.email_respaldo,
                // }
              )
              .then((res) => {
                setisLoading(false);
              })
              .catch((err) => {
                alert(err);
                setisLoading(false);
              });
          })
          .catch((err) => {
            alert(err);
            setisLoading(false);
          });
      })
      .catch((err) => {
        setisLoading(false);
        alert(err);
      });
  };
  return (
    <>
      <h1 className="m-3">
        <b>CARRERA PROFESIONAL Y CUOTAS</b>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
        }}
      >
        <div className="w-full m-10">
          <FormControl className="w-full">
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label="Carrera Profesional"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.escuelaProfesional}
                  helperText={errors.escuelaProfesional && errors.escuelaProfesional?.message}
                >
                  {escuelaProfesional.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                      {option.nombre_escuela_profesional}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              name="escuelaProfesional"
              control={control}
            />
          </FormControl>
        </div>
        <div className="w-full m-10">
          <FormControl className="w-full">
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label="Cantidad de Cuotas a Pagar"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangePago(e);
                  }}
                  error={!!errors.cantidadCuotasAPagar}
                  helperText={errors.cantidadCuotasAPagar && errors.cantidadCuotasAPagar?.message}
                >
                  {pagos.map((option, index) => {
                    return (
                      option.tipo_colegio === '---' && (
                        <MenuItem key={index} value={option.id}>
                          {`${option.nro_cuotas} cuota(s)`}
                        </MenuItem>
                      )
                    );
                  })}
                </TextField>
              )}
              control={control}
              name="cantidadCuotasAPagar"
            />
          </FormControl>
        </div>
        {/* <center>
          <Button variant="contained" onClick={changeStateTable}>
            Ver detalle
          </Button>
        </center> */}
        {/* {verTabla && ( */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nro. de Cuota</TableCell>
                <TableCell align="center">Concepto</TableCell>
                <TableCell align="center">Fecha Inicio</TableCell>
                <TableCell align="center">Fecha Vencimiento</TableCell>
                <TableCell align="center">Monto(S/.)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detallesCuota.map((detallesCuotas, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {console.log(detallesCuotas)}
                  <TableCell align="center">{detallesCuotas.numeroCuota}</TableCell>
                  <TableCell align="center">{detallesCuotas.concepto}</TableCell>
                  <TableCell align="center">{detallesCuotas.fechaInicio}</TableCell>
                  <TableCell align="center">{detallesCuotas.fechaFin}</TableCell>
                  <TableCell align="center">{detallesCuotas.monto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* )} */}
        <div className="flex">
          <Controller
            name="declaro"
            label="declaro"
            type="checkbox"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  setEstadoJuramento(e.target.checked);
                }}
              />
            )}
          />
          <Typography className="flex m-10">
            DECLARO BAJO JURAMENTO QUE LA INFORMACION CONSIGNADA EN ESTE FORMULARIO ES VERIDICA
          </Typography>
        </div>
        <div className="flex">
          <Controller
            name="pagoCuotas"
            label="pagoCuotas"
            type="checkbox"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  setEstadoJuramentoPago(e.target.checked);
                }}
              />
            )}
          />
          <Typography className="flex m-10">
            ME COMPROMETO A REALIZAR EL PAGO CORRESPONDIENTE A LAS CUOTAS CONSIGNADAS
          </Typography>
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
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!(estadoJuramento === true && estadoJuramentoPago === true)}
          >
            Siguiente
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};

export default FormularioDatosCarreraProfesional;
