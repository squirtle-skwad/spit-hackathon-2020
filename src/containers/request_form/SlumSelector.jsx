import React from 'react';
import {
  Card,
  Col,
  Row,
  Container,
  Label,
} from 'reactstrap';
import cns from 'classnames';
import { Query } from 'react-apollo';
import { GET_SLUMS } from '../../graphql/queries/chain';

/**
 * @type {React.FC}
 */
const SlumCard = ({ slum, onChange, selected }) => {
  const changeSelected = () => {
    onChange(slum);
  };

  return (
    <Card className={cns("my-2", { "border-primary": selected })} onClick={changeSelected}>
      <Container>
        <Row>
          <Col xs={4} className="d-flex flex-column justify-content-center align-items-center">
            <h3>{slum.number_of_people}</h3>
            <h6>People</h6>
          </Col>
          <Col xs={8} className="d-flex justify-content-center align-items-center">
            <h3>{slum.name}</h3>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

/**
 * @type {React.FC}
 */
const SlumSelector = ({ value, onChange }) => {
  return (
    <div>
      <Label>Slums nearby</Label>
      <Query query={GET_SLUMS}>
        {({ data, loading, error }) => {
          if(loading) {
            return "Loading...";
          }

          if(error) {
            return JSON.stringify(error);
          }

          return data.slum_areas.map((slum) => (
            <SlumCard key={slum.id} slum={slum} onChange={onChange} selected={value && value.id === slum.id} />)
          );
        }}
      </Query>
    </div>
  );
};

export default SlumSelector;
