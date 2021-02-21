import React from 'react';
import { Text } from 'react-native';

const percentageFormatter = new Intl.NumberFormat(
  'en-US', {
    style: 'percent',
    // @ts-ignore
    signDisplay: "exceptZero",
    maximumFractionDigits: 2
  })

interface PercentageChangeProps {
  value: number,
  style?: object,
}

const PercentageChange = ({ value, style = {} }: PercentageChangeProps ) => {
  return (
    <Text style={[style, {color: value > 0 ? '#398f0a' : '#f10000'}]}>
      {percentageFormatter.format(value / 100)}
    </Text>
  );
};

export default PercentageChange;
