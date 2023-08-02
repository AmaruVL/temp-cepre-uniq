import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartPreInscripcionesCurso({ dataReporte = [], colores = { colores } }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cantidad de Pre-inscritos',
      },
    },
  };

  const labels = dataReporte.map((data) => data.escuela_prof);
  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Cantidad de pre inscritos',
        data: dataReporte.map((data) => data.cantidad),
        backgroundColor: colores,
      },
    ],
  };
  return <Bar options={options} data={dataChart} />;
}
export default BarChartPreInscripcionesCurso;
