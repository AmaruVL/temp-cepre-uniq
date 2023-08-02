import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const BasicCardCiclo = ({ title = 'CICLO', textButton = 'BUTTOM', ruta = '/', estado }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography className="text-center" variant="h5" component="div">
          {title}
        </Typography>
        <div className="text-center mt-10">
          <Button
            href={ruta}
            disabled={!estado}
            variant="contained"
            className="bg-teal-600 text-white"
            size="medium"
          >
            {textButton}
          </Button>
        </div>
        {!estado && (
          <div className="text-red-400 mt-10 flex flex-wrap">
            <NotificationImportantIcon />
            <p className="mx-4">Las fechas se encuentran fuera del rango permitido.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BasicCardCiclo;
