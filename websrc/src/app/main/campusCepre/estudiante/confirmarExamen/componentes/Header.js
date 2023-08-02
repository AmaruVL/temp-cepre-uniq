import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

function ConfirmarExamenHeader(props) {
  const mainTheme = useSelector(selectMainTheme);
  console.log('props', props);
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
          {props?.dataExamen?.denominacion ? props?.dataExamen?.denominacion : ''}
        </Typography>
      </div>
      {/* <FormularioFechas
        dataCursos={props.dataCursos}
        setDataCursos={props.setDataCursos}
        setDataEstudiante={props.setDataEstudiante}
      /> */}
    </div>
  );
}

export default ConfirmarExamenHeader;
