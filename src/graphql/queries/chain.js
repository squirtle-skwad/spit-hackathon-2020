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
    $delivery_by_time: timestamptz!
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
