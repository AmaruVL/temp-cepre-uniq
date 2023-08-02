import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartPreInscripcionesCurso from './PieChart';
import BarChartPreInscripcionesCurso from './BarChart';

const schema = yup.object().shape({
  observacion: yup.string().required('Campo Requerido'),
});

function ModalPieChart(props) {
  const { dataEstudiante } = props;
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [openDialog, setOpenDialog] = useState(false);
  const [colores, setcolores] = useState([]);

  function generateRandomCode() {
    const arregloColores = [];
    dataEstudiante.forEach((element) => {
      const myRandomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      arregloColores.push(myRandomColor);
    });
    setcolores(arregloColores);
  }

  function handleOpenDialog() {
    generateRandomCode();
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <>
      <Tooltip title="Graficos del reporte">
        <IconButton variant="contained" color="secondary" onClick={() => handleOpenDialog()}>
          <BarChartIcon />
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
              <b>Graficos del reporte</b>
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
          <div className="flex flex-wrap">
            <div className="w-3/6">
              <PieChartPreInscripcionesCurso dataReporte={dataEstudiante} colores={colores} />
            </div>
            <div className="w-3/6">
              <BarChartPreInscripcionesCurso dataReporte={dataEstudiante} colores={colores} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalPieChart;
