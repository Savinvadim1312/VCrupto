/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  networth?: ModelFloatInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelPortfolioCoinFilterInput = {
  id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  userId?: ModelIDInput | null,
  coinId?: ModelIDInput | null,
  and?: Array< ModelPortfolioCoinFilterInput | null > | null,
  or?: Array< ModelPortfolioCoinFilterInput | null > | null,
  not?: ModelPortfolioCoinFilterInput | null,
};

export type ModelCoinFilterInput = {
  id?: ModelIDInput | null,
  cgId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  image?: ModelStringInput | null,
  currentPrice?: ModelFloatInput | null,
  valueChange24H?: ModelFloatInput | null,
  valueChange1D?: ModelFloatInput | null,
  valueChange7D?: ModelFloatInput | null,
  priceHistoryString?: ModelStringInput | null,
  and?: Array< ModelCoinFilterInput | null > | null,
  or?: Array< ModelCoinFilterInput | null > | null,
  not?: ModelCoinFilterInput | null,
};

export type ModelFloatKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ExchangeCoinsMutationVariables = {
  coinId: string,
  isBuy: boolean,
  amount: number,
  usdPortfolioCoinId?: string | null,
  coinPortfolioCoinId?: string | null,
};

export type ExchangeCoinsMutation = {
  exchangeCoins: boolean,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    type: string,
    email: string,
    name: string | null,
    image: string | null,
    networth: number,
    portfolioCoins:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        userId: string,
        coinId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      type: string,
      email: string,
      name: string | null,
      image: string | null,
      networth: number,
      portfolioCoins:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPortfolioCoinQueryVariables = {
  id: string,
};

export type GetPortfolioCoinQuery = {
  getPortfolioCoin:  {
    __typename: "PortfolioCoin",
    id: string,
    amount: number,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      type: string,
      email: string,
      name: string | null,
      image: string | null,
      networth: number,
      portfolioCoins:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    coinId: string,
    coin:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image: string | null,
      currentPrice: number,
      valueChange24H: number,
      valueChange1D: number,
      valueChange7D: number,
      priceHistoryString: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPortfolioCoinsQueryVariables = {
  filter?: ModelPortfolioCoinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPortfolioCoinsQuery = {
  listPortfolioCoins:  {
    __typename: "ModelPortfolioCoinConnection",
    items:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      userId: string,
      user:  {
        __typename: "User",
        id: string,
        type: string,
        email: string,
        name: string | null,
        image: string | null,
        networth: number,
        createdAt: string,
        updatedAt: string,
      } | null,
      coinId: string,
      coin:  {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image: string | null,
        currentPrice: number,
        valueChange24H: number,
        valueChange1D: number,
        valueChange7D: number,
        priceHistoryString: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCoinQueryVariables = {
  id: string,
};

export type GetCoinQuery = {
  getCoin:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image: string | null,
    currentPrice: number,
    valueChange24H: number,
    valueChange1D: number,
    valueChange7D: number,
    priceHistoryString: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoinsQueryVariables = {
  filter?: ModelCoinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoinsQuery = {
  listCoins:  {
    __typename: "ModelCoinConnection",
    items:  Array< {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image: string | null,
      currentPrice: number,
      valueChange24H: number,
      valueChange1D: number,
      valueChange7D: number,
      priceHistoryString: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUsersByNetworthQueryVariables = {
  type?: string | null,
  networth?: ModelFloatKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUsersByNetworthQuery = {
  getUsersByNetworth:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      type: string,
      email: string,
      name: string | null,
      image: string | null,
      networth: number,
      portfolioCoins:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};
