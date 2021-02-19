import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import styles from './styles';
import UserRangeItem from "../../components/UserRankingItem";
const image =  require('../../../assets/images/Saly-20.png');

const portfolioCoins = [{
  id: '1',
  name: 'Virtual Dollars',
  image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
  netWorth: 69420,
}, {
  id: '2',
  name: 'Bitcoin',
  image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
  netWorth: 59420,
}, {
  id: '3',
  name: 'Etherium',
  image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
  netWorth: 30120,
},
]

const PortfolioScreen = () => {
  return (
    <View style={styles.root}>
      <FlatList
        style={{width: '100%'}}
        data={portfolioCoins}
        renderItem={({item, index}) => <UserRangeItem user={item} place={index + 1} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            <Image style={styles.image} source={image} />
            <Text style={styles.label}>Rankings</Text>
          </>
        )}
      />
    </View>
  );
};

export default PortfolioScreen;
