import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PreInscripcionPorCiclo from '../ventanaDetallesCiclo';

const BasicCard = (props) => {
  const { title = 'CICLO', textButton = 'BUTTON', ruta = '/' } = props;
  return (
    <Card sx={{ minWidth: 275, minHeight: 150 }}>
      <CardContent>
        <Typography className="text-center" variant="h5" component="div">
          {title}
        </Typography>
        <div className="text-center mt-10">
          <PreInscripcionPorCiclo
            datosCiclo={props.datosCiclo}
            detalleCiclo={props.detalleCiclo}
            setDetalleCiclo={props.setDetalleCiclo}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicCard;
