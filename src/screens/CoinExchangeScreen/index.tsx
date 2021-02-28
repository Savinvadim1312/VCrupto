import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { exchangeCoins } from './mutations';
const image =  require('../../../assets/images/Saly-31.png');
import styles from './styles';
import AppContext from "../../utils/AppContext";
import {listPortfolioCoins} from "../../graphql/queries";
import formatMoney from "../../utils/formatMoney";

const USD_COIN_ID = 'usd';

const CoinExchangeScreen = () => {
  const [coinAmount, setCoinAmount] = useState('')
  const [coinUSDValue, setCoinUSDValue] = useState('')
  const [usdPortfolioCoin, setUsdPortfolioCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const { userId } = useContext(AppContext);

  const route = useRoute();

  const isBuy = route?.params?.isBuy;
  const coin = route?.params?.coin;
  const portfolioCoin = route?.params?.portfolioCoin;

  const getUSDPortfolioCoin = async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(listPortfolioCoins,
          { filter: {
              and: {
                coinId: { eq: USD_COIN_ID },
                userId: { eq: userId }
              }
            }}
        )
      )
      if (response.data.listPortfolioCoins.items.length > 0) {
        setUsdPortfolioCoin(response.data.listPortfolioCoins.items[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUSDPortfolioCoin();
  }, [])

  useEffect(() => {
    const amount = parseFloat(coinAmount)
    if (!amount && amount !== 0) {
      setCoinAmount("");
      setCoinUSDValue("");
      return;
    }
    setCoinUSDValue((amount * coin?.currentPrice).toString());
  }, [coinAmount]);

  useEffect(() => {
    const amount = parseFloat(coinUSDValue)
    if (!amount && amount !== 0) {
      setCoinAmount("");
      setCoinUSDValue("");
      return;
    }
    setCoinAmount((amount / coin?.currentPrice).toString());
  }, [coinUSDValue]);

  const onSellAll = () => {
    setCoinAmount(portfolioCoin.amount);
  }

  const onBuyAll = () => {
    setCoinUSDValue(usdPortfolioCoin?.amount || 0);
  }

  const placeOrder = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const variables = {
        coinId: coin.id,
        isBuy,
        amount: parseFloat(coinAmount),
        usdPortfolioCoinId: usdPortfolioCoin?.id,
        coinPortfolioCoinId: portfolioCoin?.id,
      }

      const response = await API.graphql(
        graphqlOperation(exchangeCoins, variables)
      )
      if (response.data.exchangeCoins) {
        navigation.navigate('Portfolio');
      } else {
        Alert.alert('Error', 'There was an error exchanging coins');
      }
    } catch (e) {
      Alert.alert('Error', 'There was an error exchanging coins');
      console.error(e);
    }
    setIsLoading(false);
  }

  const onPlaceOrder = async () => {
    const maxUsd = usdPortfolioCoin?.amount || 0;
    if (isBuy && parseFloat(coinUSDValue) > maxUsd) {
      Alert.alert('Error', `Not enough USD coins. Max: ${maxUsd}`);
      return;
    }
    if (!isBuy && (!portfolioCoin || parseFloat(coinAmount) > portfolioCoin.amount)) {
      Alert.alert('Error', `Not enough ${coin.symbol} coins. Max: ${portfolioCoin.amount || 0}`);
      return;
    }

    await placeOrder();
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <Text style={styles.title}>
        {isBuy ? 'Buy ' : "Sell "}
        {coin?.name}
      </Text>
      <Text style={styles.subtitle}>
        1 {coin?.symbol}
        {' = '}
        ${formatMoney(coin?.currentPrice)}
      </Text>
      <Image style={styles.image} source={image} />

      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="0"
            value={coinAmount}
            onChangeText={setCoinAmount}
          />
          <Text>{coin?.symbol}</Text>
        </View>
        <Text style={{fontSize: 30}}>=</Text>

        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="0"
            value={coinUSDValue}
            onChangeText={setCoinUSDValue}
          />
          <Text>USD</Text>
        </View>
      </View>

      {isBuy ? (
        <Pressable onPress={onBuyAll}>
          <Text style={{color: '#0097ff'}}>Buy max</Text>
        </Pressable>
      ) : (
        <Pressable onPress={onSellAll}>
          <Text style={{color: '#0097ff'}}>Sell all</Text>
        </Pressable>
      )}

      <Pressable style={styles.button} onPress={onPlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
        {isLoading && <ActivityIndicator color={'white'} />}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default CoinExchangeScreen;
