import { gql } from "@apollo/client";

export const GET_DRIVERS = gql`
  query {
    drivers {
      id
      name
      age
      cars {
        name
        model
      }
    }
  }
`;
