import moment from 'moment';

const workshops = [
  {
    id: 'a2f5a21f7a114216b32d74d5de79e482',
    date: moment().subtract(0, 'days'),
    name: 'DataForGood',
    status: 'En cours',
    coachId: 0,
  },
  {
    id: '2',
    date: moment().subtract(12, 'days'),
    name: 'L’Elysée',
    status: 'En préparation',
    coachId: 1,
  },
  {
    id: '3',
    date: moment().subtract(1, 'month'),
    name: 'Liberté Living Lab n°1',
    status: 'Mail de fin à envoyer',
    coachId: 2,
  },
  {
    id: '4',
    date: moment().subtract(2, 'months'),
    name: 'Lycée Saint Vincent de Paul',
    status: 'Clôturé',
    coachId: 3,
  },
];

export default workshops;
