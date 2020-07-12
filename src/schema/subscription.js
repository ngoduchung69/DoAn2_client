import { gql } from "apollo-boost";

export const SUBSCRIPTION = gql`
  subscription message {
    postAdded 
  }
`;
