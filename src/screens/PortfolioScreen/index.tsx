import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {API, graphql} from 'aws-amplify';
import {} from '../../graphql/queries';
import styles from './styles';
import PortfolioCoin from "../../components/PortfolioCoin";
const image =  require('../../../assets/images/Saly-10.png');

const PortfolioScreen = () => {
  return (
    <View style={styles.root}>
      <FlatList
        style={{width: '100%'}}
        data={portfolioCoins}
        renderItem={({item}) => <PortfolioCoin portfolioCoin={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <View style={styles.balanceContainer}>
              <Text style={styles.label}>Portfolio balance</Text>
              <Text style={styles.balance}>$69.420</Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default PortfolioScreen;
