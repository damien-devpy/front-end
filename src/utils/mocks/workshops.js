import moment from "moment";

const workshops = [
  {
    date: moment().subtract(3, "days"),
    workshopName: "DataForGood",
    status: "En cours",
    coachName: "François"
  },
  {
    date: moment().subtract(12, "days"),
    workshopName: "L’Elysée",
    status: "En préparation",
    coachName: "Noé"
  },
  {
    date: moment().subtract(1, "month"),
    workshopName: "LLL",
    status: "Mail de fin à envoyer",
    coachName: "Léa"
  },
  {
    date: moment().subtract(2, "months"),
    workshopName: "Devant les enfants",
    status: "Clôturé",
    coachName: "François"
  }
];

export default workshops;
