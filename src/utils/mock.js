import coaches from './mocks/coaches';
import participants from './mocks/participants';
import personas from './mocks/personas';
// import workshop from './mocks/emptyWorkshop.json';
import workshop from './mocks/initializedWorkshop.json';
import workshops from './mocks/workshops';

export default {
  [`/ping`]: 'pong',
  [`/coaches`]: coaches,
  [`/workshop`]: workshop,
  [`/workshops`]: workshops,
  [`/participants`]: participants,
  [`/personas`]: personas,
};
