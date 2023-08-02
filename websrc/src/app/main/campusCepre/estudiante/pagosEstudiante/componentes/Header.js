import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';

function AsistenciaEstudianteHeader(props) {
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
          Mis Pagos
        </Typography>
      </div>
    </div>
  );
}

export default AsistenciaEstudianteHeader;
