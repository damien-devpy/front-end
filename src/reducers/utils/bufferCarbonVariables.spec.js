import { getEiForHeatingNetwork } from './bufferCarbonVariables';

describe('test getEiForHeatingNetwork', () => {
  test('getEiForHeatingNetwork returns correct result when existing parameter', () => {
    // Given
    const networkData = [
      {
        department: '1',
        emission_intensity: '0.1',
        location: 'city_a',
        name: 'name_a',
        type: 'hot',
      },
      {
        department: '2',
        emission_intensity: '0.2',
        location: 'city_b',
        name: 'name_b',
        type: 'hot',
      },
    ];

    const expectedRes = 0.1;

    const res = getEiForHeatingNetwork(networkData, 'name_a');

    expect(res).toStrictEqual(expectedRes);
  });
});
