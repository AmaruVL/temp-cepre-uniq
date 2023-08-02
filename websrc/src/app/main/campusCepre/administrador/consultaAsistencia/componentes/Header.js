import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import FormularioFechas from './formFechas';

function ReporteAsistenciaEstudiantesHeader(props) {
  const mainTheme = useSelector(selectMainTheme);
  return (
    <div className="">
      <div className="">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Consulta de Asistencia de Docentes
        </Typography>
      </div>
      <FormularioFechas
        dataDocente={props.dataDocente}
        setDataDocentes={props.setDataDocentes}
        setDataEstudiante={props.setDataEstudiante}
        setFechaIn={props.setFechaIn}
        setFechaFin={props.setFechaFin}
        setCurso={props.setCurso}
        setdataGeneral={props.setdataGeneral}
        dataCiclo={props.dataCiclo}
      />
    </div>
  );
}

export default ReporteAsistenciaEstudiantesHeader;
