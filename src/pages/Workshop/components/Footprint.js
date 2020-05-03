import React from 'react';
import { useSelector  } from 'react-redux';

const Footprint = ({participantId, yearFrom, yearTo, ...props}) => {
  const footprintBefore = useSelector((state) => {if (state.workshop.rounds && state.workshop.rounds.byYear[yearFrom]) {return state.workshop.rounds.byYear[yearFrom].participants.byId[participantId]}})
  const footprintAfter = useSelector((state) => {if (state.workshop.rounds && state.workshop.rounds.byYear[yearTo]) {return state.workshop.rounds.byYear[yearTo].participants.byId[participantId]}})
  return ( 
    <div>
      <h2> Empreinte Carbone année {yearFrom} </h2>
      <p>{JSON.stringify(footprintBefore, null, 4)}</p>
      <h2> Empreinte Carbone année {yearTo} </h2>
      <p>{JSON.stringify(footprintAfter, null, 4)}</p>
    </div>
  );
};

export default Footprint;
