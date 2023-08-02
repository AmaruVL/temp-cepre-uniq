import * as React from 'react';
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
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import useMessages from '../../../../../hooks/useMessages';

const schema = yup.object().shape({
  nro_cuotas: yup.string(),
  tipo_colegio: yup.string(),
  monto_total: yup.string(),
});

function ModalModificarCuotas(props) {
  const { data, setDatosPagosCiclo } = props;
  const { showSuccess, showError } = useMessages();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleAlerta, setVisibleAlerta] = useState(false);
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [nroCuotas, setNroCuotas] = useState(0);
  const [conceptos, setConceptos] = useState([]);
  const [montosParciales, setMontosParciales] = useState([]);
  const [montosParcialesIniciales, setMontosParcialesIniciales] = useState([]);
  const [conDatosEstado, setConDatosEstado] = React.useState(false);
  const [editCellsModel, setEditCellsModel] = React.useState({}); // modifi
  const [modelTabla, setModelTabla] = React.useState({});

  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nro_cuotas: '',
      tipo_colegio: '',
      monto_total: '',
    },
    resolver: yupResolver(schema),
  });

  const columns = [
    {
      field: 'nro_cuota',
      headerName: 'Cuota',
      width: 120,
      editable: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'fecha_inicio',
      headerName: 'Fecha Inicio',
      width: 120,
      type: 'date',
      editable: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'fecha_fin',
      headerName: 'Fecha Fin',
      width: 120,
      type: 'date',
      editable: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'monto_parcial',
      headerName: 'Concepto',
      width: 350,
      editable: true,
      step: 1.0,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Select value={params.value} readOnly style={{ width: '100%' }}>
            {conceptos.map((x, i) => (
              <MenuItem key={i} value={x.id}>
                {x.nombre} - {x.monto}
              </MenuItem>
            ))}
          </Select>
        );
      },
      renderEditCell: (params) => {
        const { id, value, api, field } = params;

        const handleChange = async (event) => {
          api.setEditCellValue({ id, field, value: String(event.target.value) }, event);
          await api.commitCellChange({ id, field });
          api.setCellMode(id, field, 'view');
        };

        const handleRef = (element) => {
          if (element) {
            element.querySelector(`input[value="${value}"]`).focus();
          }
        };

        return (
          <Select value={value} onChange={handleChange} ref={handleRef} style={{ width: '100%' }}>
            {conceptos.map((x, i) => (
              <MenuItem key={i} value={x.id}>
                {x.nombre} - {x.monto}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: 'especie_mora',
      headerName: 'Especie Mora',
      width: 150,
      editable: true,
      renderCell: renderRating,
      renderEditCell: renderRatingEditInputCell,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'monto_mora',
      headerName: 'Monto Mora',
      width: 150,
      editable: true,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  const handleEditCellsModelChange = React.useCallback((model) => {
    setEditCellsModel(model);
  }, []);
  const handleViewCellsModelChange = React.useCallback((model) => {
    setModelTabla(model.rows);
  }, []);

  const handleConceptoChange = (params) => {};

  React.useEffect(() => {
    const body = /* JSON.stringify */ /* encodeURIComponent */ {
      username: process.env.REACT_APP_CAJA_USUARIO,
      password: process.env.REACT_APP_CAJA_PASSWORD,
      ide_eje: process.env.REACT_APP_CAJA_EJECUTORA,
      ano_eje: process.env.REACT_APP_CAJA_ID_ANO,
      ide_apl: process.env.REACT_APP_CAJA_ID_APL,
    };
    axios
      .post(`${process.env.REACT_APP_CAJA_ENDPOINT}/usuarios/auth/login`, body)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        return axios.get(
          `${process.env.REACT_APP_CAJA_ENDPOINT}/concep-deu/plantillas?` +
            `ano_eje=${process.env.REACT_APP_CAJA_ID_ANO}&des_itm=CEPRE`,
          { headers: { Authorization: `Bearer ${response.access_token}` } }
        );
      })
      .then((response) => {
        console.log(response.data);
        let preConceptos = [];
        response.data.forEach((x) => {
          preConceptos = preConceptos.concat(
            ...x.conceptos.map((z, k) => ({ id: z.ide_itm, nombre: z.des_itm, monto: z.val_unt }))
          );
        });

        console.log(preConceptos);
        setConceptos(preConceptos);
      })
      .catch((err) => {
        console.log(err);
        setConceptos([]);
      });
    /*
    .then(data => {
      console.log(data);
    }) */ axios
      .get(`${RutaGeneral}/detalle-pago-lista/${data.id}`)
      .then((res) => {
        const valores = { ...res.data };
        const auxi = res.data;
        if (auxi.length < data.nro_cuotas) {
          for (let k = 0; k <= data.nro_cuotas - res.data.length; k = +1) {
            auxi.push({
              id: auxi.length + 1,
              nro_cuota: auxi.length + 1,
              monto_parcial: 0,
              especie_mora: 'PORC',
              monto_mora: 0,
              fecha_inicio: new Date(),
              fecha_fin: new Date(),
            });
          }
        }
        setMontosParcialesIniciales(Object.keys(valores).length);
        setConDatosEstado(true);
        setMontosParciales(auxi);
      })
      .catch((err) => {});
    reset({
      nro_cuotas: data.nro_cuotas,
      tipo_colegio: data.tipo_colegio === 'PU' ? 'Colegio Publico' : 'Colegio Privado',
      monto_total: data.monto_total,
    });
    setNroCuotas(data.nro_cuotas);
  }, [
    conDatosEstado,
    data.id,
    data.monto_total,
    data.nro_cuotas,
    data.tipo_colegio,
    nroCuotas,
    reset,
  ]);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDelete() {
    setOpenDialog(false);
  }
  function onSubmit() {
    console.log('DATA', modelTabla);
    // let sumaMontos = 0;
    // for (let k = 0; k < montosParciales.length; k += 1) {
    //   sumaMontos += parseFloat(modelTabla.idRowsLookup[modelTabla.allRows[k]].monto_parcial);
    // }
    // if (sumaMontos === parseFloat(data.monto_total)) {
    //   if (montosParciales.length === montosParcialesIniciales) {
    //     for (let k = 0; k < montosParciales.length; k += 1) {
    //       axios
    //         .put(`${RutaGeneral}/detalle-pago-test/${modelTabla.allRows[k]}`, {
    //           nro_cuota: modelTabla.idRowsLookup[modelTabla.allRows[k]].nro_cuota,
    //           especie_mora: modelTabla.idRowsLookup[modelTabla.allRows[k]].especie_mora,
    //           monto_mora: modelTabla.idRowsLookup[modelTabla.allRows[k]].monto_mora,
    //           fecha_inicio: formatDate(modelTabla.idRowsLookup[modelTabla.allRows[k]].fecha_inicio),
    //           fecha_fin: formatDate(modelTabla.idRowsLookup[modelTabla.allRows[k]].fecha_fin),
    //           monto_parcial: modelTabla.idRowsLookup[modelTabla.allRows[k]].monto_parcial,
    //         })
    //         .then((res) => {
    //           handleCloseDialog();
    //           if (k === montosParciales.length - 1) {
    //             axios
    //               .get(`${RutaGeneral}/detalle-pago-lista/${data.id}`)
    //               .then((res2) => {
    //                 const valores = { ...res2.data };
    //                 const auxi = res2.data;
    //                 if (auxi.length < data.nro_cuotas) {
    //                   for (let i = 0; i <= data.nro_cuotas - res2.data.length; i = +1) {
    //                     auxi.push({
    //                       id: auxi.length + 1,
    //                       nro_cuota: auxi.length + 1,
    //                       monto_parcial: 0,
    //                       especie_mora: 'PORC',
    //                       monto_mora: 0,
    //                       fecha_inicio: new Date(),
    //                       fecha_fin: new Date(),
    //                     });
    //                   }
    //                 }
    //                 setMontosParcialesIniciales(Object.keys(valores).length);
    //                 setConDatosEstado(true);
    //                 setMontosParciales(auxi);
    //                 showSuccess('Guardado correctamente.');
    //               })
    //               .catch((err) => {
    //                 showError('No se pudo guardar.');
    //               });
    //             setNroCuotas(data.nro_cuotas);
    //           }
    //         })
    //         .catch((err) => {
    //           showError('No se pudo guardar.');
    //         });
    //     }
    //   } else {
    //     for (let k = 0; k < montosParciales.length; k += 1) {
    //       axios
    //         .post(`${RutaGeneral}/detalle-pago-test`, {
    //           id_pago: data.id,
    //           nro_cuota: modelTabla.idRowsLookup[modelTabla.allRows[k]].nro_cuota,
    //           especie_mora: modelTabla.idRowsLookup[modelTabla.allRows[k]].especie_mora,
    //           monto_mora: modelTabla.idRowsLookup[modelTabla.allRows[k]].monto_mora,
    //           fecha_inicio: formatDate(modelTabla.idRowsLookup[modelTabla.allRows[k]].fecha_inicio),
    //           fecha_fin: formatDate(modelTabla.idRowsLookup[modelTabla.allRows[k]].fecha_fin),
    //           monto_parcial: modelTabla.idRowsLookup[modelTabla.allRows[k]].monto_parcial,
    //         })
    //         .then((res) => {
    //           handleCloseDialog();
    //           if (k === montosParciales.length - 1) {
    //             axios
    //               .get(`${RutaGeneral}/detalle-pago-lista/${data.id}`)
    //               .then((res2) => {
    //                 const valores = { ...res2.data };
    //                 const auxi = res2.data;
    //                 if (auxi.length < data.nro_cuotas) {
    //                   for (let i = 0; i <= data.nro_cuotas - res2.data.length; i = +1) {
    //                     auxi.push({
    //                       id: auxi.length + 1,
    //                       nro_cuota: auxi.length + 1,
    //                       monto_parcial: 0,
    //                       especie_mora: 'PORC',
    //                       monto_mora: 0,
    //                       fecha_inicio: new Date(),
    //                       fecha_fin: new Date(),
    //                     });
    //                   }
    //                 }
    //                 setMontosParcialesIniciales(Object.keys(valores).length);
    //                 setConDatosEstado(true);
    //                 setMontosParciales(auxi);
    //                 showSuccess('Guardado correctamente.');
    //               })
    //               .catch((err) => {
    //                 showError('No se pudo guardar.');
    //               });
    //             setNroCuotas(data.nro_cuotas);
    //           }
    //         })
    //         .catch((err) => {
    //           showError('No llega al monto total.');
    //         });
    //     }
    //   }
    // } else {
    //   showError('No llega al monto total.');
    // }
  }
  function formatDate(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }
  return (
    <>
      <Tooltip title="Configurar cuotas">
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          color="success"
          onClick={handleOpenDialog}
        >
          Cuotas
        </Button>
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
              <b>Configurar Cuotas</b>
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
            <div className="grid grid-cols-3">
              <div className="col-span-1 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Nro cuotas"
                      error={!!errors.nro_cuotas}
                      helperText={errors.nro_cuotas && errors.nro_cuotas?.message}
                      disabled
                    />
                  )}
                  name="nro_cuotas"
                  control={control}
                />
              </div>
              <div className="col-span-1 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Tipo de colegio"
                      error={!!errors.tipo_colegio}
                      helperText={errors.tipo_colegio && errors.tipo_colegio?.message}
                      disabled
                    />
                  )}
                  name="tipo_colegio"
                  control={control}
                />
              </div>

              <div className="col-span-1 mx-3">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-12"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Monto total"
                      error={!!errors.monto_total}
                      helperText={errors.monto_total && errors.monto_total?.message}
                      disabled
                    />
                  )}
                  name="monto_total"
                  control={control}
                />
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ height: 350, width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <DataGrid
                      {...field}
                      rows={montosParciales}
                      columns={columns}
                      editCellsModel={editCellsModel}
                      editMode="cell"
                      onEditCellsModelChange={handleEditCellsModelChange}
                      onStateChange={handleViewCellsModelChange}
                      ForwardRef="true"
                    />
                  )}
                  name="data_grid"
                  control={control}
                />
              </div>
            </div>
            <Button className="mb-12" variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 16,
  },
});

function renderRating(params) {
  return (
    <Select value={params.value} readOnly style={{ width: '100%' }}>
      <MenuItem value="PORC">Porcentaje</MenuItem>
      <MenuItem value="FIJO">Fijo</MenuItem>
    </Select>
  );
}

renderRating.propTypes = {
  value: PropTypes.string.isRequired,
};

RatingEditInputCell.propTypes = {
  api: PropTypes.any.isRequired,
  field: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};
function RatingEditInputCell(props) {
  const { id, value, api, field } = props;
  const classes = useStyles();

  const handleChange = async (event) => {
    api.setEditCellValue({ id, field, value: String(event.target.value) }, event);
    await api.commitCellChange({ id, field });
    api.setCellMode(id, field, 'view');
  };

  const handleRef = (element) => {
    if (element) {
      element.querySelector(`input[value="${value}"]`).focus();
    }
  };

  return (
    <Select value={value} onChange={handleChange} ref={handleRef} style={{ width: '100%' }}>
      <MenuItem value="PORC">Porcentaje</MenuItem>
      <MenuItem value="FIJO">Fijo</MenuItem>
    </Select>
  );
}
function renderRatingEditInputCell(params) {
  return <RatingEditInputCell {...params} />;
}

export default ModalModificarCuotas;
