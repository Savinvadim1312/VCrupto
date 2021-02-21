import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import styles from './styles'

const usdFormatter = new Intl.NumberFormat(
'en-US', {
  style: 'currency',
  currency: 'USD',
})

const coinFormatter = new Intl.NumberFormat(
'en-US', {
  style: 'decimal',
  notation: 'compact',
})

export interface PortfolioCoinProps {
  portfolioCoin: {
    amount: number,
    coin: {
      id: string,
      image: string,
      name: string,
      symbol: string,
      currentPrice: number,
    }
  }
}

const PortfolioCoin = (props: PortfolioCoinProps) => {
  const {
    portfolioCoin: {

      amount,
      coin: {
        id,
        image,
        name,
        symbol,
        currentPrice,
      }
    },
  } = props;

  const navigation = useNavigation();

  return (
    <Pressable style={styles.root} onPress={() => navigation.navigate('CoinDetails', { id })}>
      <View style={styles.left}>
        <Image style={styles.image} source={{ uri: image}} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.value}>{usdFormatter.format(amount * currentPrice)}</Text>
        <Text style={styles.symbol}>{symbol} {coinFormatter.format(amount)}</Text>
      </View>
    </Pressable>
  );
};

export default PortfolioCoin;
