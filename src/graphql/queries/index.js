import gql from 'graphql-tag';

export const CREATE_USER = gql`
mutation signUp($name:String!, $email:String!, $password:String!, $phone:bigint!){
    insert_user(objects: {mobile_number: $phone, name: $name, password: $password, email: $email}) {
      affected_rows
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