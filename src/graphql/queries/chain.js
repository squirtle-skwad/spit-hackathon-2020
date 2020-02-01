import gql from 'graphql-tag';

export const GET_SLUMS = gql`
  query GET_SLUMS{
    slum_areas {
      id
      name
      number_of_people
      latitude
      longitude
      accuracy
    }
  }
`;

export const REQUEST_DONATION = gql`
  mutation REQUEST_DONATION (
    $accuracy: float8!,
    $latitude: float8!,
    $longitude: float8!,
    $donor_id: uuid!,
    $slum_id: uuid!,
    $quantity: Int!,
    $delivery_by_time: timestamptz!,
  ) {
    insert_donation_request(objects: {
        accuracy: $accuracy,
        delivery_by_time: $delivery_by_time,
        latitude: $latitude,
        longitude: $longitude,
        quantity: $quantity,
        slum_id: $slum_id,
        donor_id: $donor_id
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const ADD_RESTAURANT_AS_VOLUNTEER = gql`
  mutation ADD_RESTAURANT_AS_VOLUNTEER (
    $volunteer_id: uuid!,
    $donation_request_id: uuid!,
  ) {
    insert_donation_volunteer(objects: {
      volunteer_id: $volunteer_id,
      role: "restaurant",
      donation_request_id: $donation_request_id,
      assigned: true,
      start_time: "10:45",
      end_time: "11:45",
    }) {
      affected_rows
    }
  }
`;

export const GET_DONATION_CHAIN = gql`
  query GET_DONATION_CHAIN (
    $id: uuid!,
  ) {
    donation_chain(where: {
      donation_volunteer: {
        donation_request_id: {
          _eq: $id,
        }
      }
    }) {
      latitude
      longitude
      state
      accuracy
      created_at
      donation_volunteer {
        volunteer {
          name
          mobile_number
        }
      }
    }
  }
`;


export const UPDATE_DONATION_CHAIN = gql`
  mutation UPDATE_DONATION_STATUS (
    $accuracy: float8!,
    $latitude: float8!,
    $longitude: float8!,
    $state: Int!,
    $donation_volunteer_id: uuid!,
  ) {
    insert_donation_chain(objects: {
      accuracy: $accuracy,
      latitude: $latitude,
      longitude: $longitude,
      state: $state,
      donation_volunteer_id: $donation_volunteer_id,
    }) {
      affected_rows
    }
  }
`;

export const FIND_DONATION_VOLUNTEER_ID = gql`
  query FIND_DONATION_VOLUNTEER_ID (
    $donation_request_id: uuid!,
    $volunteer_id: uuid!,
  ) {
    donation_volunteer(where: {
      _and: {
        donation_request_id: {_eq: $donation_request_id},
        volunteer_id: {_eq: $volunteer_id}
      }
    }) {
      id
      role
    }
  }
`;

export const GET_MAX_STATE = gql`
  query GET_MAX_STATE($id: uuid!) {
    donation_chain_aggregate(where: {donation_volunteer: {donation_request_id: {_eq: $id}}}) {
      aggregate {
        max {
          state
        }
      }
    }
  }
`;
