import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { renderByOrder } from 'recharts/lib/util/ReactUtils';
import { Button, Card, Container } from 'react-bootstrap';

import {
    footprintDataToGraph,
  } from '../../selectors/footprintSelectors';
import { computeFootprint, valueOnAllLevels } from '../../reducers/utils/model';


export const loadHeatingNetworksData = async () => {
    const response = await fetch('/data/heat_networks.csv');
    const text = await response.text();
    const heatingNetworksData = Papa.parse(text, { header: true });
    return heatingNetworksData.data;
  };

const CarbonGraph = (id) =>{
    loadHeatingNetworksData().then((heatingNetworksData) => {
        const { footprintStructure, variableFormulas } = model;
        const footprint = participants[id].personaId
            ? valueOnAllLevels(
                computeFootprint(
                footprintStructure,
                variableFormulas,
                computeCarbonVariables(
                    personas[participants[id].personaId].surveyVariables,
                    globalCarbonVariables,
                    heatingNetworksData
                ),
                globalCarbonVariables
                )
            )
            : carbonFootprints[`${startYear}-${id}`].footprint;
        
        // 3. footprintDataToGraph should be part of FootprintGraph
        const footprintShaped = footprintDataToGraph(footprint);
        });
}

const ParticipantsFootprintCards = (participants) => {
    participants.map(id => (
        <Container>
        
        </Container>  ) )

   return 0}
    // ideally
    // 1. carbon variables should be pre-computed for each persona
    // 2. add higher-level function where
    // valueOnAllLevels & computeFootprint are put together and
    // input variables are simplified, e.g. could be given as `model`


export default ParticipantsFootprintCards;
