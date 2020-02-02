import gql from 'graphql-tag';
export * from './chain';

export const CREATE_USER = gql`
mutation signUp($name: String!, $email: String!, $password: String!, $phone: bigint!) {
  insert_user(objects: {mobile_number: $phone, name: $name, password: $password, email: $email}) {
    returning {
      name
      mobile_number
      id
      email
      type {
        typeName
        id
      }
      type_id
    }
  }
}`

export const LIST_CHECKPOINT = gql`
query checkpoint_list($endtime:timestamptz!){
  checkpoint(where: {end_time: {_gte: $endtime}}) {
    start_time
    end_time
    latitude
    longitude
  }
}`

export const CHECKPOINT_ALERT = gql`
query checkpoint_list($end_time:timestamptz!){
  checkpoint(where: {end_time: {_gte: $end_time}}) {
    start_time
    end_time
    latitude
    longitude
  }
}`

export const DONATION_REQUEST = gql`
query donation_request($delivery_by_time:timestamptz!){
  donation_request(where: {is_completed: {_eq: false}, delivery_by_time: {_gte: $delivery_by_time}} ) {
    slum_area {
      name
    }
    donor {
      name
    }
    latitude
    longitude
    quantity
    id
  }
}`

export const UPDATE_USER_TYPE = gql`
mutation updateUserType($typeId:Int!,$userId:uuid!) {
  __typename
  update_user(_set: {type_id: $typeId}, where: {id: {_eq: $userId}}) {
    affected_rows
  }
}
`

export const GET_USER_LOGIN = gql`
query userLogin($email:String!,$password:String!) {
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    name
    email
    type {
      typeName
      id
    }
    id
    type_id
    mobile_number
  }
}
`

export const GET_VOLUNTEERS = gql`
query getVolunteers($role: String!, $donationRequestId: uuid!) {
  donation_volunteer(where: {role: {_eq: $role}, donation_request_id: {_eq: $donationRequestId}}, limit: 10) {
    start_time
    end_time
    role
    volunteer {
      name
      id
    }
    id
  }
}
`

export const INSERT_DONATION_VOLUNTEER = gql`
mutation insertDonationVolunteer($volunteerId: uuid!, $donationRequestId: uuid!, $role: String!, $startTime: String!, $endTime: String!, $assigned: Boolean!) {
  __typename
  insert_donation_volunteer(objects: {volunteer_id: $volunteerId, donation_request_id: $donationRequestId, start_time: $startTime, end_time: $endTime, role: $role, assigned: $assigned}, on_conflict: {constraint: donation_volunteer_pkey, update_columns: assigned}) {
    returning {
      id
    }
  }
}
`

export const INSERT_DONATION_CHAIN = gql`
mutation insertDonationChain($longitude: float8, $latitude: float8, $accuracy: float8, $state: Int!, $donationVolunteerId: uuid!) {
  __typename
  insert_donation_chain(objects: {longitude: $longitude, latitude: $latitude, accuracy: $accuracy, donation_volunteer_id: $donationVolunteerId, state: $state}) {
    affected_rows
  }
}
`

export const UPDATE_IS_ASSIGNED = gql`
mutation updateIsAssigned($donationRequestId:uuid!) {
  __typename
  update_donation_request(where: {id: {_eq: $donationRequestId}}, _set: {is_assigned: true}) {
    affected_rows
  }
}
`

export const UPDATE_DONATION_VOLUNTEER = gql`
mutation updateDonationVolunteer($donationRequestId: uuid!,$volunteerId:uuid!) {
  __typename
  update_donation_volunteer(where: {donation_request_id: {_eq: $donationRequestId}, volunteer_id: {_eq: $volunteerId}}, _set: {assigned: true}) {
    returning {
      id
    }
  }
}
`
export const DONATION_ALERT = gql`
query donation_request($delivery_by_time:timestamptz!){
  donation_request(where: { delivery_by_time: {_gte: $delivery_by_time}}, limit: 5) {
    latitude
    longitude
    slum_area {
      latitude
      longitude
      name
    }
    quantity
    delivery_by_time
    donor {
      name
    }
    id
  }
}`

export const GET_SCORES = gql`
query getScores {
  donation_volunteer(where: {assigned: {_eq: true}, role: {_neq: "restaurant"}}) {
    donation_request {
      quantity
    }
    role
    volunteer {
      name
      id
    }
  }
}
`
export const CREATE_CHECKPOINT = gql`
mutation ($accuracy:float8!, $latitude:float8!, $longitude:float8!, $end_time:timestamptz!, $start_time:timestamptz!, $user_id:uuid!){
  insert_checkpoint(objects: {accuracy: $accuracy, end_time: $end_time, latitude:$latitude, longitude:$longitude, start_time:$start_time, user_id:$user_id}) {
    affected_rows
  }
}
`

export const REQUEST_SLUM = gql`
mutation REQUEST_SLUM ($lat: float8!, $lgn: float8!, $number_of_people: Int!, $name: String!, $picture: String) {
  insert_slum_areas(objects: {latitude: $lat, longitude: $lgn, accuracy: 1, number_of_people: $number_of_people, name: $name, picture: $picture}) {
    affected_rows
  }
}
`;

export const GET_ACTIONS = gql`
query getActions($volunteerId: uuid!) {
  donation_volunteer(where: {volunteer_id: {_eq: $volunteerId}}, limit: 9) {
    role
    donation_request_id
    assigned
    donation_request {
      latitude
      longitude
      donor {
        name
      }
      is_assigned
    }
  }
}
`;

export const INSERT_POST = gql`
mutation insertUserPost($userId:uuid!,$picture:String!,$caption:String!) {
  __typename
  insert_user_post(objects: {user_id: $userId, picture: $picture, caption: $caption}) {
    affected_rows
  }
}
`

export const GET_POST = gql`
query getPosts {
  user_post(order_by: {created_at: asc}, limit: 9) {
    picture
    caption
    user {
      name
    }
  }
}
`
