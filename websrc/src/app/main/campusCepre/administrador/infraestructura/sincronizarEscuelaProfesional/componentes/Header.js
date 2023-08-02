import Icon from '@mui/material/Icon';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import useMessages from 'app/hooks/useMessages';

function CicloHeader(props) {
  const mainTheme = useSelector(selectMainTheme);
  const { showError, showSuccess } = useMessages();
  const { datosCiclo, setDatosCiclo } = props;
  const [loadingData, setLoadingData] = useState(false);
  function onSubmit() {
    setLoadingData(true);
    axios
      .post(`${RutaGeneral}/sincronizar/escuelas-profesionales`, {})
      .then((res) => {
        setLoadingData(false);
        showSuccess('Sincronizado correctamente');
        axios.get(`${RutaGeneral}/escuelas-profesionales`).then((res2) => {
          props.setDatosCiclo(res2.data);
        });
      })
      .catch((err) => {
        setLoadingData(false);
        showError('No se pudo sincronizar');
      });
  }
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          content_paste
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Escuela Profesional
        </Typography>
      </div>
      <div className="flex flex-1  px-12">
        <ThemeProvider theme={mainTheme}>
          <LoadingButton
            onClick={() => {
              onSubmit();
            }}
            loading={loadingData}
            variant="contained"
            color="secondary"
          >
            Sincronizar
          </LoadingButton>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default CicloHeader;
