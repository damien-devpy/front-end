import { v4 as uuid } from 'uuid';
// export default [
//   {
//     userId: uuid(),
//     firstName: 'William',
//     lastName: 'Spence',
//     email: 'william.spence@test.com',
//     role: 'admin',
//     createdAt: '2020-04-01T00:00:00.000Z',
//     updatedAt: '2020-04-01T00:00:00.000Z',
//   },
//   {
//     userId: uuid(),
//     firstName: 'Franklin',
//     lastName: 'Blair',
//     email: 'franklin.blair@test.com',
//     role: 'admin',
//     createdAt: '2020-04-01T00:00:00.000Z',
//     updatedAt: '2020-04-01T00:00:00.000Z',
//   },
//   {
//     userId: uuid(),
//     firstName: 'James',
//     lastName: 'Holder',
//     email: 'James.holder@test.com',
//     role: 'admin',
//     createdAt: '2020-04-01T00:00:00.000Z',
//     updatedAt: '2020-04-01T00:00:00.000Z',
//   },
//   {
//     userId: uuid(),
//     firstName: 'David',
//     lastName: 'McClure',
//     email: 'david.mcclure@test.com',
//     role: 'admin',
//     createdAt: '2020-04-01T00:00:00.000Z',
//     updatedAt: '2020-04-01T00:00:00.000Z',
//   },
//   {
//     userId: uuid(),
//     firstName: 'Donald',
//     lastName: 'Duran',
//     email: 'donald.duran@test.com',
//     role: 'admin',
//     createdAt: '2020-04-01T00:00:00.000Z',
//     updatedAt: '2020-04-01T00:00:00.000Z',
//   },
//   {
//     userId: uuid(),
//     firstName: 'Gene',
//     lastName: 'Fields',
//     email: 'gene.gields@test.com',
//     role: 'admin',
//     createdAt: '2020-04-01T00:00:00.000Z',
//     updatedAt: '2020-04-01T00:00:00.000Z',
//   },
//   {
//     userId: uuid(),
//     firstName: 'Dwayne',
//     lastName: 'Key',
//     email: 'dwayne.key@test.com',
//     role: 'admin',
//     createdAt: '2020-04-01T00:00:00.000Z',
//     updatedAt: '2020-04-01T00:00:00.000Z',
//   },
// ];

const DOMAIN_NAME = 'caplc.com';
const names = [
  'Néo Fouquet',
  'Guillaume Grandis',
  'Sylvain Leavitt',
  'Boniface Duchamp',
  'Henry Larousse',
  'Luc Clérico',
  'Gilles Vigouroux',
  'Robert Lazard',
  'Valéry Beauvau',
  'Lilian Trémaux',
];

export default names.map((name, index) => {
  const [firstName, lastName] = name.split(' ');
  return {
    userId: uuid(),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${DOMAIN_NAME}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''),
    role: index < 3 ? 'admin' : 'coach',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});
