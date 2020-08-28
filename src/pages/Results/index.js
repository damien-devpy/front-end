import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import FootprintDistribution from './components/FootprintDistribution';
import Loading from '../../components/Loading';
import { selectCarbonFootprintReductionGroupByPopulation } from '../../selectors/footprintSelectors';
import { useWorkshop } from '../../hooks/workshop';

const Results = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { loadError, isLoading } = useWorkshop(workshopId);
  const { participants, citizens, global } = useSelector(
    selectCarbonFootprintReductionGroupByPopulation
  );
  const { t } = useTranslation();

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <Container>
        <Row style={{ height: '100vh' }}>
          <Col sm={4} md={4} className="graph-col">
            <Container className="graph-card">
              <h4> {t('results.participants')} </h4>
              <FootprintDistribution population={participants} />
            </Container>
          </Col>
          <Col sm={4} md={4} className="graph-col">
            <Container className="graph-card">
              <h4> {t('results.citizens')} </h4>
              <FootprintDistribution population={citizens} />
            </Container>
          </Col>
          <Col sm={4} md={4} className="graph-col">
            <Container className="graph-card">
              <h4> {t('results.global')} </h4>
              <FootprintDistribution population={global} />
            </Container>
          </Col>
        </Row>
      </Container>
    </Loading>
  );
};

export default Results;
