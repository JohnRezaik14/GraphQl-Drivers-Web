import { gql } from "@apollo/client";

export const ADD_CAR = gql`
  mutation AddCar($driverId: String!, $name: String!, $model: String!) {
    addCar(driverId: $driverId, name: $name, model: $model) {
      name
      model
    }
  }
`;
