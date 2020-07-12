import gql from "graphql-tag";

export const ADD_USER = gql`
mutation addUser($name:String,$phone:String,$address:String,$fingerId:String) {
  addUser(name:$name,phone:$phone,address:$address,fingerId:$fingerId) {
    name
    phone
    _id
    address
    fingerId
  }
}
`

export const ADD_LIGHTON = gql`
  mutation addLightOn($color: String,$accel:Object,$magne:String,$micro:String) {
    addLightOn(color: $color,accel:$accel,magne:$magne,micro:$micro) {
      color
      accel
      magne
      micro
    }
  }
`;

export const ADD_OPENFRIDGE = gql`
  mutation addOpenFridge($color: String,$accel:Object,$magne:String,$micro:String) {
    addOpenFridge(color: $color,accel:$accel,magne:$magne,micro:$micro) {
      color
      accel
      magne
      micro
    }
  }
`;


export const ADD_POST = gql`
  mutation addPost($message:String!) {
    addPost(message:$message) 
  }
`;

export const CONVERT_TO_EXEL = gql`
mutation CONVERT($classId:Int!) {
  convertToExel(classId:$classId) {
      name
      _id
      role
      mssv
      age
      tel
      class
      classId
    }
}
`
