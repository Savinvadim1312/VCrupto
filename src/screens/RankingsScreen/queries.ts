export const getUsersByNetworth = /* GraphQL */ `
  query getUsersByNetworth($limit: Int) {
    getUsersByNetworth(type: "User", sortDirection: DESC, limit: $limit) {
      items {
        id
        name
        image
        networth
      }
      nextToken
    }
  }
`;
