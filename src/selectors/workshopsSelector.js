// eslint-disable-next-line import/prefer-default-export
export const selectCoachWorkshops = (
  workshops = { workshops: [] },
  coachId
) => {
  if (!workshops || !workshops.workshops) {
    return [];
  }
  if (!coachId) {
    return workshops.workshops;
  }
  return workshops.workshops.filter((workshop) => workshop.coachId === coachId);
};
