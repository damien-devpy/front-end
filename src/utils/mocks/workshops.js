import moment from 'moment';

const workshops = [
  {
    date: moment().subtract(0, 'days'),
    workshopName: 'DataForGood',
    status: 'En cours',
    coachName: 'Noé',
  },
  {
    date: moment().subtract(12, 'days'),
    workshopName: 'L’Elysée',
    status: 'En préparation',
    coachName: 'François',
  },
  {
    date: moment().subtract(1, 'month'),
    workshopName: 'Liberté Living Lab n°1',
    status: 'Mail de fin à envoyer',
    coachName: 'Léa',
  },
  {
    date: moment().subtract(2, 'months'),
    workshopName: 'Lycée Saint Vincent de Paul',
    status: 'Clôturé',
    coachName: 'François',
  },
];

export default workshops;
