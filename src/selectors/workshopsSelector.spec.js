import { selectCoachWorkshops } from './workshopsSelector';

const workshop1 = {
  id: '1',
  name: 'Climate change',
  city: 'Carcassonne',
  coachId: '2',
  creatorId: '2',
  eventUrl: '2tonnes.org',
  startAt: '2020-06-30T16:10:21.938000',
  updatedAt: '2020-06-30T16:10:29.873000',
};
const workshop2 = {
  id: '2',
  name: 'Climate change 2',
  city: 'Carcassonne',
  coachId: '2',
  creatorId: '2',
  eventUrl: '2tonnes.org',
  startAt: '2020-06-30T16:10:21.938000',
  updatedAt: '2020-06-30T16:10:29.873000',
};
const workshop3 = {
  id: '3',
  name: 'Climate change 3',
  city: 'Carcassonne',
  coachId: '3',
  creatorId: '3',
  eventUrl: '2tonnes.org',
  startAt: '2020-06-30T16:10:21.938000',
  updatedAt: '2020-06-30T16:10:29.873000',
};

describe('Workshops selector', () => {
  it('should return only workshops belonging to a coach (coachId 2)', () => {
    const workshops = { workshops: [workshop1, workshop2, workshop3] };
    const expectedWorkshops = [workshop1, workshop2];
    const workshopsForCoachId2 = selectCoachWorkshops(workshops, '2');
    expect(workshopsForCoachId2).toEqual(expectedWorkshops);
  });
  it('should return only workshops belonging to a coach (coachId 3)', () => {
    const workshops = { workshops: [workshop1, workshop2, workshop3] };
    const expectedWorkshops = [workshop3];
    const workshopsForCoachId3 = selectCoachWorkshops(workshops, '3');
    expect(workshopsForCoachId3).toEqual(expectedWorkshops);
  });
  it('should return empty workshops array if no coach matches', () => {
    const workshops = { workshops: [workshop1, workshop2, workshop3] };
    const expectedWorkshops = [];
    const workshopsForCoachId0 = selectCoachWorkshops(workshops, '0');
    expect(workshopsForCoachId0).toEqual(expectedWorkshops);
  });
  it('should return empty workshops array if workshops is null', () => {
    const workshops = null;
    const expectedWorkshops = [];
    const workshopsForCoachId1 = selectCoachWorkshops(workshops, '1');
    expect(workshopsForCoachId1).toEqual(expectedWorkshops);
  });
  it('should return empty workshops array if there is no param', () => {
    const expectedWorkshops = [];
    const workshopsForCoachId1 = selectCoachWorkshops();
    expect(workshopsForCoachId1).toEqual(expectedWorkshops);
  });
  it('should return all workshops if coachId is omitted', () => {
    const workshops = { workshops: [workshop1, workshop2, workshop3] };
    const expectedWorkshops = [workshop1, workshop2, workshop3];
    const allWorkshops = selectCoachWorkshops(workshops);
    expect(allWorkshops).toEqual(expectedWorkshops);
  });
});
