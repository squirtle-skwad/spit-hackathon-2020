import gql from 'graphql-tag';
export * from './chain';

export const CREATE_USER = gql`
  mutation signUp($name:String!, $email:String!, $password:String!, $phone:bigint!) {
      insert_user(objects: {mobile_number: $phone, name: $name, password: $password, email: $email}) {
        affected_rows
      }
  }
`;
