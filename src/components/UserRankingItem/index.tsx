import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles'

const usdFormatter = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'USD',
  })

export interface UserRankingItemProps {
  user: {
    image: string,
    name: string,
    networth: number,
  },
  place: number,
}

const UserRankingItem = (props: UserRankingItemProps) => {
  const {
    user: {
      image,
      name,
      networth
    },
    place
  } = props;
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Text style={styles.place}>{place}</Text>
        <Image style={styles.image} source={{ uri: image}} />
        <View>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.value}>{usdFormatter.format(networth)}</Text>

      </View>
    </View>
  );
};

export default UserRankingItem;
