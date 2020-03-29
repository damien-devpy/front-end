import {
  selectTakenIndividualActionsForParticipantAndYear,
  selectAvailableIndividualActionsForParticipantAndYear
} from '../selectors/individualActionsSelectors';

describe('Individual Actions Selector', () => {
  const initState = {
    individualActions: {
      byParticipantIds: {
        1: { 1: 2020, 2: 2020, 3: 0, 4: 0 },
        2: { 1: 2020, 2: 0, 3: 2023, 4: 0 }
      },
      allParticipantIds: [1, 2]
    }
  };
  describe('Select only taken actions for a participant and a year', () => {
    it('should return individual actions taken for a participant and a year', done => {
      const individualActionsForParticipant1AndYear2020 = selectTakenIndividualActionsForParticipantAndYear(
        initState.individualActions,
        1,
        2020
      );
      expect(individualActionsForParticipant1AndYear2020).toEqual({
        1: 2020,
        2: 2020
      });
      const individualActionsForParticipant2AndYear2023 = selectTakenIndividualActionsForParticipantAndYear(
        initState.individualActions,
        2,
        2023
      );
      expect(individualActionsForParticipant2AndYear2023).toEqual({
        3: 2023
      });
      done();
    });
    it('should return empty object if no action exist for this participant', done => {
      const individualActionsForParticipant3AndYear2023 = selectTakenIndividualActionsForParticipantAndYear(
        initState.individualActions,
        3,
        2023
      );
      expect(individualActionsForParticipant3AndYear2023).toEqual({});
      done();
    });
    it('should return empty object if no action exist for this year', done => {
      const individualActionsForParticipant3AndYear2026 = selectTakenIndividualActionsForParticipantAndYear(
        initState.individualActions,
        3,
        2026
      );
      expect(individualActionsForParticipant3AndYear2026).toEqual({});
      done();
    });
  });
  describe('Select individual actions available (i.e taken for the specified year + not already taken) for a participant and a year', () => {
    it('should return individual actions available for a participant and a year', done => {
      const individualActionsForParticipant1AndYear2020 = selectAvailableIndividualActionsForParticipantAndYear(
        initState.individualActions,
        1,
        2020
      );
      expect(individualActionsForParticipant1AndYear2020).toEqual({
        1: 2020,
        2: 2020,
        3: 0,
        4: 0
      });
      const individualActionsForParticipant2AndYear2023 = selectAvailableIndividualActionsForParticipantAndYear(
        initState.individualActions,
        2,
        2023
      );
      expect(individualActionsForParticipant2AndYear2023).toEqual({
        2: 0,
        3: 2023,
        4: 0
      });
      done();
    });
  });
});
