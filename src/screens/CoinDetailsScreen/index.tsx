import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, Pressable, ActivityIndicator} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { API, graphqlOperation } from 'aws-amplify';
import { getCoin, listPortfolioCoins } from '../../graphql/queries';
import styles from "./styles";
import PercentageChange from "../../components/PercentageChange";
import CoinPriceGraph from "../../components/CoinPriceGraph";
import {useNavigation, useRoute} from "@react-navigation/native";
import AppContext from "../../utils/AppContext";
import formatMoney from "../../utils/formatMoney";

const CoinDetailsScreen = () => {
  const [coin, setCoin] = useState(null);
  const [portfolioCoin, setPortfolioCoin] = useState(null);

  const { userId } = useContext(AppContext);

  const navigation = useNavigation();
  const route = useRoute();

  const fetchCoinData = async () => {
    if (!route.params?.id) {
      return;
    }
    try {
      const response = await API.graphql(
        graphqlOperation(getCoin, { id: route.params.id })
      )
      setCoin(response.data.getCoin);
    } catch (e) {
      console.error(e);
    }
  }

  const fetchPortfolioCoinData = async () => {
    if (!route.params?.id) {
      return;
    }
    try {
      const response = await API.graphql(
        graphqlOperation(listPortfolioCoins,
          { filter: {
              and: {
                coinId: { eq: route.params?.id},
                userId: { eq: userId }
              }
            }}
          )
      )
      if (response.data.listPortfolioCoins.items.length > 0) {
        setPortfolioCoin(response.data.listPortfolioCoins.items[0])
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchCoinData();
    fetchPortfolioCoinData();
  }, [])

  const onBuy = () => {
    navigation.navigate('CoinExchange', { isBuy: true, coin, portfolioCoin });
  }

  const onSell = () => {
    navigation.navigate('CoinExchange', { isBuy: false, coin, portfolioCoin });
  }

  if (!coin) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <View style={styles.left}>
          <Image style={styles.image} source={{ uri: coin.image}} />
          <View>
            <Text style={styles.name}>{coin.name}</Text>
            <Text style={styles.symbol}>{coin.symbol}</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <AntDesign name={'staro'} size={30} color={'#2f95dc'} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>Current price</Text>
          <Text style={styles.value}>${formatMoney(coin.currentPrice)}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.valueContainer}>
            <Text style={styles.label}>1 hour</Text>
            <PercentageChange value={coin.valueChange24H} />
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.label}>1 day</Text>
            <PercentageChange value={coin.valueChange1D} />
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.label}>7 days</Text>
            <PercentageChange value={coin.valueChange7D} />
          </View>
        </View>
      </View>

      {coin.priceHistoryString
        && <CoinPriceGraph dataString={coin.priceHistoryString } />}

      <View style={styles.row}>
        <Text>Position</Text>
        <Text>
          {coin.symbol} {formatMoney(portfolioCoin?.amount || 0)}
          {' '}
          (${formatMoney(coin.currentPrice * (portfolioCoin?.amount || 0))})
        </Text>
      </View>

      <View style={[styles.row, { marginTop: 'auto'}]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#20b100' }]}
          onPress={onBuy}>
          <Text style={styles.buttonText}>Buy</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#ff0000' }]}
          onPress={onSell}>
          <Text style={styles.buttonText}>Sell</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default CoinDetailsScreen;
