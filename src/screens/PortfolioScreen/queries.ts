export const getUserPortfolio = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      networth
      portfolioCoins {
        items {
          id
          amount
          coin {
            id
            name
            symbol
            image
            currentPrice
          }
        }
        nextToken
      }
    }
  }
`;
