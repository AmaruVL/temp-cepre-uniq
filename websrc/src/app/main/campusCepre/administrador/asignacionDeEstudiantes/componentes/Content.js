import * as React from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import { Box } from '@mui/system';
import { Tab, Tabs, Typography } from '@mui/material';
import RutaGeneral from '../../../../../shared-components/rutaGeneral';
import AsignacionEstudiante from './Tab1';
import ConsultaEstudiantesAula from './Tab2';
import ConsultaHorariosAula from './Tab3';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function CicloContent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { datosCiclo, term } = props;
  const [estadoData, setEstadoData] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/ciclos`)
      .then((res) => {
        props.setDatosCiclo(res.data);
        setEstadoData(true);
      })
      .catch((err) => {});
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Asignacion de estudiantes" {...a11yProps(0)} />
              <Tab label="Consulta estudiantes por aula" {...a11yProps(1)} />
              <Tab label="Consulta horarios de aula" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AsignacionEstudiante />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ConsultaEstudiantesAula />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ConsultaHorariosAula />
          </TabPanel>
        </Box>
      </FuseScrollbars>
    </div>
  );
}

export default CicloContent;
