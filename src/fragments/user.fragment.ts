import { graphql } from "../gql";

export const UsersFragment = graphql(`
    fragment UserFragment on User {
        _id
      email
      username
      imageUrl
    }
`)