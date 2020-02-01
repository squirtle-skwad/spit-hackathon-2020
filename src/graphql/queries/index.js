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
query checkpoint_list($endtime:timestamptz!){
  checkpoint(where: {end_time: {_lte: $endtime}}) {
    start_time
    end_time
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
    }
    id
    mobile_number
  }
}`

export const DONATION_ALERT = gql`
query donation_request($delivery_by_time:timestamptz!){
  donation_request(where: { delivery_by_time: {_gte: $delivery_by_time}}, limit: 5) {
    latitude
    longitude
    slum_area {
      latitude
      longitude
    }
    quantity
    delivery_by_time
    donor {
      name
    }
  }
}`
