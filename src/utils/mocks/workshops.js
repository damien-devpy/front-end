import moment from 'moment';

const workshops = [
  {
    id: 'a2f5a21f7a114216b32d74d5de79e482',
    date: moment().subtract(0, 'days'),
    title: 'DataForGood',
    status: 'En cours',
    coachName: 'Noé',
  },
  {
    id: '2',
    date: moment().subtract(12, 'days'),
    title: 'L’Elysée',
    status: 'En préparation',
    coachName: 'François',
  },
  {
    id: '3',
    date: moment().subtract(1, 'month'),
    title: 'Liberté Living Lab n°1',
    status: 'Mail de fin à envoyer',
    coachName: 'Léa',
  },
  {
    id: '4',
    date: moment().subtract(2, 'months'),
    title: 'Lycée Saint Vincent de Paul',
    status: 'Clôturé',
    coachName: 'François',
  },
];

export default workshops;
