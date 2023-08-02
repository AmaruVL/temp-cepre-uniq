// import { DataGrid } from '@mui/x-data-grid/data-grid';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

function ReporteAsistenciaEstudiantesHeader(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dataCursos, dataEstudiante, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { field: 'id', headerName: 'N°', width: 90 },
    // {
    //   field: 'numero',
    //   headerName: 'N°',
    //   width: 150,
    //   editable: true,
    // },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 400,
      editable: true,
    },
    {
      field: 'dni',
      headerName: 'DNI',
      // type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'escuela',
      headerName: 'Escuela Profesional',
      width: 350,
      editable: true,
    },
    {
      field: 'fecha',
      headerName: 'Fecha de Registro',
      type: 'date',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  return (
    <div className="w-full flex flex-col">
      <div style={{ height: 400, width: '100%' }}>
        {/* <DataGrid
          rows={dataEstudiante.map((value, index) => {
            return {
              id: index + 1,
              nombre: `${value.dni_persona.apellido_paterno} ${value.dni_persona.apellido_materno} ${value.dni_persona.nombres}`,
              dni: value.dni_persona.dni,
              escuela: value.id_escuela_profesional.nombre_escuela_profesional,
              fecha: `${value.fecha_registro.split('T')[0]}`,
            };
          })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
        />
       */}
        <DataGrid
          rows={dataEstudiante.map((value, index) => {
            return {
              id: index + 1,
              nombre: `${value.dni_persona.apellido_paterno} ${value.dni_persona.apellido_materno} ${value.dni_persona.nombres}`,
              dni: value.dni_persona.dni,
              escuela: value.id_escuela_profesional.nombre_escuela_profesional,
              fecha: `${value.fecha_registro.split('T')[0]}`,
            };
          })}
          columns={columns}
          // ForwardRef="true"
        />
      </div>
    </div>
  );
}

export default ReporteAsistenciaEstudiantesHeader;
