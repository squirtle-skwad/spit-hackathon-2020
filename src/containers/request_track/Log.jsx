import React from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { STATE_MAP } from '../../helpers/mapper';

/**
 * @type {React.FC}
 */
const Log = ({ data }) => {
  return (
    <div>
      {data.map(l => (
        <Card className="mx-1 my-2">
          <CardBody>
            {STATE_MAP[l.state]}
          </CardBody>
          <CardFooter>
            {l.donation_volunteer.volunteer.name} <i>{l.donation_volunteer.volunteer.mobile_number}</i>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Log;
