import React from 'react';
import {View, Text} from 'react-native';

const Discount = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        top: 56,
        left: 11,
        height: 17,
        bottom: 115,
        borderRadius: 6,
        backgroundColor: '#a26bdb',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 11,
          fontWeight: 'bold',
          marginVertical: 1,
          marginHorizontal: 3,
        }}>
        10% OFF
      </Text>
    </View>
  );
};

export default Discount;
