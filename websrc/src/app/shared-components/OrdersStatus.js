import _ from '@lodash';
import clsx from 'clsx';

export const orderStatuses = [
  {
    id: 1,
    name: 'Inactivo',
    color: 'bg-red text-white',
  },
  {
    id: 2,
    name: 'Activo',
    color: 'bg-green-800 text-white',
  },
  {
    id: 3,
    name: 'InProcess',
    color: 'bg-purple-700 text-white',
  },
  {
    id: 4,
    name: 'Pendiente',
    color: 'bg-blue-700 text-white',
  },
  {
    id: 5,
    name: 'Pagado',
    color: 'bg-green-800 text-white',
  },
  {
    id: 6,
    name: 'Incorrecta',
    color: 'bg-blue-700 text-white',
  },
  {
    id: 7,
    name: 'Correcta',
    color: 'bg-green-800 text-white',
  },
  {
    id: 6,
    name: 'Docente',
    color: 'bg-blue-700 text-white',
  },
  {
    id: 7,
    name: 'Estudiante',
    color: 'bg-orange-800 text-white',
  },
  {
    id: 8,
    name: 'Presente',
    color: 'bg-blue-700 text-white',
  },
  {
    id: 9,
    name: 'Ausente',
    color: 'bg-red-800 text-white',
  },
  {
    id: 10,
    name: 'APROBADO',
    color: 'bg-green-800 text-white',
  },
  {
    id: 11,
    name: 'PENDIENTE',
    color: 'bg-blue-300 text-white',
  },
  {
    id: 12,
    name: 'OBSERVADO',
    color: 'bg-red-800 text-white',
  },
  {
    id: 13,
    name: 'PUBLICADO',
    color: 'bg-green-800 text-white',
  },
  {
    id: 14,
    name: 'PAGOS COMPLETOS',
    color: 'bg-green-800 text-white',
  },
  {
    id: 15,
    name: 'PAGOS PENDIENTES',
    color: 'bg-orange-600 text-white',
  },
  {
    id: 16,
    name: 'COMPLETADO',
    color: 'bg-green-800 text-white',
  },
  {
    id: 17,
    name: 'PENDIENTE',
    color: 'bg-orange-600 text-white',
  },
  {
    id: 18,
    name: 'FINALIZADO',
    color: 'bg-green-800 text-white',
  },
  {
    id: 19,
    name: 'EN PROCESO',
    color: 'bg-orange-600 text-white',
  },
  {
    id: 20,
    name: 'INACTIVO',
    color: 'bg-red text-white',
  },
  {
    id: 21,
    name: 'ACTIVO',
    color: 'bg-green-800 text-white',
  },
];

function OrdersStatus(props) {
  return (
    <div
      className={clsx(
        'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
        _.find(orderStatuses, { name: props.name }).color
      )}
    >
      {props.name}
    </div>
  );
}

export default OrdersStatus;
