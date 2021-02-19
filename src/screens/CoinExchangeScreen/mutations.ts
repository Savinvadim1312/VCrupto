export const exchangeCoins = /* GraphQL */ `
  mutation ExchangeCoins($coinId: ID!, $isBuy: Boolean!, $amount: Float!, $usdPortfolioCoinId: ID, $coinPortfolioCoinId: ID) {
    exchangeCoins(coinId: $coinId, isBuy: $isBuy, amount: $amount, usdPortfolioCoinId: $usdPortfolioCoinId, coinPortfolioCoinId: $coinPortfolioCoinId)
  }
`;
