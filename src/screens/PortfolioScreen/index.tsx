import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {getUserPortfolio} from './queries';
import styles from './styles';
import PortfolioCoin from "../../components/PortfolioCoin";
import AppContext from "../../utils/AppContext";
import formatMoney from "../../utils/formatMoney";

const image =  require('../../../assets/images/Saly-10.png');

const PortfolioScreen = () => {
  const [balance, setBalance] = useState(0);
  const [portfolioCoins, setPortfolioCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      fetchPortfolio();
    });
  }, [navigation]);

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
              <Text style={styles.balance}>${formatMoney(balance)}</Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default PortfolioScreen;
