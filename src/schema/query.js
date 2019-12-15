import { gql } from "apollo-boost";

export const UsersQuery = gql`
  {
    users {
      name
      _id
      role
      mssv
      tel
      age
      fingerPrint
      appearance
    }
  }
`;

export const StudentsQuery = gql`
  {
    students {
      name
      _id
      role
      mssv
      age
      tel
      fingerPrint
      appearance
    }
  }
`;

export const StudentQuery = gql`
  query findUser($mssv:Int!) {
    user(mssv:$mssv ) {
      name
      _id
      age
      tel
      mssv
      fingerPrint
      appearance
    }
  }
`;

export const CheckInTimeQuery = gql`
  query findCheckInTimeQuery($id: ID!) {
    checkInTimes(_id: $id) {
      userId
      checkInTime
    }
  }
`;
