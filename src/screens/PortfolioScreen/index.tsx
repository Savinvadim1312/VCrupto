import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {API, graphql, graphqlOperation} from 'aws-amplify';
import { getUserPortfolio } from './queries';
import styles from './styles';
import PortfolioCoin from "../../components/PortfolioCoin";
import AppContext from "../../utils/AppContext";
const image =  require('../../../assets/images/Saly-10.png');

const numberFormatter = new Intl.NumberFormat(
'en-US', {
  style: 'currency',
  currency: 'USD',
})

const PortfolioScreen = () => {
  const [balance, setBalance] = useState(0);
  const [portfolioCoins, setPortfolioCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userId } = useContext(AppContext);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const response = await API.graphql(
        graphqlOperation(
          getUserPortfolio,
          { id: userId },
        )
      )
      console.log(response.data.getUser);
      setBalance(response.data.getUser.networth)
      setPortfolioCoins(response.data.getUser.portfolioCoins.items)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [])

  return (
    <View style={styles.root}>
      <FlatList
        style={{width: '100%'}}
        data={portfolioCoins}
        renderItem={({item}) => <PortfolioCoin portfolioCoin={item} />}
        onRefresh={fetchPortfolio}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <View style={styles.balanceContainer}>
              <Text style={styles.label}>Portfolio balance</Text>
              <Text style={styles.balance}>{numberFormatter.format(balance)}</Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default PortfolioScreen;
