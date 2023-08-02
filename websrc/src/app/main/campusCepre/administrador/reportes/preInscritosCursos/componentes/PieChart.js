import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartPreInscripcionesCurso({ dataReporte = [], colores = [] }) {
  const dataChart = {
    labels: dataReporte.map((elemento) => elemento.escuela_prof),
    datasets: [
      {
        label: '# of Votes',
        data: dataReporte.map((elemento) => elemento.cantidad),
        backgroundColor: colores,
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={dataChart} />;
}
export default PieChartPreInscripcionesCurso;
