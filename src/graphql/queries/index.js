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
    }
  }
}`

export const LIST_CHECKPOINT = gql`
query checkpoint_list($minlatitude:float8!,$maxlatitude:float8!, $minlongitude:float8!, $maxlongitude:float8!, $endtime:timestamptz!){
  checkpoint(where: {latitude: {_gte: $minlatitude, _lte: $maxlatitude}, longitude: {_gte: $minlongitude, _lte: $maxlongitude}, end_time: {_gte: $endtime}}) {
    start_time
    end_time
  }
}`

export const DONATION_REQUEST = gql`
query donation_request($minlatitude:float8!,$maxlatitude:float8!, $minlongitude:float8!, $maxlongitude:float8!, $delivery_by_time:timestamptz!){
  donation_request(where: {latitude: {_gte: $minlatitude, _lte: $maxlatitude}, longitude: {_gte: $minlongitude, _lte: $maxlongitude}, is_completed: {_eq: false}, delivery_by_time: {_lte: $delivery_by_time}} ) {
    slum_area {
      name
    }
    donor {
      name
    }
    latitude
    longitude
    quantity
  }
}
`

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
    }
    id
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