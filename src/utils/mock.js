import coaches from './mocks/coaches';
import workshop1 from './mocks/initializedWorkshop.json';
import workshop2 from './mocks/initializedWorkshop2.json';
import workshop3 from './mocks/workshopDownloadResponsePut.json';
import workshops from './mocks/workshops';

const fullWorkshops = {
  [workshop1.id]: workshop1,
  [workshop2.id]: workshop2,
  [workshop3.id]: workshop3,
};

export default {
  [`/ping`]: 'pong',
  [`/coaches`]: coaches,
  [`/workshops/*`]: ({ workshopId }) => fullWorkshops[workshopId],
  [`/workshops`]: workshops,
};
