import moment from 'moment';

const workshops = [
  {
    date: moment().subtract(3, 'days'),
    name: 'DataForGood',
    status: 'En cours',
    coachId: 0,
  },
  {
    date: moment().subtract(12, 'days'),
    name: 'L’Elysée',
    status: 'En préparation',
    coachId: 1,
  },
  {
    date: moment().subtract(1, 'month'),
    name: 'LLL',
    status: 'Mail de fin à envoyer',
    coachId: 2,
  },
  {
    date: moment().subtract(2, 'months'),
    name: 'Devant les enfants',
    status: 'Clôturé',
    coachId: 3,
  },
];

export default workshops;
