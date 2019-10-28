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
    }
  }
`;

export const CheckInTimeQuery = gql`
  query findCheckInTimeQuery($id: ID!) {
    checkInTimes(_id: $id) {
      UserId
      checkInTime
    }
  }
`;
