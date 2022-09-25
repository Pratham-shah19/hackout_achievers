import React from 'react';
import {View, Text, Image} from 'react-native';

const FamousItemComponent = props => {
  return (
    <View>
      <View
        style={{
          width: 68,
          height: 68,
          borderRadius: 50,
          margin: 10,
          marginBottom: 50,
        }}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 50}}
          source={{
            uri: props.restaurantImage,
          }}></Image>
        {/* <S3Image
          imgKey={props.restaurantImage}
          style={{height: '100%', width: '100%', borderRadius: 50}}
        /> */}
        <Text
          style={{
            alignSelf: 'center',
            alignContent: 'center',
            textAlign: 'center',
            marginTop: 10,
            fontSize: 12.5,
            color: 'black',
            fontFamily: 'Fredoka-Regular',
          }}>
          {props.famousFood}
        </Text>
      </View>
    </View>
  );
};

export default FamousItemComponent;
