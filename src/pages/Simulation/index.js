import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import footprintData from "../../utils/mocks/footprintData";
import { footprintDataToGraph } from "../../selectors/footprintSelectors";
import "./components/simulationPage.css";
import NavbarWorkshop from "../../components/NavbarWorkshop";
import FootprintGraph from "./components/FootprintGraph";
import EvolutionCarbon from "./components/EvolutionCarbon";
import NewRoundModal from "./components/NewRoundModal";
import { startRound } from "../../actions/workshop";

const Simulation = () => {
  const { t } = useTranslation();
  // console.log(footprintShaped);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleSubmit = (values) => {
    dispatch(startRound(values));
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <NavbarWorkshop
        avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
        firstName="Xavier"
        role="Animateur"
      />
      <StyledSimulation>
        <Container className="row-full">
          <Row className="d-flex justify-content-end mr-1">
            <Button variant="secondary" onClick={handleShow}>
              {t("common.nextRound")}
            </Button>
          </Row>
          <Row style={{ height: "100vh" }}>
            <Col sm={12} md={8} className="graph-col">
              <Container className="graph-card">
                <h4>
                  Evolution du CO<span style={{ fontSize: "14px" }}>2</span> par
                  personne
                </h4>
                <EvolutionCarbon data={evolutionData} />
              </Container>
            </Col>
            <Col sm={12} md={4} className="graph-col">
              <Container className="graph-card">
                <h4> La population </h4>
                <FootprintGraph footprint={footprintShaped} />
              </Container>
              <Container className="graph-card">
                <h4> Les participants </h4>
                <FootprintGraph footprint={footprintShaped} />
              </Container>
            </Col>
          </Row>
        </Container>
      </StyledSimulation>
      <NewRoundModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

const StyledSimulation = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const footprintShaped = footprintDataToGraph(footprintData);
// const footprintShaped = [
//   { sector: "Transport", plane: 750, train: 59, bus: 150, car: 600 },
//   {
//     sector: "Logement",
//     housingEquipment: 500,
//     constructionAndMaintenance: 300,
//     energies: 216,
//   },
//   {
//     sector: "Alimentation",
//     drinks: 700,
//     meatAndFish: 352.86375,
//     eggsAndDairies: 71.66775,
//     others_alim: 600,
//   },
//   { sector: "Autres", clothing: 671.4, digital: 250, others_conso: 400 },
//   { sector: "Services Publics", publicServices: 1000 },
// ];

const players = (obj) => Object.keys(obj).filter((k) => k !== "year");
const sum = (obj) =>
  players(obj).reduce(
    (accumulator, currentValue) => accumulator + obj[currentValue],
    0
  );
const avg_players = (obj) => (sum(obj) / players(obj).length).toFixed(0) || 0;

var evolutionData = [
  {
    year: 2020,
    player1: 17000,
    player2: 14000,
    player3: 10000,
    player4: 9000,
    player5: 5000,
    player6: 4500,
    player7: 8500,
    player8: 7000,
    player9: 6000,
  },
  {
    year: 2025,
    player1: 14000,
    player2: 12000,
    player3: 10000,
    player4: 7000,
    player5: 5000,
    player6: 4000,
    player7: 7500,
    player8: 4000,
    player9: 4000,
  },
  {
    year: 2030,
    player1: 14000,
    player2: 12000,
    player3: 10000,
    player4: 7000,
    player5: 5000,
    player6: 4000,
    player7: 7500,
    player8: 4000,
    player9: 4000,
  },
  {
    year: 2033,
    player1: 12000,
    player2: 10000,
    player3: 8000,
    player4: 7000,
    player5: 6000,
    player6: 2500,
    player7: 7000,
    player8: 3000,
    player9: 2000,
  },
  {
    year: 2040,
    player1: 8000,
    player2: 7000,
    player3: 5000,
    player4: 4000,
    player5: 5000,
    player6: 2500,
    player7: 7000,
    player8: 3000,
    player9: 2000,
  },
  {
    year: 2050,
    player1: 4000,
    player2: 3000,
    player3: 2000,
    player4: 2000,
    player5: 2000,
    player6: 2500,
    player7: 4000,
    player8: 3000,
    player9: 2000,
  },
];

for (var i = 0; i < evolutionData.length; i++) {
  evolutionData[i].avg_players = avg_players(evolutionData[i]);
}

export default Simulation;
