import React, { useMemo } from 'react';
import GoogleMap from './GoogleMap';
import {
  Jumbotron,
} from 'reactstrap';
import Log from './Log';
import ActionButton from './ActionButton';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { Choose } from 'react-extras';
import { getUserDetails } from '../../helpers/auth';
import { GET_MAX_STATE, FIND_DONATION_VOLUNTEER_ID } from '../../graphql/queries/chain';
import LoadingPopup from '../../components/Loader/LoadingPopup';

/**
 * @type {React.FC}
 */
const DonationRequestTracker = () => {
  const user = getUserDetails();
  const { id } = useParams();

  const isVolunteer = useMemo(() => user.type_id === 1, [user.type_id]);
  
  const { data: dataDonation, loading: loadingDonation } = useQuery(FIND_DONATION_VOLUNTEER_ID, {
    variables: {
      donation_request_id: id,
      volunteer_id: user.id
    },
  });

  const { data: dataState, loading: loadingState } = useQuery(GET_MAX_STATE, {
    variables: {
      id,
    },
    pollInterval: 500,
  });

  if(loadingDonation || loadingState) {
    return <LoadingPopup />;
  }

  const state = dataState.donation_chain_aggregate.aggregate.max.state;
  const role = dataDonation.donation_volunteer[0].role;

  return (
    <main className="d-flex flex-column">
      <GoogleMap />
      <Jumbotron className="d-flex justify-content-center align-items-center flex-column">
        <Choose>
          <Choose.When condition={state === null}>
            <ActionButton state={1}>Gave Food</ActionButton>
          </Choose.When>
          <Choose.When condition={state === 1}>
            <ActionButton state={2}>Food Taken</ActionButton>
            <ActionButton state={11}>Food is Bad</ActionButton>
          </Choose.When>
          <Choose.When condition={state === 2}>
            <ActionButton state={3}>Food Delivered</ActionButton>
          </Choose.When>
          <Choose.When condition={state === 3}>
            <ActionButton state={4}>Food Distributed</ActionButton>
          </Choose.When>
          <Choose.Otherwise>
            <span>Status = {state}</span>
          </Choose.Otherwise>
        </Choose>
      </Jumbotron>
      <Log />
    </main>
  );
};

export default DonationRequestTracker;
