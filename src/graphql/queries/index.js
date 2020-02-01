import gql from 'graphql-tag';

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