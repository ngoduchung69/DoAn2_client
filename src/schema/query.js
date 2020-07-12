import { gql } from "apollo-boost";

export const FIND_USER = gql`
query findUser($fingerId:String) {
  findUser(fingerId:$fingerId) {
    _id
    name
    phone
    address
    fingerId
  }
}

`

export const LightOnQuery = gql`
  {
    lightOnQuery {
      _id
      micro
      accel {
        x
        y
        z
      }
      type
      color {
        red
        blue
        green
      }
      time
    }
  }
`;
